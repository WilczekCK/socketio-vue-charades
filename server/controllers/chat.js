const io = require('../socket');

class Message{
    constructor(username, message, type){
        this.username = username;
        this.message = message;
        this.type = type;
    }
}

const chatIO = {
    onSend: ({username, message, type}) => io.emit('MESSAGE', {username, message, type})
}

module.exports = chatIO;