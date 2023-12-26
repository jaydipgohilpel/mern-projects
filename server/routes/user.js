import express from 'express';
import * as userController from '../controller/user.js';


const router = express.Router();

router
    .post('/', userController.addUser)
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUser)
    .put('/:id', userController.editUser)
    .delete('/:id', userController.deleteUser)

export default router;