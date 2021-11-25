import { GraphQLScalarType } from 'graphql'
import { buildSchema } from "type-graphql";
import { DateTimeResolver } from 'graphql-scalars'

import { PostResolver } from "@/resolvers/Post";
import { UserResolver } from "@/resolvers/User";

export const createSchema = () => buildSchema({
  resolvers: [
    PostResolver,
    UserResolver,
  ],
  scalarsMap: [{
    type: GraphQLScalarType,
    scalar: DateTimeResolver
  }],
  globalMiddlewares: [],
});
