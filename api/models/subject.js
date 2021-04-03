const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectname: {
        type: String,
        required: true
    }
});

const Subject = mongoose.model('subject', subjectSchema);
module.exports = Subject;