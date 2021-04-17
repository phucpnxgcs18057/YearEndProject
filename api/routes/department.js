const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

//department routes
router.get('/view', departmentController.getAllDepartment);

router.get('/view/client', departmentController.getAllDepartmentClient);

router.get('/add', departmentController.addNewDepartmentPage)

router.post('/add', departmentController.addNewDepartment);

router.get('/detail', departmentController.getDepartmentById);

router.get('/detail/client', departmentController.getDepartmentByIdClient);

router.get('/edit', departmentController.editDepartmentPage);

router.put('/edit/:departmentId', departmentController.editDepartment);

router.get('/delete/:departmentId', departmentController.deleteDepartment);

module.exports = router;