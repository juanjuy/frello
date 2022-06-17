import React, { useState } from 'react';
import { Card } from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { editList } from '../features/lists/lists';

export const List = ({ details }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(details.title);

  const allCards = useSelector(state => state.cards);
  const currentCards = allCards.filter(card => card.listId === details._id);

  const toggleEdit = () => {
    setEditing(!editing);
  }

  const handleEditSubmit = () => {
    if (title !== details.title) {
      dispatch(editList({ fields: { title }, id: details._id }))
      toggleEdit();
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    }
  }

  return (
    <div className="list-wrapper">
        <div className="list-background">
          <div className="list">
            <a className="more-icon sm-icon" href=""></a>
            <div>
              {editing ?
              (<input className="list-title" type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onBlur={handleEditSubmit} onKeyPress={handleEnter} />) :
              (<p className="list-title" onClick={toggleEdit}>{details.title}</p>)
              }
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