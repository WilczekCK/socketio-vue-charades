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
    timeoutInstance: null,
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
        this.wordToAnswer = word;
        const that = this;

        this.timeoutInstance = setTimeout(function(){
            that.isPlayerDrawing = false;
            
            chat.onSend({
                username: 'GAME',
                message: `Sadly, drawing player did not help you, the round ended `,
                type: 'system__message'
            })
            
            io.emit('NEXT_ROUND');
        }, 10000)
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
        if(userId !== this.drawingPlayer.id && this.wordToAnswer){
            switch (message.toLowerCase() === this.wordToAnswer.toLowerCase() ){
                case true:
                    this.playerWon(userId, username, message);
                    clearTimeout(this.timeoutInstance);
                    break;
                case false:
                    this.ifWordSimilarGiveTip(message)
                    break;
            }
        }else{
            return 0;
        }
    },
    playerWon(id, username, message){
        chat.onSend({
            username: 'GAME',
            message: `Congratulations! ${username} guessed the word "${message}" and gain 1 point!`,
            type: 'system__message'
        })

        users.givePointToUser(id);
        users.givePointToUser(this.drawingPlayer.id);

        this.isPlayerDrawing = false;
        io.emit('NEXT_ROUND');
    },
    ifWordSimilarGiveTip: function(word){
        const playerAnswerLetterArray = _.toArray(word);
        const answerLetterArray = _.toArray(this.wordToAnswer);

        const lettersSimilar = _.intersection(playerAnswerLetterArray, answerLetterArray);

        if(lettersSimilar.length >= 2){
            chat.onSend({
                username: 'GAME',
                message: `CLOSE!! - The same letters are: ${lettersSimilar}`,
                type: 'system__message'
            })
        }
    }
}

module.exports = gameIO;