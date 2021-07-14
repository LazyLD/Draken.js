const { token } = process.env;
const { Client } = require('discord.js')
const client = new Client()
const WOK = require('wokcommands')
const db = require('quick.db');
const { Bot } = require("aoi.js")
const parse = require('./functions/parse-to-date.js')

const bot = new Bot({
token: token,
prefix: "d!"
})
bot.onMessage()

bot.command({
  name: "eval",
  code: `$onlyForIDs[808098225952653373;]
  $djsEval[$message;yes]`
})

client.login(token)

client.on('ready', () => {
  console.log('Online!')
  
  new WOK(client, {
    commandsDir: 'comandos',
    featuresDir: 'eventos',
    showWarns: false
  }).setDefaultPrefix('d!')
})