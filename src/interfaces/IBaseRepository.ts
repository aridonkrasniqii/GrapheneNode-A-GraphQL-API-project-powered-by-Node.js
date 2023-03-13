export interface IBaseRepository<T> {
  getAllEntities(): Promise<T[]>;
  getEntityById(entity_id: number): Promise<T>;
  createEntity(entity: T): Promise<T>;
  updateEntity(entity_id: number, entity: T): Promise<T>;
  deleteEntity(entity_id: number): Promise<T>;
}
