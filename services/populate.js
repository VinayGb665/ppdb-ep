const models =require('../models/model')
const fs =require('fs');
var csv=require('csvtojson')
let formEntry =models.formModel;
let compEntry =models.compModel;
let expEntry = models.expModel;
fte_arr=["T3","T2","T1","Hanging in there"];
fs.readdir('services/experience',(err,items) => {
    for(i=0;i<items.length;i++){
        var csvFilePath=__dirname+'/experience/'+items[i]
        var name = items[i]
        
         csv()
        .fromFile(csvFilePath)


        .then((jsonObj)=>{
            
            jsonObj.forEach((entry)=>{

                 var doc={
                     company: name.split(' - ')[1].split('.')[0],
                     Date :entry.Date,
                     "How man rounds of interview" :entry["How man rounds of interview"] ,
                     tags: entry.Tags.split(","),
                    "How would you rate the difficulty level of the questions asked ? (Across rounds)": entry["How would you rate the difficulty level of the questions asked ? (Across rounds)"],
                    "As a student what would you like to see as a feature of the placement portal" : entry["As a student what would you like to see as a feature of the placement portal"]	,
                    College :entry.College
                 }
                 var exp = new expEntry(doc);
                 exp.save((err) => {
                     if(!err) console.log("saved");
                     else console.log(err);
                 })

            });
            }
        )

console.log(items[i]);

}});
/*




csv()
.fromFile(csvFilePath)


.then((jsonObj)=>{
    jsonObj.forEach((entry)=>{
        
    	var doc={
    		Date :entry.Date,
	"How man rounds of interview" :entry["How man rounds of interview"] ,
	tags: entry.tags//,
	// "How would you rate the difficulty level of the questions asked ? (Across rounds)": {type:String},
	// "As a student what would you like to see as a feature of the placement portal" : {type:String}	,
	// College :{type:String}

        }
    console.log(doc);
    // 	new formEntry(doc).save((err)=>{
    // 		if(!err) console.log('Done')
    // 	});
    	
    // });
}).then(()=>{
	console.log('Done bois');
});

/*
'use strict';

const fs = require('fs');
const models =require('../models/model');
let tagModel = models.tagModel;
let rawdata = fs.readFileSync(__dirname+'/tagging/scraped_data_info/revised_tags.json');  
let student = JSON.parse(rawdata);  
for(var doc of student.tags){
    console.log(doc.company);
    var tagEntry={};
    for(var key in doc){
        tagEntry[key] = doc[key]
    }
    console.log(tagEntry.company);
    tagEntry =new tagModel(tagEntry);
   
    tagEntry.save((err,data) => {
        if(err) console.log("Fuked UP",err,tagEntry);
        else console.log("done",doc.company);
    });
    
    //break;
    
}
*/
/*
/// -------------------------------------------------  Populating Experience data (Uploading) --

var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_7rl6zx62:9llvcjkd2m40q80u3f2r5dn6hu@ds229732.mlab.com:29732/heroku_7rl6zx62');
var conn = mongoose.connection;
 
var fs = require('fs');
 
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;


conn.once('open', function () {
    console.log('open');
    var gfs = Grid(conn.db);
 
    fs.readdir('CompanyInterviewExperience', function(err, items) {
        for(i=0;i<items.length;i++){
           var writestream = gfs.createWriteStream({
                filename: items[i]
            });
            fs.createReadStream('CompanyInterviewExperience/'+items[i]).pipe(writestream);
         
            writestream.on('close', function (file) {
                console.log(file.filename + 'Written To DB');
            });
            
            
            
           
        }         
    });
        
    
});

/// -------------------------------------------------------------------------------- 
*/
/*
const csvFilePath='./betamap.csv'
const csv=require('csvtojson')
const models =require('../models/model')
let formEntry =models.formModel;
let compEntry =models.compModel;
fte_arr=["T3","T2","T1","Hanging in there"];
csv()
.fromFile(csvFilePath)

.then((jsonObj)=>{
    jsonObj.forEach((entry)=>{
        
    	var doc={
    		usn : entry.usn,
			name :entry.name,
			email :entry.email,
            score_gpa: entry.gpa ,
            intern_status : Math.random()*100 >=35,
            fte_status : fte_arr[Math.floor(Math.random()*4)],
            blacklisted :Math.random()*100 >=90

        }
   //     console.log(doc);
    	new formEntry(doc).save((err)=>{
    		if(!err) console.log('Done')
    	});
    	
    });
}).then(()=>{
	console.log('Done bois');
});
*/
/*
var mockArray =[{
    "Name":"Whatfix",
    "address":"443, 17th Cross Road, Sector 4, HSR Layout, Bengaluru, Karnataka 560102",
    "GPA" : "OPEN",
    "JD" : "NA",
    "JobStatus" : "Full Time Employment + Internship (Mandatory)",
    "Compensation" : "9 to 11 LPA"
},
{
    "Name":"OOMPA",
    "address":"443, 17th Cross Road, Sector 4, HSR Layout, Bengaluru, Karnataka 560102",
    "GPA" : "OPEN",
    "JD" : "NA",
    "JobStatus" : "Full Time Employment + Internship (Mandatory)",
    "Compensation" : "1 to 2 LPA"
},

{
    "Name":"LOOMPA",
    "address":"443, 17th Cross Road, Sector 4, HSR Layout, Bengaluru, Karnataka 560102",
    "GPA" : "OPEN",
    "JD" : "NA",
    "JobStatus" : "Full Time Employment + Internship (Mandatory)",
    "Compensation" : "8 to 60 LPA"
}];
mockArray.forEach((doc) => {
    var entry =new compEntry(doc);
    entry.save((err) => {
        if(!err ) console.log("done");
    })
});
*/
