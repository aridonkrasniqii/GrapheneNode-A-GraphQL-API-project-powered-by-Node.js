import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import { schema } from './schema/schema';

// const port = process.env.PORT || 4000;

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
