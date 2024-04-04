// ? importamos todo lo necesario
import { Request, Response } from "express"
import { collections } from "../services/Database.service";
import { ObjectId } from "mongodb";
import { addUserValidation } from "../validations/userValidations";
import User from "../models/user";

// ? Creamos la variable que va a contener todos los controladores para los usuarios
export const usersController = {

    // ? Definimos la propiedad que nos mostrara todos los usuarios
    getAllUsers: async ( _req: Request, res: Response ) => {

        // ? Agregamos el controlador de errores
        try {

            // ? Traemos todos los usuarios de la coleccion y los volvemos un array
            const allUsers: any = await collections.users?.find({}).toArray();

            // ? Verficamos que la coleccion si contenga datos
            if (allUsers?.length <= 0) {
                // ? Retornamos mensaje en caso de tener la coleccion vacia
                return res.status(404).json({ message: "No users registed" });
            }

            // ? Si todo sale bien mostramos toda la informacion solicitada
            res.status(200).json(allUsers);

        // ? Enviamos el catch por si ocurre un error
    } catch (error) {
        
        // ? Mostramos el mensaje de error y su status
        res.status(500).send({ error: error });
    }
    },

    // ? Definimos la propiedad que nos mostrara un solo usuario
    getUser: async ( req: Request, res: Response ) => {
        
        // ? Creamos variable que nos trae el id del parametro de la peticion
        const id = req?.params?.id;
        
        // ? Agregamos el controlador de errores
        try {
            
            // ? Creamos un query para prevenir posibles errores con el id
            const query = { _id: new ObjectId(id) };

            // ? Cremos el usuario y lo buscamos en la DB
            const user = await collections.users?.findOne(query);

            // ? Para evitar lineas de codigo utilizamos un operador ternario para comprobar el user
            user
            // ? Si el usuario fue encontrado entonces enviamos el usuario
            ? res.status(200).json(user)
            // ? Si el usuario no fue encontrado evniamos su respectiva respuesta
            : res.status(404).json({ message: `error when searching for the user with the id: ${query._id}` });
            
        // ? Enviamos el catch por si ocurre un error
        } catch(error) {
        
        // ? Mostramos el mensaje de error y su status
            res.status(500).send({ error: error });
        }
    },

    // ? Definimos la propiedad que nos agregara un usuario
    createUser: async ( req: Request, res: Response ) => {
        
        // ? Agregamos el controlador de errores
        try {

            // ? Creamos una variable para guardar lo que el cliente envia en el body de la peticion
            const newUser = req.body;

            // ? Llamamos las validaciones y le pasamos el body de la peticion
            const result = addUserValidation(req.body);

            // ? Si el return es false entonces enviamos el error
            if (!result) {
                return res.status(400).json({ message: "Bad request" });

            // ? Si el return es true entonces agrgeamos el registro
            } else {
                const response = await collections.users?.insertOne(newUser);

                // ? Verficamos que la consulta si funcionara correctamente y segun eso enviamos el respectivo mensaje
                response
                    ? res.status(200).json(response)
                    : res.status(400).json({ message: "User not created" })

            }

        // ? Enviamos el catch por si ocurre un error
        } catch(error) {
            
            // ? Mostramos el mensaje de error y su status
            res.status(500).send({ error: error });
        }
    },

    // ? Definimos la propiedad que nos agregara un usuario
    updateUser: async ( req: Request, res: Response ) => {

        // ? Creamos la variable del id
        const id = req?.params?.id;

        try {

            // ? Creamos un query para prevenir posibles errores con el id
            const query = { _id: new ObjectId(id) };

            // ? Guardamos el user que llega del body y le damos el mismo tipo
            const updateUser: User = req.body as User;

            // ? Editamos el user por su id y le pasamos el body
            const result = await collections.users?.findOneAndUpdate(query, { $set: updateUser });

            // ? Segun el resultado enviamos el mensaje
            result
                ? res.status(200).json({ message: "User update successfully"})
                : res.status(404).json({ message: "User not found" });
            
        // ? Enviamos el catch por si ocurre un error
        } catch(error) {
            
            // ? Mostramos el mensaje de error y su status
            res.status(500).send({ error: error });
        }

    },
    
    // ? Definimos la propiedad que nos eliminara un usuario
    deleteUser: async ( req: Request, res: Response ) => {

        // ? Creamos la variable del id
        const id = req?.params?.id;
        
        // ? Agregamos el controlador de errores
        try {
            
            // ? Creamos un query para prevenir posibles errores con el id
            const query = { _id: new ObjectId(id) };

            // ? Eliminamos el user por su id
            const result = await collections.users?.findOneAndDelete(query);

            // ? Segun el resultado enviamos el mensaje
            result
                ? res.status(200).json({ message: "User deleted successfully"})
                : res.status(404).json({ message: "User not found" });

        } catch (error) {
            
            // ? Mostramos el mensaje de error y su status
            res.status(500).send({ error: error });
        }
    }

};