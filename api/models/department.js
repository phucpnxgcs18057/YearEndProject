const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema ({
    department_name: {
        type: String,
        required: true
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