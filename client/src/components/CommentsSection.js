import React from 'react';
import { Comment } from './Comment';

export const CommentsSection = ({ comments }) => {
  return (
    <li className="activity-section">
    <h2 className="activity-icon icon">Activity</h2>
    <ul className="horiz-list">
      <li className="not-implemented">Show Details</li>
    </ul>
    <ul className="modal-activity-list">
      {comments.map(comment => {
        return (<Comment key={comment._id} details={comment} />)
      })}
    </ul>
  </li>
  )
}