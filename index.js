var express =require('express')
var app= express();
app.listen('3000',function(err,res){
	if(!err) console.log('Success');
})

app.get('/',function(req,res){
	res.send("papp db api live")
});

