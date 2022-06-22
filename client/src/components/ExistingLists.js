import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { List } from "./List"
import { AddListButton } from "./AddListButton";

export const ExistingLists = ({ boardId }) => {
  const [activeListId, setActiveListId] = useState('');

  const allLists = useSelector((state) => state.lists)
  const currentLists = allLists.filter(list => {
    return list.boardId === boardId
  })

  return (
    <div id="list-container" className="list-container">
    <div id="existing-lists" className="existing-lists">
      {currentLists.map(list => {
        return (
          <List key={list._id} details={list} activeListId={activeListId} setActiveListId={setActiveListId} />
        )
      })}
    </div>
    <AddListButton />
    </div>
  )
}  