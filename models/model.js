const mongoose = require('mongoose');
const url =  "mongodb://heroku_7rl6zx62:9llvcjkd2m40q80u3f2r5dn6hu@ds229732.mlab.com:29732/heroku_7rl6zx62";
mongoose.connect(url)

var formDataSchema = new mongoose.Schema({
	usn : String,
	name :String,
	email :String,
	score_gpa: String,
	intern_status: Boolean,
	fte_status : String,
	blacklisted :Boolean
},{strict:false, collection: 'formData' });
var studentSchema =	new mongoose.Schema({
	usn : {type:String,required:true},
	name :{type:String,required:true},
	email :{type:String,required:true},
	password :{type:String,required:true},
},{ collection: 'user' });
var studentSchema =	new mongoose.Schema({
	usn : {type:String,required:true},
	name :{type:String,required:true},
	email :{type:String,required:true},
	password :{type:String,required:true},
},{ collection: 'user' });
var companySchema = new mongoose.Schema({
	name :{type:String}
},{strict:false,collection:'placement'});
var tagSchema = new mongoose.Schema({
	filename :{type:String ,required:true},
	company :{type:String ,required:true},
	exp_num :{type:String },
	tags:{type:[{type:String}],required:true,default:[]}
},{collection:'tagData'});
var empSchema = new mongoose.Schema({
	username : {type:String,required:true},
	password : {type:String,required:true},
	isAdmin : {type:Boolean,required:true}	
},{collection:"employee"});

module.exports.formModel = mongoose.model('FormData',formDataSchema);
module.exports.studentModel = mongoose.model('studentData',studentSchema);
module.exports.compModel = mongoose.model('compData',companySchema);
module.exports.tagModel = mongoose.model('tagData',tagSchema);
module.exports.empModel = mongoose.model('empData',empSchema);