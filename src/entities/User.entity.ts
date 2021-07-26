import { ObjectType, Field, ID } from "type-graphql";
import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((type) => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  name: string;
}
