const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    school_name: {
        type: String,
        required: true
    },
    school_location: {
        type: String,
        required: true
    },
    school_type: {
        type: Schema.Types.ObjectId,
        ref: 'school-type'
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'department'
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

const School = mongoose.model('school', schoolSchema);
module.exports = School;