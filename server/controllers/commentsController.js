const Comment = require("../models/comment");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

// {
//   "cardId": 9,
//   "comment": {
//     "text": "This is my comment"
//   }
// }

// {
//   "_id": 3,
//   "text": "This is my comment",
//   "cardId": 9,
//   "createdAt": "2020-10-08T18:23:59.803Z",
//   "updatedAt": "2020-10-08T18:23:59.803Z"
// }

const createComment = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  let { cardId, comment } = req.body;
  if (errors.isEmpty()) {
    const addComment = async () => {
      let currentCard = await Card.findById(cardId).exec();
      let createdComment = await Comment.create({cardId, text: comment.text });
      Card.findByIdAndUpdate(cardId, { comments: currentCard.comments.concat(createdComment._id)}, { new: true }).exec();
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