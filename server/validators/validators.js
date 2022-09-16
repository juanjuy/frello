const {check, oneOf } = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];
exports.validateList = [check("list.title").not().isEmpty()];
exports.validateEditedList = oneOf([check("title").not().isEmpty(), check("position").exists()])
exports.validateCard = [check("card.title").not().isEmpty()];
exports.validateEditedCard = oneOf([
  check("title").not().isEmpty(), 
  check("listId").exists(),
  check("position").exists(), 
  check("description").exists(), 
  check("archived").exists(),
  check("dueDate").exists(),
  check("completed").exists(),
  check("labels").exists()
])
exports.validateComment = [check("comment.text").not().isEmpty()];