const Resource = require('../models/resource');
const Department = require('../models/department');
const User = require('../models/user');
const Library = require('../models/library');
const Alert = require('alert');
const routeName = `resource`;

// const reformResources = async (req, res) => {
//     try {
//         let resources = await Resource.find({}, ['-resource_file', '-resource_image'])
//             .populate('department')
//             .exec();
//         const users = await User.find();

//         for (let i = 0; i < resources.length; i++) {
//             let resource = resources[i];
//             const user = users[Math.floor(Math.random() * users.length)];
//             resource = await Resource.findByIdAndUpdate(resource._id, {
//                 user: user._id
//             });
//             console.log(resource);
//         }

//         resources = await Resource.find({}, ['-resource_file', '-resource_image'])
//             .populate('department')
//             .populate('user')
//             .exec();

//         res.json({
//             resources
//         })
//     } catch (err) {
//         console.log(err);
//         return res.json({
//             status: 500,
//             success: false,
//             data: null,
//             message: `Internal Server Error`
//         })
//     }
// }

const getAllResources = async (req, res) => {
    try {
        const userType = req.user.type.user_type;
        let resources = [];


        switch (userType) {
            case "Admin":
            case "Moderator":
                resources = await Resource.find({}, ['-resource_file', '-resource_image'])
                    .populate('department')
                    .populate('user')
                    .exec();
                break;
            case "Tutor":
                const userID = req.user._id;
                resources = await Resource.find({ user: userID }, ['-resource_file', '-resource_image'])
                    .populate('department')
                    .populate('user')
                    .exec();
                break;
            default:
                break;
        }


        const departments = await Department.find();
        res.render('resource/view', { resources, departments, userType });
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
    const userType = req.user.type.user_type;
    res.render('resource/create', { departments, userType });
};

const addNewResource = async (req, res) => {
    try {
        const alert = Alert
        const {
            resource_name
            , resource_file_base64, resource_image_base64, department
        } = req.body;
        await new Resource({
            resource_name: resource_name,
            resource_file: resource_file_base64,
            resource_image: resource_image_base64,
            department: department,
            user: req.user._id
        }).save();
        alert("Add Success!");
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
        const userType = req.user.type.user_type;
        const resource = await Resource.findById(id)
            .populate('department')
            .populate('user')
            .exec();
        const library = await Library.findOne({
            resource: id
        })
        res.render('resource/detail', { resource, library, userType });
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
    const userType = req.user.type.user_type;
    const resource = await Resource.findById(id)
        .populate('user')
        .populate('department')
        .exec();
    const departments = await Department.find();
    console.log(departments);
    res.render('resource/edit', { resourceID: id, resource, departments, userType });
};

const editResource = async (req, res) => {
    try {
        const alert = Alert
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
        alert("Edit Success!");
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
        const alert = Alert
        const id = req.params.resourceId;
        await Resource.findByIdAndDelete(id);
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

const saveResource = async (req, res) => {
    const resource_id = req.query.resourceId;
    const mode = req.query.mode;

    const library = await Library({
        resource: resource_id,
        user: req.user._id
    }).save();

    if (mode && mode === "client") {
        return res.redirect(`/resource-single?resourceId=${resource_id}`);
    }
    return res.redirect(`/resources/detail?resourceId=${resource_id}`);
};

const deleteResourceLibrary = async (req, res) => {
    const libraryId = req.query.libraryId;
    const resource_id = req.query.resourceId;
    const mode = req.query.mode;

    const library = await Library.findByIdAndDelete(libraryId);

    if (mode && mode === "client") {
        return res.redirect(`/resource-single?resourceId=${resource_id}`);
    }
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
    deleteResourceLibrary,
    // reformResources
}