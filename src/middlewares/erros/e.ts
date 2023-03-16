// class GraphQLErrorHandler {
// 	constructor() {
// 		this.errors = [];
// 	}

// 	formatError(error) {
// 		return {
// 			message: error.message,
// 			code: error.originalError ? error.originalError.code : null,
// 			path: error.path,
// 			locations: error.locations,
// 			stack: error.stack ? error.stack.split('\n') : []
// 		};
// 	}

// 	handle(error) {
// 		if (error.extensions && error.extensions.exception) {
// 			const exception = error.extensions.exception;

// 			if (exception.name === 'MongoError') {
// 				this.errors.push({
// 					message: 'An error occurred while accessing the database.',
// 					code: 'DATABASE_ERROR',
// 					originalError: error
// 				});
// 			} else if (exception.name === 'AuthenticationError') {
// 				this.errors.push({
// 					message:
// 						'Authentication error. You must be logged in to perform this action.',
// 					code: 'AUTHENTICATION_ERROR',
// 					originalError: error
// 				});
// 			} else if (exception.name === 'AuthorizationError') {
// 				this.errors.push({
// 					message:
// 						'Authorization error. You do not have permission to perform this action.',
// 					code: 'AUTHORIZATION_ERROR',
// 					originalError: error
// 				});
// 			} else {
// 				this.errors.push({
// 					message: 'An unknown error occurred.',
// 					code: 'UNKNOWN_ERROR',
// 					originalError: error
// 				});
// 			}
// 		} else {
// 			this.errors.push({
// 				message: 'An unknown error occurred.',
// 				code: 'UNKNOWN_ERROR',
// 				originalError: error
// 			});
// 		}
// 	}

// 	hasErrors() {
// 		return this.errors.length > 0;
// 	}

// 	getErrors() {
// 		return this.errors.map(error => this.formatError(error));
// 	}
// }
