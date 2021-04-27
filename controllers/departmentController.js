const Department = require('../models/department');
const Resource = require('../models/resource');
const Alert = require('alert');
const routeName = `department`

const getAllDepartmentClient = async (req, res) => {
    try {
        const departments = await Department.find()
        res.render('department/view', { departments });
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

const getAllDepartment = async (req, res) => {
    try {
        const userType = req.user.type.user_type;
        const departments = await Department.find()
        res.render('department/view', { departments, user:req.user, userType });
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

const addNewDepartmentPage =  async(req, res) => {
    const userType = req.user.type.user_type;
    res.render('department/create', {userType});
};

const addNewDepartment = async (req, res) => {
    try {
        const alert = Alert;
        const department = await new Department(req.body);
        await department.save()
        alert("Add Success!");
        return res.redirect("/departments/view");
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

const getDepartmentById = async (req, res) => {
    try {
        const id = req.query.departmentId;
        const userType = req.user.type.user_type
        const department = await Department.findById(id)
        const resources = await Resource.find({
            department: department._id
        }, ["-resource_file", "-resource_image"])
        res.render('department/detail', {userType, department, resourceNumber: resources.length })
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

const getDepartmentByIdClient = async (req, res) => {
    try {
        const id = req.params.departmentId;
        const userType = req.user.type.user_type;
        const department = await Department.findById(id)
        res.render('department/detail', { department, userType })
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

const editDepartmentPage = async (req, res) => {
    const id = req.query.departmentId;
    const userType = req.user.type.user_type
    const department = await Department.findById(id);
    res.render('department/edit', { departmentID: id, department, userType });
};

const editDepartment = async (req, res) => {
    try {
        const alert = Alert;
        const id = req.params.departmentId;
        const departmentUpdate = req.body;
        const refresh = { new: true };

        await Department.findByIdAndUpdate(id,
            { ...departmentUpdate, last_update: Date.now() },
            refresh);
        await Department.find();
        alert("Edit Success!");
        return res.redirect("/departments/view");

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

const deleteDepartment = async (req, res) => {
    try {
        const alert = Alert
        const id = req.params.departmentId;
        await Department.findByIdAndDelete(id)
        alert("Delete Success!");
        res.redirect("back");
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
    getAllDepartmentClient,
    getAllDepartment,
    addNewDepartmentPage,
    addNewDepartment,
    getDepartmentById,
    getDepartmentByIdClient,
    editDepartmentPage,
    editDepartment,
    deleteDepartment
}