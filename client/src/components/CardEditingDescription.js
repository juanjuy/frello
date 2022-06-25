import React, { useState } from "react";
const CardEditingDescription = ({ currentDescription, tempDescription, onDescriptionUpdate, toggleEditingDescription, setTemporaryDescription }) => {
  const [description, setDescription] = useState(tempDescription);

  const saveClick = () => {
    toggleEditingDescription();
    if (description !== currentDescription) {
      setTemporaryDescription(description);
      onDescriptionUpdate(description);
    }
  }

  const cancelClick = () => {
    setTemporaryDescription(description);
    toggleEditingDescription();
  }

  return (
    <>
      <textarea className="textarea-toggle" rows="1" autoFocus value={description} onChange={(e) => setDescription(e.target.value)}/>
      <div>
        <div className="button" value="Save" onClick={saveClick}>
          Save
        </div>
        <i className="x-icon icon" onClick={cancelClick}></i>
      </div>
    </>
  )
};

export default CardEditingDescription;
