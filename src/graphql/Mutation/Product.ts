import { GraphQLFloat, GraphQLID, GraphQLString } from 'graphql';
import { Product } from '../../models/Product';
import { BaseRepository } from '../../repository/BaseRepository';
import { ProductService } from '../../service/ProductService';
import { ProductType } from '../TypeDefs/Product';

const productRepository = new BaseRepository<Product>('products');
const productService = new ProductService(productRepository);

export const CREATE_PRODUCT = {
	type: ProductType,
	args: {
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLFloat },
		image_url: { type: GraphQLString },
		category_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const { name, description, price, image_url, category_id } = args;
		return productService.createProduct(
			name,
			description,
			price,
			image_url,
			category_id
		);
	}
};

export const UPDATE_PRODUCT = {
	type: ProductType,
	args: {
		product_id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLFloat },
		image_url: { type: GraphQLString },
		category_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const { product_id, name, description, price, image_url, category_id } =
			args;
		return productService.updateProduct(
			product_id,
			name,
			description,
			price,
			image_url,
			category_id
		);
	}
};

export const DELETE_PRODUCT = {
	type: ProductType,
	args: {
		product_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const product_id = args.product_id;
		return productService.deleteProduct(product_id);
	}
};
