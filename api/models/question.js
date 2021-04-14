const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const stripHtml = require('string-strip-html');

const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    question_title: {
        type: String,
        required: true
    },
    question_content: {
        type: String,
        required: true
    },
    question_snippet: {
        type: String
    },
    library: {
        type: Schema.Types.ObjectId,
        ref: 'library'
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

questionSchema.pre('validate', function(next){
    //Check description is available or not
    if(this.question_content){
        this.question_content = htmlPurify.sanitize(this.question_content);
        this.question_snippet = stripHtml(this.question_content.substring(0,100)).result
    }
    next();
})

const Question = mongoose.model('question', questionSchema);
module.exports = Question;