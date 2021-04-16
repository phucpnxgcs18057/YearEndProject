const Resource = require('../models/resource');
const routeName = `resource`;

const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.find()
        res.render('resource/view', { resources });
        // return res.json({
        //     status: 200,
        //     success: true,
        //     data: resources,
        //     count: resources.length
        // })
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

const addNewResourcePage = (req, res) => {
    res.render('resource/create');
};

const addNewResource = async (req, res) => {
    try {
        console.log(req.body);
        const {
            resource_name
            , resource_file_base64, resource_image_base64
        } = req.body;

        await new Resource({
            resource_name: resource_name,
            resource_file: resource_file_base64,
            resource_image: resource_image_base64,
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
        const resource = await Resource.findById(id)
        res.render('resource/detail', { resource });
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
    const resource = await Resource.findById(id);
    res.render('resource/edit', { resourceID: id, resource });
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

module.exports = {
    getAllResources,
    addNewResourcePage,
    addNewResource,
    getResourceById,
    editResourcePage,
    editResource,
    deleteResource
}