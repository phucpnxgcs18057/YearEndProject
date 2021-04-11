const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema ({
    department_name: {
        type: String,
        required: true
    },
    department_courses: {
        type: Number,
        default: 1,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
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

const Department = mongoose.model('department', departmentSchema);
module.exports = Department;