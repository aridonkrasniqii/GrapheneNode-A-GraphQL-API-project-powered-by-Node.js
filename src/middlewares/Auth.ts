import { UserUtil } from './../utils/UserUtil';
import { UserValidator } from './../validators/UserValidator';
import { NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
interface AuthorizationHeader {
	authorization?: string;
}

export interface MiddlewareRequest {
	payload: JwtPayload | string;
	authorizationHeader?: string;
	headers: AuthorizationHeader;
}

export class AuthMiddleware {
	authMiddleware = async (
		req: MiddlewareRequest,
		_: any,
		next: NextFunction
	) => {
		const authorizationHeader = req?.headers?.authorization;
		// console.log(authorizationHeader);
		if (!authorizationHeader) {
			throw new AuthenticationError('Authorization header must be provided');
		}

		const token = authorizationHeader.split(' ')[1];

		if (!UserValidator.validateTokenFormat(token)) {
			throw new Error('Invalid token format');
		}

		if (!token) {
			throw new AuthenticationError('Invalid/Expired token');
		}
		try {
			const payload = await UserUtil.verifyToken(token);
			req.payload = payload;
		} catch (err) {
			next(new Error(err as any));
		}

		next();
	};
}
