const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'notice',
        description: 'Custom guild notice command',
        usage: `!notice`,
    },
    async run (bot,message,args) {
        
        const notice = new MessageEmbed()
        .setTitle('Paradox • Guild Notice')
        .setThumbnail('https://i.imgur.com/Hbg3dhA.png')
        .setDescription('Attention Paradox Guild Members')
        .addField('Notice Details', 'Good evening <@&991238262066794566>!\nPlease be online by **9:30PM GMT+8** for briefing and preparations.\n\nPrepare early and make sure to follow the guides below!\n\n')
        .setColor('RANDOM')
        .setImage('https://i.imgur.com/fi2pSK6.jpg')
        .setImage('https://i.imgur.com/idpQmLo.jpg')
        .setImage('https://i.imgur.com/TLTS550.jpg')
        .setFooter({ text: 'Automated Guild Notice by Valkyrie Randgris', iconURL: 'https://i.imgur.com/RQiFqr7.gif' });

        bot.channels.cache.get('991268921107816479').send({ embeds: [notice] });
        
    }
}