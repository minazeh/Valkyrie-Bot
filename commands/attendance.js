const Sequelize = require('sequelize');
const { MessageEmbed } = require('discord.js');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});

const warAttendance = sequelize.define('warattendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    characterName: Sequelize.STRING,
    activityStatus: Sequelize.STRING,
    warDate: Sequelize.DATEONLY,
    logKey: Sequelize.STRING,
    
});

module.exports = {
    config: {
        name: "attendance",
        description: "Get the discord attendance of the guild during war.",
        usage: `!about`,
    },
    async run(bot, message, args) {

        if( args == 'help' ){

            const attendance_help = new MessageEmbed()
            .setTitle('Help • Attendance')
            .setTimestamp()
            .setFooter({ text: 'Generated by ' + message.member.displayName, iconURL: 'https://i.imgur.com/QKmGlYv.png' })
            .setColor('RANDOM');

            attendance_help.addField('How the command works?', 'It is quite easy, just do ?attendance and it will save all members that are currently connected to the voice channel and those who aren\'t.\n\n To get further attendance details like all online/offline members:\n Do ?online/offline <id>');
            
            message.channel.send({ embeds: [attendance_help] });

            return false;
        }
        
        try {
            
           
            const CHA = message.guild.members.cache.filter(member => member.voice.channel);
            const list = bot.guilds.cache.get(message.guild.id);
            let memberList = list.members.cache;
            
            let count = 1;
            let absentCount = 1;
            
            const attendanceKey = random(8);
            
            //  Set present members
            for (const onlineMember of CHA) {
                
                if(onlineMember[1].roles.cache.map(r => r.name).includes("Guild Member")){
                    
                    warAttendance.create({
                        characterName: onlineMember[1].displayName,
                        activityStatus: 'Online',
                        warDate: Date.now(),
                        logKey: attendanceKey,
                    });
                    
                    console.log(`Member ${onlineMember[1].displayName} is online.`);
                    
                    count++;
                    
                }
                
            }
            
            //  Set absent members
            let updatedMemberList = filterArray(memberList, CHA);
            for (const offlineMember of updatedMemberList) {
                
                if(offlineMember[1].roles.cache.map(r => r.name).includes("Guild Member")){
                    
                    const memberName = offlineMember[1].displayName;
                    const memberStatus = 'Offline';
                    
                    warAttendance.create({
                        characterName: memberName,
                        activityStatus: memberStatus,
                        warDate: Date.now(),
                        logKey: attendanceKey,
                    });
                    
                    absentCount++;
                    
                }
                
            }
            const total_count = count - 1;
            const total_absent = absentCount - 1;
            
            const attendance_record = new MessageEmbed()
            .setTitle('Paradox • Guild War • Attendance')
            .setThumbnail('https://i.imgur.com/kJWUdAs.png')
            .setAuthor({ name: 'ID #'+attendanceKey })
            .setTimestamp()
            .setFooter({ text: 'Generated by ' + message.member.displayName, iconURL: 'https://i.imgur.com/RQiFqr7.gif' })
            .setColor('RANDOM');

            attendance_record.addField('Online Guild Members: ', total_count + ' Members Online');
            attendance_record.addField('Offline Guild Members: ', total_absent + ' Members Offline');
            attendance_record.addField('\u200B', 'Help: Type ?attendance help');
            
            if( bot.channels.cache.get('991265107034251274').send({ embeds: [attendance_record] })){
                message.reply('War attendance has been taken. You can view it on <#991265107034251274>');
            }
            
        } catch (e) {
            console.log(e);
            message.reply(' Hey! You must be in a voice channel to run this command or I will crash and stop :(');
        } finally {
            
        }
        
    }
    
}

function filterArray(a, b) {
    const c = a.filter(function(objFromA) {
        return !b.find(function(objFromB) {
            return objFromA.id === objFromB.id
        });
    });
    
    return c;
}

const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};