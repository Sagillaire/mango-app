import React, { useEffect, useState } from "react";
import "./styles.css";

interface Props {
  mode?: "normal" | "fixed";
  values?: number[];
  loading?: boolean;
  min?: number;
  max?: number;
}

export const Range: React.FC<Props> = ({
  mode = "normal",
  values = [1, 5, 10, 15, 20],
  loading = false,
  min = 1,
  max = 100,
}) => {
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

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="container">
      <div onClick={() => toggleEditing("min")}>
        {isEditingMin ? (
          <input
            autoFocus
            type="number"
            value={minValue}
            className="input"
            onChange={handleMinInputChange}
            onBlur={() => toggleEditing("min")}
            onKeyDown={(e) => e.key === "Enter" && toggleEditing("min")}
          />
        ) : (
          <span className="input-label">{minValue} €</span>
        )}
      </div>
      <div className="slider-container">
        <div className="slider-track"></div>
        <div
          className="slider-range"
          role="progressbar"
          style={{
            left: `${percentMin}%`,
            width: `${percentMax - percentMin}%`,
          }}
        ></div>
        <div
          role="slider"
          className="slider-thumb"
          style={{ left: `${percentMin}%` }}
          onMouseDown={() => startDrag(true)}
        >
          <span role="tooltip" className="tooltip">
            {currentMin}
          </span>
        </div>
        <div
          role="slider"
          className="slider-thumb"
          style={{ left: `${percentMax}%` }}
          onMouseDown={() => startDrag(false)}
        >
          <span role="tooltip" className="tooltip">
            {currentMax}
          </span>
        </div>
      </div>
      <div onClick={() => toggleEditing("max")}>
        {isEditingMax ? (
          <input
            autoFocus
            type="number"
            className="input"
            value={maxValue}
            onChange={handleMaxInputChange}
            onBlur={() => toggleEditing("max")}
            onKeyDown={(e) => e.key === "Enter" && toggleEditing("max")}
          />
        ) : (
          <span className="input-label">{maxValue} €</span>
        )}
      </div>
    </div>
  );
};
