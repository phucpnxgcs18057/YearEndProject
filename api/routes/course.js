const express = require('express');
const Course = require('../models/course');
const mongoose = require('mongoose');
const { result } = require('lodash');
const routeName = `course`

const router = express.Router();

//course routes
router.get('/', async (req, res) => {
    try {
        const course = await Course.find()
            .populate('department')
            .populate('school')

        return res.json({
            status: 200,
            success: true,
            data: course,
            count: course.length
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

router.post('/', async (req, res) => {
    try {
        const course = await new Course(req.body);
        await course.save()

        return res.json({
            status: 200,
            success: true,
            data: course,
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
});

router.get('/:courseId', async (req, res) => {
    try {
        const id = req.params.courseId;
        await Course.findById(id)
            .populate('department')
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
});

router.put('/:courseId', async (req, res) => {
    try {
        const id = req.params.courseId;
        const courseUpdate = req.body;
        const refresh = { new: true };

        const course = await Course.findByIdAndUpdate(id,
            { ...courseUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: course,
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
});

router.delete('/:courseId', async (req, res) => {
    try {
        const id = req.params.courseId;
        const course = await Course.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: course,
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
});

module.exports = router;