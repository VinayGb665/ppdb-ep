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