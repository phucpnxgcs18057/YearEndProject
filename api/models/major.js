const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const majorSchema = new Schema({
    major_name: {
        type: String,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'question'
    },
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'resource'
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'school'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
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

const Major = mongoose.model('major', majorSchema);
module.exports = Major;