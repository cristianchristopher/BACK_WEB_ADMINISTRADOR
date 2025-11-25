import { Router } from "express";
import * as personalController from "../controllers/personal.controller";
import { verificarJWT } from "../middlewares/auth.middleware";

const router = Router();

/*router.post("/", verificarJWT, personalController.insertarPersonal);

router.get("/", verificarJWT, personalController.listarPersonales);

router.get("/", verificarJWT, personalController.listaPesonalesActivos);

router.put("/", verificarJWT, personalController.actualizarPersonal);

router.put("/", verificarJWT, personalController.activarPesonal);

router.delete("/", verificarJWT, personalController.eliminarPersonal);

router.get("/", verificarJWT, personalController.obtenerPersonalPorId); */

// 👉 LISTAR TODO EL PERSONAL
router.get("/", personalController.listarPersonales);

// 👉 LISTAR PERSONAL ACTIVO
router.get("/activos", verificarJWT, personalController.listaPesonalesActivos);

// 👉 OBTENER PERSONAL POR ID
router.get("/:id", verificarJWT, personalController.obtenerPersonalPorId);

// 👉 INSERTAR PERSONAL
router.post("/", personalController.insertarPersonal);

// 👉 ACTUALIZAR PERSONAL
router.put("/:id", verificarJWT, personalController.actualizarPersonal);

// 👉 ACTIVAR PERSONAL
router.put("/activar/:id", verificarJWT, personalController.activarPesonal);

// 👉 ELIMINAR PERSONAL
router.delete("/:id", verificarJWT, personalController.eliminarPersonal);



export default router;