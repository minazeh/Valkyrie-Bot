const attendance = require("../commands/attendance");


module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        
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
            warDate: Sequelize.DATEONLY,
            logKey: Sequelize.STRING,
            
        });
        
        warAttendance.sync();
        //Log Bot's username and the amount of servers its in to console
        console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!!!`);
        
        //Set the Presence of the bot user
        bot.user.setPresence({ activities: [{ name: 'Bobo is currently struggling.'}] });
        
        const cron = require('node-cron');
        
        const recordAttendance = cron.schedule('59 21 * * Thursday,Sunday', () => {
            const channel = bot.channels.cache.get('991264581345345566');
            channel.send('Hey! Taking Discord attendance in 5 seconds. <@&991238733556891758>');
            setTimeout(function(){
                channel.send('?attendance');
            }, 5000);
        },{
            timezone: 'Asia/Singapore'
        });
        
        const recordAttendance15 = cron.schedule('15 22 * * Thursday,Sunday', () => {
            const channel = bot.channels.cache.get('991264581345345566');
            channel.send('Hey! Taking the second Discord attendance in 5 seconds.');
            setTimeout(function(){
                channel.send('?attendance');
            }, 5000);
        },{
            timezone: 'Asia/Singapore'
        });
        
        const removePastSnaps = cron.schedule('*/5 * * * *', () => {
            
            const channelx = bot.channels.cache.get("993540758139322479");
            
            channelx.messages.fetch({ limit: 100 }).then(messages => {
                
                console.log(`Received ${messages.size} messages`);
                
                messages.forEach(msg => {
                    
                    msg.embeds.forEach( embed => {
                        try{
                            timestamp = embed.fields[2].value.split(':');
                            if(timestamp[1] < (Date.now() / 1000)){
                                msg.delete();
                            }
                        } catch {
                            console.log('Error deleting');
                        }
                        
                    })
                    
                });
                
            });
            
            const channelz = bot.channels.cache.get("993474789534605372");
            
            channelz.messages.fetch({ limit: 100 }).then(messages => {
                
                console.log(`Received ${messages.size} messages`);
                
                messages.forEach(msg => {
                    
                    msg.embeds.forEach( embed => {
                        try{
                            timestamp = embed.fields[3].value.split(':');
                            if(timestamp[1] < (Date.now() / 1000)){
                                console.log(embed.title);
                                msg.delete();
                            }
                        } catch {
                            try{
                                timestamp = embed.fields[2].value.split(':');
                                if(timestamp[1] < (Date.now() / 1000)){
                                    msg.delete();
                                }
                            } catch {
                                console.log('Error deleting');
                            }
                        }
                        
                    })
                    
                });
                
            });
            
        },{
            timezone: 'Asia/Singapore'
        });
        
        // When you want to start it, use:
        recordAttendance.start();
        recordAttendance15.start();
        //removePastSnaps.start();
        
    }
}
