// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// mongoose.connect('mongodb://127.0.0.1/test');
// var conn = mongoose.connection;
 
// var fs = require('fs');
 
// var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// "use strict";

// callpo = (req,res) => {
//     console.log("came");
//     conn.once('open', function () {
//     console.log('open');
//     var gfs = Grid(conn.db);
    
//  /*
  
//            var writestream = gfs.createWriteStream({
//                 filename: items[i]
//             });
//             fs.createReadStream('CompanyInterviewExperience/'+items[i]).pipe(writestream);
         
//             writestream.on('close', function (file) {
//                 console.log(file.filename + 'Written To DB');
//             });
            
// */
// buf="";

// gfs.files.find({filename:"abco_1.txt"},{}).toArray((err,files)=>{
//     console.log(files)
//     var readstream = gfs.createReadStream({
//         filename: files[0].filename
//     });
//     res.writeHead(200, {
//         "Content-Type": files[0].contentType
//     });
//     readstream.on('data',(chunk) => {
//         buf+=chunk;
//        // console.log('done');
//     })
//    readstream.on('end',() =>{
//        console.log("Done ",buf)
//    })
// });
           
            
// //res.send("pppooop");             
    
// });
// } 
// module.exports.callpo=callpo;