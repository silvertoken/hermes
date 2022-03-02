const logger = require('../utils/logger');

module.exports = {
	event: 'interactionCreate',
	execute: async (interaction, client) => {
		if (!interaction.isCommand()) return;
		logger.info(`received command ${ interaction.commandName }`);
		const command = client.interactions.get(interaction.commandName);

		if (!command) {
			logger.error(`${ command } is not a valid command`);
			return;
		}

		try {
			logger.info(`execute command ${ command.data.name }`);
			await command.execute(interaction, client);
		}
		catch (error) {
			logger.error(error);
			await interaction.reply({
				content: 'failed to execute command!',
				ephemeral: true,
			});
		}
	},
};