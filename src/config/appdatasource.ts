
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


/*
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
  entities: [Personal],*/
  //migrations: ["src/migrations/**/*.ts"],
  //subscribers: [],
//});

//export default AppDataSource;

import "reflect-metadata";
import { DataSource } from "typeorm";
import { Personal } from "../entities/personal";
import dotenv from "dotenv";
import { Carta } from "../entities/carta";

dotenv.config();

// Detecta si estamos en entorno de producción (Render / Neon)
const isProd = process.env.NODE_ENV === "production";

// Selecciona la URL de conexión dependiendo del entorno
const dbUrl = isProd
  ? process.env.DATABASE_URL // NEON / Render
  : process.env.DATABASE_URL_LOCAL; // PostgreSQL local

if (!dbUrl) {
  throw new Error("❌ ERROR: No se encontró DATABASE_URL o DATABASE_URL_LOCAL en el archivo .env");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: dbUrl,
  ssl: isProd
    ? { rejectUnauthorized: false }   // NEON requiere SSL
    : false,                          // LOCAL no usa SSL
  synchronize: false,                 // true solo en desarrollo manual
  logging: false,
  entities: [Personal,Carta],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;