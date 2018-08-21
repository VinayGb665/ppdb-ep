const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = process.env.MONGODB_URI;
express()
  // .use(express.static(path.join(__dirname, 'public')))
  // .set('views', path.join(__dirname, 'views'))
  // .set('view engine', 'ejs')
   .get('/', (req, res) => {
   		MongoClient.connect(url, function (err, db) {
		  if (err) {
		    res.send('Unable to connect to the mongoDB server. Error:', err);
		  } else {
			res.send('Db API live');

		    // do some work here with the database.

		    //Close connection
		    db.close();
		  }
});
   		}
   	)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


