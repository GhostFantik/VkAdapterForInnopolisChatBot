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
    else if (data.type == 'keyboard') {
        btns = []
        data.message.keyboard_buttons.forEach(arr => {
            buffer = []
            arr.forEach(btn => {
                buffer.push({
                    action: {
                        type: 'text',
                        label: btn.name
                    },
                    color: btn.color
                })
            });
            btns.push(buffer)
        });
        methodsManager.sendMessage({
            id: data.user_id,
            text: data.message.content,
        },{
            one_time: false,
            inline: data.message.inline,
            buttons: btns
        })
    }
}