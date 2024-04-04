// ? Importando dependencias necesarias
import express from 'express';
import { usersController } from '../controllers/users.controllers';

// ? Variable que se encarga de administrar las rutas
export const userRoutes = express.Router();

// ? Le decimos que permita o utilize JSON para el envio y la recepcion de datos
userRoutes.use(express.json());

userRoutes.get('/', usersController.getAllUsers);
userRoutes.get('/:id', usersController.getUser);
userRoutes.post('/', usersController.createUser);
userRoutes.put('/:id', usersController.updateUser);
userRoutes.delete('/:id', usersController.deleteUser);