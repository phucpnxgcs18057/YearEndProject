const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ucourseSchema = new Schema ({
    coursename: {
        type: String,
        required: true
    },
    courseterm: {
        type: String,
        required: true
    },
    courseyear: {
        type: Number,
        required: true
    }
});

const uCourse = mongoose.model('user-course', ucourseSchema);
module.exports = uCourse;