const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ucourseSchema = new Schema ({
    course_name: {
        type: String,
        required: true
    },
    course_term: {
        type: String,
        required: true
    },
    course_year: {
        type: Number,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    library: {
        type: Schema.Types.ObjectId,
        ref: 'library'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    create_date: {
        type: Date,
        default: Date.now()
    },
    last_update: {
        type: Date,
        default: Date.now()
    }
});

const uCourse = mongoose.model('user-course', ucourseSchema);
module.exports = uCourse;