export class AppError extends Error {
	private status;
	private isOperational;
	constructor(public message: string, private statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}
