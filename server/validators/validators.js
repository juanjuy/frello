const {check, oneOf } = require('express-validator');

exports.validateBoard = [check("board.title").not().isEmpty()];
exports.validateList = [check("list.title").not().isEmpty()];
exports.validateEditedList = oneOf([check("title").not().isEmpty(), check("position").exists()])
exports.validateCard = [check("card.title").not().isEmpty()];