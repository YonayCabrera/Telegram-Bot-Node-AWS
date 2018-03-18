var url = "https://resultados.as.com/quiniela/2017_2018/jornada_44/"
var axios = require('axios');
var cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const token = '552695781:AAG8YbqNC18BzwEnjwSXlq4Ayx74kna1Arc';

const bot = new TelegramBot(token, { polling: true });

function getUrl() {
    return axios.get('http://thecatapi.com/api/images/get?format=xml&type=gif')
        .then(response => {
            const $ = cheerio.load(response.data);
            var url = $('url').text();
            return url;
        })
}

const commands ={
    '/cat' : (msg,response) => bot.sendMessage(msg.chat.id,response)
}

bot.on('message', (msg) => {
    getUrl().then(response => {
        const text = msg.text;
        const [command, ...args]=msg.text.split(' ');
        commands[command](msg,response)
    })
});

