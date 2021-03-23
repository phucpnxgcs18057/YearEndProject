const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    usertype: {
        type: String,
        required: true
    }
});

const Type = mongoose.model('type', typeSchema);
module.exports = Type;