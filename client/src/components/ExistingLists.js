import React from "react";
import {useParams} from "react-router" 
import { useSelector } from 'react-redux';
import { List } from "./List"

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
    
    <div id="new-list" className="new-list">
      <span>Add a list...</span>
      <input type="text" placeholder="Add a list..." />
      <div>
        <input type="submit" className="button" value="Save" />
        <i className="x-icon icon"></i>
      </div>
    </div>

    </div>
  )
}  