import DiscordJS, { Channel, Intents, Interaction, Message, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import { Response } from './response';
dotenv.config();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

let channel : TextChannel;

client.on('ready', () => {
    console.log('Ready!');
    const guildID = process.env.GUILD_ID?.toString();
    const guild = client.guilds.cache.get(guildID!);
    let commands 
        if(guild){
            commands = guild.commands
        } else {
            commands = client.application?.commands
        }
    commands?.create({
        name: 'help',
        description: 'Displays all commands',
    })
    channel = guild?.channels.cache.get(process.env.CHANNEL_ID?.toString()!) as TextChannel;
});

 client.on('interactionCreate', async (interaction) => {
     if(!interaction.isCommand()) {
         return;
     }

    const {commandName, options} = interaction
    
        if(commandName === 'help') {
            interaction.reply({
                content: 'Here is the function of the bot.',
                ephemeral: true,
            })
        }
    })

client.on('messageCreate', (message) => {
    if(message.content === 'test') {
        message.reply({
            content: 'pass',
        });
    }
});

const query = '(surrey OR guildford OR newton OR fleetwood OR whalley OR delta)' +
                ' AND (shoot OR shot OR kill OR gun OR murder OR rape OR' + 
                'stab OR threaten OR assault OR attack OR die OR harass)' +
                ' AND canada';

function getNews() {
    const date = new Date();
    date.setHours(date.getHours() - 1);

    newsapi.v2.everything({
        q: query,
        from: date.toISOString(),
    }).then((response: Response) => {
        console.log(response);
        if(response.totalResults > 0){
            channel.send(response.articles[0].url);
        }
    });
}

client.login(process.env.TOKEN);

const cron = require('node-cron');

cron.schedule('0 * * * *', () => {
    getNews();
});
