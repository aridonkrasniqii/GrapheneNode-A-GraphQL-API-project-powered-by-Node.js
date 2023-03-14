import { SecUtils } from './../utils/SecUtils';
import { UserService } from './../service/UserService';
import jwt, { decode } from 'jsonwebtoken';

export class AuthMiddleware {
	constructor(private userService: UserService) {}
	authMiddleware = async (req: any) => {
		const token = req.headers.authorization?.replace('Bearer', '').trim();

		try {
			const decoded: any = SecUtils.verifyToken(token);
			return {
				userId: decoded.userId
			};
		} catch (err) {
			console.log(err);
			return {};
		}
	};
}
