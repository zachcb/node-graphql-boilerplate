if (process.env.NODE_ENV !== 'production') {
  // tslint-ignore
  require('dotenv').config();
}

export interface IConfig {
  PRODUCTION: boolean;
  PORT: number;
  PG_NAME: string;
  PG_HOST: string;
  PG_DATABASE: string;
  PG_PORT: number;
  PG_USER: string;
  PG_PASSWORD: string;
}

export const config: IConfig = {
  PRODUCTION: process.env.NODE_ENV === "production",
  PORT: parseInt(process.env.PORT, 10) || 3000,
  PG_NAME: process.env.PG_NAME,
  PG_HOST: process.env.PG_HOST,
  PG_DATABASE: process.env.PG_DATABASE,
  PG_PORT: parseInt(process.env.PG_PORT, 10) || 5432,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
};
