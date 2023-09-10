const EventEmmiter = require('events')

var url = 'http://mylogger.io/log'

class Logger extends EventEmmiter {

    log (message){
        console.log(message);
    
        this.emit('messageLogged', {id: 1, url: 'https://'}); // Raise an event
    }
    
}


module.exports = Logger;
// module.exports.endPoint = url;