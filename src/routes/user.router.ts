import { Router } from 'express';
import { UserService } from '../services/user.service';

/**
 * Implements routes for user
 */
class UserRouter {
  /**
   * Express router object
   */
  router = Router();
  /**
   * User service
   */
  service = new UserService();

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
export default new UserRouter().router;
