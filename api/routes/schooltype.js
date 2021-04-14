const express = require('express');
const router = express.Router();
const schoolTypeController = require('../controllers/schoolTypeController');

//type routes
router.get('/view', schoolTypeController.getAllSchoolTypes);

module.exports = router;