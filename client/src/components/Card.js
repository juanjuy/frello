import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({ details }) => {
  return (
    <div>
      <Link to={"/cards/" + details._id}>
      <div id="cards-container" data-id="list-1-cards" >
      <div className="card-background">
        <div className="card">
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
    </div>
    </Link>
  </div>
  )
}