const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    message.delete().catch(O_o=>{})
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) return message.channel.send("Couldn't find user.");
	if(!message.member.hasPermission("BAN_MEMBERS") && message.author.id != owner) return message.channel.send("Sorry you don't have permission");
	if(message.author.id == bUser.id){
		return message.channel.send("Lol no you can't ban yourself")
	}
	if(bUser.id == bot.user.id){
		return message.channel.send("Lol no")
	}
	if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("This Member can't be banned");
	let bReason = args.join(" ").slice(22) || "None Given";
	let banEmbed = new Discord.RichEmbed()
        .setDescription("Bans")
	    .setColor("#e56b00")
	    .addField("Banned User", `${bUser.user.username} with ID: ${bUser.id}`)
	    .addField("Banned By", `${message.author.username} with ID: ${message.author.id}`)
	    .addField("Channel", message.channel)
	    .addField("Banned At", message.createdAt)
	    .addField("Reason", bReason);
	let banschannel = message.guild.channels.find('name', 'modlogs');
	if(!banschannel) return message.channel.send("Couldn't find modlogs channel.");
	message.guild.member(bUser).ban(bReason);
	banschannel.send(banEmbed);
}

module.exports.help = {
    name:"ban"
}