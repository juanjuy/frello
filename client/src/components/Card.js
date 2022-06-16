import React from 'react';

export const Card = ({ details }) => {
  return (
    <div>
      <div id="cards-container" data-id="list-1-cards">
      <div className="card-background">
        <div className="card ">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {details.labels.map(label => {
              let className = `card-label ${label} colorblindable`
              return (
                <div key={label} className={className}></div>
              )
            })}
            <p>
              {details.title}
            </p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
              Aug 4
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </div>
    </div>lkjalk
    <div className="add-dropdown add-bottom">
      <div className="card">
        <div className="card-info"></div>
        <textarea name="add-card"></textarea>
        <div className="members"></div>
      </div>
      <a className="button">Add</a>
      <i className="x-icon icon"></i>
      <div className="add-options">
        <span>...</span>
      </div>
    </div>
  </div>
  )
}