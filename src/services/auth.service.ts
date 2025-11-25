import { AppDataSource } from "../config/appdatasource";
import { Personal } from "../entities/personal";
import * as bcrypt from "bcryptjs";

export const login = async (correo: string, contrasena: string): Promise<Personal | null> => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    const repository = AppDataSource.getRepository(Personal);

    try{
        const personal = await repository.findOne({
            where: {
                correo:correo.trim().toLowerCase(),
                estado: true
            },
            //relations: ['rol']
        });
        if(!personal) {
            return null;
        }
        const isMatch = await bcrypt.compare(contrasena, personal.contrasena);

        return isMatch ? personal : null;

    }catch(error){
        console.error("Error en login (auth.service):",error);
        throw new Error("Error al intentar iniciar sesion");
    }
};



