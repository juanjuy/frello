const Board = require("../models/board");
const List = require("../models/list")
const { validationResult } = require("express-validator");
const HttpError = require("../models/httpError");

// when you create a list
// add list to the board collection - put request for that one board
// add list to the list collection - put request for the lists
const createList = (req, res, next) => {
  const errors = validationResult(req);
  let {boardId, list} = req.body;
  if (errors.isEmpty()) {
    const addList = async () => {
      let createdList = await List.create({boardId, cards: [], position: 65535, ...list});
      let boardToBeUpdated = await Board.findById(createdList.boardId).exec();
      Board.findByIdAndUpdate(boardToBeUpdated._id, { lists: boardToBeUpdated.lists.concat(createdList._id)}, { new: true }).exec();
      res.status(201).json({
        title: createdList.title,
        _id: createdList._id,
        createdAt: createdList.createdAt,
        updatedAt: createdList.updatedAt,
        boardId: createdList.boardId,
        position: createdList.position
      });
    }
    try {
      addList();
    } catch (err) {
      next(new HttpError("Creating list failed, please try again", 500))
    };
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const editList = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  let editedList = req.body;
  let listId = req.params.id;
  if (errors.isEmpty()) {
    try {
      const updateList = async () => {
        let updatedList = await List.findByIdAndUpdate(listId, editedList, { new: true }).exec();
        res.status(200).json({
          title: updatedList.title,
          _id: updatedList._id,
          createdAt: updatedList.createdAt,
          updatedAt: updatedList.updatedAt,
          boardId: updatedList.boardId,
          position: updatedList.position
        })
      }
      updateList();
    } catch (err) {
      next(new HttpError("Updating list failed, please try again", 500));
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

exports.createList = createList;
exports.editList = editList;