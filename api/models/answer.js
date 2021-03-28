const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema ({
    answercontent: {
        type: String,
        required: true
    },
    answerrating: {
        type: Number,
        required: true
    }
});

const Answer = mongoose.model('answer', answerSchema);
module.exports = Answer;