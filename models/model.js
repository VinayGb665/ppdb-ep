const mongoose = require('mongoose');
const url =  process.env.MONGODB_URI;
mongoose.connect(url);

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
	username : {type:String,required:true,unique:true},
	password : {type:String,required:true},
	isAdmin : {type:Boolean,required:true}	
},{collection:"employee"});
var expSchema = new mongoose.Schema({
	company:String,
	Date :{type: String},
	"How man rounds of interview" : {type:String},
	tags: {type:[{type:String}]},
	"How would you rate the difficulty level of the questions asked ? (Across rounds)": {type:String},
	"As a student what would you like to see as a feature of the placement portal" : {type:String}	,
	College :{type:String}
});
var templateSchema = new mongoose.Schema({},{strict:false,collection:'formTemplates'});
var formrespSchema = new mongoose.Schema({},{strict:false,collection:'formResponses'})

module.exports.formModel = mongoose.model('FormData',formDataSchema);
module.exports.studentModel = mongoose.model('studentData',studentSchema);
module.exports.compModel = mongoose.model('compData',companySchema);
module.exports.tagModel = mongoose.model('tagData',tagSchema);
module.exports.empModel = mongoose.model('empData',empSchema);
module.exports.tempModel = mongoose.model('tempData',templateSchema);
module.exports.formrespModel = mongoose.model('formrespData',formrespSchema);
module.exports.expModel = mongoose.model('expData',expSchema);