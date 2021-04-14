
const express = require('express');
const router = express.Router();
const userTypeController = require('../controllers/userTypeController');

//type routes
router.get('/view', userTypeController.getAllTypes);

module.exports = router;