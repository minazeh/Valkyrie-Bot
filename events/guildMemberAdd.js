module.exports = {
    name: 'guildMemberAdd',
    execute(member, bot) {
        //Log the newly joined member to console
        console.log('A new member named ' + member.user.tag + ' has joined the server!');

        //Find a channel named welcome and send a Welcome message
        member.guild.channels.cache.find(c => c.name === "welcome-to-paradox").send('Welcome '+ member.user.toString() + '!\n\nPlease fill in the following details on <#991277740374368345>:\n\nIn-game Name:\nFacebook Name:\nMain GVG Class:\n\nThanks and welcome to Paradox!')
    }
}