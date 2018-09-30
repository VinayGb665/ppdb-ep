const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const services=require('./services/services');
express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
   .get('/', (req, res) => {
   		res.send('Live')

   })

   .get('/formdata',(req,res) => {
   		services.getFormData(req,res);

   })
   
   .get('/signup',(req,res) => {
      services.signup(req,res);
   })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


