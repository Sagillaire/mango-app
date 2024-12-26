import React from "react";

interface EditableLabelProps {
  value: number;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleEdit: () => void;
}

export const EditableLabel: React.FC<EditableLabelProps> = ({
  value,
  isEditing,
  onChange,
  onToggleEdit,
}) => {
  return (
    <div onClick={onToggleEdit}>
      {isEditing ? (
        <input
          autoFocus
          type="number"
          value={value}
          className="input"
          onChange={onChange}
          onBlur={onToggleEdit}
          onKeyDown={(e) => e.key === "Enter" && onToggleEdit()}
        />
      ) : (
        <span className="input-label">{value} €</span>
      )}
    </div>
  );
};
