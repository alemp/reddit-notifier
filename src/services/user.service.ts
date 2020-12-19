import { UserController } from '../controllers/user.controller';
import { User } from '../models';
import { GenericService } from './generic.service';

/**
 * Implements user service using his own controller
 */
export class UserService extends GenericService<User> {
  constructor() {
    super(new UserController());
  }
}
