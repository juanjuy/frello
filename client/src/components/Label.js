import React from 'react';

export const Label = ({ color }) => {
  return (
    <div className="member-container">
      <div className={color + " label colorblindable"}></div>
    </div>
  )
}