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

  @Query((returns) => User, { nullable: true })
  async me(): Promise<User> {
    return await this.userRepository.findOne({ id: '' });
  }

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Mutation((returns) => User)
  async createUser(@Arg('name') name: string): Promise<User> {
    return await this.userRepository.save({ name });
  }
}
