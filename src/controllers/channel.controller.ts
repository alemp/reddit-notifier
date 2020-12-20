import { constants } from '../constants';
import { HandleError } from '../middlewares/handle-errors.middleware';
import { Channel } from '../models';
import { DatabaseController } from './database.controller';

export class ChannelController extends DatabaseController<Channel> {
  /**
   * Gets an object from the database
   * @param name - object ID
   * @returns Channel created
   */
  async get(name: string): Promise<Channel | null> {
    const db = await this.open();

    for (const channel of db.channels) {
      if (channel.name === name) {
        return channel;
      }
    }

    throw new HandleError(404, constants.NOT_FOUND);
  }

  /**
   * Gets all channels from database
   * @returns list of channels
   */
  async getAll(): Promise<Array<Channel>> {
    const db = await super.open();

    return db.channels;
  }

  /**
   * Creates a channel in the database
   * @param object - channel object
   * @returns object created
   */
  async create(object: Channel): Promise<Array<Channel>> {
    const db = await this.open();

    db.channels.push(object);

    await this.save(db);

    return db.channels;
  }

  /**
   * Updates a channel on the database
   * @param name - channel name
   * @param object - object to update
   * @returns the updated channel
   */
  async update(name: string, object: Channel): Promise<Channel | null> {
    const db = await this.open();

    const index = db.channels.findIndex(item => item.name === name);

    if (index === -1) {
      throw new HandleError(404, constants.NOT_FOUND);
    }

    db.channels[index] = object;
    await super.save(db);

    return object;
  }

  /**
   * Delete a channel on the database
   * @param name - channel name
   * @returns boolean to check if it was deleted successfully
   */
  async delete(name: string): Promise<boolean> {
    const db = await this.open();

    const index = db.channels.findIndex(item => item.name === name);

    if (index === -1) {
      throw new HandleError(404, constants.NOT_FOUND);
    }

    db.channels.splice(index, 1);
    await super.save(db);

    return true;
  }
}
