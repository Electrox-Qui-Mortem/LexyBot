const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args) {
    message.delete().catch(O_o => {})
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Couldn't find user.");
    if (!message.member.hasPermission("KICK_MEMBERS") && message.author.id != owner) return message.channel.send("Sorry you don't have permission");
    //if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("This Member can't be kicked");
    let kReason = args.join(" ").slice(22) || "None Given";
    let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kicks")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser.user.username} with ID: ${kUser.id}`)
        .addField("Kicked By", `${message.author.username} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Kicked At", message.createdAt)
        .addField("Reason", kReason);
    let kickschannel = message.guild.channels.find('name', 'modlogs');
    if (!kickschannel) return message.channel.send("Couldn't find modlogs channel.");
    message.guild.member(kUser).kick(kReason).catch(function(err) {
        console.log(err);
    });
    kickschannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick"
}