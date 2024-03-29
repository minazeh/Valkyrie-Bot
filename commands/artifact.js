const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'artifact',
        description: 'Borrow an artifact from the Guild',
        usage: `!artifact`,
    },
    async run (bot,message,args) {
        
        if (!args.length) {
            
            const notificationSquad = new MessageEmbed()
            .setTitle('Paradox Artifacts - Help')
            .setColor(0xFFFF00)
            .setDescription(`${message.author}, please refer below to properly schedule an artifact.`)
            .addField('Artifact Code', 'War Ender (Axe) -- war-ender \n God\'s Gaze (Staff) -- gods-gaze \n Golden Bough (Staff) -- golden-bough \n Mystletainn -- mystletainn')
            .addField('Duration', 'All artifact can be borrowed for 1 day. Borrower must return the assigned artifact before the day ends.')
            .addField('Example', '~artifact war-ender')
            .addField('Note', 'Please only use this command on <#991280226069909574>!');
            
            message.channel.send({ embeds: [notificationSquad] });
            
            return false;
            
        }
        
        if (args == 'war-ender') {
            
            if(message.channel.id === '991280226069909574'){
                
                const total_record = new MessageEmbed()
                .setTitle('Artifact Schedule')
                .setThumbnail('https://i.imgur.com/EFnMcey.png')
                .addField('Artifact', 'War Ender (Axe)', false)
                .addField('Borrower', message.member.displayName, true)
                .addField('\u200B', '\u200B', true)
                .addField('Schedule Date', calculateDateTime(+8), true)
                .addField('Duration', '1 Day')
                .setColor('#5D1ABC')
                .setFooter({ text: 'Generated by ' + message.member.displayName + ' • Always return any artifact borrowed before the next day', iconURL: 'https://i.imgur.com/RQiFqr7.gif' });
                message.channel.send({ embeds: [total_record] });
                message.channel.send('<@&993907911422136462>');
            } else {
                
                message.reply(`Hey ${message.author}, this command is not allowed here. Schedule for an artifact on <#991280226069909574>. `);
                
            }
            
            
            
        } else if (args == 'gods-gaze') {
            
            if(message.channel.id === '991280226069909574'){
                
                const total_record = new MessageEmbed()
                .setTitle('Artifact Schedule')
                .setThumbnail('https://i.imgur.com/pgNU44u.png')
                .addField('Artifact', 'God\'s Gaze (Staff)', false)
                .addField('Borrower', message.member.displayName, true)
                .addField('\u200B', '\u200B', true)
                .addField('Schedule Date', calculateDateTime(+8), true)
                .addField('Duration', '1 Day')
                .setColor('#5D1ABC')
                .setFooter({ text: 'Generated by ' + message.member.displayName + ' • Always return any artifact borrowed before the next day', iconURL: 'https://i.imgur.com/RQiFqr7.gif' });
                message.channel.send({ embeds: [total_record] });
                message.channel.send('<@&993907911422136462>');
                
            } else {
                
                message.reply(`Hey ${message.author}, this command is not allowed here. Schedule for an artifact on <#991280226069909574>. `);
                
            }
            
            
            
        } else if (args == 'golden-bough') {
            
            if(message.channel.id === '991280226069909574'){
                
                const total_record = new MessageEmbed()
                .setTitle('Artifact Schedule')
                .setThumbnail('https://i.imgur.com/cyjnmb7.png')
                .addField('Artifact', 'Golden Bough (Staff)', false)
                .addField('Borrower', message.member.displayName, true)
                .addField('\u200B', '\u200B', true)
                .addField('Schedule Date', calculateDateTime(+8), true)
                .addField('Duration', '1 Day')
                .setColor('#5D1ABC')
                .setFooter({ text: 'Generated by ' + message.member.displayName + ' • Always return any artifact borrowed before the next day', iconURL: 'https://i.imgur.com/RQiFqr7.gif'  });
                message.channel.send({ embeds: [total_record] });
                message.channel.send('<@&993907911422136462>');
                
            } else {
                
                message.reply(`Hey ${message.author}, this command is not allowed here. Schedule for an artifact on <#991280226069909574>. `);
                
            }
            
        } else if (args == 'mystletainn') {
            
            if(message.channel.id === '991280226069909574'){
                
                const total_record = new MessageEmbed()
                .setTitle('Artifact Schedule')
                .setThumbnail('https://i.imgur.com/BtePOMt.png')
                .addField('Artifact', 'Mystletainn (Dagger)', false)
                .addField('Borrower', message.member.displayName, true)
                .addField('\u200B', '\u200B', true)
                .addField('Schedule Date', calculateDateTime(+8), true)
                .addField('Duration', '1 Day')
                .setColor('#5D1ABC')
                .setFooter({ text: 'Generated by ' + message.member.displayName + ' • Always return any artifact borrowed before the next day', iconURL: 'https://i.imgur.com/RQiFqr7.gif'  });
                message.channel.send({ embeds: [total_record] });
                message.channel.send('<@&993907911422136462>');
                
            } else {
                
                message.reply(`Hey ${message.author}, this command is not allowed here. Schedule for an artifact on <#991280226069909574>. `);
                
            }
            
            
            
        }
        
    }
}

function calculateDateTime(offset) {
    // get current local time in milliseconds
    var date = new Date();
    var localTime = date.getTime();
    
    // get local timezone offset and convert to milliseconds
    var localOffset = date.getTimezoneOffset() * 60000;
    
    // obtain the UTC time in milliseconds
    var utc = localTime + localOffset;
    
    var newDateTime = utc + (3600000 * offset);
    
    var convertedDateTime = new Date(newDateTime);
    return convertedDateTime.toLocaleString();
}