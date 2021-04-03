
const express = require('express');
const Resource = require('../../api/models/resource');
const mongoose = require('mongoose');

const router = express.Router();

//resource routes
router.get('/', async (req, res) => {
    try {
        await Resource.find()
            .then(docs => {
                console.log(docs);
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
        const resource = await new Resource({
            resourcename: req.body.resourcename,
            resourcetype: req.body.resourcetype
        });
        await resource.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Handling POST requests to /resources',
                    createdResource: resource
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
        req.resource = await Resource.findById(req.params.resourceId);
        const resource = req.resource;
        resource.resourcename = req.body.resourcename;
        resource.resourcetype = req.body.resourcetype;

        
        res.status(200).json({
            message: 'Updated resource',
            id: req.params.resourceId
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    };
});

router.delete('/:resourceId', async (req, res) => {
    try {
        const id = req.params.resourceId;
        await Resource.remove({ _id: id })
            .then(result => {
                res.status(200).json(result);
            });
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;