import jsonfile from 'jsonfile';
import { Channel, User } from '../models';

/**
 * Interface for mocked data (writing in file)
 */
interface Data {
  users: Array<User>;
  channels: Array<Channel>;
}

/**
 * Generic Controller interface to use methods on implementation
 */
export interface GenericController<T> {
  getAll(): Promise<Array<T>>;

  get(id: string): Promise<T | null>;

  create(object: T): Promise<Array<T>>;

  update(id: string, object: T): Promise<T | null>;

  delete(id: string): Promise<boolean>;
}

/**
 * Implements abstracts and protected methods for database operations
 */
export abstract class DatabaseController<T> implements GenericController<T> {
  // file path for database
  private readonly filePath = './src/data/data.json';

  /**
   * Get all data from database
   */
  abstract async getAll(): Promise<Array<T>>;

  /**
   * Gets an object from dtabase
   * @param id - object ID
   */
  abstract async get(id: string): Promise<T | null>;

  /**
   * Creates a new object in the database
   * @param object - Object to save
   */
  abstract async create(object: T): Promise<Array<T>>;

  /**
   * Updates an object in the database
   * @param id - object ID
   * @param object - Object to update
   *
   * @remarks
   * You need to pass the whole object to save it in the database
   */
  abstract async update(id: string, object: T): Promise<T | null>;

  /**
   * Deletes an object from the database
   * @param id - object ID
   */
  abstract async delete(id: string): Promise<boolean>;

  /**
   * Opens the database
   * @protected
   */
  protected open(): Promise<Data> {
    return jsonfile.readFile(this.filePath) as Promise<Data>;
  }

  /**
   * Saves the whole database to the file
   * @param db - database objects
   * @protected
   */
  protected save(db: Data): Promise<void> {
    return jsonfile.writeFile(this.filePath, db);
  }
}
