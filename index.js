const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const services=require('./services/services');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var multipart = require('connect-multiparty');
var multipartMiddleware=multipart();

var bodyParser = require('body-parser')
var cors =require('cors')



express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
  // .use(session({}))
   .use(session({
    store: new MongoStore({ url: process.env.MONGODB_URI }),
    secret: 'og-pineapple-kush'
    }))
   .use( bodyParser.json())
   .use(bodyParser.urlencoded({    
    extended: true
    }))
    .use(multipartMiddleware)
    .use(function(req, res, next) {
      var schema = req.headers['x-forwarded-proto'];
    
      if (schema === 'https') {
        // Already https; don't do anything special.
        next();
      }
      else {
        // Redirect to https.
        res.redirect('https://' + req.headers.host + req.url);
      }
    })
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
   
   .get('/gettemplate', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    services.getTemplate(req,res); 
   })
   .post('/updateprofile',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");     
    services.updateprofile(req,res);
   })
   .get('/getexpdata',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");     
    services.getexpdata(req,res);
   })
   .post('/saveformresponse', (req,res) => {
     
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");     
    services.saveformresponse(req,res);
   })
   .get('/getformresponses', (req,res) => {
     
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");     
    services.getformresponses(req,res);
   })
   .post('/pushnotifications', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");     
    services.pushnotification(req,res); 
   })
   .get('/getnotifications', (req,res) => {
     
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");     
     services.getmynotification(req,res);
   })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


