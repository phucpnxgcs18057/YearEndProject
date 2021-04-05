const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    resource_name: {
        type: String,
        required: true
    },
    resource_file: {
        type: String,
        default: "default.docx"
    },
    resource_image: {
        type: String,
        default: "default.jpg"
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    library: {
        type: Schema.Types.ObjectId,
        ref: 'library'
    },
    major: {
        type: Schema.Types.ObjectId,
        ref: 'major'
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

const Resource = mongoose.model('resource', resourceSchema);
module.exports = Resource;