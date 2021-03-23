const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    coursename: {
        type: String,
        required: true
    }
});

const Course = mongoose.model('course', courseSchema);
module.exports = Course;