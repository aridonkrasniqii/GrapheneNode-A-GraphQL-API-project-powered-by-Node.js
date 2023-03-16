import { createLogger, transports, format } from 'winston';

const logger = createLogger({
	level: 'error',
	format: format.combine(format.timestamp(), format.json()),
	transports: [
		new transports.File({ filename: 'error.log' }),
		new transports.Console()
	]
});

export const logError = (error: any) => {
	logger.error(error);
};
