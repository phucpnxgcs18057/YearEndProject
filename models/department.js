const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const {stripHtml} = require('string-strip-html');

const departmentSchema = new Schema ({
    department_name: {
        type: String,
        required: true
    },
    department_description: {
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

departmentSchema.pre('validate', function (next) {
    //Check if a description is there or not
    if (this.department_description) {
        this.department_description = htmlPurify.sanitize(this.department_description);
    }
    next();
});
const Department = mongoose.model('department', departmentSchema);
module.exports = Department;