
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const statisticController = require('../controllers/statisticController');

//user routes
router.get('/view', userController.getAllUsers);

router.get('/add', userController.addNewUserPage);

router.get('/stat', statisticController.getStat);

router.post('/add', userController.addNewUser);

router.get('/detail', userController.getUserById);

router.get('/edit', userController.editUserPage);

router.post('/edit/:userId', userController.editUser);

router.get('/delete/:userId', userController.deleteUser);

module.exports = router;