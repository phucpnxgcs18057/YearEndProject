const Department = require('../models/department');
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

const addNewDepartmentPage = (req, res) => {
    res.render('department/create');
};

const addNewDepartment = async (req, res) => {
    try {
        const department = await new Department(req.body);
        await department.save()
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
        const department = await Department.findById(id)
        res.render('department/detail', { department })
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
        const department = await Department.findById(id)
        res.render('department/detail', { department })
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
    const department = await Department.findById(id);
    res.render('department/edit', { departmentID: id, department });
};

const editDepartment = async (req, res) => {
    try {
        const id = req.params.departmentId;
        const departmentUpdate = req.body;
        const refresh = { new: true };

        await Department.findByIdAndUpdate(id,
            { ...departmentUpdate, last_update: Date.now() },
            refresh);
        await Department.find();

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
        const id = req.params.departmentId;
        await Department.findByIdAndDelete(id)
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