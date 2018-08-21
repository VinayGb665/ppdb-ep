var express =require('express')
var app= express();

app.get('/',{
	res.send('papp db api live');
});

app.listen('3000',function(err,res){
	if(!err) console.log('Success');
})
