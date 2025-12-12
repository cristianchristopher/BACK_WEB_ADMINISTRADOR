import { Request , Response } from "express";
import * as cartaService from "../services/carta.service";

export const crearCarta = async (req: Request , res: Response) =>{
    try{
        const {descripcion, stock } = req.body;
        
        if(!descripcion){
            return res.status(400).json({success: false, message: "la descripcion es obligatoria", data:null});
        }
        if (!req.file) {
            return res.status(400).json({ success: false, message: "La imagen es obligatoria", data: null });
        }

        const carta = await cartaService.insertarCarta({
            descripcion: String(descripcion),
            stock: Number(stock ?? 0),
            imagen: req.file.buffer,
            imagenMime: req.file.mimetype,
            imagenNombre: req.file.originalname,
            estado: true,
        });

        return res.status(201).json({
            success: true,
            message: "Carta creada",
            data: {
                iddCarta: carta.idCarta,
                descripcion: carta.descripcion,
                stock: carta.stock,
                estado: carta.estado,
                fechaCreacion: carta.fechaCreacion,
            },
        });

    }catch(error) {
        console. error("Error crearCarta",error);
        return res.status(500).json({ success: false, message: "Error al crear carta", data: null});
    }
};

export const listarCartas = async (_req: Request, res: Response) => {
  try {
    const cartas = await cartaService.listarCartas();

    // ✅ NO devolvemos imagen (bytea) aquí
    const data = cartas.map((c) => ({
      idCarta: c.idCarta,
      descripcion: c.descripcion,
      stock: c.stock,
      estado: c.estado,
      fechaCreacion: c.fechaCreacion,
      imagenUrl: `/api/v1/cartas/${c.idCarta}/imagen`,
    }));

    return res.json({ success: true, message: "Listado", data });
  } catch (error) {
    console.error("Error listarCartas:", error);
    return res.status(500).json({ success: false, message: "Error al listar cartas", data: null });
  }
};

export const obtenerImagen = async (req: Request, res: Response) => {
  try {
    const idCarta = Number(req.params.id);
    const carta = await cartaService.obtenerCartaPorId(idCarta);

    if (!carta) return res.status(404).send("Imagen no encontrada");

    res.setHeader("Content-Type", carta.imagenMime);
    return res.send(carta.imagen);
  } catch (error) {
    console.error("Error obtenerImagen:", error);
    return res.status(500).send("Error");
  }
};

// Actualizar descripción/stock y opcionalmente imagen (si envías archivo)
export const actualizarCarta = async (req: Request, res: Response) => {
  try {
    const idCarta = Number(req.params.id);
    const { descripcion, stock } = req.body;

    const cambios: any = {};
    if (descripcion !== undefined) cambios.descripcion = descripcion;
    if (stock !== undefined) cambios.stock = stock;

    // si viene nueva imagen
    if (req.file) {
      cambios.imagen = req.file.buffer;
      cambios.imagenMime = req.file.mimetype;
      cambios.imagenNombre = req.file.originalname;
    }

    const actualizada = await cartaService.actualizarCarta(idCarta, cambios);

    if (!actualizada) {
      return res.status(404).json({ success: false, message: "Carta no encontrada", data: null });
    }

    return res.json({
      success: true,
      message: "Carta actualizada",
      data: {
        idCarta: actualizada.idCarta,
        descripcion: actualizada.descripcion,
        stock: actualizada.stock,
        estado: actualizada.estado,
        fechaCreacion: actualizada.fechaCreacion,
      },
    });
  } catch (error) {
    console.error("Error actualizarCarta:", error);
    return res.status(500).json({ success: false, message: "Error al actualizar", data: null });
  }
};

// Soft delete: estado=false
export const eliminarCarta = async (req: Request, res: Response) => {
  try {
    const idCarta = Number(req.params.id);
    const ok = await cartaService.eliminarCarta(idCarta);

    if (!ok) {
      return res.status(404).json({ success: false, message: "Carta no encontrada", data: null });
    }

    return res.json({ success: true, message: "Carta eliminada (soft delete)", data: null });
  } catch (error) {
    console.error("Error eliminarCarta:", error);
    return res.status(500).json({ success: false, message: "Error al eliminar", data: null });
  }
};