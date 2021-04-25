const Library = require('../models/library');
const User = require('../models/user');
const Resource = require('../models/resource');
const Department = require('../models/department');

const getStat = async (req, res) => {
    try {
        // Date
        var date = new Date();
        var currentMonth = date.getMonth();

        // user in month, total users
        let users = await User.find({});
        let usersInMonth = users.filter(user => {
            const userMonth = new Date(user.create_date).getMonth();
            if (userMonth === currentMonth) {
                return true;
            }
            return false;
        })

        // resource in month, total resource
        let resources = await Resource.find({}, ["-resource_file", "-resource_image"]);
        let resourcesInMonth = resources.filter(resource => {
            const resourceMonth = new Date(resource.create_date).getMonth();
            if (resourceMonth === currentMonth) {
                return true;
            }
            return false;
        })

        // department in month, total departments
        let departments = await Department.find({});
        let departmentsInMonth = departments.filter(department => {
            const departmentMonth = new Date(department.create_date).getMonth();
            if (departmentMonth === currentMonth) {
                return true;
            }
            return false;
        })

        // user type
        const userType = req.user.type.user_type;

        switch (userType) {
            case "Moderator":
                // Moderator
                return res.redirect('/');
                break;
            case "Student":
                // Student
                return res.redirect('/');
                break;
            case "Tutor":
                // Tutor
                return res.redirect('/');
                break;
            default:
                break;
        }

        res.render('statistic/view', { userType, users, usersInMonth, resources, resourcesInMonth, departments, departmentsInMonth });
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

module.exports = {
    getStat,
};