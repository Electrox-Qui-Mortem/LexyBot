const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    message.delete().catch(O_o => {})
    let umUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!umUser) return message.channel.send("Couldn't find user.");
    if (!message.member.hasPermission("MANAGE_ROLES") && message.author.id != owner) return message.channel.send("Sorry you don't have permission");
    let umuterole = message.guild.roles.find(`name`, `muted`);
    umUser.removeRole(umuterole.id)
    let umuteEmbed = new Discord.RichEmbed()
        .setDescription("Mutes")
        .setColor("#ffff07")
        .addField("Unmuted User", `${umUser.user.username} with ID: ${umUser.id}`)
        .addField("Unmuted By", `${message.author.username} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Unmuted At", message.createdAt);
    let umuteschannel = message.guild.channels.find('name', 'modlogs');
    if (!umuteschannel) return message.channel.send("Couldn't find modlogs channel.");
    umuteschannel.send(umuteEmbed);
}

module.exports.help = {
    name:"unmute"
}