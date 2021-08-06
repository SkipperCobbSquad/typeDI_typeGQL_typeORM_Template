import 'reflect-metadata';
//Apollo
import fastify from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
//Redis
import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
//TypeGQL + TypeORM
import { buildSchema } from 'type-graphql';
import { Connection, createConnection, useContainer } from 'typeorm';
import { Container as ContDI } from 'typedi';
import { Container } from 'typeorm-typedi-extensions';
//WS
import ws from 'ws';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

//Entities
import { User } from './entities/User.entity';

//Resolvers
import { UserCoreResolver } from './resolvers/user.resolver';

useContainer(Container);
async function bootstrap() {
  //Declare fastify app
  const app = fastify();
  // configure Redis connection options
  const options: Redis.RedisOptions = {
    host: 'localhost',
    port: 6379,
    retryStrategy: (times) => Math.max(times * 100, 3000),
  };

  //Share redis connection
  ContDI.set('RedisConn', new Redis(options));

  // create Redis-based pub-sub
  const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });

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

  // subscriptions-transport-ws
  const subTransWs = new ws.Server({ server: app.server });
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    subTransWs
  );

  //Config server
  const server = new ApolloServer({
    schema,
    //Use ApolloServerPluginLandingPageGraphQLPlayground to disable studio landing page
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  });

  //Register Subscription Server
  await server.start();
  app.register(server.createHandler());

  //Init server
  await app.listen(5000);
  console.log('http://localhost:5000/graphql');
}

bootstrap(); // actually run the async function
