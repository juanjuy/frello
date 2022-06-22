import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCard, editCard } from '../features/cards/cards';
import { Label } from './Label';
import LabelsPopover from './LabelsPopover';
import CardEditingDescription from './CardEditingDescription';
import moment from 'moment';

export const CardModal = () => {
  const cardId = useParams().id;
  const allCards = useSelector(state => state.cards);
  const allLists = useSelector(state => state.lists);
  const currentCard = allCards.filter(card => card._id === cardId)[0]
  const currentList = allLists.filter(list => list._id === currentCard.listId)[0];
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
  const [editingDescription, setEditingDescription] = useState(false);
  
  const toggleLabelPopOver = () => {
    setLabelPopOver(!labelPopOver);
  }

  const toggleEditingDescription = () => {
    setEditingDescription(!editingDescription);
  }
  
  useEffect(() => {
    if (currentCard) {
      setTitle(currentCard.title)
    }
  }, [currentCard])

  if (!currentCard) {
    dispatch(getCard(cardId));
    return null;
  }

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
                  <div id="dueDateDisplay" className="overdue completed">
                    <input
                      id="dueDateCheckbox"
                      type="checkbox"
                      className="checkbox"
                      checked=""
                    />
                    {stringDueDate} <span>{daysUntilDue < 0 ? '(past due)' : null }</span>
                  </div>
                </li>) : null}
              </ul>
              <form className="description">
                <p>Description</p>
                {editingDescription ? <CardEditingDescription currentDescription={currentCard.description} onDescriptionUpdate={handleDescriptionUpdate} toggleEditingDescription={toggleEditingDescription}/> : 
                (<><span id="description-edit" className="link" onClick={toggleEditingDescription}>
                  Edit
                </span>
                <p className="textarea-overlay">
                  {currentCard.description}
                </p></>)
                }
                {/* <p id="description-edit-options" className="hidden">
                  You have unsaved edits on this field.{" "}
                  <span className="link">View edits</span> -{" "}
                  <span className="link">Discard</span>
                </p> */}
              </form>
            </li>
            <li className="comment-section">
              <h2 className="comment-icon icon">Add Comment</h2>
              <div>
                <div className="member-container">
                  <div className="card-member">TP</div>
                </div>
                <div className="comment">
                  <label>
                    <textarea
                      required=""
                      rows="1"
                      placeholder="Write a comment..."
                    ></textarea>
                    <div>
                      <a className="light-button card-icon sm-icon"></a>
                      <a className="light-button smiley-icon sm-icon"></a>
                      <a className="light-button email-icon sm-icon"></a>
                      <a className="light-button attachment-icon sm-icon"></a>
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="button not-implemented"
                        value="Save"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </li>
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">
                <li>
                  <div className="member-container">
                    <div className="card-member">TP</div>
                  </div>
                  <h3>Taylor Peat</h3>
                  <div className="comment static-comment">
                    <span>The activities are not functional.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1" value="The activities have not been implemented yet">
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="member-container">
                    <div className="card-member small-size">VR</div>
                  </div>
                  <p>
                    <span className="member-name">Victor Reyes</span> changed the
                    background of this board <small>yesterday at 4:53 PM</small>
                  </p>
                </li>
                <li className="activity-comment">
                  <div className="member-container">
                    <div className="card-member">VR</div>
                  </div>
                  <h3>Victor Reyes</h3>
                  <div className="comment static-comment">
                    <span>Example of a comment.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1" value="Example of a comment">
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li className="date-button not-implemented">
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            <li className="archive-button">
              <i className="file-icon sm-icon "></i>Archive
            </li>
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}