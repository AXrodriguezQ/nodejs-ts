import { ObjectId } from "mongodb";

// ? Creamos un type para el campo cargo y solo tenga esas ??? opciones
export type cargo = 'empleado' | 'supervisor';

// ? Creamos una interfaz con todos los datos y sus tipos para el user
export interface userData {
    name: string;
    email: string;
    age: number;
    cargo: cargo;
    activo: boolean;
    // ! El ? es por si el campo no se envia desde el cliente y lo tenemos que obtener manualmente
    id?: ObjectId;
}

// ? Exportamos el user en forma de clase con sus propiedades en el constructor
export default class User {
    constructor(public data: userData) {}
}