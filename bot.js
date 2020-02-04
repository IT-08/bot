const Telegraf = require('telegraf')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const WizardScene = require('telegraf/scenes/wizard');
const session = require('telegraf/session')
const axios = require('axios')


const { leave } = Stage
const { Sequelize, sequelize, GitActivity, Student, Group } = require('./models')
const Op = Sequelize.Op

const registration = new WizardScene(
  'registration',
  ctx => {
    ctx.reply('Введите имя своего GitHub аккаунта');
    return ctx.wizard.next();
  },
  async ctx => {
    let result = '';
    try {
      const username = ctx.message.text.toLowerCase()
      result = await axios.get(`https://api.github.com/users/${ctx.message.text}`);
      ctx.info = { ...ctx.info, github_account: ctx.message.text }
      console.log(ctx.info)
      ctx.reply(`Ваши данные были успешно сохранены.`);
      return ctx.scene.leave();
    } catch (e) {
      console.error(e)
      ctx.reply('Не удалось зарегистрироваться, попробуйте снова');
      await ctx.scene.leave();
      return ctx.scene.enter('registration')
    }
  }
);

const stage = new Stage([registration], { default: 'registration' });



// Create scene manager
// const stage = new Stage()
// stage.command('cancel', leave())

const text = {
  welcome: `Здравствуйте! Это бот для регистрации участников курсов JS-IT 08`,
}

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(async (ctx, next) => {
  const userId = ctx.from.id
  const chatId = ctx.chat.id

  let user =  await Student.findOne({
    where: {
      user_id: userId + '',
      chat_id: chatId + ''
    },
    raw: true,
  })

  const group = await Group.findAll({
    // include: [{
    //   model: Student,
    //   attributes: ['group_id'],
    // }],
    attributes: [
      'id',
      [sequelize.literal('(SELECT COUNT(*) FROM "Students" WHERE "Students".group_id = "Group".id)'), 'StudentsCount'],
    ],
    // attributes: [
    //   'id',
    //   [sequelize.literal('(SELECT COUNT(*) FROM Students WHERE Students.group_id = Group.id)'), 'StudentsCount']
    // ],
    // where: { 'StudentsCount': { [Op.lt]: 25 } },
    // order: ['"StudentsCount"', 'DESC'],
    limit: 1,
  });

  console.log(group);

  if (!user) {
    const createdUser = await Student.create(
      {
        chat_id: chatId,
        user_id: userId,
        group_id: group[0].id,
        info: {
          status: 'unknown',
          stage: 'acknowledge',
        }
      }
    )

    user = createdUser.get()
  }

  ctx.user = user
  ctx.info = ctx.user.info
  console.log('before next')
  await next()

  console.log('after next')

  if (JSON.stringify(ctx.info) !== JSON.stringify(user.info)) {
    console.log('update info', ctx.info)
    await Student.update(
      {
        info: ctx.info
      },
      {
        where: {
          user_id: userId + '',
          chat_id: chatId + '',
        }
      }
    )
  }
})
bot.use(session())
bot.use(stage.middleware());




bot.start((ctx) => ctx.reply(text.welcome))
bot.command('register', ctx => ctx.scene.enter('registration'));

bot.launch()
