const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new SChema({
    username: {
        type: String,
        required: true
    },
    userpassword: {
        type: String,
        required: true
    },
    userfullname: {
        type: String,
        required: true
    },
    usermail: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    userschool: {
        type: String,
        required: true
    },
    createdate: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;
