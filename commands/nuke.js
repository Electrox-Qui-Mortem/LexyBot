const Discord = require("discord.js");
const auth = require('../auth.json');
const owner = auth.ownerid;
module.exports.run = async function(bot, message, args){
    let toNuke = (parseFloat(args[0]) + 1).toString();
    message.delete().catch(O_o => {});
    message.channel.fetchMessages({limit:toNuke})
    .then(function(list){
        message.channel.bulkDelete(list);
    }, function(err){
        
    })
    .then(function(){
        message.channel.send(`Successfully deleted ${parseFloat(args)} messages`);
    },function(err){
        message.channel.send("ERROR: ERROR CLEARING CHANNEL.");
        console.log(err)
    });
}

module.exports.help = {
    name:"nuke"
}