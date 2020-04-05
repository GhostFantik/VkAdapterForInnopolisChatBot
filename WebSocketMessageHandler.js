const LP = require('./VkAPI/LongPollServer')
const methodsManager = require('./VkAPI/methodsManager')
const MessageEmitter = require('./Socket.IO/Emitters/MessageEmitter')

LP.on('message_new', data => {
    msg = {
        from: 'vk',
        author: data.object.user_id,
        text: data.object.body,
    }
    MessageEmitter.newMessage(msg)
})
exports.sendMessage = function(data) {
    if (data.type === 'text') {
        methodsManager.sendMessage({
            id: data.user_id,
            text: data.message.content,
        })
    }
}