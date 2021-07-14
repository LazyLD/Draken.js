const h = require("hermitpurple").default;
const wikia = new h("tokyorevengers", 1);
const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "wiki",
  callback: ({ client, message, args, text }) => {
    wikia.search(text).then(res => {
      res = res[0];
      res.img =
        res.img.split(/.png|.jpg|.gif/g)[0] +
        "." +
        res.img
          .split(".")
          .find(
            i =>
              i.substr(0, 3) == "png" ||
              i.substr(0, 3) == "jpg" ||
              i.substr(0, 3) == "gif"
          )
          .split("/")[0];

      translate(res.article.substr(0, 2001), { from: "en", to: "pt" }).then(
        r => {
          const embed = new Discord.MessageEmbed()
            .setAuthor(res.title, res.img, res.url)
            .setDescription(
              r.text.length > 2000 ? r.text.substr(0, 1999) + "…" : r.text
            )
            .setImage(res.img)
            .setColor("RANDOM");

          message.channel.send(embed);
        }
      );
    });
  }
};
