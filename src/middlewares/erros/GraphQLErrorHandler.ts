import { ApolloError, ValidationError } from 'apollo-server-express';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { createLogger, transports, format } from 'winston';
import { logError } from './ErrorLogger';

interface CastError extends Error {
	path: string;
	value: any;
	kind?: string;
}

interface CustomError extends GraphQLError {
	statusCode?: number;
}

export class GraphQLErrorHandler {
	// generateErrorMessage = (error: CustomError) => {
	// 	switch (error.statusCode) {
	// 		case 401:
	// 			return 'You are not authorized to perform this action';
	// 		case 403:
	// 			return 'Access denied.';
	// 		case 404:
	// 			return 'Resource not found.';
	// 		case 409:
	// 			return 'Resource already exist';
	// 		default:
	// 			return error.message || 'Internal server error.';
	// 	}
	// };
	static handleAuthenticationError = () => {
		const error: CustomError = new GraphQLError(
			`You must be logged in to perform this action`
		);
		error.statusCode = 401;
		logError(error);
		return this.formatError(error);
	};
	static handleAuthorizationError = () => {
		const error: CustomError = new GraphQLError(
			`You are not authorized to perform this action`
		);
		error.statusCode = 403;
		logError(403);
		return this.formatError(error);
	};

	static handleValidationError = (error: ValidationError) => {
		const formattedError: CustomError = new GraphQLError(
			`Validation error: ${error.message}`
		);
		formattedError.statusCode = 400;
		logError(formattedError);
		return this.formatError(error);
	};

	private static formatError = (error: CustomError): GraphQLFormattedError => {
		if (error.originalError instanceof ApolloError) {
			return error;
		}
		if (error.originalError instanceof ValidationError) {
			error.statusCode = 400;
			error.message = `Validation error: ${error.originalError.message}`;
		} else {
			error.statusCode = error.statusCode || 500;
			error.message = error.message || 'Interval server error';
		}

		return error;
	};

	private static handleGraphQLError = (
		error: GraphQLError
	): GraphQLFormattedError => {
		return this.formatError(error);
	};

	private static handleExpressError = (error: any): GraphQLFormattedError => {
		const status = error.status || 500;
		const message = error.message || 'Internal server error';
		const formattedError: CustomError = new GraphQLError(message);
		formattedError.statusCode = status;
		return this.formatError(formattedError);
	};

	static errorHandler = (err: ValidationError | CastError | any) => {
		if (err.originalError instanceof GraphQLError) {
			console.log('First part');
			return this.handleGraphQLError(err.originalError);
		}
		console.log('Second part');
		return this.handleExpressError(err);
	};
}
