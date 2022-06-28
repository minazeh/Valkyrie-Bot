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
    }
}
