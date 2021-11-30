import { IConfig } from "@/bin/types/IConfig";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line
  require('dotenv').config();
}

export const config: IConfig = {
  PRODUCTION: process.env.NODE_ENV === "production",
  PORT: parseInt(process.env.SERVER_PORT, 10) || 5000,
  ORIGIN_URL: process.env.ORIGIN_URL,
  PG_NAME: process.env.PG_NAME,
  PG_HOST: process.env.PG_HOST,
  PG_DATABASE: process.env.PG_DATABASE,
  PG_PORT: parseInt(process.env.PG_PORT, 10) || 5432,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  RD_HOST: process.env.RD_HOST,
  RD_PORT: parseInt(process.env.RD_PORT, 10) || 6379,
  RD_PASSWORD: process.env.RD_PASSWORD,
};
