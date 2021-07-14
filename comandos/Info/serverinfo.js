const { MessageEmbed } = require("discord.js");
const { parse, parseMs, parseDate } = require("../functions/parse-to-date.js");

module.exports = {
  name: "serverinfo",
  callback: ({ client, message, args, text }) => {
    const g = message.guild;
    const { name, id, owner, ownerID, verificationLevel } = g;
    const c = g.channels.cache;
    const r = g.roles.cache;
    const u = g.members.cache;
    const e = g.emojis.cache;
    const cc = g.me;

    const banner = g.bannerURL({ dynamic: true, size: 4096 });
    const icon = g.iconURL({ dynamic: true, size: 4096 });
    const splash = g.splashURL({ dynamic: true, size: 4096 });

    const embed = new MessageEmbed()
      .setThumbnail(g.iconURL({ dynamic: true, size: 1024 }))
      .addField("Nome:", name)
      .addField("ID:", id)
      .addField("Dono:", `${owner.user.username} (\`${ownerID}\`)`)
      .addField(
        "Criado em:",
        `${parseDate(g.createdAt)} (há ${parseMs(g.createdAt)})`
      )
      .addField(
        "Entrei em:",
        `${parseDate(cc.joinedAt)} (há ${parseMs(cc.joinedAt)})`
      )
      .addField(
        `Cargos (total: ${r.size}):`,
        `Cargos: ${r.filter(role => !role.managed).size};\nCargos do sistema: ${
          r.filter(role => role.managed).size
        };`
      )
      .addField(
        `Canais (total: ${c.size}):`,
        `Texto: ${
          c.filter(ch => ch.type == "text" || ch.type == "news").size
        };\nVoz: ${c.filter(ch => ch.type == "voice").size};\nCategoria: ${
          c.filter(ch => ch.type == "category").size
        };`
      )
      .addField(
        `Membros (total: ${u.size}):`,
        `Usuários: ${u.filter(u => !u.user.bot).size};\nBots: ${
          u.filter(u => u.user.bot).size
        };`
      )
      .addField(
        `Emojis (total: ${e.size})`,
        `Emojis estáticos: ${
          e.filter(e => !e.animated).size
        };\nEmojis animados: ${e.filter(e => e.animated).size};`
      )
      .addField(
        `Imagens/Links`,
        `Avatar/Icon URL: ${
          icon ? `[Link](${icon})` : "nenhum"
        };\nBanner URL: ${
          banner ? `[Link](${banner})` : "nenhum"
        };\nSplash URL: ${splash ? `[Link](${splash})  ` : "nenhum"}`
      )
    .setColor("RANDOM");

    if (banner) {
      embed.setImage(banner);
    } else if (splash) {
      embed.setImage(splash);
    }

    message.channel.send(embed);
  }
};
