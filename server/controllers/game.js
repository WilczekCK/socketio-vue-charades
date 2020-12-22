const io = require('../socket');
const users = require('./users');

const gameIO = {
    drawingPlayer: {
        username: undefined,
        id: null,
        points: null
    },
    //isPlayerDrawing: () => username ? true : false,
    rollPlayer: function() {
        this.drawingPlayer = users.getRandomPlayer();
    }
}

module.exports = gameIO;