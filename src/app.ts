import { AuthMiddleware, MiddlewareRequest } from './middlewares/Auth';
import { IUser } from './interfaces/IUser';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { schema } from './graphql/schema';
import express, { NextFunction } from 'express';
import { GraphQLErrorHandler } from './middlewares/erros/GraphQLErrorHandler';

const auth = new AuthMiddleware();

(async () => {
	const server = new ApolloServer({
		schema,
		context: async ({ req, _ }: { req: MiddlewareRequest; _: any }) => {
			await auth.authMiddleware(req, _, (err?: any) => {
				if (err) {
					// console.log('error happening in context');
					// throw err;
				}
			});
			return { req };
		},
		formatError: GraphQLErrorHandler.errorHandler
	});
	const app = express();

	await server.start();
	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () => {
		console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
	});
})();
