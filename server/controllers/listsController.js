const Board = require("../models/board");
const List = require("../models/list")
const { validationResult } = require("express-validator");
const HttpError = require("../models/httpError");

// when you create a list
// add list to the board collection - put request for that one board
// add list to the list collection - put request for the lists
const createList = (req, res, next) => {
  const errors = validationResult(req);
  console.log("REQ", req.body)
  console.log(errors);
  let {boardId, list} = req.body;
  if (errors.isEmpty()) {
    List.create({boardId, cards: [], position: 65535, ...list})
      .then((list) => {
        res.json({
          title: list.title,
          _id: list._id,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt,
          boardId: list.boardId,
          position: list.position
        });
        return Board.findById(list.boardId)
        // board is not properly concatenating the new list. 
        // could it be that the 'list' variable is not in scope at this point?
      }).then((board) => {
        return Board.findByIdAndUpdate(list.boardId, { // is list in scope here? how do we access the new list?
          lists: board.lists.concat(list._id)
        }, { new: true })
      }).catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createList = createList;