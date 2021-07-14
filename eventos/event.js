const { MessageEmbed } = require("discord.js");
const talkedRecently = new Set();
const db = require("quick.db");
const moment = require("moment-timezone");

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
  function checkTime(user, guild, t) {
    const member = guild.members.cache.get(user.id.toString());
    const hora_atual = moment(Date.now()).tz("America/Sao_Paulo");

    const data = moment(user.createdAt).tz("America/Sao_Paulo");

    const tempo = moment.duration(hora_atual.diff(data)).asDays();

    if (tempo < t) {
      member.kick(client.user.username + " Anti Raid");
    }
  }

  client.on("message", async message => {
    if (message.author.bot) return;

    if (talkedRecently.has(message.author.id)) {
    } else {
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 10000);

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

  client.on("guildMemberAdd", async member => {
    const { user } = member;
    const welcome_channel = client.channels.cache.get("861680076893585498");

    checkTime(user, guild, 1);

    welcome_channel.send(
      `**╔═══════❖•⋆ ⋆ ✦ ⋅ ✩ ⋅ ✦ ⋆ ⋆•❖═══════╗\n\n💥𝕊𝕖𝕛𝕒 𝕓𝕖𝕞 𝕧𝕚𝕟𝕕𝕠(𝕒) 𝔸𝕠 𝕞𝕦𝕟𝕕𝕠 𝕕𝕠𝕤 𝕕𝕖𝕝𝕚𝕟𝕢𝕦𝕖𝕟𝕥𝕖𝕤.\n\n╚═══════❖•⋆ ⋆ ✦ ⋅ ✩ ⋅ ✦ ⋆ ⋆•❖═══════╝**\n\n**<:bajibleh:862869315149234227> 𝒔𝒆𝒋𝒂 𝒃𝒆𝒎 𝒗𝒊𝒏𝒅𝒐 𝒂𝒐 𝒏𝒐𝒔𝒔𝒐 𝒔𝒆𝒓𝒗𝒊𝒅𝒐𝒓 𝒅𝒆 𝒓𝒑 ${user}, 𝒄𝒓𝒊𝒆 𝒔𝒖𝒂 𝒉𝒊𝒔𝒕𝒐𝒓𝒊𝒂 𝒏𝒐 𝒎𝒖𝒏𝒅𝒐 𝒅𝒐𝒔 𝒅𝒆𝒍𝒊𝒏𝒒𝒖𝒆𝒏𝒕𝒆𝒔, 𝒔𝒆 𝒅𝒊𝒗𝒊𝒓𝒕𝒂 𝒄𝒐𝒎 𝒎𝒆𝒎𝒃𝒓𝒐𝒔 𝒅𝒂 𝒔𝒖𝒂 𝒈𝒂𝒏𝒈, 𝒆 𝒅𝒆𝒇𝒆𝒏𝒅𝒂 𝒔𝒆𝒖 𝒕𝒆𝒓𝒓𝒊𝒕𝒐𝒓𝒊𝒐**\n\n**<:mitsuyaokhand:864731520839974922> 𝒍𝒆𝒊𝒂 𝒂𝒔 𝒓𝒆𝒈𝒓𝒂𝒔 (<#862138955860410408>) 𝒑𝒂𝒓𝒂 𝒏ã𝒐 𝒔𝒆𝒓 𝒑𝒖𝒏𝒊𝒅𝒐, 𝒆 𝒄𝒂𝒔𝒐 𝒕𝒆𝒏𝒉𝒂 𝒂𝒍𝒈𝒖𝒎𝒂 𝒅𝒖𝒗𝒊𝒅𝒂 𝒑𝒓𝒂 𝒄𝒓𝒊𝒂𝒓 𝒔𝒆𝒖 𝒑𝒆𝒓𝒔𝒐𝒏𝒂𝒈𝒆𝒎 𝒑𝒂𝒔𝒔𝒆 𝒏𝒐 𝒕𝒖𝒕𝒐𝒓𝒊𝒂𝒍 (<#861680127879807027>)**\n\nhttps://media.discordapp.net/attachments/862854709321007134/864730564531453952/791228a8beb42125218780e02c5ee40a-1.gif`
    );
  });
};
