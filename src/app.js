const logger = require('./utils/logger');
const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const package = require('./package.json');

logger.info(`Starting up Hermes v${ package.version } discord bot`);
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// setup a new interactions collection
client.interactions = new Collection();

// setup events
fs.readdir('./events/', (err, files) => {
	const eventHandler = require('./handlers/eventHandler');
	eventHandler(err, files.filter(file => file.endsWith('.js')), client);
});

// login to our servers using the discord token
client.login(process.env.DISCORD_TOKEN);
