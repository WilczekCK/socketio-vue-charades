const io = require('../socket');
class User{
    constructor(id, username, points){
        this.id = id;
        this.username = username;
        this.points = points;
    }
}

let onlineList = [];
const userIO = {
    User: (id, username, points) => new User(id, username, points),
    getPlayerList: () => onlineList,
    findOnlineUser: (id) => { 
        const result = onlineList.filter(function(player) { 
            return player.id === id
        })
        
        return result;
    },
    onConnect: (id, username) => {
        console.log(`User ${id} connected`)

        onlineList = [...onlineList, new User(id, username, 0)];

        io.emit('MESSAGE', {
            username: username,
            message: 'just joined! Say "Hi!" to welcome new player :)',
            type:'joined__message'
        })

        io.emit("PLAYER_LIST_UPDATE");
    },
    onDisconnect: (id) => {
        console.log(`User ${id} disconnected`)

        onlineList = onlineList.filter(function(player) {
            return player.id !== id;
        })
        
        io.emit("PLAYER_LIST_UPDATE");
    },
    givePointToUser: function (id) {
        let player = this.findOnlineUser(id);
        player[0].points += 1;
    },
    getRandomPlayer: function() {
        let keys = Object.keys( onlineList );
        return onlineList[keys[ keys.length * Math.random() << 0]];
    }
}

module.exports = userIO;