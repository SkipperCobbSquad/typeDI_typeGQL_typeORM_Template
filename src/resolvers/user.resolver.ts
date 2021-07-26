import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entities/User.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
@Resolver()
export class UserCoreResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query((returns) => User)
  async me() {
    return await this.userRepository.findOne({name: 'bob'});
  }

  @Query((returns) => [User])
   users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation((returns) => User)
  async createUser(@Arg("name") name: string) {
    return await this.userRepository.save({ name });
  }
}
