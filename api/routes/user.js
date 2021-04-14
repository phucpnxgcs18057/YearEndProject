
const express = require('express');
const router = express.Router();
const userController = require ('../controllers/userController');

//user routes
router.get('/view', userController.getAllUsers);

router.post('/add', userController.addNewUser);

router.post('/client/sign-up', userController.signUp);

router.get('/detail/:userId', userController.getUserById);

router.get('/detail/client/:userId', userController.getUserByIdClient);

router.put('/edit/client/:userId', userController.editUserClient);

router.put('/edit/:userId', userController.editUser);

router.delete('/delete/:userId', userController.deleteUser);

router.post('/client/login', userController.loginClient);

router.post('/login', userController.login);

router.put('/client/change-password', userController.changePassword);

module.exports = router;