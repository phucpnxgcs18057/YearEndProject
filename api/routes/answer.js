const express = require('express');
const router = express.Router();
const answerController = require ('../controllers/answerController');

//question routes
router.get('/view', answerController.getAllAnswer);

router.get('/view/client', answerController.getAllAnswerClient);

router.post('/add', answerController.addNewAnswerClient);

router.post('/add/client', answerController.addNewAnswerClient);

router.get('/detail/:questionId', answerController.getAnswerById);

router.get('/detail/client/:questionId', answerController.getAnswerByIdClient);

router.put('/edit/:questionId', answerController.editAnswer);

router.put('/edit/client/:questionId', answerController.editAnswerClient);

router.delete('/delete/:questionId', answerController.deleteAnswer);

router.delete('/delete/client/:questionId', answerController.deleteAnswerClient);

module.exports = router