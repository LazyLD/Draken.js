const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "level",
  aliases: ["xp"],
  callback: ({ client, message, args, text }) => {
    const { lvl, xp, req } = db.get("rank-" + message.author.id);
    const { username, id, tag } = message.author;

    const embed = new MessageEmbed()
      .setAuthor(tag)
      .addField("Level:", lvl)
      .addField(
        "XP:",
        `${xp}xp (requer ${req}xp; faltam ${req - xp}xp para o próximo nível).`
      )
      .setColor("RANDOM")
      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 4096 }));

    message.channel.send(embed);
  }
};
