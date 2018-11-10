const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const services=require('./services/services');
var bodyParser = require('body-parser')
var cors =require('cors')
var session = require('express-session');

express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
   .use(session({secret: 'og-pineapple-kush'}))
   .use( bodyParser.json())
   .use(bodyParser.urlencoded({    
    extended: true
    }))
   .get('/', (req, res) => {
   		res.sendFile(__dirname+'/test.html');

   })

   .get('/formdata',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    
   		services.getFormData(req,res);

   })
   
   .post('/signup',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    
      services.signup(req,res);
   })
   .post('/login',(req,res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");

        services.login(req,res);
        //res.send(result);
 })

   .get('/compdata',(req,res) => {
      //res.send('Ok coming ')
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");

      services.getcompdata(req,res);
   })
   .get('/placement',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.getplacementdata(req,res);
   })
   .post('/placement',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.updateStudentStatus(req,res);
   })
   .post('/addnewcomp',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.addnewcompany(req,res); 
   })
   .get('/gettaggeddata', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.gettagdata(req,res);
   })
   .post('/emplogin', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.emplogin(req,res);
   })
   .get('/listemp',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.listemployeees(req,res);
   })
   .get('/listcomp',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.listcomps(req,res);
   })
   .get('/listtags',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    console.log("SMDD ",process.env);
    services.listtags(req,res);
   })
   
   .post('/addemp',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.addemployee(req,res);
   })
   .post('/savetemplate', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.saveTemplate(req,res); 
   })
   
   .post('/gettemplate', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.getTemplate(req,res); 
   })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


