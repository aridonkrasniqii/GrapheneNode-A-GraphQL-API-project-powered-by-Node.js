import { IUser } from '../interfaces/IUser';
// import { AppError } from './ErrorHandler';
import { Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { promisify } from 'util';
import crypto from 'crypto';

declare module 'dotenv';

export class UserUtil {
	static generateHash = async (password: string) => {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(password, salt);
	};

	static compare = async (password: string, hashed: string) => {
		return bcrypt.compare(password, hashed);
	};

	static signToken = (id: number) => {
		const secret: string | undefined = process.env.JWT_SECRET;

		if (!secret) throw new Error('Secret is not defined for jwt');

		return jwt.sign({ userId: id }, secret, {
			expiresIn: process.env.JWT_EXPIRES_IN
		});
	};

	static verifyToken = async (token: string) => {
		const secret: string | undefined = process.env.JWT_SECRET;
		if (!secret) throw new Error('Secret is not defined for jwt');
		return jwt.verify(token, secret);
	};

	// static createSendToken = async (
	// 	user: IUser,
	// 	statusCode: number,
	// 	res: Response
	// ) => {
	// 	const token = SecUtils.signToken(Number(user.user_id));
	// 	const cookieOptions = {
	// 		expires: new Date(
	// 			Date.now() +
	// 				Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
	// 		),
	// 		httpOnly: true
	// 	};
	// };

	// static protect = async (req: Request, next: NextFunction) => {
	// 	let token: string = '';
	// 	if (
	// 		req.headers.authorization &&
	// 		req.headers.authorization.startsWith('Bearer')
	// 	) {
	// 		token = req.headers.authorization.split(' ')[1];
	// 	}

	// 	if (!token) {
	// 		return next();
	// 		// new AppError('You are not logged in! Please login to get access', 401)
	// 	}
	// 	const secret: string = process.env.JWT_SECRET ?? '';

	// 	const decoded = jwt.verify(token, secret);

	// 	return decoded; // user id;
	// };

	// static createPasswordResetToken = () => {
	// 	const resetToken = crypto.randomBytes(32).toString('hex');

	// 	// ! save resetPassword token in database; !
	// 	const passwordResetToken = crypto
	// 		.createHash('sha256')
	// 		.update(resetToken)
	// 		.digest('hex');

	// 	// ! save passwordResetExpires in database
	// 	const passwordResetExpires = Date.now() + 10 * 60 * 100; // expires in 10 minutes

	// 	return resetToken;
	// };
}
