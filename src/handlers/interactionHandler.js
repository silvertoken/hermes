const logger = require('../utils/logger');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = async (err, files, client) => {
	if (err) return logger.error(err);

	client.interactionsArray = [];
	files.forEach((file) => {
		const interaction = require(`../interactions/${file}`);
		logger.info(`Adding interaction ${ interaction.data.name }`);
		client.interactions.set(interaction.data.name, interaction);
		client.interactionsArray.push(interaction.data.toJSON());
	});

	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

	(async () => {
		try {
			logger.info('Refreshing command list');
			const guildIds = await client.guilds.cache.map((guild) => guild.id);
			const clientId = await client.user.id;
			guildIds.forEach(async (guildId) => {
				await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
					body: client.interactionsArray,
				});
			});

			logger.info('Successfully refreshed command list');
		}
		catch (error) {
			logger.error(error);
		}
	})();
};