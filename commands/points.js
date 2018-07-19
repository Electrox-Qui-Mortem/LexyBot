const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
const fs = require("fs")
let ppoints = JSON.parse(fs.readFileSync(__dirname + "/../points.json"))
module.exports.run = async function(bot, message, args, points){
    message.delete().catch(O_o=>{})
	let pUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!pUser) return message.channel.send("Couldn't find user.");
    if(points[pUser.id + ''] == undefined){
        points[pUser.id + ''] = {
            points: 0
        }
        fs.writeFile(__dirname + "/../points.json", JSON.stringify(points), (err)=>{
            if (err) console.log(err)
        });
    }
    
    message.channel.send(pUser.user.username + " has " + points[pUser.id + ''].points + " points");
    return points;
}

module.exports.help = {
    name:"points"
}