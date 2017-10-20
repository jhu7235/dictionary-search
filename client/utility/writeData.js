// const fs = require('fs');

// module.exports.writeData = function writeData(path, data) {
//   // var stream = fs.createWriteStream(path);
//   console.log('writing data')
//   if(typeof data === 'object') console.log('data recieved, right here')
//   /* even though we don't have any data to return, we still
//    * need to return a promise to await off of
//    */
//   // return new Promise((resolve, reject) => {
//   //   resolve(
//       // stream.once('open', function() {
//         // stream.write(JSON.stringify(data));
//         // stream.end();
//       // })
//   //   )
//   // });
// }

// module.exports.writeData2 = function writeData2(path, data) {
//   var txtFile = new File(path);
//   txtFile.open("w"); //
//   txtFile.write(data);
//   txtFile.close();
// }
