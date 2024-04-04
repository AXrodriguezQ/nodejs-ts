// ? Importamos todo lo necesario
import express from 'express';
import * as dotenv from 'dotenv';
import { connectedToDatabase } from './services/Database.service';
import { userRoutes } from './routes/user.route';

// ? Asignamos express a la variable app para un mejor uso
const app = express();

// ? Traemos el dotenv para poder utilizar las dependencias de desarrollo
dotenv.config();

// ? Traemos la conexion de la DB
connectedToDatabase()

    // ? Recibimos la respuesta en forma de promesa
    .then(() => {

        // ? Añadimos las rutas de usuario a la app
        app.use('/api/v1', userRoutes);

        // ? Le indicamos el puerto de escucha
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port: ${process.env.PORT}`);
         });
    })
    // ? Recibimos el error
    .catch((err) => {

        // ? Mostramos un mensaje de error en consola
        console.log(err);
        
        // ? Cerramos el servidor
        process.exit(1);
    });
