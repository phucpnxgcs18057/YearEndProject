const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    user_type: {
        type: String,
        required: true
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

const Type = mongoose.model('type', typeSchema);
module.exports = Type;