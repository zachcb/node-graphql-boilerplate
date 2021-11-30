import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from "type-graphql";
import { Post } from "@/database/entities/Post";
import { User } from "@/database/entities/User";
import { DatabaseInterface } from "@/database/";

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}

@InputType()
export class PostCreateInput {
  @Field()
    title: string;

  @Field({ nullable: true })
    content: string;
}

@InputType()
class PostOrderByUpdatedAtInput {
  @Field((type) => SortOrder)
    updatedAt: SortOrder;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver()
  author(@Root() post: Post, @Ctx() ctx: DatabaseInterface): Promise<User | null> {
    return ctx.database.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .user();
  }

  @Query((returns) => Post, { nullable: true })
  async postById(@Arg("id") id: string, @Ctx() ctx: DatabaseInterface) {
    return ctx.database.post.findUnique({
      where: { id },
    });
  }

  @Query((returns) => [Post])
  async feed(
    @Arg("searchString", { nullable: true }) searchString: string,
    @Arg("skip", (type) => Int, { nullable: true }) skip: number,
    @Arg("take", (type) => Int, { nullable: true }) take: number,
    @Arg("orderBy", { nullable: true }) orderBy: PostOrderByUpdatedAtInput,
    @Ctx() ctx: DatabaseInterface,
  ) {
    const or = searchString
      ? {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      }
      : {};

    return ctx.database.post.findMany({
      where: {
        published: true,
        ...or,
      },
      take: take || undefined,
      skip: skip || undefined,
      orderBy: orderBy || undefined,
    });
  }

  @Mutation((returns) => Post)
  async createDraft(
    @Arg("data") data: PostCreateInput,
    @Arg("userEmail") userEmail: string,

    @Ctx() ctx: DatabaseInterface,
  ) {
    return ctx.database.post.create({
      data: {
        title: data.title,
        content: data.content,
        user: {
          connect: { email: userEmail },
        },
      },
    });
  }

  @Mutation((returns) => Post, { nullable: true })
  async togglePublishPost(
    @Arg("id", (type) => String) id: string,
    @Ctx() ctx: DatabaseInterface,
  ) {
    const post = await ctx.database.post.findUnique({
      where: { id: id || undefined },
      select: {
        published: true,
      },
    });

    return ctx.database.post.update({
      where: { id: id || undefined },
      data: { published: !post?.published },
    });
  }

  @Mutation((returns) => Post, { nullable: true })
  async incrementPostViewCount(
    @Arg("id", (type) => String) id: string,
    @Ctx() ctx: DatabaseInterface,
  ) {
    return ctx.database.post.update({
      where: { id: id || undefined },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  @Mutation((returns) => Post, { nullable: true })
  async deletePost(@Arg("id", (type) => String) id: string, @Ctx() ctx: DatabaseInterface) {
    return ctx.database.post.delete({
      where: {
        id,
      },
    });
  }
}
