import React from "react";

const LabelButton = ({ color, selected, onToggleLabel }) => {
  const labelClick = () => {
    onToggleLabel(color, !selected)
  }

  return (
    <li>
      <div className={color + " colorblindable"} data-id="1" onClick={labelClick}>
        {selected && (<i className="check-icon sm-icon"></i>)}
      </div>
      <div className={"label-background " + color}></div>
      <div className="label-background-overlay"></div>
      <i className="edit-icon icon not-implemented"></i>
    </li>
  )
}

const LabelsPopover = ({ toggleLabelPopOver, labels, onToggleLabel }) => {
  const colors = ["green", "yellow", "orange", "red", "purple", "blue"];

  return (
    <div className="popover labels">
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a href="#" className="icon-sm icon-close" onClick={toggleLabelPopOver}></a>
        </header>
        <div className="content">
          <input
            className="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div className="labels-search-results">
            <ul className="label-list">
              {colors.map(color => {
                let selected = labels.includes(color);
                return (<LabelButton key={color} color={color} selected={selected} onToggleLabel={onToggleLabel}/>);
              })}
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Create a new label</li>
              <hr />
              <li className="toggleColorblind">
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;
