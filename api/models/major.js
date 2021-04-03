const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const majorSchema = new Schema({
    majorname: {
        type: String,
        required: true
    }
});

const Major = mongoose.model('major', majorSchema);
module.exports = Major;