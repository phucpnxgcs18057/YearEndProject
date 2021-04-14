const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

//course routes
router.get('/view', courseController.getAllCourse);

router.get('/view/client', courseController.getAllCourseClient);

router.post('/add', courseController.addNewCourse);

router.get('detail/:courseId', courseController.getCourseById);

router.get('/detail/client/:courseId', courseController.getCourseByIdClient);

router.put('/edit/:courseId', courseController.editCourse);

router.delete('/delete/:courseId', courseController.deleteCourse);

module.exports = router;