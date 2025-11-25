import {Request, Response} from "express"
import * as personalService from "../services/personal.service"
import { Personal } from "../entities/personal"
import { BaseResponse } from "../shared/base-response";
import { MensajeController } from "../shared/constants";
import AppDataSource from "../config/appdatasource";

//Insertar Personal
export const insertarPersonal = async (req: Request, res: Response) => {
    try{
        const personal: Partial<Personal> = req.body;
        const nuevoPersonal = await personalService.insertarPersonal(personal);
        res.json(BaseResponse.success(nuevoPersonal.idPersonal, MensajeController.INSERTADO_OK));
    }catch(error:any) {
        console.error("Error insertarPersonal", error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

// Listar todos los Personales
export const listarPersonales = async (req:Request, res: Response) => {
    try{
        const personales = await personalService.listarPersonales();
        res.json(BaseResponse.success(personales,MensajeController.CONSULTA_OK));
    }catch(error: any){
        console.error("Error listarPersonales", error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

//Listar Personales activos
export const listaPesonalesActivos = async (req: Request, res: Response) => {
    try{
        const personales = await personalService.listarPersonalesActivos();
        res.json(BaseResponse.success(personales, MensajeController.CONSULTA_OK));
    }catch(error: any) {
        console.error("Error listaPersonalesActivos", error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

//Actualizar personal
export const actualizarPersonal = async (req: Request, res: Response) =>{
    try{
        const idPersonal = parseInt(req.params.idPersonal);
        const data: Partial<Personal> = req.body;
        await personalService.actualizarPersonal(idPersonal, data);
        res.json(BaseResponse.success(null, MensajeController.ACTUALIZADO_OK));
    }catch(error: any){
        console.error("Error actualizarPersonal", error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

//Eliminar usuario(soft delete)
export const eliminarPersonal = async (req: Request, res:Response) => {
    try{
        const idPersonal = parseInt(req.params.idPersonal);
        await personalService.eliminarPersonal(idPersonal);
        res.json(BaseResponse.success(null, MensajeController.ELIMINADO_OK));
    }catch(error: any){
        console.error("Error eliminarPersonal", error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

//Activar Personal
export const activarPesonal = async (req:Request, res:Response) => {
    try{
        const idPersonal = parseInt(req.params.idPersonal);
        await personalService.activarPersonal(idPersonal);
        res.json(BaseResponse.success(null, MensajeController.ACTIVADO_OK));
    }catch(error: any){
        console.error("Error activarPersonal", error);
        res.status(500).json(BaseResponse.error(error.message));
    }
};

//obtener personal por id
export const obtenerPersonalPorId = async (req:Request, res:Response): Promise<void> =>{
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        res.status(400).json({
            success: false,
            message: "ID invalido",
            data: null
        });
        return
    }

    try{
        const personal = await AppDataSource.getRepository(Personal).findOne({
            where: { idPersonal: id},
            relations: ["rol"]
        });

        if(!personal){
            res.status(404).json({
                success: false,
                message: "Personal no encontrado",
                data: null
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "personal encontrado",
            data: personal
        });
    }catch(error){
        console.error("Error al obtener personal", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor ",
            data: null
        });
    }
};