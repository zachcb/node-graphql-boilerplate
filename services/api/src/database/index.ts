/*
 * Database Connection Handler
 *
 * Takes in database models to create TypeORM entities.
 *
 *
*/
import {
  Connection,
  createConnection,
  useContainer,

  ConnectionOptions,
  Any,
  getConnection,
} from "typeorm";
import { User } from "./models/user";
import { Profile } from "./models/profile";
import { Post } from "./models/post";
import { config } from "../config";

const connectionOptions: Array<ConnectionOptions> = [{
  type: "postgres",
  name: config.PG_NAME,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
  port: config.PG_PORT,
  username: config.PG_USER,
  password: config.PG_PASSWORD,
  ssl: config.PRODUCTION,
  synchronize: true,
  // logging: !config.PRODUCTION,
  // entities: [`${__dirname}/database/models/**/*.{js,ts}`],
  entities: [User, Profile, Post],
  dropSchema: false,
  cache: true,
}];

type PostgresInterface = {
  connection: Record<string, unknown>;
  connect: () => void;
  getConnection: (name: string) => Promise<Connection>;
  disconnect: () => void;
  executeSQL: (
    sql: string,
    params: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
  reset: () => void;
  runMigrations: () => void;
  dropDatabase: () => void;
}

export function createInterface(): PostgresInterface {
  const context: PostgresInterface = {
    connection: {},

    connect: async () => {
      const [postgresConnectionOptions] = connectionOptions;
      this.connection = await createConnection({
        ...postgresConnectionOptions,
      });
    },

    getConnection: async (name): Promise<Connection> => {
      return getConnection(name);
    },

    disconnect: async () => {
      if (this.connection.isConnected) {
        await this.connection.close();
      }
    },

    executeSQL: async (
      sql: string,
      params: Record<string, unknown>,
    ): Promise<Record<string, unknown>> => {
      return this.connection.createQueryRunner().query(sql, params);
    },

    reset: async () => {
      await this.connection.dropDatabase();
      await this.connection.runMigrations();
    },

    runMigrations: async () => {
      await this.connection.runMigrations();
    },

    dropDatabase: async () => {
      await this.connection.dropDatabase();
    },
  };

  return context;
}
