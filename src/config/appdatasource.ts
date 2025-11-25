
/*
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Personal } from "../entities/personal";


// ⚡ Conexión a PostgreSQL
export const AppDataSource = new DataSource({
   type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'CRISTIANCHRISTOPHER',
  database: process.env.DB_NAME || 'Ventas_web',
  synchronize: false,   // en desarrollo puedes poner true
  logging: false,
  entities: [
    Personal
  */
 // ],
  //migrations: ["src/migrations/**/*.ts"],
 // subscribers: [],
//});

//export default AppDataSource;

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Personal } from "../entities/personal";

// ⚡ Conexión con Neon mediante DATABASE_URL
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,   // <-- Aquí va la URL completa de Neon
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false, // true solo en desarrollo
  logging: false,
  entities: [Personal],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;