const express = require('express');
const schoolType = require('../models/schooltype');
const mongoose = require('mongoose');
const { result } = require('lodash');
const routeName = `school type`
const router = express.Router();

//type routes
router.get('/', async (req, res) => {
    try {
        const schooltype = await schoolType.find()

        return res.json({
            status: 200,
            success: true,
            data: schooltype,
            count: schooltype.length
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