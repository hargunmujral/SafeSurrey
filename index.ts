import DiscordJS, { Intents, Interaction } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log('Ready!');

    const guildID = '929889176097275924'
    const guild = client.guilds.cache.get(guildID)
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

client.login(process.env.TOKEN);