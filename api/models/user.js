const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new SChema({
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
    user_mail: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    user_school: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'school'
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'type'
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
