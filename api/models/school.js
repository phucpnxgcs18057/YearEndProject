const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    school_name: {
        type: String,
        required: true
    },
    school_address: {
        type: String,
        required: true
    },
    school_type: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'department'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'question'
    },
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'resource'
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