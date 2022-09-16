import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const Card = ({ details }) => {
  let dueDate = moment(new Date(details.dueDate));
  let stringDueDate = dueDate.format('MMM D');

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
            {details.dueDate ? 
            (<i className="clock-icon sm-icon overdue-recent completed">
              {stringDueDate}
            </i>) : null }
            {details.description && (<i className="description-icon sm-icon"></i>)}
            {details.commentsCount > 0 && (<i className="comment-icon sm-icon"></i>)}
          </div>
        </div>
      </div>
    </div>
    </Link>
  </div>
  )
}