import React from "react";
import {useParams} from "react-router" 
import { useSelector } from 'react-redux';
import { List } from "./List"
import { AddListButton } from "./AddListButton";

export const ExistingLists = () => {
  const id = useParams().id
  const allLists = useSelector((state) => state.lists)
  const currentLists = allLists.filter(list => {
    return list.boardId === id
  })
  return (
    <div id="list-container" className="list-container">
    <div id="existing-lists" className="existing-lists">
      {currentLists.map(list => {
        return (
          <List key={list._id} details={list} />
        )
      })}
    </div>
    <AddListButton />
    </div>
  )
}  