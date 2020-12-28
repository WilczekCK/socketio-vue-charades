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
    getDrawingPlayer: () => (function(){return this.drawingPlayer})(),
    isPlayerDrawing: false,
    rollPlayer: function() {
        this.drawingPlayer = users.getRandomPlayer();
        io.emit('IS_PLAYER_SELECTED');

        chat.onSend({
            username: 'GAME',
            message: `Player which will draw is: ${this.drawingPlayer.username}, wait till he select the word!`,
            type: 'system__message'
        })
    },
    startRound: function (playerId) {
        this.isPlayerDrawing = true;
        var that = this;

        setTimeout(function(){
            that.isPlayerDrawing = false;
            io.emit('NEXT_ROUND');

        }, 5000)
    }
}

module.exports = gameIO;