const logger = require('../utils/logger');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const { commandName } = interaction;
		logger.info(`Replying to ${ commandName } with Pong!`);
		await interaction.reply('Pong!');
	},
};