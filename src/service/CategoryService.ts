import { ICategory } from '../interfaces/ICategory';
import { Category } from '../models/Category';
import { BaseRepository } from '../repository/BaseRepository';
// import { CategoryRepository } from '../repository/CategoryRepository';

export class CategoryService {
  constructor(private categoryRepository: BaseRepository<Category>) {}

  getAllCategories = async (): Promise<ICategory[]> => {
    return this.categoryRepository.getAllEntities();
  };
  getCategoryById = async (category_id: number): Promise<ICategory> => {
    return this.categoryRepository.getEntityById(category_id);
  };

  createCategory = async (
    name: string,
    description: string
  ): Promise<ICategory> => {
    const category = new Category(name, description);
    return this.categoryRepository.createEntity(category);
  };

  updateCategory = async (
    category_id: number,
    name: string,
    description: string
  ): Promise<ICategory> => {
    const category = new Category(name, description);
    return this.categoryRepository.updateEntity(category_id, category);
  };

  deleteCategory = async (category_id: number): Promise<ICategory> => {
    return this.categoryRepository.deleteEntity(category_id);
  };
}
