
const express = require('express');
const Resource = require('../../api/models/resource');
const mongoose = require('mongoose');
const { result } = require('lodash');

const router = express.Router();

//resource routes
router.get('/', async (req, res) => {
    try {
        await Resource.find()
            .then(docs => {
                res.status(200).json(docs);
            });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const resource = await new Resource(req.body);
        await resource.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Resource added successfully!',
                    createdResource: resource.resourcename
                });
            })
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
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
        res.status(500).json({ error: err });
    };
});

router.put('/:resourceId', async (req, res) => {
    try {
        const id = req.params.resourceId;
        const resourceUpdate = req.body;
        const refresh = {new: true};

        const resource = await Resource.findByIdAndUpdate(id, {...resourceUpdate, resourcedate: Date.now()}, refresh);
        res.send(resource);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    };
});

router.delete('/:resourceId', async (req, res) => {
    try {
        const id = req.params.resourceId;
        await Resource.findByIdAndDelete(id)
            .then(result => {
                res.status(200).json(result);
            });
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;