import { ProductService } from './../../service/ProductService';
import { BaseRepository } from '../../repository/BaseRepository';
import { IProduct } from './../../interfaces/IProduct';
import { ProductType } from './../TypeDefs/Product';
import { Product } from '../../models/Product';
import { GraphQLID, GraphQLList } from 'graphql';

const productRepository = new BaseRepository<Product>('products');
const productService = new ProductService(productRepository);

export const GET_ALL_USERS = {
	type: new GraphQLList(ProductType),
	resolve(): Promise<IProduct[]> {
		return productService.getAllProducts();
	}
};

export const GET_USER_BY_ID = {
	type: ProductType,
	args: {
		product_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const product_id = args.product_id;
		return productService.getProductById(product_id);
	}
};
