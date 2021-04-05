
const express = require('express');
const Resource = require('../../api/models/resource');
const mongoose = require('mongoose');
const { result } = require('lodash');

const router = express.Router();

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
        const resource = await new Resource(req.body);
        await resource.save()

        return res.json({
            status: 200,
            success: true,
            data: resource,
            message: `Successfully created the resource`
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

router.get('/:resourceId', async (req, res) => {
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

router.put('/:resourceId', async (req, res) => {
    try {
        const id = req.params.resourceId;
        const resourceUpdate = req.body;
        const refresh = { new: true };

        const resource = await Resource.findByIdAndUpdate(id,
            { ...resourceUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: resource,
            message: `Successfully updated the resource`
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

router.delete('/:resourceId', async (req, res) => {
    try {
        const id = req.params.resourceId;
        await Resource.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: resource,
            message: `Successfully deleted the resource`
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