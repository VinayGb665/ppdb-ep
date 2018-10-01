const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const services=require('./services/services');
var bodyParser = require('body-parser')


express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
   .use( bodyParser.json()) 
   .use(allowCrossDomain)
   .all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
   .use(bodyParser.urlencoded({    
    extended: true
    }))
   .use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    })
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
    
    services.login(req,res);
 })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


