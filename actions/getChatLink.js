const { Group } = require('../models')
const HOST = 'https://t.me/joinchat/'

module.exports = async function ({ groupId }) {
    const group = await Group.findOne({where: { id: groupId }, raw: true});
    const link = `${HOST}${group.tg_chat}`;
    return link;
}
