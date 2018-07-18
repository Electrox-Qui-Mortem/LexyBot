const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require('discord.js');
const auth = require('./auth.json');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection
const prefix = auth.prefix;
fs.readdir(__dirname + "/commands/", function(err, files){
	if(err) console.log(err);
	let jsFile = files.filter(f => f.split(".").pop() === "js")
	if(jsFile.length <= 0){
		console.log("Couldn't find commands.");
		return;
	}
	jsFile.forEach(function(f, i){
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`)
		bot.commands.set(props.help.name, props);
	})
})
bot.on("ready", async function(){
	if(bot.guilds.size < 1)
		console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
	else
		console.log(`${bot.user.username} is online`);
	bot.user.setActivity("with your soul");
})

bot.login(auth.token[1]);
bot.on("message", async function(message){
	if(message.author.bot) return
	if(message.channel.type === 'dm') return
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(cmd.startsWith('!')){
		if(commandfile) commandfile.run(bot, message, args)
	}
});
