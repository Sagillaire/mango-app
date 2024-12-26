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
  const [isUserInput, setIsUserInput] = useState<boolean>(false); // Estado para detectar input del usuario
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

    // Evitar que el efecto sobrescriba valores si ya fueron modificados por el usuario
    if (isUserInput) return; // Solo actualizar si no es input del usuario

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
      setIsUserInput(true); // Indicamos que el usuario está cambiando el valor
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value); // Puedes ajustar este límite según necesites
    if (newMax > minValue) {
      setMaxValue(newMax);
      setCurrentMax(newMax);
      setIsUserInput(true); // Indicamos que el usuario está cambiando el valor
    }
  };

  const handlepress = (type: "min" | "max") =>
    type === "min" ? setIsEditingMin(false) : setIsEditingMax(false);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="container">
      <div onClick={() => setIsEditingMin(!isEditingMin)}>
        {isEditingMin ? (
          <input
            autoFocus
            type="number"
            value={minValue}
            className="input"
            onChange={handleMinInputChange}
            onBlur={() => handlepress("min")}
            onKeyDown={(e) => e.key === "Enter" && handlepress("min")}
          />
        ) : (
          <span className="input-label">{minValue} €</span>
        )}
      </div>
      <div className="slider-container">
        <div className="slider-track"></div>
        <div
          className="slider-range"
          style={{
            left: `${percentMin}%`,
            width: `${percentMax - percentMin}%`,
          }}
        ></div>
        <div
          className="slider-thumb"
          style={{ left: `${percentMin}%` }}
          onMouseDown={() => startDrag(true)}
        >
          <span className="tooltip">{currentMin}</span>
        </div>
        <div
          className="slider-thumb"
          style={{ left: `${percentMax}%` }}
          onMouseDown={() => startDrag(false)}
        >
          <span className="tooltip">{currentMax}</span>
        </div>
      </div>
      <div onClick={() => setIsEditingMax(!isEditingMax)}>
        {isEditingMax ? (
          <input
            autoFocus
            type="number"
            className="input"
            value={maxValue}
            onChange={handleMaxInputChange}
            onBlur={() => handlepress("max")}
            onKeyDown={(e) => e.key === "Enter" && handlepress("max")}
          />
        ) : (
          <span className="input-label">{maxValue} €</span>
        )}
      </div>
      {/* <span className="input-label">{maxValue} €</span> */}
      {/* <div className="inputs">
        <input
          type="number"
          onKeyDown={(e) => e.key === "Enter" && handlepress()}
          onBlur={() => handlepress()}
          value={maxValue || 0}
          onChange={handleMaxInputChange}
        />
      </div> */}
    </div>
  );
};
