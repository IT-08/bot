const { Sequelize, sequelize, GitActivity, Student, Group } = require('../models')
const Op = Sequelize.Op
const GROUP_LIMIT = 25;

module.exports = async function ({ userId, chatId }) {
  let user =  await Student.findOne({
    where: {
      user_id: userId + '',
      chat_id: chatId + ''
    },
    raw: true,
  })

  if (!user) {
    const group = await Group.findAll({
      attributes: [
        'id',
        [sequelize.literal('(SELECT COUNT(*) FROM "Students" WHERE "Students".group_id = "Group".id)'), 'StudentsCount'],
      ],
      raw: true,
    });

    const avaliableGroups = group
      .filter(el => parseInt(el.StudentsCount) < GROUP_LIMIT)
      .sort((a,b) => a.index - b.index)

    const createdUser = await Student.create(
      {
        chat_id: chatId,
        user_id: userId,
        group_id: avaliableGroups[0].id,
        info: {
          status: 'unknown',
          stage: 'acknowledge',
        }
      }
    )

    user = createdUser.get()
  }

  return user;
}
