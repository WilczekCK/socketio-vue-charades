const io = require('../socket');
const users = require('./users')
const chat = require('./chat');
const _ = require('underscore');
const gameIO = {
    drawingPlayer: {
        username: undefined,
        id: null,
        points: null
    },
    isPlayerDrawing: false,
    rollPlayer: function() {
        this.isPlayerDrawing = true;
        this.drawingPlayer = users.getRandomPlayer();

        chat.onSend({
            username: 'GAME',
            message: `Player which will draw is: ${this.drawingPlayer.username}, wait till he select the word!`,
            type: 'system__message'
        })

        setTimeout(function(){
            isPlayerDrawing = false;
        }, 10000)
    }
}

module.exports = gameIO;