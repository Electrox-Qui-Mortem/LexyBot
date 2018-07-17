const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    message.delete().catch(O_o=>{})
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rUser) return message.channel.send("Couldn't find user.");
	let rReason = args.join(" ").slice(22);
	let reportEmbed = new Discord.RichEmbed()
		.setDescription("Reports")
		.setColor("#15f153")
		.addField("Reported User", `${rUser.user} with ID: ${rUser.id}`)
		.addField("Reported By", `${message.author.username} with ID: ${message.author.id}`)
		.addField("Channel", message.channel)
		.addField("Reported At", message.createdAt)
   	 .addField("reason", rReason);
    let reportschannel = message.guild.channels.find('name', 'modlogs');
    if(!reportschannel) return message.channel.send("Couldn't find modlogs channel.");
    reportschannel.send(reportEmbed);
}
module.exports.help = {
    name:"report"
}