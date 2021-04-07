
const express = require('express');
const Type = require('../../api/models/usertype');
const mongoose = require('mongoose');
const { result } = require('lodash');

const router = express.Router();

//type routes
router.get('/', async (req, res) => {
    try {
        const type = await Type.find()

        return res.json({
            status: 200,
            success: true,
            data: type,
            count: type.length
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