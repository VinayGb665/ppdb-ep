const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const services=require('./services/services');
var bodyParser = require('body-parser')
var cors =require('cors')

express()
.options('/login', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  .all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
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
        res.setHeader("Access-Control-Allow-Origin", '(https?://(?:.+\.)?mywebsite\.com(?::\d{1,5})?)$');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
			
        //var result=services.login(req,res);
        res.json({"pass":result})
 })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


