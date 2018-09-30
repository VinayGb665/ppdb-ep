const mongoose = require('mongoose');
const url =  "mongodb://heroku_7rl6zx62:9llvcjkd2m40q80u3f2r5dn6hu@ds229732.mlab.com:29732/heroku_7rl6zx62";
mongoose.connect(url)

var formDataSchema = new mongoose.Schema({
	usn : String,
	name :String,
	email :String,
	score_gpa: String
},{ collection: 'formData' });
var studentSchema =	new new mongoose.Schema({
	usn : String,
	name :String,
	email :String,
	password :String
},{ collection: 'user' });
module.exports.formModel = mongoose.model('FormData',formDataSchema);
module.exports.studentModel = mongoose.model('studentData',studentSchema);