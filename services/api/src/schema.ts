import { buildSchema } from "type-graphql";
import { PostResolver } from "@/resolvers/post/post";
import { ProfileResolver } from "@/resolvers/profile/profile";
import { UserResolver } from "@/resolvers/user/user";

export const createSchema = () => buildSchema({
  resolvers: [
    PostResolver,
    ProfileResolver,
    UserResolver,
  ],
  globalMiddlewares: [],
});
