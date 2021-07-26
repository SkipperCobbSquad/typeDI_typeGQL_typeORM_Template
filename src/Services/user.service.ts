import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User.entity';

/**
 * Custom repository for user :)
 */
@Service()
@EntityRepository(User)
export default class UserService extends Repository<User> {
  fin() {
    return [{ id: '1', name: 'Bingo' }];
  }
}
