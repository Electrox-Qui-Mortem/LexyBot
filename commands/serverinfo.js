const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    let sicon = message.guild.iconURL;
	let serverembed = new Discord.RichEmbed()
		.setDescription("Server Information")
		.setThumbnail(sicon)
		.setColor('#000000')
		.addField("Server Name", message.guild.name)
		.addField("Created On", message.guild.createdAt)
		.addField("You joined at", message.member.joinedAt)
		.addField("Total Members", message.guild.memberCount)
	message.channel.send(serverembed);
	return
}

module.exports.help = {
    name:"serverinfo"
}