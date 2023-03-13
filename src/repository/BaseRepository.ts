import { Pool } from 'pg';
import { DatabaseConnection } from '../database/database';
import { IBaseRepository } from '../interfaces/IBaseRepository';

export class BaseRepository<T extends Object> implements IBaseRepository<T> {
	public connection = DatabaseConnection.getConnection();

	constructor(public tableName: string) {
		this.tableName = tableName;
	}

	getAllEntities = async (): Promise<T[]> => {
		const { rows } = await this.connection.query(
			`SELECT * FROM  ${this.tableName}` 
		);
		return rows || null;
	};
	getEntityById = async (entity_id: number): Promise<T> => {
		const { rows } = await this.connection.query(
			`SELECT * FROM ${this.tableName} WHERE ${this.tableName}_id = $1`,
			[entity_id]
		);
		return rows[0] || null;
	};
	createEntity = async (entity: T): Promise<T> => {
		const columns = Object.keys(entity as Object).map(column =>
			column.slice(1)
		);
		const placeholders = Object.values(entity as Object).map(
			(_, i) => `$${i + 1}`
		);
		const entityValue = Object.values(entity as Object);

		const query = ` INSERT INTO ${this.tableName} (${columns.join(',')})
    VALUES(${placeholders.join(',')}) RETURNING *;`;
		const { rows } = await this.connection.query(query, [...entityValue]);
		return rows[0] || null;
	};

	updateEntity = async (entity_id: number, entity: T): Promise<T> => {
		const entityExist = this.getEntityById(entity_id);
		if (!entityExist)
			throw new Error(`${this.tableName.toUpperCase()} not found`);

		const columns = Object.keys(entity as Object);
		const values = Object.values(entity as Object);
		const updates = columns.map(
			(column: any, i: any) => `${column} = $${i + 1}`
		);

		const query = `UPDATE ${this.tableName} SET ${updates.join(',')} WHERE ${
			this.tableName
		}_id = $${values.length + 1} RETURNING *;`;

		const { rows } = await this.connection.query(query, [...values, entity_id]);

		return rows[0] || null;
	};
	deleteEntity = async (entity_id: number): Promise<T> => {
		const entityExist = this.getEntityById(entity_id);
		if (!entityExist)
			throw new Error(`${this.tableName.toUpperCase()} not found`);
		const { rows } = await this.connection.query(
			`
        DELETE FROM ${this.tableName} WHERE ${this.tableName}_id = $1 RETURNING *;
      `,
			[entity_id]
		);
		return rows[0] || null;
	};
}
