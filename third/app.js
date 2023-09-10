// Syncronous vs Asyncronous
// Syncronous: Blocking

const fs = require('fs');

var dir = fs.readdirSync('./')

console.log(dir)

// Asyncronous: Non-Blocking

fs.readdir('./', function(err, files){

    if(err) console.log('Error', err);
    else console.log('Result', files);
});
