import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { BaseResponse } from "../shared/base-response";
import { generarToken } from "../shared/jwt.utils";


export const login = async(req: Request, res: Response): Promise<void> => {
    const {correo, contrasena} = req.body;

    if(!correo || !contrasena) {
        res.status(400).json(BaseResponse.error("Correo y contraseña requeridos"));
        return;
    }
    
    try{
        const personal = await authService.login(correo, contrasena);
        if(!personal){
            res.status(400).json(BaseResponse.error("Usuario o contraseña incorrectos"));
            return;
        }

        const token = generarToken(personal);

        res.status(200).json(BaseResponse.success(
            {
                token,
                personal: {
                    idPersonal: personal.idPersonal,
                    correo: personal.correo,
                    //rol: personal.idPersonal.nombre
                }
            },
            "Inicio de sesion exitoso"
        ));
    }catch(error: any) {
        console.error("Error en login", error);
        res.status(500).json(BaseResponse.error("Error en el servidor"));
    }
};