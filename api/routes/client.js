const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const userTypeController = require('../controllers/userTypeController');
const departmentController = require('../controllers/departmentController');
const resourceController = require('../controllers/resourceController');
const loginChecker = require('../other/loginCheck');
const Resource = require('../models/resource');
const Department = require('../models/department');

//client routes
router.get('/signup', userController.signUpPage);

router.post('/signup', userController.signUp);

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: "/library/view"
}),
    function (req, res) {
        console.log(req.user);
        res.redirect('/');
    },
    userController.loginClient);

router.get('/view', departmentController.getAllDepartmentClient);

router.get('/edit', userController.editSelfPage);

router.post('/edit', userController.editSelf);

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/resource-single', (req, res) => {
    res.render('resource');
});

router.get('/resources', async (req, res) => {
    let { departmentId, resourceName } = req.query;
    let departments = await Department.find();
    let resources = await Resource.find({}, ["-resource_file"])
        .populate("department")
        .exec();
    let department = null;

    if (departmentId) {
        department = await Department.findById(departmentId);
        resources = resources.filter(resource => {
            return resource.department.department_name === department.department_name;
        });
    }

    if (resourceName) {
        resources = resources.filter(resource => {
            return resource.resource_name.toLowerCase().includes(resourceName.toLowerCase());
        });
    }

    res.render('resources', { resources, departments, department, resourceName });
});

router.get('/department', async (req, res) => {
    const departments = await Department.find();
    res.render('departments', { departments });
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/demo', (req, res) => {
    res.render('resources');
});

router.get("/logout", loginChecker, (req, res) => {
    req.logout()
    return res.redirect("/");
});

module.exports = router;
