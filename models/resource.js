const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
    resourcename: {
        type: String,
        required: true
    },
    resourcefile: {
        type: String,
        required: true
    },
    resourceimage: {
        type: String,
        required: true
    },
    resourcedate: {
        type: Date,
        default: Date.now()
    }
});

const Resource = mongoose.model('resource', resourceSchema);
module.exports = Resource;