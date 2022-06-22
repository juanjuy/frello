import React, { useState } from 'react';
import { Card } from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { editList } from '../features/lists/lists';
import { createCard } from "../features/cards/cards";

export const List = ({ details, activeListId, setActiveListId }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(details.title);
  const [newCardTitle, setNewCardTitle] = useState("");
  // const [creatingCard, setCreatingCard] = useState(false);
  const creatingCard = activeListId === details._id;
  // check if active list id is equal to current list id; if so, it is active

  const allCards = useSelector(state => state.cards);
  const currentCards = allCards.filter(card => card.listId === details._id);

  const handleAddCard = (e) => {
    e.stopPropagation();
    if (newCardTitle.length !== 0) {
      dispatch(createCard({listId: details._id, card: { title: newCardTitle }, callback: closeCreateCard})) 
    } else {
      alert("Title must contain at least one character")
    }
  }

  const openCreateCard = () => {
    setActiveListId(details._id);
  }

  const closeCreateCard = () => {
    setActiveListId("");
    setNewCardTitle("");
  }

  // const toggleCreating = () => {
  //   // setCreatingCard(!creatingCard);
  //   setNewCardTitle("");
  // }

  const toggleEdit = () => {
    setEditing(!editing);
  }

  const handleEditSubmit = () => {
    if (title.length !== 0) {
      if (title !== details.title) {
        dispatch(editList({ fields: { title }, id: details._id, callback: toggleEdit }))
      }
    } else {
      alert("Title must contain at least one character");
      setTitle(details.title);
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    }
  }

  return (
    <div className={ creatingCard ? "list-wrapper add-dropdown-active" : "list-wrapper" }>
        <div className="list-background">
          <div className="list">
            <a className="more-icon sm-icon" href=""></a>
            <div>
              {editing ?
              (<input className="list-title" type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onBlur={handleEditSubmit} onKeyPress={handleEnter} />) :
              (<p className="list-title" onClick={toggleEdit}>{details.title}</p>)
              }
            </div>
            {currentCards.map(card => {
              return (<Card key={card._id} details={card}/>)
            })
            }
          {creatingCard ? (<div className="add-dropdown add-bottom active-card">
            <div className="card">
              <div className="card-info"></div>
              <textarea autoFocus name="add-card" value={newCardTitle} onChange={(e)=> setNewCardTitle(e.target.value)}></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCard}>Add</a>
            <i className="x-icon icon" onClick={closeCreateCard}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>) : null}

          <div className="add-card-toggle" data-position="bottom" onClick={openCreateCard}>
            Add a card...
          </div>
          </div>
        </div>
      </div>
  )
}