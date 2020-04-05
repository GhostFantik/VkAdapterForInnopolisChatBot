exports.initialize = function(io) {
    exports.newMessage = function(msg) {
        io.emit('new_message', msg)
    }
}