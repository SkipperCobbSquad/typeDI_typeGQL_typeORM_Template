// import { Service } from "typedi";
// import { getMongoRepository } from "typeorm";
// import { User } from "../entities/User.entity";

// @Service()
// export default class UserService {
//   private readonly userRepository = getMongoRepository(User);

//   async getAll() {
//     return await this.userRepository.find();
//   }

//   async getOne(name: string) {
//     return await this.userRepository.findOne({ name: "Bob" });
//   }

//   async createOne(name: string) {
//     return await this.userRepository.save({ name });
//   }
// }
