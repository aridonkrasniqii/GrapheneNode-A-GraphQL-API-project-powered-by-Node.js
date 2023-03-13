import { IProduct } from '../interfaces/IProduct';
import { Product } from '../models/Product';
import { BaseRepository } from '../repository/BaseRepository';

export class ProductService {
  constructor(private productRepository: BaseRepository<Product>) {}
  getAllProducts = async (): Promise<IProduct[]> => {
    return this.productRepository.getAllEntities();
  };
  getProductById = async (product_id: number): Promise<IProduct> => {
    return this.productRepository.getEntityById(product_id);
  };

  createProduct = async (
    name: string,
    description: string,
    price: number,
    image_url: string,
    category_id: number
  ) => {
    const product = new Product(
      name,
      description,
      price,
      image_url,
      category_id
    );
    return this.productRepository.createEntity(product);
  };

  updateProduct = async (
    product_id: number,
    name: string,
    description: string,
    price: number,
    image_url: string,
    category_id: number
  ): Promise<IProduct> => {
    const product = new Product(
      name,
      description,
      price,
      image_url,
      category_id
    );
    return this.productRepository.updateEntity(product_id, product);
  };

  deleteProduct = async (product_id: number): Promise<IProduct> => {
    return this.productRepository.deleteEntity(product_id);
  };
}
