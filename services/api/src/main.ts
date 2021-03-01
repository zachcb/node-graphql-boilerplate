import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { createInterface } from "@/database";
import { logger } from "./utils/logger";
import { config } from "./config";

// Root resolver
const root = {
  hello: () => "Hello world!",
};

export const main = async (): Promise<void> => {
  const PGInterface = createInterface();
  PGInterface.connect();

  const schema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/**/*.resolver.?s`],
    globalMiddlewares: [],
  });

  // Create an express server and a GraphQL endpoint
  const app = express();

  // const corsOptions: cors.CorsOptions = {
  //   origin: `${config.ORIGIN_URL}`,
  //   credentials: false,
  // };

  app.use(cors());

  app.get("/status", (req, res) => {
    res.status(200).send("OK");
  });

  app.use("/graphql", graphqlHTTP({
    schema, // Must be provided
    rootValue: root,
    graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
  }));

  app.listen(config.PORT, () => logger({
    message: `
      Node GraphQL Boilerplate
      GraphQL: http://localhost:${config.PORT}/graphql
    `,
    status: "success",
    box: true,
  }));
};

main().catch((error) => console.error(error));
