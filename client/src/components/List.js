import React from 'react';
import { Card } from "./Card";
import { useSelector } from "react-redux";

export const List = ({ details }) => {
  const allCards = useSelector(state => state.cards);
  const currentCards = allCards.filter(card => card.listId === details._id);

  return (
    <div className="list-wrapper">
        <div className="list-background">
          <div className="list">
            <a className="more-icon sm-icon" href=""></a>
            <div>
              <p className="list-title">{details.title}</p>
            </div>
            <div className="add-dropdown add-top">
              <div className="card"></div>
              <a className="button">Add</a>
              <i className="x-icon icon"></i>
              <div className="add-options">
                <span>...</span>
              </div>
            </div>
            {currentCards.map(card => {
              return (<Card key={card._id} details={card}/>)
            })
            } 


            <div className="add-card-toggle" data-position="bottom">
              Add a card...
            </div>
          </div>
        </div>
      </div>
  )
}