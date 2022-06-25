import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../features/lists/lists';
import { useParams } from 'react-router'

export const AddListButton = () => {
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const boardId = useParams().id;

  const handleSubmit = (e) => {
    e.stopPropagation();
    dispatch(addList({ boardId, list: { title } }));
    setCreating(false);
  }

  const toggleCreating = (e) => {
    e.stopPropagation();
    setCreating(false);
  }
  return (
    <div id="new-list" className={creating ? 'new-list selected' : 'new-list'} onClick={() => setCreating(true)} >
    <span>Add a list...</span>
      <input type="text" placeholder="Add a list..." value={title} onChange={(e)=> setTitle(e.target.value)} />
      <div>
        <input type="submit" className="button" value="Save" onClick={handleSubmit} />
        <i className="x-icon icon" onClick={toggleCreating}></i>
      </div>
    </div>    
  )
}