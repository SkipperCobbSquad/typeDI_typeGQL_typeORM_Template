import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entities/User.entity';
import userService from '../Services/user.service';

@Service()
@Resolver()
export class UserCoreResolver {
  constructor(
    @InjectRepository() private readonly userRepository: userService
  ) {}

  @Query((returns) => User)
  async me() {
    return await this.userRepository.findOne({ id: '' });
  }

  @Query((returns) => [User])
  users() {
    return this.userRepository.find();
  }

  @Mutation((returns) => User)
  async createUser(@Arg('name') name: string) {
    return await this.userRepository.save({ name });
  }
}
