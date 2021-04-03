const express = require('express');
const Question = require('../../api/models/question');
const mongoose = require('mongoose');

const router = express.Router();

//question routes
router.get('/', async (req, res) => {
    try {
        await Question.find()
            .sort({ timeCreated: 'desc' })
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