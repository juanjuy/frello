import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCard, editCard } from '../features/cards/cards';
import { getComments } from '../features/comments/comments';
import { AddCommentForm } from './AddCommentForm';
import { ModalButtons } from './ModalButtons';
import { DueDateSection } from './DueDateSection';
import { Description } from './Description';
import { LabelsSection } from './LabelsSection';
import { CommentsSection } from './CommentsSection';

export const CardModal = () => {
  const cardId = useParams().id;
  const allCards = useSelector(state => state.cards);
  const allLists = useSelector(state => state.lists);
  const allComments = useSelector(state => state.comments);
  const currentCard = allCards.filter(card => card._id === cardId)[0]
  const currentList = allLists.filter(list => list._id === currentCard.listId)[0];
  const currentComments = allComments.filter(comment => comment.cardId === cardId);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [editingLabels, setEditingLabels] = useState(false);
  const [editingDueDate, setEditingDueDate] = useState(false);

  const toggleLabelPopOver = () => {
    setEditingLabels(!editingLabels);
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
                <LabelsSection labels={currentCard.labels} editingLabels={editingLabels} toggleLabelPopOver={toggleLabelPopOver} handleToggleLabel={handleToggleLabel}/>
                <DueDateSection editingDueDate={editingDueDate} toggleEditingDueDate={toggleEditingDueDate} dueDate={currentCard.dueDate} onDueDateUpdate={handleDueDateUpdate}/>
              </ul>
              <Description currentDescription={currentCard.description} onDescriptionUpdate={handleDescriptionUpdate}/>
            </li>
            <AddCommentForm cardId={cardId} />
            <CommentsSection comments={currentComments}/>
          </ul>
        </section>
        <ModalButtons toggleLabelPopOver={toggleLabelPopOver} toggleEditingDueDate={toggleEditingDueDate}/>
      </div>
    </div>
  );
}