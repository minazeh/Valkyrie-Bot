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
        console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers! --`);
        
        //Set the Presence of the bot user
        bot.user.setPresence({ activities: [{ name: 'Bobo is currently struggling.'}] });
        
        const cron = require('node-cron');
        
        const recordAttendance = cron.schedule('59 21 * * Thursday,Sunday', () => {
            const channel = bot.channels.cache.get('991264581345345566');
            channel.send('Hey! Taking Discord attendance in 5 seconds. <@&991238733556891758>');
            setTimeout(function(){
                channel.send('?attendance');
            }, 5000);
        });
        
        const recordAttendance15 = cron.schedule('15 22 * * Thursday,Sunday', () => {
            const channel = bot.channels.cache.get('991264581345345566');
            channel.send('Hey! Taking the second Discord attendance in 5 seconds.');
            setTimeout(function(){
                channel.send('?attendance');
            }, 5000);
        });
        
        // When you want to start it, use:
        recordAttendance.start();
        recordAttendance15.start();
        
        const channel = bot.channels.cache.get('991270269832405043');
        channel.send('Started scheduled discord attendance logging.');  
        
    }
}
