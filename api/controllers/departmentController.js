const Department = require('../models/department');
const routeName = `department`

const getAllDepartmentClient = async (req, res) => {
    try {
        const department = await Department.find()
            .populate('school')

        return res.json({
            status: 200,
            success: true,
            data: department,
            count: department.length
        })
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
        const department = await Department.find()
            .populate('school')

        return res.json({
            status: 200,
            success: true,
            data: department,
            count: department.length
        })
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

const addNewDepartment = async (req, res) => {
    try {
        const department = await new Department(req.body);
        await department.save()

        return res.json({
            status: 200,
            success: true,
            data: department,
            message: `Successfully created the ${routeName}`
        })
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
        const id = req.params.departmentId;
        await Department.findById(id)
            .populate('school')
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: "Unavailable / Non-exist ID" });
                }
            });
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
        await Department.findById(id)
            .populate('school')
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: "Unavailable / Non-exist ID" });
                }
            });
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

const editDepartment = async (req, res) => {
    try {
        const id = req.params.departmentId;
        const departmentUpdate = req.body;
        const refresh = { new: true };

        const department = await Department.findByIdAndUpdate(id,
            { ...departmentUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: department,
            message: `Successfully updated the ${routeName}`
        })
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
        const department = await Department.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: department,
            message: `Successfully deleted the ${routeName}`
        })
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
    addNewDepartment,
    getDepartmentById,
    getDepartmentByIdClient,
    editDepartment,
    deleteDepartment
}