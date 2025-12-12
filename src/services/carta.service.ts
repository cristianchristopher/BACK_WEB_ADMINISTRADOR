import { AppDataSource } from "../config/appdatasource";
import { Carta } from "../entities/carta";



const repoCarta = async () => {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  return AppDataSource.getRepository(Carta);
};

export const insertarCarta = async (carta: Partial<Carta>): Promise<Carta> => {
  const repository = await repoCarta();

  carta.stock = Number(carta.stock ?? 0);
  carta.estado = carta.estado ?? true;

  return await repository.save(carta);
};



export const listarCartas = async (): Promise<Carta[]> =>{
    const repository = await repoCarta();
    
    return await repository.find({
        where: { estado: true},
        order: { idCarta: "DESC" as any},
    });
};

export const obtenerCartaPorId = async (idCarta: number): Promise<Carta | null> =>{
    const repository = await repoCarta();
    return await repository.findOne({ where : {idCarta}});
};

export const actualizarCarta = async (
    idCarta: number,
    cambios: Partial<Carta>
): Promise<Carta | null> =>{
    const repository = await repoCarta() ;

    const carta = await repository.findOne({where: { idCarta}});
    if(!carta) return null;

      // Solo aplicamos cambios enviados
  if (cambios.descripcion !== undefined) carta.descripcion = String(cambios.descripcion);
  if (cambios.stock !== undefined) carta.stock = Number(cambios.stock);

  // Si se envía nueva imagen
  if (cambios.imagen !== undefined) carta.imagen = cambios.imagen;
  if (cambios.imagenMime !== undefined) carta.imagenMime = cambios.imagenMime;
  if (cambios.imagenNombre !== undefined) carta.imagenNombre = cambios.imagenNombre;

  return await repository.save(carta);
};

export const eliminarCarta = async (idCarta: number): Promise<boolean> =>{
    const repository = await repoCarta();

    const result= await repository.update({idCarta},{estado: false});
    return ( result.affected ?? 0) > 0;
};