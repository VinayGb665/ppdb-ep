const csvFilePath='../betamap.csv'
const csv=require('csvtojson')
const models =require('../models/model')
let formEntry =models.formModel;
let compEntry =models.compModel;
/*csv()
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
*/

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