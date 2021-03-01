import {
  Args, Mutation, Query, Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { User } from "../database/models/user";
import { InsertUser, SelectUser } from "./user";

@Resolver()
export class UserResolver {
  private table = getRepository(User, "postgres");

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[]> {
    return this.table.find();
  }

  @Mutation(() => User, { nullable: true })
  async addUser(@Args() { name }: InsertUser): Promise<User> {
    // const exists = await this.table.findOne({ where: { name } });

    // if (exists) { throw new ApolloError(`Record ${name} already exists`); }
    await getConnection("postgres")
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ name })
      .execute();

    return this.table.findOne({ where: { name } });
  }
}
