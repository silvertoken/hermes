const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// setup a new interactions collection
client.interactions = new Collection();

// setup events
fs.readdir('./events/', (err, files) => {
	const eventHandler = require('./handler/eventHandler');
	eventHandler(err, files, client);
});

client.login(process.env.DISCORD_TOKEN);
