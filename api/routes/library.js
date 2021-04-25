const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const resourceController = require('../controllers/resourceController');

//library routes
router.get('/view', libraryController.getLibrary);

router.get("/add-to-library", resourceController.saveResource);

router.get("/remove-from-library", resourceController.deleteResourceLibrary);

module.exports = router;