const Sequelize = require('sequelize');

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
    warDate: Sequelize.DATEONLY
    
});

module.exports = {
    config: {
        name: "attendance",
        description: "Get the discord attendance of the guild during war.",
        usage: `!attendance`,
    },
    async run(bot, message, args) {
        
        try {
            
            const { MessageEmbed } = require('discord.js');
            
            const CHA = message.member.voice.channel;
            const list = bot.guilds.cache.get(message.guild.id);
            let memberList = list.members.cache;
            
            let count = 1;
            let attendance_array = '\n';
            let attendance_arrayCont = '\n';
            let absentArray = '\n';
            let absentArrayCont = '\n';
            let absentCount = 1;
            
            //  Set present members
            for (const member of CHA.members) {
                if (count <= 50) {
                    attendance_array = attendance_array + '' + count + '. ' + member[1].displayName + '\n';
                } else {
                    attendance_arrayCont = attendance_arrayCont + '' + count + '. ' + member[1].displayName + '\n';
                }
                
                
                
                const memberName = member[1].displayName;
                const memberStatus = 'Online';
                
                warAttendance.create({
                    characterName: memberName,
                    activityStatus: memberStatus,
                    warDate: Date.now(),
                });
                
                console.log(`Member ${memberName} is online.`);
                
                count++;
                
            }
            
            //  Set absent members
            let updatedMemberList = filterArray(memberList, CHA.members);
            for (const arrayItem of updatedMemberList) {
                
                if(arrayItem[1].roles.cache.map(r => r.name).includes("Guild Member")){
                    
                    if (absentCount <= 40) {
                        absentArray = absentArray + '' + absentCount + '. ' + arrayItem[1].displayName + '\n';
                    } else {
                        absentArrayCont = absentArrayCont + '' + absentCount + '. ' + arrayItem[1].displayName + '\n';
                    }
                    
                    const memberName = arrayItem[1].displayName;
                    const memberStatus = 'Offline';
                    
                    warAttendance.create({
                        characterName: memberName,
                        activityStatus: memberStatus,
                        warDate: Date.now(),
                    });
                    
                    console.log(`Member ${memberName} is offline.`);
                    
                    absentCount++;
                    
                }
                
            }
            const total_count = count - 1;
            const total_absent = absentCount - 1;
            
            const attendance_record = new MessageEmbed()
            .setTitle('War of Emperium Attendance:')
            .setColor(0xff0000);
            
            //  Check if attendance is greater than 50.
            attendance_record.addField('Online Guild Members: ' + total_count + ' Members Online', attendance_array);
            if (count > 50) {
                attendance_record.addField('Continuation...', attendance_arrayCont)
            }
            
            //  Check if absents are greater than 50.
            attendance_record.addField('Offline Guild Members: ' + total_absent + ' Members Offline', absentArray);
            if (absentCount > 50) {
                attendance_record.addField('Continuation...', absentArrayCont);
            }
            
            //message.channel.send({ embeds: [attendance_record] });
            
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