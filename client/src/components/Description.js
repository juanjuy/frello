import React, { useState } from 'react';
import CardEditingDescription from './CardEditingDescription';

export const Description = ({ currentDescription, onDescriptionUpdate }) => {
  const [editingDescription, setEditingDescription] = useState(false);
  const [temporaryDescription, setTemporaryDescription] = useState(currentDescription);

  const toggleEditingDescription = () => {
    setEditingDescription(!editingDescription);
  }

  return (
    <form className="description">
      <p>Description</p>
      {editingDescription ? <CardEditingDescription currentDescription={currentDescription} tempDescription={temporaryDescription} setTemporaryDescription={setTemporaryDescription} onDescriptionUpdate={onDescriptionUpdate} toggleEditingDescription={toggleEditingDescription}/> : 
      (<><span id="description-edit" className="link" onClick={toggleEditingDescription}>
        Edit
      </span>
      <p className="textarea-overlay">
        {currentDescription}
      </p>
      <p id="description-edit-options" className={temporaryDescription !== currentDescription ? "" : "hidden"}>
        You have unsaved edits on this field.{" "}
        <span className="link" onClick={toggleEditingDescription}>View edits</span> -{" "}
        <span className="link" onClick={() => setTemporaryDescription(currentDescription)}>Discard</span>
      </p></>)
      }
    </form>
  )
}