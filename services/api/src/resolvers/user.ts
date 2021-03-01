import {
  Args, Mutation, Query, Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { User } from "@/database/entities/user";
import { Insert, Select } from "../bin/graphql/types/args/user";

@Resolver()
export class UserResolver {
  private table = getRepository(User, "postgres");

  @Query(() => [User], { nullable: true })
  async users(@Args() {
    where, take, skip, order,
  }: Select): Promise<User[]> {
    return this.table.find({
      where: { ...where }, order: { ...order }, skip, take,
    });
  }

  @Mutation(() => User, { nullable: true })
  async addUser(@Args() { name }: Insert): Promise<User> {
    const exists = await this.table.findOne({ where: { name } });

    if (exists) {
      throw new Error(`Record ${name} already exists`);
    }

    await getConnection("postgres")
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ name })
      .execute();

    return this.table.findOne({ where: { name } });
  }
}
