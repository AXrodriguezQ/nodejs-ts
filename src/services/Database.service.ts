// ? importamos las dependencias necesarias y le asignamos un nombre para un mejor manejo
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

// ? Creamos la variable colleccion con el fin de que encuentre y guarde la coleccion de la DB 
export const collections: { users?: mongoDB.Collection } = {};

// ? Creamos la funcion que nos conectara con la DB
export async function connectedToDatabase () {

    // ? Traemos el dotenv para utilizar las variables de entorno
    dotenv.config();

    // ? Creamos la variable client con el fin de conectar con la DB
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.DB_CONN_STRING}`);

    // ? Conectamos con la DB
    await client.connect();

    // ? Creamos la variable db con el fin de obtener la coleccion de la DB
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    // ? Creamos la variable usersCollection con el fin de obtener la coleccion de los usuarios
    const usersCollection: mongoDB.Collection = db.collection(`${process.env.GAMES_COLLECTION_NAME}`);

    // ? Le asignamos todo a la variable collections
    collections.users = usersCollection;

    // ? Envamos un mensaje para verificar la conexión con la DB
    console.log('Successfully connected to MongoDB');

};