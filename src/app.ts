import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import personalRouter from "./routes/personal.route";
import authRouter from "./routes/auth.route";

import { AppDataSource } from "./config/appdatasource";

const app: Application = express();

// 🔹 CORS configurado
app.use(cors({}));

// 🔹 Middleware para JSON
app.use(express.json());

// 🔹 Rutas
app.use("/api/v1/personal", personalRouter);
app.use('/api/v1/auth', authRouter);

// 🔹 Ruta no encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
    data: null
  });
});

// 🔹 Manejo de errores global
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error("Error interno:", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    data: null
  });
});

// 🔹 Inicializar conexión a la BD
export const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Conectado a PostgreSQL");
  } catch (error) {
    console.error("❌ Error al conectar a la BD:", error);
    throw error; // OJO: si no lanzas el error, server.ts no sabrá que falló
  }
};

export default app;