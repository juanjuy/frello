const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  // find board in mongo based on given id
  Card.findById(req.params.id).then((card) => {
    if (card === null) {
      return res.send("Card with that ID doesn't exist")
    }
    res.json(card);
  })
}

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  let {listId, card} = req.body;
  if (errors.isEmpty()) {
    const addCard = async () => {
      let currentList = await List.findById(listId).exec();
      let createdCard = await Card.create({listId, boardId: currentList.boardId, commentsCount: 0, position: 65535, ...card});
      List.findByIdAndUpdate(listId, { cards: currentList.cards.concat(createdCard._id)}, { new: true }).exec();
      res.status(201).json(createdCard);
    }
    try {
      addCard();
    } catch (err) {
      next(new HttpError("Creating card failed, please try again", 500))
    };
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const editCard = (req, res, next) => {
  const errors = validationResult(req);
  let editedCard = req.body;
  let cardId = req.params.id;
  if (errors.isEmpty()) {
    try {
      const updateCard = async () => {
        let updatedCard = await Card.findByIdAndUpdate(cardId, editedCard, { new: true }).exec();
        res.status(200).json(updatedCard)
      }
      updateCard();
    } catch (err) {
      next(new HttpError("Updating card failed, please try again", 500));
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}
exports.getCard = getCard;
exports.createCard = createCard;
exports.editCard = editCard;