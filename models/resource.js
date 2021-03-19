const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    ResourceName: {
        type: String,
        required: true
    },
    ResourceContent: {
        type: String,
        required: true
    },
    ResourceType: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Resource = mongoose.model('Resource', resourceSchema);
module.exports = Resource;