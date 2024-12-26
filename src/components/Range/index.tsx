import React from "react";
import { EditableLabel } from "./components/EditableLabel";
import Slider from "./components/Slider";
import { useRange } from "./hooks/useRange";
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
  const {
    minValue,
    isEditingMax,
    isEditingMin,
    toggleEditing,
    currentMax,
    currentMin,
    maxValue,
    percentMax,
    percentMin,
    startDrag,
    handleMinInputChange,
    handleMaxInputChange,
  } = useRange({ min, max, mode, values });

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="container">
      <EditableLabel
        value={minValue}
        isEditing={isEditingMin}
        onChange={handleMinInputChange}
        onToggleEdit={() => toggleEditing("min")}
      />

      <Slider
        startDrag={startDrag}
        currentMax={currentMax}
        currentMin={currentMin}
        percentMin={percentMin}
        percentMax={percentMax}
      />

      <EditableLabel
        value={maxValue}
        isEditing={isEditingMax}
        onChange={handleMaxInputChange}
        onToggleEdit={() => toggleEditing("max")}
      />
    </div>
  );
};
