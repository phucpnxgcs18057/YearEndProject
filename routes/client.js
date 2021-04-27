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
const Library = require('../models/library');
const nodemailer = require ('nodemailer')

//client routes
router.get('/', async (req, res) => {
    let { departmentId, resourceName } = req.query;
    let departments = await Department.find();
    let resources = await Resource.find({}, ["-resource_file"]).limit(3);
    let department = null;

    let listOfResourcesNumber = [];
    for (let i = 0; i < departments.length; i++) {
        const department = departments[i];
        const norwayResources = await Resource.find({
            department: department._id
        }, ["-resource_file", "-resource_image"]);
        listOfResourcesNumber.push(norwayResources.length)
    }

    /*
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
    */

    res.render('indexD', { departments, department, resourceName, user: req.user, categories: departments.slice(0, 3), listOfResourcesNumber, resources });
});

router.get('/signup', userController.signUpPage);

router.post('/signup', userController.signUp);

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: "/library/view"
}),
    function (req, res) {
        res.redirect('/');
    },
    userController.loginClient);

router.get('/view', departmentController.getAllDepartmentClient);

router.get('/edit', userController.editSelfPage);

router.post('/edit/:userId', userController.editSelf);

router.get('/home', async (req, res) => {
    let { departmentId, resourceName } = req.query;
    let departments = await Department.find();
    let resources = await Resource.find({}, ["-resource_file"]).limit(3);
    let department = null;

    let listOfResourcesNumber = [];
    for (let i = 0; i < departments.length; i++) {
        const department = departments[i];
        const norwayResources = await Resource.find({
            department: department._id
        }, ["-resource_file", "-resource_image"]);
        listOfResourcesNumber.push(norwayResources.length)
    }

    /*
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
    */

    res.render('indexD', { departments, department, resourceName, user: req.user, categories: departments.slice(0, 3), listOfResourcesNumber, resources });
});

router.get('/about', async (req, res) => {
    let { departmentId, resourceName } = req.query;
    let departments = await Department.find();
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
    res.render('about', { departments, department, resourceName, user: req.user });
});

router.get('/contact', async (req, res) => {
    let { departmentId, resourceName } = req.query;
    let departments = await Department.find();
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
    res.render('contact', { departments, department, resourceName, user: req.user });
});

router.post('/send-mail', async (req, res) => {
    const {
        email
        , subject, message} = req.body;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dummytestphucer@gmail.com',
                pass: 'Cooljoez123',
            }
        });
        
        let mailOptions = {
            from: email,
            to: 'dummytestphucer@gmail.com',
            subject: subject,
            text: message,
        };
        
        transporter.sendMail(mailOptions, function(err, data){
            if(err){
                console.log(err)
                console.log('Error Occurs!')
            } else {
                console.log('Email Sent!')
            }
        });
    res.redirect('/contact');
});


router.get('/resource-single', async (req, res) => {
    let { resourceId } = req.query;
    let departments = await Department.find();

    let resource = await Resource.findById(resourceId)
        .populate("department")
        .populate("user")
        .exec();

    const library = await Library.findOne({
        resource: resourceId
    })

    res.render('resource', { resource, library, departments, user: req.user });
});

router.get('/resources', async (req, res) => {
    let { departmentId, resourceName } = req.query;
    let departments = await Department.find();
    let resources = await Resource.find({}, ["-resource_file"])
        .populate("department")
        .populate("user")
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

    res.render('resources', { resources, departments, department, resourceName, user: req.user });
});

router.get('/department', async (req, res) => {
    let { departmentId, resourceName } = req.query;
    const departments = await Department.find();
    let listOfResourcesNumber = [];
    for (let i = 0; i < departments.length; i++) {
        const department = departments[i];
        const resources = await Resource.find({
            department: department._id
        }, ["-resource_file", "-resource_image"]);
        listOfResourcesNumber.push(resources.length)
    }

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

    res.render('departments', { departments, department, resourceName, user: req.user, listOfResourcesNumber });
})

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/donation', (req, res) => {
    res.render('donations', { user: req.user });
});

router.get("/logout", loginChecker, (req, res) => {
    req.logout()
    return res.redirect("/");
});

module.exports = router;

