import { ChannelController } from '../controllers/channel.controller';
import { Channel } from '../models';
import { GenericService } from './generic.service';

/**
 * Implements channel service using his own controller
 */
export class ChannelService extends GenericService<Channel> {
  constructor() {
    super(new ChannelController());
  }
}
