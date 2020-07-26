// const { Telegraf } = require('telegraf')

// const bot = new Telegraf()
// bot.start((ctx) => ctx.sendPoll('Do you come back for dinner tonight?',['yes','no'],{is_anonymous:false}))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch()

const TelegramBot = require("node-telegram-bot-api");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.

bot.on("message", msg => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  const now = new Date()
  const nowDate = now.toLocaleDateString()
  bot.sendMessage(msg.chat.id, "Are you coming home for dinner tonight? ("+nowDate+")", {
"reply_markup": {
    "keyboard": [["Yes ("+nowDate+")"],  ["No ("+nowDate+")"]]
    }
});
  // bot.sendMessage(chatId, 'Received your message');
});
