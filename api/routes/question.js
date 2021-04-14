const express = require('express');
const router = express.Router();
const questionController = require ('../controllers/questionController');

//question routes
router.get('/view', questionController.getAllQuestion);

router.get('/view/client', questionController.getAllQuestionClient);

router.post('/add', questionController.addNewQuestion);

router.post('/add/client', questionController.addNewQuestionClient);

router.get('/detail/:questionId', questionController.getQuestionById);

router.get('/detail/client/:questionId', questionController.getQuestionByIdClient);

router.put('/edit/:questionId', questionController.editQuestion);

router.put('/edit/client/:questionId', questionController.getQuestionByIdClient);

router.delete('/delete/:questionId', questionController.deleteQuestion);

router.delete('/delete/client/:questionId', questionController.deleteQuestionClient);

module.exports = router