import jwt from "jsonwebtoken";
import { Personal} from "../entities/personal";

const SECRET_KEY = process.env.JWT_SECRET || "Yoku1510*";

// Crear token
export const generarToken = (personal: Personal): string => {
    const payload = {
        idPersonal: personal.idPersonal,
        correo: personal.correo,
        //rol: usuario.rol.nombre
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
};

// Verificar token
export const verificarToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};
