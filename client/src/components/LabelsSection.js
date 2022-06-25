import React from 'react';
import { Label } from './Label';
import LabelsPopover from './LabelsPopover';

export const LabelsSection = ({ labels, toggleLabelPopOver, editingLabels, handleToggleLabel }) => {
  return (<li className="labels-section">
    <h3>Labels</h3>
    {labels.map(label => {
      return (<Label key={label} color={label}/>)
    })}
    <div className="member-container" onClick={toggleLabelPopOver}>
      <i className="plus-icon sm-icon"></i>
    </div>
    {editingLabels && <LabelsPopover labels={labels} toggleLabelPopOver={toggleLabelPopOver} onToggleLabel={handleToggleLabel} />}
  </li>)
}