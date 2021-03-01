import {
  Args, Mutation, Query, Resolver,
} from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { PostEntity } from "@/database/entities/post";
import { Select } from "./input";

@Resolver()
export class PostResolver {
  private table = getRepository(PostEntity, "postgres");

  @Query(() => [PostEntity], { nullable: true })
  async posts(@Args() {
    where, take, skip, order,
  }: Select): Promise<PostEntity[]> {
    return this.table.find({
      where: { ...where },
      order: { ...order },
      skip,
      take,
    });
  }

  @Mutation(() => PostEntity, { nullable: true })
  async addPost(@Args() { title }: PostEntity): Promise<PostEntity> {
    const exists = await this.table.findOne({ where: { title } });

    if (exists) {
      throw new Error(`Record ${title} already exists`);
    }

    await getConnection("postgres")
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values({ title })
      .execute();

    return this.table.findOne({ where: { title } });
  }
}
