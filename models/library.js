const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    resource:{
        type: Schema.Types.ObjectId,
        ref: 'resource'
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