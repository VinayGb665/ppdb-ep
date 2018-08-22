const csvFilePath='../betamap.csv'
const csv=require('csvtojson')
const models =require('../models/model')
let formEntry =models.formModel;
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    jsonObj.forEach((entry)=>{

    	var doc={
    		usn : entry.usn,
			name :entry.name,
			email :entry.email,
			score_gpa: entry.gpa
    	}
    	new formEntry(doc).save((err)=>{
    		if(!err) console.log('Done')
    	});
    	
    });
})
.finally(()=>{
	console.log('Done bois');
})