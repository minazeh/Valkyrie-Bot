const dotenv = require('dotenv');
const { prefix } = require("./config.json");

dotenv.config();

const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const bot = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ] 
});

const fs = require("fs");

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)
    console.log(`${file} loaded`)
    bot.commands.set(props.config.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))

commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`${file} loaded from ${folder}`)
        bot.commands.set(props.config.name, props)
    }
});

// Load Event files from events folder
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot))
    }
}

//Command Manager
bot.on("messageCreate", async message => {
    //Check if author is a bot or the message was sent in dms and return
    
    if(message.channel.type === "dm") return;
    
    //get prefix from config and prepare message so it can be read as a command
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    // detect all message thats being sent to #dump on testing grounds
    if(message.channel.id == '993205836048511068'){
        
        let index = 0;
        let embedArray = message.content.split("\n");
        embedArray.forEach(elem => {
            index++;
        });
        
        if( index == 13 ){
            //enchanted items
            const embedTitle = embedArray[0];
            const embedThumb = embedArray[12].split('URL=')
            const splitedEnchant = embedArray[9].split(':');
            const snapperist = new MessageEmbed()
            .setTitle(embedTitle)
            .setThumbnail(embedThumb[1])
            .addField('Server', embedArray[2])
            .addField('Price', embedArray[4])
            .addField('Enchants', embedArray[6] + '\n' + embedArray[7] + '\n' + embedArray[8] + '\n **' + embedArray[9] + '**')
            .addField('Expiry', embedArray[11])
            .setColor('#5D1ABC');
            
            if( embedArray[9].includes('Anti') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027492920498073620>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Arcane') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027492993025974302>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Arch') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493013850697778>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Breaking') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493069735591986>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Armor') && !embedArray[9].includes('Breaking') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493026421026836>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Blasphemy') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493092682633267>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Divine') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493111087251456>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Insight') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493145832869938>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Magic') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493167257370654>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Morale') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493187201277982>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Blade') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493204423082015>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Sharp') && !embedArray[9].includes('Blade') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493204423082015>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Tenacity') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493462444085258>',  embeds: [snapperist] });
            } else if( embedArray[9].includes('Zeal') ){
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062> <@&1027493516231847937>',  embeds: [snapperist] });
            } else {
                bot.channels.cache.get('1027495470383251476').send({content: embedTitle + ' | ' + splitedEnchant[0] + '\n<@&1027493536985260062>',  embeds: [snapperist] });
            } 
            
        } else if (index == 8 ){
            // rare items
            const embedTitle = embedArray[0];
            const embedThumb = embedArray[7].split('URL=')
            const snapperist = new MessageEmbed()
            .setTitle(embedTitle)
            .setThumbnail(embedThumb[1])
            .addField('Server', embedArray[2])
            .addField('Price', embedArray[4])
            .addField('Expiry', embedArray[6])
            .setColor('#5D1ABC');
            
            bot.channels.cache.get('1027495395342946319').send({content: embedTitle + ' is on market.\n<@&1027493549673033808>',  embeds: [snapperist] });
            
        }
        
    }
    
    //Check for prefix
    if(!cmd.startsWith(prefix)) return;
    
    //Get the command from the commands collection and then if the command is found run the command file
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
    
    
});

//Token needed in config.json
bot.login(process.env.BOT_TOKEN);
