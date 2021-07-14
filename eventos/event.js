const { MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
const db = require("quick.db");

function get(id) {
  return db.get("rank-" + id);
}

function set(id, value) {
  return db.set("rank-" + id, value);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = (client, instance) => {
  client.on("message", async message => {  
    
    if(message.author.bot) return;
    
    if (talkedRecently.has(message.author.id)) {
    } else {
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 10000)

      var user = get(message.author.id);

      if (!user) {
        set(message.author.id, {
          lvl: 1,
          xp: 0,
          req: 500
        });
      }

      user = get(message.author.id);

      db.add(`rank-${message.author.id}.xp`, getRandomInt(7, 10));
      if (get(message.author.id).xp >= get(message.author.id).req) {
        user.xp = 0;
        user.lvl = user.lvl + 1;
        user.req = user.req + 300;

        set(message.author.id, user);

        const canal = client.channels.cache.get("862141664746274837");

        canal.send(
          `**⋆ ⋆ ✦ ⋅ ✩ ⋅ ✦ ⋆ ⋆\n<:mikeywow:862088286385733632> Parabéns ${message.member}, você upou de nível! \n<:drakenhappy:862162871433297931> Agora está no nível ${user.lvl}\n<:plushmitsuya:862163102693982219>continue aproveitando nosso rp para upar cada vez mais!!!\n⋆ ⋆ ✦ ⋅ ✩ ⋅ ✦ ⋆ ⋆**\n\n╔╦════╦╗\nhttps://gfycat.com/waterypreciousborderterrier\n╚╩════╩╝`
        );
      }
    }
  });
};
