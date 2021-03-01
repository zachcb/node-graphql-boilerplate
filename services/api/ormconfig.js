module.exports = {
  type: "postgres",
  name: process.env.PG_NAME,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.NODE_ENV === "production",
  synchronize: process.env.NODE_ENV === "production",
  dropSchema: false,
  cache: true,
  logging: process.env.NODE_ENV !== "production",
  entities: [
    "src/database/entities/**/*{.ts,.js}",
    ".build/database/entities/**/*{.ts,.js}",
  ],
  migrations: [
    "src/database/migrations/**/*{.ts,.js}",
    ".build/database/migrations/**/*{.ts,.js}",
  ],
  subscribers: [
    "src/database/subscribers/**/*{.ts,.js}",
    ".build/database/subscribers/**/*{.ts,.js}",
  ],
  cli: {
    entitiesDir: "src/database/entities",
    subscribersDir: "src/database/subscribers",
    migrationsDir: "src/database/migrations",
  },
};
