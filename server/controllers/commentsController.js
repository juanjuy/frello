const Comment = require("../models/comment");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getComments = (req, res, next) => {
  const errors = validationResult(req);
  let cardId = req.params.id;
  if (errors.isEmpty()) {
    const fetchComments = async () => {
      let commentsList = await Comment.find({ cardId });
      res.json(commentsList)
    }
    try {
      fetchComments()
    } catch (err) {
      next(new HttpError("Fetching comments failed, please try again", 500))
    }
  }
}

const createComment = (req, res, next) => {
  const errors = validationResult(req);
  let { cardId, comment } = req.body;
  if (errors.isEmpty()) {
    const addComment = async () => {
      let currentCard = await Card.findById(cardId).exec();
      let createdComment = await Comment.create({cardId, text: comment.text });
      Card.findByIdAndUpdate(cardId, { comments: currentCard.comments.concat(createdComment._id), commentsCount: currentCard.comments.length + 1}, { new: true }).exec();
      res.status(201).json(createdComment);
    }
    try {
      addComment();
    } catch (err) {
      next(new HttpError("Creating comment failed, please try again", 500))
    };
  } else {
    return next(new HttpError("The text field is empty.", 422));
  }
};

exports.createComment = createComment;
exports.getComments = getComments;