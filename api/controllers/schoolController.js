const School = require('../../api/models/school');
const User = require('../models/user');
const routeName = `school`

const getAllSchool = async (req, res) => {
    try {
        const school = await School.find()
            .populate('school_type')

        return res.json({
            status: 200,
            success: true,
            data: school,
            count: school.length
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

const getAllSchoolClient = async (req, res) => {
    try {
        const school = await School.find()
            .populate('school_type')

        return res.json({
            status: 200,
            success: true,
            data: school,
            count: school.length
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

const addNewSchool = async (req, res) => {
    try {
        const {school_name, school_location, school_type, department} = req.body;
        
        const checkSchool = await School.findOne({school_name});
        if (checkSchool) {
            return res.json({
                status: 200,
                success: false,
                data:null,
                message: `${routeName} already exist`
            })
        }

        const school = await new User({
            school_name, school_location, school_type, department,
            create_date: Date.now(),
            last_update: Date.now()
        });
        await school.save()

        return res.json({
            status: 200,
            success: true,
            data: school,
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

const getSchoolByIdClient = async (req, res) => {
    try {
        const id = req.params.schoolId;
        await School.findById(id)
            .populate('school_type')
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

const getSchoolById = async (req, res) => {
    try {
        const id = req.params.schoolId;
        await School.findById(id)
            .populate('school_type')
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

const editSchool = async (req, res) => {
    try {
        const id = req.params.schoolId;
        const schoolUpdate = req.body;
        const refresh = { new: true };

        const school = await School.findByIdAndUpdate(id,
            { ...schoolUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: school,
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

const deleteSchool = async (req, res) => {
    try {
        const id = req.params.schoolId;
        const school = await School.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: school,
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
    getAllSchool,
    getAllSchoolClient,
    addNewSchool,
    getSchoolByIdClient,
    getSchoolById,
    editSchool,
    deleteSchool
}