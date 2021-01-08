const { Telegraf, session } = require('telegraf')
const I18n = require('telegraf-i18n')
const axios = require('axios')
const path = require('path')

const i18n = new I18n({
  directory: path.resolve(__dirname, 'locales'),
  defaultLanguage: 'ru',
  sessionName: 'session',
  useSession: true,
})

const bot = new Telegraf(process.env.TOKEN)
bot.use(session())
bot.use(i18n.middleware())

bot.start( async (ctx) => {
  ctx.i18n.locale(ctx.message.from.language_code)
  await ctx.replyWithHTML(ctx.i18n.t('start'), {
    disable_web_page_preview: true
  })
})

bot.on('text', async (ctx) => {
  try {
    ctx.i18n.locale(ctx.message.from.language_code)
    let text = ctx.message.text
    const { data } = await axios.get('https://speller.yandex.net/services/spellservice.json/checkText?text='+encodeURI(text))
    if (!data.length) {
      await ctx.replyWithHTML(ctx.i18n.t('noerror'))
    } else {
      for (const { word, s } of data) {
        text = text.replace(word, s[0])
      }
      await ctx.reply(text)
    }
  } catch (error) {
    await ctx.reply(ctx.i18n.t('oops'))
  }
})


bot.launch()
  .then(() => console.log('The bot has been sucessfully started'))