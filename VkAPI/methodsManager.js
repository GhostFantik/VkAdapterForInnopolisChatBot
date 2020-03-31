const axios = require('axios')
const config = require('../config')

async function sendMethod(method, parameters) {
    let params = '';
    for (let key in parameters) {
        params += `${key}=${parameters[key]}&`;
    }
    let sRequest = `https://api.vk.com/method/${method}` +
        `?${params}` +
        `access_token=${config.Vk.access_token}` +
        `&v=${config.Vk.version} `;
    sRequest = encodeURI(sRequest);
    try {
        const response = await axios.get(sRequest);
        return response.data;
    } catch (e) {
        console.error(e);
    }
};
exports.getLongPollServer = async function () {
    const data = await sendMethod('groups.getLongPollServer',
        {group_id: config.Vk.group_id});
    return data;
};
/**
 *
 * @param obj
 * @param obj.key Key
 * @param obj.server Server
 * @param obj.ts TS
 */
exports.startLongPollServer = async function (obj) {
    const response = await axios.get(`${obj.server}?act=a_check&key=${obj.key}&ts=${obj.ts}&wait=${config.Vk.LPAwait}`);
    return response.data;
};
/**
 *
 * @param obj
 * @param obj.id userId
 * @param obj.text Text
 * @param obj.chatId ChatId
 * @param keyboard Keyboard
 * @returns {Promise<void>}
 */
exports.sendMessage = async function(obj, keyboard={}){
    const jsonKeyboard = JSON.stringify(keyboard);
    if (obj.id === undefined)
        obj.id = '';
    if (obj.chatId === undefined)
        obj.chatId = '';
    const response = await sendMethod('messages.send', {
        peer_id : obj.id,
        chat_id: obj.chatId,
        random_id : Math.floor(Math.random() * 9000000),
        message : obj.text,
        keyboard: jsonKeyboard,
    });
    return response;
};

exports.getUser = async function (id, fields='', nameCase='norm') {
    const response = await sendMethod('users.get', {
        user_ids: id,
        fields: fields,
        name_case: nameCase,
    });
    return response;
};
