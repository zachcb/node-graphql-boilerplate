import {
  Args, Mutation, Query, Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { UserEntity } from "@/database/entities/user";
import { Insert, Select } from "./input";

@Resolver()
export class UserResolver {
  private table = getRepository(UserEntity, "postgres");

  @Query(() => [UserEntity], { nullable: true })
  async users(@Args() {
    where, take, skip, order,
  }: Select): Promise<UserEntity[]> {
    return this.table.find({
      where: { ...where },
      order: { ...order },
      skip,
      take,
    });
  }

  @Mutation(() => UserEntity, { nullable: true })
  async addUser(@Args() { name }: Insert): Promise<UserEntity> {
    const exists = await this.table.findOne({ where: { name } });

    if (exists) {
      throw new Error(`Record ${name} already exists`);
    }

    await getConnection("postgres")
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({ name })
      .execute();

    return this.table.findOne({ where: { name } });
  }
}
