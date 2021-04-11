const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schooltypeSchema = new Schema({
    school_type: {
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

const schoolType = mongoose.model('school-type', schooltypeSchema);
module.exports = schoolType;