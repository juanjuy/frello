import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCard, editCard } from '../features/cards/cards';
import { getComments } from '../features/comments/comments';
import { Label } from './Label';
import { Comment } from './Comment';
import { AddCommentForm } from './AddCommentForm';
import { ModalButtons } from './ModalButtons';
import LabelsPopover from './LabelsPopover';
import DueDatePopover from './DueDatePopover';
import { Description } from './Description';
import moment from 'moment';

export const CardModal = () => {
  const cardId = useParams().id;
  const allCards = useSelector(state => state.cards);
  const allLists = useSelector(state => state.lists);
  const allComments = useSelector(state => state.comments);
  const currentCard = allCards.filter(card => card._id === cardId)[0]
  const currentList = allLists.filter(list => list._id === currentCard.listId)[0];
  const currentComments = allComments.filter(comment => comment.cardId === cardId);
  const dispatch = useDispatch();

  let dueDate = null;
  let stringDueDate;
  let daysUntilDue;
  if (currentCard && currentCard.dueDate) {
    dueDate = moment(new Date(currentCard.dueDate));
    stringDueDate = dueDate.format('lll');
    daysUntilDue = dueDate.diff(moment(), 'days', true);
  }

  const [title, setTitle] = useState("");
  const [labelPopOver, setLabelPopOver] = useState(false);
  const [editingDueDate, setEditingDueDate] = useState(false);

  const toggleLabelPopOver = () => {
    setLabelPopOver(!labelPopOver);
  }

  const toggleEditingDueDate = () => {
    setEditingDueDate(!editingDueDate);
  }

  useEffect(() => {
    if (currentCard) {
      setTitle(currentCard.title)
    }
  }, [currentCard])

  useEffect(() => {
    dispatch(getComments(cardId))
  }, [dispatch, cardId])

  const submitEdit = (fields) => {
    dispatch(editCard({ id: cardId, ...fields }))
  }

  const handleDescriptionUpdate = (updatedDescription) => {
    submitEdit({ description: updatedDescription });
  }

  const handleToggleLabel = (color, selected) => {
    let updatedLabels;
    if (selected) {
      updatedLabels = currentCard.labels.concat(color);
    } else {
      updatedLabels = currentCard.labels.filter(label => label !== color);
    }
    submitEdit({ labels: updatedLabels })
  }

  const enterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  }

  const titleBlur = () => {
    if (title !== currentCard.title) {
      submitEdit({ title });
    }
  }

  const handleDueDateUpdate = (date) => {
    submitEdit({ dueDate: date })
    toggleEditingDueDate();
  }

  if (!currentCard) {
    dispatch(getCard(cardId));
    return null;
  }

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={"/boards/" + currentCard.boardId}>
        <i className="x-icon icon close-modal"></i>
        </Link>
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }} value={title} onChange={(e) => setTitle(e.target.value)} onKeyPress={enterPress} onBlur={titleBlur}>
          </textarea>
          {currentList && (<p>
            in list <a className="link">{currentList.title}</a>
            <i className="sub-icon sm-icon"></i>
          </p>)}
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                  <li className="labels-section">
                    <h3>Labels</h3>
                    {currentCard.labels.map(label => {
                      return (<Label key={label} color={label}/>)
                    })}
                    <div className="member-container" onClick={toggleLabelPopOver}>
                      <i className="plus-icon sm-icon"></i>
                    </div>
                    {labelPopOver && <LabelsPopover labels={currentCard.labels} toggleLabelPopOver={toggleLabelPopOver} onToggleLabel={handleToggleLabel} />}
                  </li>
                {currentCard.dueDate ? (<li className="due-date-section">
                  <h3>Due Date</h3>
                  <div id="dueDateDisplay" className="overdue completed" onClick={toggleEditingDueDate}>
                    <input
                      id="dueDateCheckbox"
                      type="checkbox"
                      className="checkbox"
                      checked=""
                    />
                    {stringDueDate} <span>{daysUntilDue < 0 ? '(past due)' : null }</span>
                  </div>
                </li>) : null}
                {editingDueDate && (<DueDatePopover toggleEditingDueDate={toggleEditingDueDate} currentDueDate={currentCard.dueDate || new Date()} onDueDateUpdate={handleDueDateUpdate} />)}
              </ul>
              <Description currentDescription={currentCard.description} onDescriptionUpdate={handleDescriptionUpdate}/>
            </li>
            <AddCommentForm cardId={cardId} />
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">
                {currentComments.map(comment => {
                  return (<Comment key={comment._id} details={comment} />)
                })}
              </ul>
            </li>
          </ul>
        </section>
        <ModalButtons toggleLabelPopOver={toggleLabelPopOver} toggleEditingDueDate={toggleEditingDueDate}/>
      </div>
    </div>
  );
}