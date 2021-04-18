const Resource = require('../models/resource');
const Department = require('../models/department');
const User = require('../models/user');
const Library = require('../models/library');
const routeName = `resource`;

const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find({}, ['-resource_file', '-resource_image'])
            .populate('department')
            .exec();
        const departments = await Department.find();
        res.render('resource/view', { resources, departments });
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

const addNewResourcePage = async (req, res) => {
    const departments = await Department.find();
    res.render('resource/create', { departments });
};

const addNewResource = async (req, res) => {
    try {
        const {
            resource_name
            , resource_file_base64, resource_image_base64, department
        } = req.body;
        await new Resource({
            resource_name: resource_name,
            resource_file: resource_file_base64,
            resource_image: resource_image_base64,
            department: department
        }).save();

        return res.redirect("/resources/view");
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

const getResourceById = async (req, res) => {
    try {
        const id = req.query.resourceId;
        const resource = await Resource.findById(id).populate('department').exec();
        const library = await Library.findOne({
            resource: id
        })
        res.render('resource/detail', { resource, library });
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

const editResourcePage = async (req, res) => {
    const id = req.query.resourceId;
    const resource = await Resource.findById(id).populate('department').exec();
    const departments = await Department.find();
    console.log(departments);
    res.render('resource/edit', { resourceID: id, resource, departments });
};

const editResource = async (req, res) => {
    try {
        const id = req.params.resourceId;

        const resourceUpdate = req.body;
        let updatedResourceObj = {};

        for (var key of Object.keys(resourceUpdate)) {
            const value = resourceUpdate[key];
            if (value) {
                if (key === "resource_file") {
                    updatedResourceObj[key] = resourceUpdate["resource_file_base64"];
                }
                else if (key === "resource_image") {
                    updatedResourceObj[key] = resourceUpdate["resource_image_base64"];
                } else {
                    updatedResourceObj[key] = value;
                }
            }
        }

        const refresh = { new: true };

        await Resource.findByIdAndUpdate(id,
            { ...updatedResourceObj, last_update: Date.now() },
            refresh);
        await Resource.find();

        return res.redirect("/resources/view");

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

const deleteResource = async (req, res) => {
    try {
        const id = req.params.resourceId;
        await Resource.findByIdAndDelete(id);
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

const saveResource = async (req, res) => {
    const resource_id = req.query.resourceId;
    const library = await Library({
        resource: resource_id,
        user: req.user._id
    }).save();
    return res.redirect(`/resources/detail?resourceId=${resource_id}`);
};

const deleteResourceLibrary = async (req, res) => {
    const libraryId = req.query.libraryId;
    const resource_id = req.query.resourceId;
    const library = await Library.findByIdAndDelete(libraryId);
    return res.redirect(`/resources/detail?resourceId=${resource_id}`);
};

module.exports = {
    getAllResources,
    addNewResourcePage,
    addNewResource,
    getResourceById,
    editResourcePage,
    editResource,
    deleteResource,
    saveResource,
    deleteResourceLibrary
}