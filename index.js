const LP = require('./VkAPI/LongPollServer')
// ONLY FOR TESTING
LP.on('message_new', data => {
    console.log(data)
});
async function main() {
    await LP.start()
    console.log('LP is finished!')
}
main()
console.log()