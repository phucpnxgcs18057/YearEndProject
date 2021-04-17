
const express = require('express');
const router = express.Router();
const userController = require ('../controllers/userController');

//user routes
router.get('/view', userController.getAllUsers);

router.get('/add', userController.addNewUserPage);

router.post('/add', userController.addNewUser);

router.get('/client/sign-up', userController.signUpPage);

router.post('/client/sign-up', userController.signUp);

router.get('/detail/:userId', userController.getUserById);

router.get('/detail/client/:userId', userController.getUserByIdClient);

router.get('/edit/client', userController.editUserClientPage);

router.post('/edit/client/:userId', userController.editUserClient);

router.get('/edit', userController.editUserPage);

router.post('/edit/:userId', userController.editUser);

router.post('/delete/:userId', userController.deleteUser);

router.post('/client/login', userController.loginClient);

router.post('/login', userController.login);

router.put('/client/change-password', userController.changePassword);

module.exports = router;