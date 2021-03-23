const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    questiontitle: {
        type: String,
        required: true
    },
    questioncontent: {
        type: String,
        required: true
    },
    questiondate: {
        type: Date,
        default: Date.now()
    }
});

const Question = mongoose.model('question', questionSchema);
module.exports = Question;