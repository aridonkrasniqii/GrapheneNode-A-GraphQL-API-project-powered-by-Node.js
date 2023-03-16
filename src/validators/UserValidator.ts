import { ValidationError } from 'apollo-server-express';
import validator from 'validator';
import { GraphQLErrorHandler } from '../middlewares/erros/GraphQLErrorHandler';

export class UserValidator {
	static validatePassword(password: string) {
		if (!validator.isStrongPassword(password)) {
			return false;
		}
		return true;
	}

	static validateEmail(email: string) {
		if (!validator.isEmail(email)) {
			return false;
		}
		return true;
	}

	static validateTokenFormat = (token: string) => {
		const tokenParts = token.split('.');
		if (
			tokenParts.length === 3 &&
			/^[A-Za-z0-9-_=]+(\.[A-Za-z0-9-_=]+){2}$/.test(token)
		) {
			return true;
		}
		return false;
	};
}
