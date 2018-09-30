var message = "";
var sinon = require('sinon');
var fs = require('fs');
var expect = require('expect');
promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += "my";
        resolve(message);
    }, 2000)
})

promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " first";
        resolve(message);
    }, 3000)
})

promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        message += " promise";
        resolve(message);
    }, 4000)
})

var printResult = (results) => {console.log("Results = ", results, "message = ", message)}

function main() {
    // See the order of promises. Final result will be according to it
    //Promise.all([promise1, promise2, promise3]).then(printResult);
    Promise.all([promise2, promise1, promise3]).then(printResult);
    //Promise.all([promise3, promise2, promise1]).then(printResult);
    console.log("\"\"" + message);


}

main();
var writeFileStub = sinon.stub(fs, 'writeFile').callsFake(function (path, data, cb) {  
  return cb(null)
})

//expect(writeFileStub).to.be.called
writeFileStub.restore()