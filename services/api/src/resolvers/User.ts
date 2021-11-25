import 'reflect-metadata'
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
} from 'type-graphql'
import { Post } from '@/database/entities/Post'
import { User } from '@/database/entities/User'
import { ConnectionContext } from '@/database/'
import { PostCreateInput } from '@/resolvers/Post'

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number

  @Field({ nullable: true })
  email: string
}

@InputType()
class UserCreateInput {
  @Field()
  email: string

  @Field({ nullable: true })
  name: string

  @Field((type) => [PostCreateInput], { nullable: true })
  posts: [PostCreateInput]
}

@Resolver(User)
export class UserResolver {
  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: ConnectionContext): Promise<Post[]> {
    return ctx.context.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts()
  }

  @Mutation((returns) => User)
  async signupUser(
    @Arg('data') data: UserCreateInput,
    @Ctx() ctx: ConnectionContext,
  ): Promise<User> {
    const postData = data.posts?.map((post) => {
      return { title: post.title, content: post.content || undefined }
    })

    return ctx.context.user.create({
      data: {
        email: data.email,
        name: data.name,
        posts: {
          create: postData,
        },
      },
    })
  }

  @Query(() => [User])
  async allUsers(@Ctx() ctx: ConnectionContext) {
    return ctx.context.user.findMany()
  }

  @Query((returns) => [Post], { nullable: true })
  async draftsByUser(
    @Arg('userUniqueInput') userUniqueInput: UserUniqueInput,
    @Ctx() ctx: ConnectionContext,
  ) {
    return ctx.context.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined,
        },
      })
      .posts({
        where: {
          published: false,
        },
      })
  }
}
