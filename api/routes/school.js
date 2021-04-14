
const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

//School routes
router.get('/view', schoolController.getAllSchool);

router.get('/view/client', schoolController.getAllSchoolClient);

router.post('/add', schoolController.addNewSchool);

router.get('/detail/client/:schoolId', schoolController.getSchoolByIdClient);

router.get('/detail/:schoolId', schoolController.getSchoolById);

router.put('/edit/:schoolId', schoolController.editSchool);

router.delete('/delete/:schoolId', schoolController.deleteSchool);

module.exports = router;