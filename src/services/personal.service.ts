import AppDataSource from "../config/appdatasource";
import { Personal } from "../entities/personal";
import * as bcrypt from 'bcryptjs';

// Insertar Personal
export const insertarPersonal = async (personal: Partial<Personal>): Promise<Personal> =>{
   if (!AppDataSource.isInitialized){
    await AppDataSource.initialize();
   } 

   const repository= AppDataSource.getRepository(Personal);

   // Hashear la contraseña si existe
   if(personal.contrasena){
    personal.contrasena = await bcrypt.hash(personal.contrasena, 10);
   }

   return await repository.save(personal);
};

//Listar todo el personal activo
export const listarPersonalesActivos = async (): Promise <Personal[]> =>{
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    const repository = AppDataSource.getRepository(Personal);
    return await repository.find({
        relations:['rol'],
        where: { estado: true },
        order: { idPersonal: "DESC" }
    });
};

//Listar  todos los personales
export const listarPersonales = async (): Promise<Personal[]> => {
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const repository = AppDataSource.getRepository(Personal);
    return await repository.find({
        //relations: ['rol'],
        order: {idPersonal: 'DESC'}
    });
} ;

//Actualizar personal 
export const actualizarPersonal = async (idPersonal: number, data: Partial<Personal>): Promise<void> => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    const repository = AppDataSource.getRepository(Personal);

    // Hashear la nueva contraseña si esta presente 
    if(data.contrasena) {
        data.contrasena = await bcrypt.hash(data.contrasena,10);
    }
    await repository.update({ idPersonal}, data);
};

// Eliminar Personal
export const eliminarPersonal = async (idPersonal: number): Promise<void> => {
    if(AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    const repository = AppDataSource.getRepository(Personal);
    await repository.update({idPersonal}, {estado: false});
};

//Activar Personal
export const activarPersonal = async (idPersonal: number ): Promise<void> => {
    if(!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const repository = AppDataSource.getRepository(Personal);
    await repository.update({idPersonal}, {estado: true})
};