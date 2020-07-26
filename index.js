const TelegramBot = require("node-telegram-bot-api");
var cron = require("node-cron");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;

let chatids = [];
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


//『／start』
bot.onText(/\/start/, (msg, match) => {
  console.log("chatids: ")
  console.log(chatids)
  const chatid = msg.chat.id;
  if (chatids.indexOf(chatid) > -1) {
    bot.sendMessage(chatid, "you are already registered in the list");
  } else {
    chatids.push(chatid);
    bot.sendMessage(chatid, "starting for you");
  }
});


//『／stop』
bot.onText(/\/stop/, (msg, match) => {
  const chatid = msg.chat.id;
  if (chatids.indexOf(chatid) > -1) {
    chatids = chatids.filter(e => e !== chatid);
    bot.sendMessage(chatid, "stop subscribing for you");
  } else {
    bot.sendMessage(chatid, "You are not in the list");
  }
});
// Listen for any kind of message. There are different kinds of
// messages.

cron.schedule("0 9 * * *", () => {
  //get chat ID that I am in
  chatids.map(chatid => {
    const now = new Date();
    const nowDate = now.toLocaleDateString();
    bot.sendMessage(
      chatid,
      "Are you coming home for dinner tonight? (" + nowDate + ")",
      {
        reply_markup: {
          keyboard: [["Yes (" + nowDate + ")"], ["No (" + nowDate + ")"]]
        }
      }
    );
  });
},{
   scheduled: true,
   timezone: "Asia/Irkutsk"
 });

