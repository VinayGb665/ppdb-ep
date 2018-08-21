// var express =require('express')
// var app= express();
// app.listen('3000',function(err,res){
// 	if(!err) console.log('Success');
// })

// app.get('/',function(req,res){
// 	res.send("papp db api live")
// });

const express = require('express')
// const path = require('path')
 const PORT = process.env.PORT || 5000

express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(5000, () => console.log(`Listening on 5000`))
