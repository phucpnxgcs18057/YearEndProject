const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject_name: {
        type: String,
        required: true
    },
    major: {
        type: Schema.Types.ObjectId,
        ref: 'major'
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
    create_date: {
        type: Date,
        default: Date.now()
    },
    last_update: {
        type: Date,
        default: Date.now()
    }
});

const Subject = mongoose.model('subject', subjectSchema);
module.exports = Subject;