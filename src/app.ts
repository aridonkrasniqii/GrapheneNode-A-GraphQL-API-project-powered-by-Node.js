import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { schema } from './graphql/schema';

const server = new ApolloServer({
	schema,
	context: ({ req }) => {
		// Your context logic here
		return {
			// Your context data here
		};
	}
});

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
