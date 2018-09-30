const models =require('../models/model')
let formModel =models.formModel;
let stuModel =models.studentModel;
let services ={
	getFormData : (req,res)=>{
		formModel.find({},{_id:0},function(err,data){
			if(!err) res.send(data);
		});
	},
	signup : (req,res) =>{
		res.send(req.body);
	}


}
module.exports =services;