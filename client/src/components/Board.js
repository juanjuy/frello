import React, { useEffect } from "react";
import {useParams} from "react-router" 
import { fetchSingleBoard } from "../features/boards/boards"
import { useDispatch, useSelector } from 'react-redux';
import { ExistingLists } from "./ExistingLists";

const Board = () => {
  const path = useParams()["0"];
  let id = useParams().id;
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards)
  const boards = useSelector((state) => state.boards)
  let currentCard;
  let boardId;
  if (path === "boards") {
    boardId = id;
  } else if (path === "cards") {
    currentCard = cards.filter(card => card._id === id)[0]
    if (currentCard) {
      boardId = currentCard.boardId;
    }
  }
  const activeBoard = boards.filter(board => board._id === boardId)[0];

  useEffect(() => {
    // if boardid
    if (boardId) {
      dispatch(fetchSingleBoard(boardId));
    }
    // else do nothing
  }, [dispatch, boardId])

  if (!activeBoard) return null;

  return (
    <>
      <header>
      <ul>
        <li id="title">{activeBoard.title}</li>
        <li className="star-icon icon"></li>
        <li className="private private-icon icon">Private</li>
      </ul>
      <div className="menu">
        <i className="more-icon sm-icon"></i>Show Menu
      </div>
      <div className="subscribed">
        <i className="sub-icon sm-icon"></i>Subscribed
      </div>
    </header>
    <main>
      <ExistingLists boardId={boardId}/>
    </main>
    <div className="menu-sidebar">
      <div id="menu-main" className="main slide">
        <i className="back-icon icon"></i>
        <i className="x-icon icon"></i>
        <h1>Menu</h1>
        <div className="menu-contents">
          <div className="members">
            <div className="member-container">
              <div className="card-member ">VR</div>
            </div>
            <div className="member-container">
              <div className="card-member admin">TP</div>
            </div>
            <div className="member-container">
              <div className="card-member ">KW</div>
            </div>
          </div>
          <div className="add-members">
            <i className="add-icon sm-icon"></i>Add Members...
          </div>
          <hr />
          <ul className="menu-list">
            <li className="background-item">Change Background</li>
            <li className="filter-icon menu-icon">Filter Cards</li>
            <li className="power-icon menu-icon not-implemented">Power-Ups</li>
            <li className="stickers-icon menu-icon not-implemented">Stickers</li>
            <li className="more-icon menu-icon">More</li>
            <hr />
            <li className="activity-icon menu-icon not-implemented">Activity</li>
          </ul>
          <ul className="activity-list">
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>yesterday at 4:53 PM</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> sent{" "}
                <span className="link">
                  Use the + in the top menu to make your first board now.
                </span>{" "}
                to the board <small>4 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> archived{" "}
                <span className="link">
                  Use the + in the top menu to make your first board now.
                </span>{" "}
                <small>4 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>5 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>6 hours ago</small>
              </p>
            </li>
            <li>
              <i className="member-icon"></i>
              <p>
                <span className="member-name">Taylor Peat</span> changed the
                background of this board <small>yesterday at 10:23 PM</small>
              </p>
            </li>
          </ul>
          <a className="all-activity not-implemented">View all activity...</a>
        </div>
      </div>
    </div>
    <div id="modal-container"></div>
    <div id="dropdown-container"></div>
    </>
  )
};

export default Board;
