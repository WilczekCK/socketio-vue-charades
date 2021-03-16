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
    blackboard: {
        circles: [],
        rects:  [],
        stars: [],
        rings: [],
    },
    wordToAnswer: undefined,
    isPlayerDrawing: false,
    getAnswerTimeoutInstance: null,
    checkShapesForOptimization: function(newShape, blackboardArrayName){
        const blackboardUsedShapeArray = this.blackboard[blackboardArrayName+'s'];

        this.blackboard[blackboardArrayName+'s'] = _.reject(
            blackboardUsedShapeArray,
            function(paint){
                return (
                    newShape.x === paint.x && newShape.y === paint.y && newShape.size >= paint.size && paint != blackboardUsedShapeArray[blackboardUsedShapeArray.length-1]
                    ||  
                        //Instructions below are for recognizing, that smaller element is under bigger element
                        //IMPORTANT, for now works only for the same element, what it means?
                        //Example: rect cannot remove the circle under him and vice-versa...
                        ( (newShape.x - (newShape.size/2)) <= (paint.x - paint.size/2) && (paint.x + paint.size/2) <= (newShape.x + (newShape.size/2))                     
                        &&  newShape.size >= paint.size && paint != blackboardUsedShapeArray[blackboardUsedShapeArray.length-1] && newShape.brush !== 'ring')
                            &&
                        ( (newShape.y - (newShape.size/2)) <= (paint.y - paint.size/2) && (paint.y + paint.size/2) <= (newShape.y + (newShape.size/2))
                        &&  newShape.size >= paint.size && paint != blackboardUsedShapeArray[blackboardUsedShapeArray.length-1] && newShape.brush !== 'ring')
                    );
            }
        )
    },
    pushShapeToBlackboard: function({x, y, size, color, isPlaceholder, brush}) {
        isPlaceholder ? this.blackboard[brush+'s'].pop() : this.checkShapesForOptimization({x, y, size, color, isPlaceholder, brush}, brush);
        this.blackboard[brush+'s'].push({
            x: parseInt(x),
            y: parseInt(y),
            size: parseInt(size),
            color: color
        });

        io.emit('UPDATE_FE_BLACKBOARD');
    },
    rollPlayer: function() {
        this.drawingPlayer = users.getRandomPlayer();
        this.isPlayerDrawing = true;
        io.emit('IS_PLAYER_SELECTED', {userSelected: this.drawingPlayer });

        chat.onSend({
            username: 'GAME',
            message: `Player which will draw is: ${this.drawingPlayer.username}, wait till he select the word!`,
            type: 'system__message'
        })
    },
    startRound: function (word) {
        io.emit('UPDATE_FE_BLACKBOARD');
        this.blackboard = {
            circles: [],
            rects:  [],
            stars: [],
            rings: [],
        }

        this.wordToAnswer = word;
        const that = this;

        this.getAnswerTimeoutInstance = setTimeout(function(){
            that.isPlayerDrawing = false;

            chat.onSend({
                username: 'GAME',
                message: `Sadly, drawing player did not help you, the round ended `,
                type: 'system__message'
            })
            
            io.emit('NEXT_ROUND');
        }, 60000 * 5)
    },
    isDrawingPlayerOnline: function() {
        if(this.isPlayerDrawing && _.isEmpty(users.findOnlineUser(this.drawingPlayer.id))){
            chat.onSend({
                username: 'GAME',
                message: `Sadly, drawing player quitted, rolling another player! (If 2 >= players are online) `,
                type: 'system__message'
            })
            
            clearTimeout(this.getAnswerTimeoutInstance);
            this.isPlayerDrawing = false;
            io.emit('NEXT_ROUND');
        }
    },
    checkIfWordIsProper: function({username, message, type}, userId){
        if(userId !== this.drawingPlayer.id && this.wordToAnswer){
            switch (message.toLowerCase() === this.wordToAnswer.toLowerCase() ){
                case true:
                    this.playerWon(userId, username, message);
                    clearTimeout(this.getAnswerTimeoutInstance);
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