const config = require('../config.json')
const io = require('socket.io-client').connect(config.server)
const MessageEmitter = require('./Emitters/MessageEmitter')
const MessageListener = require('./Listeners/MessageListener')
MessageEmitter.initialize(io)
MessageListener.initialize(io)