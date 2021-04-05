const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema ({
    course_name: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'department'
    },
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'resource'
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'school'
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

const Course = mongoose.model('course', courseSchema);
module.exports = Course;