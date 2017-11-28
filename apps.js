// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
const bot = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`LuckyMC`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`LuckyMC`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`LuckyMC`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  //if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    //const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    //message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    //if(!message.member.roles.some(r=>["Fundadores(as)", "Moderadores(as)", "Diretor"].includes(r.name)) )
    //return message.reply("Você não poderá usar isto!");
   // message.channel.send(sayMessage);
 // }
  if (command === "ajuda"){
    message.channel.send('**Comandos:** `+ban (usuario) (motivo)`, `+say (mensagem)`');
  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Fundadores(as)", "Moderadores(as)", "Diretor"].includes(r.name)) )
      return message.reply("Você não poderá usar isto!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Escolha um membro válido!");
      let print = args.slice(1,2).join(' ');
      if (!print)
      return message.reply("Escolha um motivo!");
    let reason = args.slice(2).join(' ');
    if(!reason)
      return message.reply("Especifique uma print!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Ops! ${message.author} Um erro aconteceu! : ${error}`));
      //  ${message.author.tag} because: ${reason}
      message.delete().catch(O_o=>{}); 
      message.channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬')
      message.channel.send(`**Membro banido:** ${member.user.tag}`);
      message.channel.send(`**Autor do Banimento:** ${message.author.tag}`);
      message.channel.send(`**Motivo:** ${reason}`);
      message.channel.send(`**Print:** ${print}`);
      message.channel.send('▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬')
  }
  
});

client.login(config.token);


// package.json
