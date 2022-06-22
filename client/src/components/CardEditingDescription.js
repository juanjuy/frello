import React, { useState } from "react";
const CardEditingDescription = ({ currentDescription, onDescriptionUpdate, toggleEditingDescription }) => {
  const [description, setDescription] = useState(currentDescription);

  const saveClick = () => {
    toggleEditingDescription();
    onDescriptionUpdate(description);
  }

  const cancelClick = () => {
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
