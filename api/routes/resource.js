
const express = require('express');
const Resource = require('../../api/models/resource');

const router = express.Router();


//resource routes
router.get('/', (req, res) => {
    // res.render('view')
    res.status(200).json({
        message: 'Handling GET requests to /resources'
    });
});

router.post('/', (req, res) => {
    const resource = {
        title: req.body.title,
        type: req.body.type
    }
    res.status(201).json({
        message: 'Handling POST requests to /resources',
        createdResource: resource
    });
});

router.get('/:resourceId', (req, res) => {
    const id = req.params.resourceId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You have found the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You have passed an ID',
            id: id
        });
    }
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