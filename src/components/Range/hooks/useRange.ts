import { useEffect, useState } from "react";

interface UseRangeProps {
  mode: "normal" | "fixed";
  values: number[];
  min: number;
  max: number;
}

export const useRange = ({ mode, values, min, max }: UseRangeProps) => {
  const [minValue, setMinValue] = useState<number>(
    mode === "fixed" ? values[0] : min
  );
  const [maxValue, setMaxValue] = useState<number>(
    mode === "fixed" ? values[values.length - 1] : max
  );
  const [currentMin, setCurrentMin] = useState<number>(minValue);
  const [currentMax, setCurrentMax] = useState<number>(maxValue);
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [isEditingMin, setIsEditingMin] = useState(false);
  const [isEditingMax, setIsEditingMax] = useState(false);

  const minDifference = Math.ceil((maxValue - minValue) / 100);

  const closestValue = (value: number): number => {
    if (mode === "fixed") {
      return values.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    }
    return Math.round(value);
  };

  const updateThumbs = (value: number, isMin: boolean): void => {
    const newValue = closestValue(value);
    if (isMin) {
      if (newValue < currentMax - minDifference) {
        setCurrentMin(newValue);
      }
    } else {
      if (newValue > currentMin + minDifference) {
        setCurrentMax(newValue);
      }
    }
  };

  const handleThumbMove = (e: MouseEvent, isMin: boolean): void => {
    const slider = document.querySelector(".slider-container") as HTMLElement;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const offset = e.clientX - rect.left;
    const percent = Math.min(Math.max(offset / rect.width, 0), 1);
    const value = minValue + percent * (maxValue - minValue);
    updateThumbs(value, isMin);
  };

  const startDrag = (isMin: boolean): void => {
    const move = (event: MouseEvent) => handleThumbMove(event, isMin);
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const percentMin = ((currentMin - minValue) / (maxValue - minValue)) * 100;
  const percentMax = ((currentMax - minValue) / (maxValue - minValue)) * 100;

  useEffect(() => {
    if (mode === "fixed" && (!values || values.length === 0)) return;
    if (isUserInput) return;

    const newMin = mode === "fixed" ? values[0] : min;
    const newMax = mode === "fixed" ? values[values.length - 1] : max;

    setMinValue(newMin);
    setMaxValue(newMax);
  }, [values, min, max, mode, isUserInput]);

  useEffect(() => {
    setCurrentMin(minValue);
    setCurrentMax(maxValue);
  }, [minValue, maxValue]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.max(Number(e.target.value), 0);
    if (newMin < maxValue) {
      setMinValue(newMin);
      setCurrentMin(newMin);
      setIsUserInput(true);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax > minValue) {
      setMaxValue(newMax);
      setCurrentMax(newMax);
      setIsUserInput(true);
    }
  };

  const toggleEditing = (type: "min" | "max") => {
    if (type === "min") setIsEditingMin(!isEditingMin);
    else setIsEditingMax(!isEditingMax);
  };

  return {
    currentMin,
    currentMax,
    minValue,
    maxValue,
    percentMin,
    percentMax,
    isEditingMin,
    isEditingMax,
    handleMinInputChange,
    handleMaxInputChange,
    toggleEditing,
    startDrag,
  };
};
