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
    onConnect: (id, username) => {
        console.log(`User ${id} connected`)

        onlineList = [...onlineList, new User(id, username, 0)];

        io.emit('SYSTEM_MESSAGE', {
            user: username,
            message: 'just joined! Say "Hi!" to welcome new player :)',
            role:'joined_info'
        })

        io.emit("PLAYER_CONNECTED_INFO", username);
        io.emit("PLAYER_LIST_UPDATE");

    },
    onDisconnect: (id) => {
        console.log(`User ${id} disconnected`)
        
        io.emit("PLAYER_LIST_UPDATE");

        onlineList = onlineList.filter(function(player) {
            return player.id !== id;
        })
    }
}

module.exports = userIO;