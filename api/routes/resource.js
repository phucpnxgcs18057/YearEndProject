const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

//resource routes
router.get('/view', resourceController.getAllResources);

router.get('/add', resourceController.addNewResourcePage);

router.post('/add', resourceController.addNewResource);

router.get('/detail', resourceController.getResourceById);

router.get('/edit', resourceController.editResourcePage);

router.post('/edit/:resourceId', resourceController.editResource);

router.get('/delete/:resourceId', resourceController.deleteResource);

module.exports = router;