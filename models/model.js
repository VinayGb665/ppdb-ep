const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || "mongodb://heroku_7rl6zx62:9llvcjkd2m40q80u3f2r5dn6hu@ds229732.mlab.com:29732/heroku_7rl6zx62";
mongoose.connect(url)

var formDataSchema = new mongoose.Schema({
	name :String,
	email :String,
	usn : String,
	score_gpa: String
});
module.exports.formModel = mongoose.model('FormData',formDataSchema);