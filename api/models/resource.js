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
    department: {
        type: Schema.Types.ObjectId,
        ref: 'department',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
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