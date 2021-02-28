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
} from 'typeorm';

import { config } from '../config';

const interfaceOptions = {
  postgres: {
    type: 'postgres',
    name: config.PG_NAME,
    host: config.PG_HOST,
    database: config.PG_DATABASE,
    port: config.PG_PORT,
    username: config.PG_USER,
    password: config.PG_PASSWORD,
    ssl: config.PRODUCTION,
    synchronize: true,
    logging: !config.PRODUCTION,
    entities: ['database/models/*.{js,ts}'],
    dropSchema: true,
    cache: true,
  },
};

export default function createInterface() {
  const context = {
    connect: async () => {
      this.connection = await createConnection(interfaceOptions);
    },
    disconnect: async () => {
      if (this.connection.isConnected) {
        await this.connection.close();
      }
    },
    executeSQL: async (sql, params) => {
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
