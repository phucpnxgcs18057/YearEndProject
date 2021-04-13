
const express = require('express');
const Department = require('../models/department');
const mongoose = require('mongoose');
const { result } = require('lodash');
const routeName = `department`

const router = express.Router();

//department routes
router.get('/', async (req, res) => {
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
});

router.post('/', async (req, res) => {
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
});

router.get('/:departmentId', async (req, res) => {
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
});

router.put('/:departmentId', async (req, res) => {
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
});

router.delete('/:departmentId', async (req, res) => {
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
});

module.exports = router;