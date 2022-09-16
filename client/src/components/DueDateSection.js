import React from 'react';
import moment from 'moment';
import DueDatePopover from './DueDatePopover';

export const DueDateSection = ({ dueDate, toggleEditingDueDate, editingDueDate, onDueDateUpdate }) => {
  let momentDate;
  let stringDueDate;
  let daysUntilDue;
  
  if (dueDate) {    
    momentDate = moment(new Date(dueDate));
    stringDueDate = momentDate.format('lll');
    daysUntilDue = momentDate.diff(moment(), 'days', true);
  }

  return (
    <>
    {!!dueDate && (<li className="due-date-section">
    <h3>Due Date</h3>
    <div id="dueDateDisplay" className="overdue completed" onClick={toggleEditingDueDate}>
      <input
        id="dueDateCheckbox"
        type="checkbox"
        className="checkbox"
        checked=""
      />
      {stringDueDate} <span>{daysUntilDue < 0 && '(past due)'}</span>
    </div>
  </li>)}
  {editingDueDate && (<DueDatePopover toggleEditingDueDate={toggleEditingDueDate} currentDueDate={dueDate || new Date()} onDueDateUpdate={onDueDateUpdate} />)}
  </>)
}