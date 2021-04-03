const mongoose = require('mongoose');
const domPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const stripHtml = require('string-strip-html');
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
    questionsnippet: {
        type: String
    },
    questiondate: {
        type: Date,
        default: Date.now()
    }
});

questionSchema.pre('validate', function(next){
    //Check description is available or not
    if(this.questioncontent){
        this.questioncontent = htmlPurify.sanitize(this.questioncontent);
        this.questionsnippet = stripHtml(this.questioncontent.substring(0,100)).result
    }
    next();
})

const Question = mongoose.model('question', questionSchema);
module.exports = Question;