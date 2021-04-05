const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema ({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'question' 
    },
    resource:{
        type: Schema.Types.ObjectId,
        ref: 'resource'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    usercourse: {
        type: Schema.Types.ObjectId,
        ref: 'user-course'
    },
    create_date: {
        type: Date,
        default: Date.now()
    },
    last_update: {
        type: Date,
        default: Date.now()
    }
})

const Library = mongoose.model('library', librarySchema);
module.exports = Library;