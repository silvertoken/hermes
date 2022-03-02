const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
	transports: [
		new transports.Console({
			format:format.combine(
				format.timestamp(),
				format.json(),
			),
		}),
	],
	exceptionHandlers: [
		new transports.Console({
			format:format.combine(
				format.timestamp(),
				format.json(),
			),
		}),
	],
	rejectionHandlers: [
		new transports.Console({
			format:format.combine(
				format.timestamp(),
				format.json(),
			),
		}),
	],
});