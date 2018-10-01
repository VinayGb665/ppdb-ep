'use strict';

const models =require('../models/model')
let formModel =models.formModel;
let stuModel =models.studentModel;
var crypto = require('crypto');


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
		var hash = services.md5(data.password+data.usn.toString().substr(data.usn.length -3));

		stuModel.findOne({"usn":data.usn},function(err,results){
			if(err) res.send(err);
			
			if(results.password==hash){
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.send("true");
			}
			else{
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.send("false");
			}
			
		});
		
	},
	md5 :(string) =>{
		return crypto.createHash('md5').update(string).digest('hex');
	}


}
module.exports =services;