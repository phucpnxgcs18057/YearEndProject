const Library = require('../models/library');
const User = require('../models/user');
const Resource = require('../models/resource');

const getLibrary = async (req, res) => {
    try {
        const libraries = await Library
            .find()
            .populate('resource')
            .populate('user')
            .exec();
        let resources = [];
        for (let i = 0; i < libraries.length; i++) {
            const library = libraries[i];
            const resource = await Resource.findById(library.resource._id, ['-resource_file', '-resource_image'])
                .populate('department')
                .exec();
            resources.push(resource);
        }

        res.render('library/view', { resources, libraries });
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

const viewLibrary = async (req, res) => {
    try {
        const libraries = await Library
            .find()
            .populate('resource')
            .populate('user')
            .exec();
        let resources = [];
        for (let i = 0; i < libraries.length; i++) {
            const library = libraries[i];
            const resource = await Resource.findById(library.resource._id, ['-resource_file', '-resource_image'])
                .populate('department')
                .exec();
            resources.push(resource);
        }

        res.render('library/view', { resources, libraries });
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
    getLibrary,
    viewLibrary
};