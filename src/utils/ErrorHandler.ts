import { ApolloError } from 'apollo-server-express';

interface CastError extends Error {
	path: string;
	value: any;
	kind?: string;
}

interface ValidationError extends Error {
	errors: Record<string, any>;
}

class ErrorHandler {
	private handleCastError = (error: CastError) => {
		const message = `Invalid ${error.path}: ${error.value}`;
		throw new ApolloError(message, 'GRAPHQL_VALIDATION_FAILED');
	};

	private handleValidationError = (error: ValidationError) => {
		const message = Object.values(error.errors).map(el => el.message);
		throw new ApolloError(`
				Invalid input: ${message.join(',')}, 'GRAPHQL_VALIDATION_FAILED'
    `);
	};

	errorHandler = (err: ValidationError | CastError | any) => {
		if (err.name === 'CastError') {
			this.handleCastError(err as CastError);
		}
		if (err.name === 'ValidationError') {
			this.handleValidationError(err as ValidationError);
		}
		throw err;
	};
}
