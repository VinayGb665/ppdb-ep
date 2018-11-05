'use strict';

const models =require('../models/model')
let formModel =models.formModel;
let stuModel =models.studentModel;
let compModel =models.compModel;
let tagModel =models.tagModel;
let empmodel =models.empModel;
var crypto = require('crypto');
var async = require('async');
const fs = require('fs');

let services ={
	getFormData : (req,res)=>{
		formModel.find({},{_id:0},function(err,data){
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
		if(!data.usn || !data.password){
		var hash = services.md5(data.password+data.usn.toString().substr(data.usn.length -3));

		stuModel.findOne({"usn":data.usn},function(err,results){
			res.setHeader("Access-Control-Allow-Origin", "*");
  			res.setHeader('Access-Control-Allow-Methods', '*');
  			res.setHeader("Access-Control-Allow-Headers", "*");
 			if(err) res.send(err);
			if(results) res.send(results.password==hash);
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
			var query={company:data.company,tags:{$in:[data.tags]}}
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
				buf+="{"+data[i].toString()+"}\\n\\n";
				//console.log( data[i].toString(),data.length );
			}
			res.send(buf);
		}});
	
	},
	emplogin : (req,res) => {
		var data =req.body;
		if(data.password && data.username){
			var hash = services.md5(data.password+data.username);
			empmodel.findOne({username:data.username},function(err,results){
				if(err || results.length==0){
					res.send(JSON.parse({"status":"error"}));
				}
				else{
					if(results.password==hash){
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
		if(data.name && data.email && data.company)
	}


}
module.exports =services;