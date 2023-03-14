import { GraphQLID, GraphQLList } from 'graphql';
import { Category } from '../../models/Category';
import { BaseRepository } from '../../repository/BaseRepository';
import { CategoryService } from '../../service/CategoryService';
import { CategoryType } from '../TypeDefs/Category';

const categoryRepository = new BaseRepository<Category>('categories');
const categoryService = new CategoryService(categoryRepository);

export const GET_ALL_CATEGORIES = {
	type: new GraphQLList(CategoryType),
	resolve(_: any, __: any) {
		return categoryService.getAllCategories();
	}
};

export const GET_CATEGORY_BY_ID = {
	type: CategoryType,
	args: {
		category_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const category_id = args.category_id;
		return categoryService.getCategoryById(category_id);
	}
};
