import { constants } from '../constants';
import { HandleError } from '../middlewares/handle-errors.middleware';
import { User } from '../models';
import { getRandomIdFunction } from '../utils';
import { DatabaseController } from './database.controller';

export class UserController extends DatabaseController<User> {
  /**
   * Gets an object from the database
   * @param id - object ID
   * @returns User created
   */
  async get(id: string): Promise<User | null> {
    const db = await this.open();

    for (const user of db.users) {
      if (user.id === id) {
        return user;
      }
    }

    throw new HandleError(404, constants.NOT_FOUND);
  }

  /**
   * Gets all users from database
   * @returns list of users
   */
  async getAll(): Promise<Array<User>> {
    const db = await super.open();

    return db.users;
  }

  /**
   * Creates an user in the database
   * @param object - user object
   * @returns object created
   */
  async create(object: User): Promise<Array<User>> {
    const db = await this.open();

    object.id = getRandomIdFunction();
    db.users.push(object);
    await this.save(db);

    return db.users;
  }

  /**
   * Updates an user on the database
   * @param id - user id
   * @param object - object to update
   * @returns the updated user
   */
  async update(id: string, object: User): Promise<User | null> {
    const db = await this.open();

    const index = db.users.findIndex(item => item.id === id);

    if (index === -1) {
      throw new HandleError(404, constants.NOT_FOUND);
    }

    db.users[index] = object;
    await super.save(db);

    return object;
  }

  /**
   * Delete an user on the database
   * @param id - user id
   * @returns boolean to check if it was deleted successfully
   */
  async delete(id: string): Promise<boolean> {
    const db = await this.open();

    const index = db.users.findIndex(item => item.id === id);

    if (index === -1) {
      throw new HandleError(404, constants.NOT_FOUND);
    }

    db.users.splice(index, 1);
    await super.save(db);

    return true;
  }
}
