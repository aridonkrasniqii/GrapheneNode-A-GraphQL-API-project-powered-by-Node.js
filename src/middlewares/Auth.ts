import { IUser } from './../interfaces/IUser';
import { NextFunction, Request } from 'express';
import { SecUtils } from './../utils/SecUtils';
import { UserService } from './../service/UserService';
import jwt, { decode, JwtPayload } from 'jsonwebtoken';
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

		if (!SecUtils.validateTokenFormat(token)) {
			throw new Error('Invalid token format');
		}

		if (!token) {
			throw new AuthenticationError('Invalid/Expired token');
		}
		try {
			const payload = await SecUtils.verifyToken(token);
			req.payload = payload;
		} catch (err) {
			next(new Error(err as any));
		}

		next();
	};
}
