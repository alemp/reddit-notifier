import { Router } from 'express';
import { ChannelService } from '../services/channel.service';

/**
 * Implements routes for channel
 */
class ChannelRouter {
  /**
   * Express router object
   */
  router = Router();
  /**
   * Channel service
   */
  service = new ChannelService();

  constructor() {
    this.router.get('/', this.service.getAll);
    this.router.post('/', this.service.create);

    this.router.get('/:id', this.service.get);
    this.router.put('/:id', this.service.update);
    this.router.delete('/:id', this.service.delete);
  }
}

/**
 * Exports the Express router object
 */
export default new ChannelRouter().router;
