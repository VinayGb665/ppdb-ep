const models =require('../models/model')
let formModel =models.formModel;
let services ={
	getFormData : (req,res)=>{
		formModel.find({},{_id:0},function(err,data){
			if(!err) res.send(data);
		});
	}

}
module.exports =services;