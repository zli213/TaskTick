import { useState } from "react";

const EditableInput = ({initialValue, onSave}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(initialValue);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onSave(editedValue);
    };

    const handleChange = (e) => {
        setEditedValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <div>
            {isEditing?(
                <input
                type="text"
                value={editedValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                />
            ) : (
                <span onDoubleClick={handleDoubleClick}>{initialValue}</span>
            )}
        </div>
    );
};

export default EditableInput;