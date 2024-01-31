import InputBox from "component/InputBox/InputBox";
import InputTextArea from "component/InputTextArea/InputTextArea";
import React, { useState } from "react";

interface EditableTextProps {
  label: string;
  variant?: "default" | "secondary";
  className?: string;
  onSave: (newText: string) => void;
}

const EditableText: React.FC<EditableTextProps> = (props: EditableTextProps) => {
  const { variant, label, className, onSave } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(label);

  const handleClick = () => {
    setEditedText(label);
    setIsEditing(true);
  };

  const handleChange = (e: any) => {
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onSave(editedText || label);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditedText(label);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onSave(editedText || label);
    if (editedText === "") {
      setEditedText(label);
    }
  };

  const renderRequiredInput = () => {
    return variant === "secondary" ? (
      <InputTextArea
        value={editedText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoFocus
        hideLabel
        hideErrorRow
      />
    ) : (
      <InputBox
        value={editedText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoFocus
        hideLabel
        hideErrorRow
      />
    );
  };

  return (
    <div className={className} onClick={handleClick}>
      {isEditing || editedText === "" ? (
        renderRequiredInput()
      ) : (
        <span className="hover:underline">{label ?? "Project Name"}</span>
      )}
    </div>
  );
};

export default EditableText;
