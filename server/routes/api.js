const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const { validateBoard, validateList, validateEditedList, validateCard, validateEditedCard, validateComment } = require("../validators/validators");

router.get('/boards',boardsController.getBoards );

router.get('/boards/:id', boardsController.getBoard)

router.post('/boards', validateBoard, boardsController.createBoard);

router.post('/lists', validateList, listsController.createList);

router.put('/lists/:id', validateEditedList, listsController.editList);

router.get('/cards/:id', cardsController.getCard);

router.post('/cards', validateCard, cardsController.createCard);

router.put('/cards/:id', validateEditedCard, cardsController.editCard);

router.post(`/comments`, validateComment, commentsController.createComment);

router.get(`/cards/:id/comments`, commentsController.getComments);

module.exports = router;