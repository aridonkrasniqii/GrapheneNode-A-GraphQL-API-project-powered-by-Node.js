import { GraphQLID, GraphQLString } from 'graphql';
import { Category } from '../../models/Category';
import { BaseRepository } from '../../repository/BaseRepository';
import { CategoryService } from '../../service/CategoryService';
import { CategoryType } from '../TypeDefs/Category';

const categoryRepository = new BaseRepository<Category>('categories');
const categoryService = new CategoryService(categoryRepository);

export const CREATE_CATEGORY = {
	type: CategoryType,
	args: {
		category_id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString }
	},
	resolve(_: any, args: any) {
		const { name, description } = args;
		return categoryService.createCategory(name, description);
	}
};

export const UPDATE_CATEGORY = {
	type: CategoryType,
	args: {
		category_id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString }
	},
	resolve(_: any, args: any) {
		const { category_id, name, description } = args;
		return categoryService.updateCategory(
			parseInt(category_id),
			name,
			description
		);
	}
};

export const DELETE_CATEGORY = {
	type: CategoryType,
	args: {
		category_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const category_id = parseInt(args.category_id);
		return categoryService.deleteCategory(category_id);
	}
};
