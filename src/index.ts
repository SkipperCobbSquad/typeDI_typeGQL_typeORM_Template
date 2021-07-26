import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection, useContainer } from 'typeorm';
import { Container as ContDI } from 'typedi';
import { Container } from 'typeorm-typedi-extensions';

//Entities
import { User } from './entities/User.entity';

//Resolvers
import { UserCoreResolver } from './resolvers/user.resolver';

useContainer(Container);
async function bootstrap() {
  //Connect to mongoDB
  const connection: Connection = await createConnection({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [User], //[src/entities/*.entity.{ts,js}]
    database: 'test',
    logging: true,
  });

  //Create schema and resolvers
  const schema = await buildSchema({
    resolvers: [UserCoreResolver], //[src/resolvers/*.resolver.{ts, js}]
    container: ContDI,
  });

  //Config server
  const server = new ApolloServer({
    schema,
  });
  //Init Server
  const { url } = await server.listen(5000);
  console.log(url);
}

bootstrap(); // actually run the async function
