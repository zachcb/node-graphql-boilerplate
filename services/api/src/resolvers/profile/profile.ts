import {
  Args, Mutation, Query, Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { ProfileEntity } from "@/database/entities/profile";
import { Select } from "./input";

@Resolver()
export class ProfileResolver {
  private table = getRepository(ProfileEntity, "postgres");

  @Query(() => [ProfileEntity], { nullable: true })
  async profiles(@Args() {
    where, take, skip, order,
  }: Select): Promise<ProfileEntity[]> {
    return this.table.find({
      where: { ...where },
      order: { ...order },
      skip,
      take,
    });
  }

  @Mutation(() => ProfileEntity, { nullable: true })
  async addProfile(@Args() { userId, ...context }: ProfileEntity): Promise<ProfileEntity> {
    const exists = await this.table.findOne({ where: { userId } });

    if (exists) {
      throw new Error(`Record ${userId} already exists`);
    }

    await getConnection("postgres")
      .createQueryBuilder()
      .insert()
      .into(ProfileEntity)
      .values({ userId, ...context })
      .execute();

    return this.table.findOne({ where: { userId } });
  }
}
