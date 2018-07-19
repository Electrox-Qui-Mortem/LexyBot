const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    let bicon = bot.user.displayAvatarURL;
	let botembed = new Discord.RichEmbed()
		.setDescription("Bot Information")
		.setThumbnail(bicon)
		.setColor('#000000')
		.addField("Bot Name", bot.user.username)
		.addField("Created On", bot.user.createdAt);
	message.channel.send(botembed);
	return;
}

module.exports.help = {
    name:"botinfo"
}