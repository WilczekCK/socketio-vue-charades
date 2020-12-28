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
        this.drawingPlayer = users.getRandomPlayer();
        this.isPlayerDrawing = true;
        io.emit('IS_PLAYER_SELECTED');

        chat.onSend({
            username: 'GAME',
            message: `Player which will draw is: ${this.drawingPlayer.username}, wait till he select the word!`,
            type: 'system__message'
        })
    },
    startRound: function (word) {
        var that = this;

        setTimeout(function(){
            that.isPlayerDrawing = false;
            io.emit('NEXT_ROUND');

        }, 60000)
    },
    isDrawingPlayerOnline: function() {
        if(this.isPlayerDrawing){
            const isOnline = users.findOnlineUser(this.drawingPlayer.id);

            if(_.isEmpty(isOnline)){
                console.log('Drawing player quitted, rolling again!');

                chat.onSend({
                    username: 'GAME',
                    message: `Sadly, drawing player quitted, rolling another player! `,
                    type: 'system__message'
                })
    
                this.isPlayerDrawing = false;
                io.emit('NEXT_ROUND');
            }

        }
    }
}

module.exports = gameIO;