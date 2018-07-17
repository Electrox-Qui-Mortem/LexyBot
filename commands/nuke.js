const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    message.channel.fetchMessages()
    .then(function(list){
        message.channel.bulkDelete(list);
    }, function(err){
        message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
    })
}

module.exports.help = {
    name:"nuke"
}