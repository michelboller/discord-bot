require('dotenv').config();
const {
    Client,
    MessageEmbed
} = require('discord.js');
const got = require('got')
const string = require('string')

const bot = new Client();


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
            const appid = process.env.APPID
            const unidade = 'metric'
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade},br&appid=${appid}&units=${unidade}`

            const response = await got(url)
            const rf = JSON.parse(response.body)

            const cEmb = new MessageEmbed()
                .setTitle(`Clima em ${rf.name}`)
                .setDescription(`
Temperature: ${rf.main.temp} °C
Weather: ${rf.weather[0].main}
`)
                .setColor("BLURPLE")
                .setFooter('Made by shaulin#4466')
            let react = await msg.channel.send(cEmb)
            const clima = rf.main.temp
            if (clima >= 29) {
                react.react('🔥')
            } else if (clima >= 25) {
                react.react('🌤')
            } else if (clima <= 23) {
                react.react('☁')
            }

            //             msg.reply(`
            // City: ${rf.name}
            // Temperature: ${rf.main.temp} °C
            // Weather: ${rf.weather[0].main}`)
        } catch (error) {
            msg.reply(`Erro: ${error}`)
        }


    }
    //     if(msg.content === '!ajuda'){
    //         msg.se
    //     }
})