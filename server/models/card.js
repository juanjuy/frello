const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: String,
  labels: [String],
  dueDate: Date,
  completed: Boolean,
  archived: Boolean,
  listId: {
    type: ObjectId,
    ref: 'List'
  },
  boardId: {
    type: ObjectId,
    ref: 'Board'
  },
  position: Number,
  comments: [{ type: ObjectId, ref: 'Comment' }],
  commentsCount: Number,
  actions: [String]
}, {timestamps: true})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;