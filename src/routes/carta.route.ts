import { Router } from "express";
import multer, { FileFilterCallback } from "multer";
import * as cartaController from "../controllers/carta.controller";
import { verificarJWT } from "../middlewares/auth.middleware";


const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
 fileFilter: (_req, file, cb: FileFilterCallback) => {
  const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);

  if (!ok) return cb(new Error("Solo se permiten imágenes JPG/PNG/WEBP"));
  return cb(null, true);
},
});

router.post("/", verificarJWT, upload.single("imagen"), cartaController.crearCarta);
router.get("/", verificarJWT, cartaController.listarCartas);

// Imagen (si quieres protegerla, agrega verificarJWT aquí)
router.get("/:id/imagen", cartaController.obtenerImagen);

// ✅ Update: acepta multipart también (si quieres cambiar imagen)
router.put("/:id", verificarJWT, upload.single("imagen"), cartaController.actualizarCarta);

// ✅ Delete (soft): estado=false
router.delete("/:id", verificarJWT, cartaController.eliminarCarta);

export default router;