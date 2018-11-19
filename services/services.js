var jsonexport = require('jsonexport');
const models =require('../models/model')
let formModel =models.formModel;
let stuModel =models.studentModel;
let compModel =models.compModel;
let tagModel =models.tagModel;
let empmodel =models.empModel;
let expModel =models.expModel;
let tempmodel =models.tempModel;
let formrespmodel = models.formrespModel;
var crypto = require('crypto');
var async = require('async');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
       keyFilename: 'seventh-carport-195914-89a6e0348a9c.json'
});
var bucket = gcs.bucket('abcra');

var sess
let services ={
	getFormData : (req,res)=>{
		if(req.query.usn){
			var query = {usn :req.query.usn}
		}
		else if(req.query.email){
			var query ={email:req.query.email}

		}
		else{
			var query={}
		}
		formModel.find(query,{_id:0},function(err,data){
			if(!err) res.send(data);
		});
	},
	signup : (req,res) =>{
		var data = req.body	;
		if(data.hasOwnProperty('name') && data.hasOwnProperty('email') && data.hasOwnProperty('password') && data.hasOwnProperty('usn')){
			data.password = services.md5(data.password+data.usn.substr(data.usn.length-3));
			
			stuModel.find({"usn":data.usn},function(err,results){
				res.setHeader("Access-Control-Allow-Origin", "*");
  				res.setHeader('Access-Control-Allow-Methods', '*');
  				res.setHeader("Access-Control-Allow-Headers", "*");
 			

				if(err) res.send(err);
				
				if(results.length==0){
					var newreg = new stuModel(data);
					
					newreg.save(function(err){
						if(err) res.send(err);
						res.send("Saved");		
					});

				}
				else{
					res.send("Exists");
				}
			});

		}
	},
	login : (req,res) =>{
		var data = req.body;
		console.log(req.body);
		if(data.usn && data.password){
		var hash = services.md5(data.password+data.usn.toString().substr(data.usn.length -3));

		stuModel.findOne({"usn":data.usn},function(err,results){
			res.setHeader("Access-Control-Allow-Origin", "*");
  			res.setHeader('Access-Control-Allow-Methods', '*');
  			res.setHeader("Access-Control-Allow-Headers", "*");
 			if(err) res.send(err);
			if(results) {
				if(results.password==hash){
					sess=req.session;
					sess.email=results.email;
					res.send(true);
				};
			}
			else res.send("error");
		});
	}
	else{
		res.send(200,"Wrong data format");
	}
	},
	md5 :(string) =>{
		return crypto.createHash('md5').update(string).digest('hex');
	},
	getcompdata :(req,res) =>{
		compModel.find({},{"_id":0},function(err,results){
			res.send(results);
		})
	},
	getplacementdata :(req,res) =>{
		if(req.query.usn){
			formModel.find({usn:{$regex:new RegExp(req.query.usn,"i")}},{_id:0,__v:0,email:0,score_gpa:0},function(err,data){
				if(!err){ 
					if(data) res.send(data);
					else res.send({"error":"no such record"});
				}
			});
		}
		else{
			res.send(422);
		}
	},
	addnewcompany : (req,res) =>{
		var comp = new compModel(req.body);
		
		comp.save((err) => {
			if(!err) res.send(true);
			else res.send(err);
		})

	},
	gettagdata : (req,res) => {
		var data = req.query;
		//	console.log(data);
		if(data.company && data.tags){
			var query={company:{$in:data.company},tags:{$in:data.tags}}
		}
		else if(data.company){
			var query={company:data.company}
		}
		else if(data.tags){
			var query={tags:{$in:[data.tags]}}
		}
		else{
			var query = {};
		}
		tagModel.find(query,
			{_id:0,filename:1},
			(err,results) => {
				if(err) res.send(err)
				else {
					services.testAsync(res,results.map((u) => { return "CompanyInterviewExperience/"+u.filename;}));
				}
			});

	},
	renderFiles : (res,data) => {
		res.send(services.testAsync(data));	

	},
	testAsync: (res,files) => {
		
		async.map(files, fs.readFile, function (err, data) {
			if(err) console.log(err);
			else{
				var buf="";
			for(var i = 0, l = data.length ; i < l ; i++) {
				buf+="{"+data[i].toString()+"}";
			}
			res.send(buf);
		}});
	
	},
	emplogin : (req,res) => {
		var data =req.body;
		if(data.password && data.username){
			var hash = services.md5(data.password+data.username);
			empmodel.findOne({username:data.username},function(err,results){
				if(err || !results){
					res.send({"status":"error"});
				}
				else{
					if(results.password==hash){
						sess =req.session;
						sess.employee = true;
						sess.isAdmin=results.isAdmin;
						res.send({"status":"success","isAdmin":results.isAdmin});
					}
					else{
						res.send({"status":"failed"})
					}
					
				}
			})
		}
		else{
			res.send(422);
		}

	},
	updateStudentStatus : (req,res) => {
		var data = req.body;
		sess = req.session;
		if(sess.isAdmin){
			
			if(data.usn ) {
				formModel.update({usn:data.usn.toString().toUpperCase()},{$set:{company:data.company,fte_status:data.FTE,intern_status:data.Internship}},{upsert:true},function(err){
					if(!err) res.send({"status":"success"})
					else res.send({"status":err});
				})
			}
		}
		else{
			res.send(401)
		}
	},
	listemployeees : (req,res) => {
		empmodel.find({},{_id:0,username:1},(err,results) => {
			if(err) res.send(err);
			else res.send(results);
		});
	},
	addemployee : (req,res) => {
		sess = req.session;
		if(sess.isAdmin){
			var empdoc=req.body;
			var hash = services.md5(req.body.password+req.body.username);
			empdoc.password=hash;
			
			empdoc =new empmodel(empdoc);
			console.log(empdoc);
			empdoc.save((err,results) => {
				if(!err) res.send({"status":"success"})
				else res.send (err);
			})
		}
		else{
			res.send(401,'Unauthorized');
		}
},
	listcomps : (req,res) => {
		tagModel.distinct('company',(err,comps) => {
			if(!err) res.send(comps)
			else res.send(err);
		});
	},
	listtags : (req,res) => {
		tagModel.distinct('tags',(err,tags) =>{
			if(!err) res.send(tags)
			else res.send(err);
		})
	},
	saveTemplate : (req,res) => {
		var doc =new tempmodel(req.body);
		tempmodel.findOneAndUpdate({company:doc.company},req.body,{upsert: true, new: true, runValidators: true},(err,results) =>{
			if(!err) res.send('True');
			else res.send(err);
		});
	},
	getTemplate : (req,res) =>{
		var company=req.query.company;
		tempmodel.find({'company':company},(err,results) => {
			if(!err) res.send(results)
			else res.send(err)
		})
	},
	saveformresponse : (req,res) => {
		var doc = new formrespmodel(req.body);
		doc.save((err,results) => {
			if(!err) {
				formModel.updateOne({usn:doc.usn},{$push:{registered:[doc.company]}},(err,result) => {
					if(!err) res.send({"status":"success"});
					else res.send(err);
					
				});
				
			}
			else res.send(err);
		});
	},
	getformresponses : (req,res) => {
		sess =req.session;
	//	if(sess.isAdmin){
			// formrespmodel.findOne({"company":req.body.company}, (err,results) => {
			// 	if(!err) res.send(results)
			// 	else res.send(err)
			// });
	//	}
	//	else{
	//		res.send(401);
	//	}
	formrespmodel.aggregate([{$match:{"company":req.query.company}},{ $lookup : { from :'formData', localField:'usn', foreignField:'usn',as:'abs' } },{$project :{ "usn":0 }},{
		$replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$abs", 0 ] }, "$$ROOT" ] } }
	 },{ $project: { abs: 0 ,_id:0} }],(err,results) => {
		 if(!err) {	
			 jsonexport(results,{rowDelimiter: ','}, (err,csv) => {
				 if(!err) {
					res.setHeader('Content-Type', 'text/csv');
					res.send(csv);
				}
				 else res.send(err);
			 })
		 }
		 else res.send(err);
	 })
	},
	updateprofile : (req,res) => {
		//console.log(req.files);
		if(req.body.files){
		var newfname = services.md5(req.files.resume.originalFilename+req.usn)
		fs.writeFile(newfname+".pdf", req.files.resume,function(err){
			if(err) throw new Error(err);
		});

		bucket.upload(newfname+".pdf",(err,file) => {
			if(!err) {
				var formd = req.body;
				formd.fhash = newfname;
				formModel.findOneAndUpdate({usn:req.body.usn},formd,{upsert: false, new: true, runValidators: true},(err,results) =>{
					if(!err) { 
							res.send('True'); 
					}
					else res.send(err);
				});
			
			}
			else res.send(err);
		
		})
	}
		else{
			var formd = req.body;
			
			formModel.findOneAndUpdate({usn:req.body.usn},formd,{upsert: false, new: true, runValidators: true},(err,results) =>{
				if(!err) { 
						res.send('True'); 
				}
				else res.send(err);
			});
		
		}

	},
	getexpdata : (req,res) => {
		var data = req.query;
		var query = {}
		//	console.log(data);
		if(data.company){
			query.company=data.company;
		}
		if(data.tags){
			query.tags ={in:data.tags};
		}
		if(data.college){
			query.College=data.college;
		}
		console.log(query)
		expModel.find(query,
			(err,results) => {
				if(err) res.send(err)
				else {
					res.send(results);
				}
			});

	}




}
module.exports =services;