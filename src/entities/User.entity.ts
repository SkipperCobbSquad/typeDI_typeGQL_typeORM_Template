import { ObjectType, Field, ID } from "type-graphql";
import { Entity, ObjectIdColumn, Column,ObjectID } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  name: string;
}
