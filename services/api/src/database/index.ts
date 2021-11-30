/*
 * Database Connection Handler
 *
*/

import { PrismaClient } from "@prisma/client";

export type DatabaseInterface = {
  database: PrismaClient
  connect: () => void
  disconnect: () => void
}

export const databaseInterface: DatabaseInterface = {
  database: new PrismaClient(),
  async connect() {
    await this.database.$connect();
  },
  async disconnect() {
    await this.database.$disconnect();
  },
};
