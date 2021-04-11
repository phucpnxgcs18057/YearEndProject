
const express = require('express');
const Resource = require('../../api/models/resource');
const mongoose = require('mongoose');
const path = require('path');
const { result } = require('lodash');
// const multer = require('multer');

const router = express.Router();

// // Defines storage for the document files
// const storage = multer.diskStorage({
//     //File destination
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads')
//     },

//     //Add back extension
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
//     }
// });

// //Upload file parameters for multer
// const upload = multer({
//     storage: storage,
//     limits: {
//         fieldSize: 1024 * 1024 * 100,
//     }
// });

// const multiUpload = upload.fields([{ name: 'resource_file' }, { name: 'resource_image' }])

//resource routes
router.get('/', async (req, res) => {
    try {
        const resource = await Resource.find()

        return res.json({
            status: 200,
            success: true,
            data: resource,
            count: resource.length
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
});

// router.post('/', multiUpload, async (req, res) => {
//     const arr = req.files
//     const File = arr.resource_file.map(item => item.filename);
//     const Img = arr.resource_image.map(item => item.filename);

//     try {
//         let resource = new Resource({
//             resource_name: req.body.resource_name,
//             resource_file: File.toString(),
//             resource_image: Img.toString(),
//             course: req.body.courseId,
//             library: req.body.libraryId,
//             major: req.body.majorId,
//             school: req.body.schoolId,
//             subject: req.body.subjectId
//         })
//         await resource.save()

//         return res.json({
//             status: 200,
//             success: true,
//             data: resource,
//             message: `Successfully created the resource`
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
// });

router.post('/add-resource', async (req, res) => {
    try {
        console.log(req.body);
        const {
            resource_name
            , resource_file_base64, resource_image_base64
        } = req.body;

        /* 
    let resource = await new Resource({
        resource_name: resource_name,
        resource_file: resource_file_base64,
        resource_image: resource_image_base64,
        course: courseId,
        library: libraryId,
        major: majorId,
        school: schoolId,
        subject: subjectId
    }).save();
    */

        let resource = await new Resource({
            resource_name: resource_name,
            resource_file: resource_file_base64,
            resource_image: resource_image_base64,
        }).save();

        return res.json({
            status: 200,
            success: true,
            data: resource,
            //data: req.body,
            message: `Successfully created the resource`
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
});


router.get('/resource-detail/:resourceId', async (req, res) => {
    try {
        const id = req.params.resourceId;
        await Resource.findById(id)
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
});

// router.put('/edit/:resourceId', multiUpload, async (req, res) => {
//     try {
//         const id = req.params.resourceId;

//         const resourceUpdate = req.body;
//         const refresh = { new: true }

//         const resource = await Resource.findByIdAndUpdate(id,
//             { ...resourceUpdate, last_update: Date.now() },
//             refresh);

//         return res.json({
//             status: 200,
//             success: tresourceIdrue,
//             data: resource,
//             message: `Successfully updated the resource`
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
// });

router.post('/edit/:resourceId', async (req, res) => {
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

        const resource = await Resource.findByIdAndUpdate(id,
            { ...updatedResourceObj, last_update: Date.now() },
            refresh);
        const resources = await Resource.find();

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
});

router.get('/delete/:resourceId', async (req, res) => {
        const id = req.params.resourceId;
        const resource = await Resource.findByIdAndDelete(id);

        res.redirect("back");
});

module.exports = router;