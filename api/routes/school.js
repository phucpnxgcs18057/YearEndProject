
const express = require('express');
const School = require('../../api/models/school');
const mongoose = require('mongoose');
const { result } = require('lodash');
const routeName = `school`

const router = express.Router();

//user routes
router.get('/', async (req, res) => {
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
});

router.post('/', async (req, res) => {
    try {
        const school = await new School(req.body);
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
});

router.get('/:schoolId', async (req, res) => {
    try {
        const id = req.params.schoolId;
        await School.findById(id)
            .populate('type')
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

router.put('/:schoolId', async (req, res) => {
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
});

router.delete('/:schoolId', async (req, res) => {
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
});

module.exports = router;