const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema ({
    departmentname: {
        type: String,
        required: true
    },
    departmentcourses: {
        type: Number,
        required: true
    }
});

const Department = mongoose.model('department', departmentSchema);
module.exports = Department;