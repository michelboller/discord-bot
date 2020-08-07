require('dotenv').config();
const Discord = require('discord.js');
const got = require('got')
const string = require('string')

const bot = new Discord.Client();

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.login(process.env.DISCORD_TOKEN);

bot.on('message', async msg => {
    if (msg.content === '!ping') {
        msg.reply('pong');

        //const response = await got('http://localhost:3333')
        //msg.reply(response.body)
    }
    if (string(msg.content).contains('!clima')) {
        //msg.reply('Conectando ao servidor')
        const {
            s: cidade
        } = string(msg.content).replaceAll('!clima ', '')
        if (cidade === 'entre nós') {
            msg.reply('Eu sou o Tanenbaum, eu só amo computadores e processadores')
            return
        }
        try {
            const appid = 'f17f5d50598f71565958e51b0575b845'
            const unidade = 'metric'
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade},br&appid=${appid}&units=${unidade}`

            const response = await got(url)
            const rf = JSON.parse(response.body)
            msg.reply(`
City: ${rf.name}
Temperature: ${rf.main.temp} °C
Weather: ${rf.weather[0].main}`)
        } catch (error) {
            msg.reply(`Erro: ${error}`)
        }


    }
})