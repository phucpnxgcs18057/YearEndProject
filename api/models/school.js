const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
   schoolname: {
       type: String,
       required: true
   },
   schooladdress: {
       type: String,
       required: true
   },
   schooltype: {
       type: String,
       required: true
   }
});

const School = mongoose.model('school', schoolSchema);
module.exports = School;