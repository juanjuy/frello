const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: 'string',
  labels: [{ type: 'string' }],
  dueDate: 'date',
  completed: 'boolean',
  archived: 'boolean',
  listId: {
    type: ObjectId,
    ref: 'List'
  },
  boardId: {
    type: ObjectId,
    ref: 'Board'
  },
  position: 'double',
  comments: [{ type: 'string'}], //might need to change based on comment format
  commentsCount: 'int64',
  actions: [{type: string}]
}, {timestamps: true})

const Card = mongoose.model('Card', ListSchema);

module.exports = Card;