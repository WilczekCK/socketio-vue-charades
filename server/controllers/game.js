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
    wordToAnswer: undefined,
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

        this.wordToAnswer = word;
        setTimeout(function(){
            that.isPlayerDrawing = false;
            io.emit('NEXT_ROUND');

        }, 60000)
    },
    isDrawingPlayerOnline: function() {
        if(this.isPlayerDrawing && _.isEmpty(users.findOnlineUser(this.drawingPlayer.id))){
            chat.onSend({
                username: 'GAME',
                message: `Sadly, drawing player quitted, rolling another player! (If 2 >= players are online) `,
                type: 'system__message'
            })
    
            this.isPlayerDrawing = false;
            io.emit('NEXT_ROUND');
        }
    },
    checkIfWordIsProper: function({username, message, type}, userId){
        if(userId !== this.drawingPlayer.id){

            if(message.toLowerCase() === this.wordToAnswer.toLowerCase() ){
                chat.onSend({
                    username: 'GAME',
                    message: `Congratulations! ${username} guessed the word and gain 1 point!`,
                    type: 'system__message'
                })
        
                this.isPlayerDrawing = false;
                io.emit('NEXT_ROUND');
            }else{
                //game.ifWordSimilarGiveTip()
            }
        }
    }
}

module.exports = gameIO;