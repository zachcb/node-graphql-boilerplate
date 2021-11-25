/*
 * Database Connection Handler
 *
*/

import { PrismaClient } from '@prisma/client'

export type ConnectionContext = PrismaClient

export const databaseInterface = {
  context: new PrismaClient(),
  connect: async function () {
    await this.context.$connect()
  },
  disconnect: async function () {
    await this.context.$disconnect()
  }
}
