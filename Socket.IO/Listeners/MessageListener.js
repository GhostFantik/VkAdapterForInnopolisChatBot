const WebSocketMessageHandler = require('../../WebSocketMessageHandler')

exports.initialize = function(io) {
    io.on('send_message', socket => {
        WebSocketMessageHandler.sendMessage(socket);
    })
}