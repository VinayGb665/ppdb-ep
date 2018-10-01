const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const services=require('./services/services');
var bodyParser = require('body-parser')
var cors =require('cors')

express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
   .use( bodyParser.json())
   .use(bodyParser.urlencoded({    
    extended: true
    }))
   .get('/', (req, res) => {
   		res.sendFile(__dirname+'/test.html');

   })

   .get('/formdata',(req,res) => {
   		services.getFormData(req,res);

   })
   
   .post('/signup',(req,res) => {
     
      services.signup(req,res);
   })
   .post('/login',(req,res) => {

      res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
 	
        var result=services.login(req,res);
        res.send(result);
 })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


