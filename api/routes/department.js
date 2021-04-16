const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

//department routes
router.get('/view', departmentController.getAllDepartment);

router.get('/view/client', departmentController.getAllDepartmentClient);

router.get('/add', departmentController.addNewDepartmentPage)

router.post('/add', departmentController.addNewDepartment);

router.get('/detail/:departmentId', departmentController.getDepartmentById);

router.get('/detail/client/:departmentId', departmentController.getDepartmentByIdClient);

router.get('/edit/:departmentId', departmentController.editDepartmentPage);

router.post('/edit/:departmentId', departmentController.editDepartment);

router.delete('/:departmentId', departmentController.deleteDepartment);

module.exports = router;