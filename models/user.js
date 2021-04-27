const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_full_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_resource: [{
        type: Schema.Types.ObjectId,
        ref: 'resource'
    }],
    type: {
        type: Schema.Types.ObjectId,
        ref: 'type',
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

const User = mongoose.model('user', userSchema);
module.exports = User;
