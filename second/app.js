// Using paths module

const path = require('path')

var pathobj = path.parse(__filename)

console.log(pathobj)

// Using OS module

const os = require('os')

var totalMemory = os.totalmem()
var freeMemory = os.freemem()

console.log(`Total Memory: ${totalMemory}`)
console.log(`Free Memory: ${freeMemory}`)