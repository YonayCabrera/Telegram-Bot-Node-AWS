var axios = require('axios');
var cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');
const token = '552695781:AAG8YbqNC18BzwEnjwSXlq4Ayx74kna1Arc';
var url = "https://resultados.as.com/quiniela/2017_2018/jornada_"

const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/find (.+)/, (msg, match) => {
    //     console.log(msg.chat.text);
    //     //promesas.push(getPage(parseInt(msg.text)));
    const chatId = msg.chat.id;
    const [command, index] = msg.text.split(' '); // Array destructuring ['/find', '44']
    getPage(index)
        .then((result) => {
            console.log(result);
            const message = result.reduce((res, game) => {
                return res += `${game['1']} - ${game['2']}: ${game.finalizado}\n`;
            }, '');
            return bot.sendMessage(chatId, message)
        });
});

var array = [];

function getPage(index) {
    return axios.get(url + index)
        .then(response => {
            return getJornada(response.data);
        })
}

function getJornada(reponse) {
    const $ = cheerio.load(reponse);
    var jornadas = [];
    var a = $(".cont-partido").each((index, element) => {
        var jornada = {};
        // console.log(index,$(element).text());
        if (index < 14) {
            jornada["1"] = $(element).find($(".partido .local")).text().replace(/\n/g, "").trim();
            jornada["2"] = $(element).find($(".partido .visitante")).text().replace(/\n/g, "");
            jornada.finalizado = $(element).find($(".pronostico.finalizado")).text();
            array.push(jornada);
        } else {
            //console.log($(element).find($(".partido")).text().replace(/\n/g, ""));
        }
        jornadas.push(jornada);
    });
    return jornadas;
}