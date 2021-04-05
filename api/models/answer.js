const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema ({
    answer_content: {
        type: String,
        required: true
    },
    answer_rating: {
        type: Number,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'question'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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

const Answer = mongoose.model('answer', answerSchema);
module.exports = Answer;