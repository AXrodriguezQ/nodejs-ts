// ? Traemos la interfaz para poderela comparar
import { userData } from "../models/user";

// ? Creamos la funcion para validar la agregada a la DB y retornamos un boolean segun el resultado
export const addUserValidation = ( userData: userData ): boolean => {
    
    // ? Validamos el id
    if ( userData.id ) {
        return false;
    }

    // ? Validamos el tipo y que ningun dato este vacio
    if ( userData.name == '' || userData.email == '' || typeof(userData.age) != "number" || typeof(userData.activo) != "boolean"  ) {
        return  false;
    }
    
    // ? Si todo sale bien enviamos un true
    return true;

}
