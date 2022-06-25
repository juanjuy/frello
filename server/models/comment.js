const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// {
//   "_id": 3,
//   "text": "This is my comment",
//   "cardId": 9,
//   "createdAt": "2020-10-08T18:23:59.803Z",
//   "updatedAt": "2020-10-08T18:23:59.803Z"
// }
const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Comment text is required']
  },
  cardId: {
    type: ObjectId,
    ref: 'Card'
  }
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;