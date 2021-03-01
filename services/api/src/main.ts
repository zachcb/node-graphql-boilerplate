import "reflect-metadata";
import cors from "cors";
import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { RedisCache } from "apollo-server-cache-redis";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";

import { createInterface } from "@/database";
import { IContext } from "@/bin/types/IContext";
import { logger } from "./utils/logger";
import { config } from "./config";
import { createSchema } from "./schema";

export const main = async (): Promise<void> => {
  const PGInterface = createInterface();
  PGInterface.connect();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,

    context: ({ req, res }): IContext => ({ req, res }),
    playground: !config.PRODUCTION,
    cache: new RedisCache({
      host: config.RD_HOST,
      port: config.RD_PORT,
      // password: config.RD_PASSWORD,
      family: 4,
    }),
  });

  // Create an express server and a GraphQL endpoint
  const app = express();

  const corsOptions: cors.CorsOptions = {
    origin: `${config.ORIGIN_URL}`,
    credentials: false,
  };

  app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

  app.use(cors());

  app.get("/status", (req, res) => {
    res.status(200).send("OK");
  });

  if (config.PRODUCTION) {
    app.get(`${apolloServer.graphqlPath}`, async (req, res) => {
      res.status(200).send("OK");
    });
  }

  apolloServer.applyMiddleware({ app, ...corsOptions });

  const httpServer = http.createServer(app);

  httpServer.listen(config.PORT, () => logger({
    message: `
      Node GraphQL Boilerplate
      GraphQL: http://localhost:${config.PORT}/graphql
    `,
    status: "success",
    box: true,
  }));
};

main().catch((error) => console.error(error));
