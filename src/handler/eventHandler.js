const logger = require('../utils/logger');

module.exports = (err, files, client) => {
	if (err) return logger.error(err);
	files.forEach((file) => {
		const eventFunction = require(`../events/${file}`);
		if (eventFunction.disabled) return;

		const event = eventFunction.event || file.split('.')[0];
		const emitter = (typeof eventFunction.emitter === 'string'
			? client[eventFunction.emitter]
			: eventFunction.emitter) || client;

		const once = eventFunction.once;
		logger.info(`adding event ${ event }`);
		try {
			emitter[once ? 'once' : 'on'](event, (...args) =>
				eventFunction.execute(...args, client));
		}
		catch (error) {
			logger.error(error);
		}
	});
};