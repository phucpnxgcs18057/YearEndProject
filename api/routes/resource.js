
const express = require('express');
const Resource = require('../../api/models/resource');
const mongoose = require('mongoose');

const router = express.Router();


//resource routes
router.get('/', (req, res) => {
    // res.render('view')
    res.status(200).json({
        message: 'Handling GET requests to /resources'
    });
});

router.post('/', (req, res) => {
    const resource = new Resource({
        resourcename: req.body.resourcename,
        resourcetype: req.body.resourcetype
    });
    resource.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /resources',
                createdResource: resource
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:resourceId', (req, res) => {
    const id = req.params.resourceId;
    Resource.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.put('/:resourceId', (req, res) => {
    res.status(200).json({
        message: 'Updated resource',
        id: req.params.resourceId
    })
});

router.delete('/:resourceId', (req, res) => {
    res.status(200).json({
        message: 'Deleted resource',
        id: req.params.resourceId
    })
});

module.exports = router;