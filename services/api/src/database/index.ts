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
  getConnection,
} from "typeorm";

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
      this.connection = await createConnection("postgres");
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
