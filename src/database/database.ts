import { Pool } from 'pg';

declare module 'dotenv';

export class DatabaseConnection {
	private static connection: Pool;

	public static getConnection(): Pool {
		if (DatabaseConnection.connection == null) {
			return (DatabaseConnection.connection =
				DatabaseConnection.connectDatabase());
		}

		return DatabaseConnection.connection;
	}

	private static connectDatabase() {
		const pool = new Pool({
			host: 'localhost',
			port: Number(process.env.DATABASE_PORT),
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME
		});
		pool.connect(err => {
			if (err) {
				console.log('err', err);
				throw new Error('Database connection error');
			}
			console.log('Database connected');
		});
		return pool;
	}
}
