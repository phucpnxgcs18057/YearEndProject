
const express = require('express');
const User = require('../../api/models/user');
const mongoose = require('mongoose');
const { result } = require('lodash');

const router = express.Router();

//user routes
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
            .populate('type')
            .populate('school');

        return res.json({
            status: 200,
            success: true,
            data: user,
            count: user.length
        })
    } catch (error) {
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
        const user = await new User(req.body);
        await user.save()

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully created the user`
        })
    } catch (error) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        await User.findById(id)
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

router.put('/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        const userUpdate = req.body;
        const refresh = { new: true };

        const user = await User.findByIdAndUpdate(id,
            { ...userUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully updated the user`
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

router.delete('/:userId', async (req, res) => {
    try {
        const id = req.params.userId;
        await User.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully deleted the user`
        })
    } catch (error) {
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