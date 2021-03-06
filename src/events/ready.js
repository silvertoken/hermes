const logger = require('../utils/logger');
const fs = require('fs');

module.exports = {
	event: 'ready',
	once: true,
	execute(client) {
		logger.info(`Logged in as ${client.user.tag}!`);
		// handle all interactions after the bot is online so you have access to guild id's
		fs.readdir('./interactions/', (err, files) => {
			const interactionsHandler = require('../handlers/interactionHandler');
			interactionsHandler(err, files.filter(file => file.endsWith('.js')), client);
		});
	},
};