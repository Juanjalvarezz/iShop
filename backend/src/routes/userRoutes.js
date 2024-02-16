// Importación del framework Express
const express = require('express');

// Creación de un enrutador de Express
const router = express.Router();

// Importación del controlador de usuarios
const userController = require('../controllers/userController');

// Definición de rutas para las operaciones relacionadas con usuarios
router.post('/register', userController.registerUser); // Ruta para registrar un usuario
router.post('/login', userController.loginUser); // Ruta para iniciar sesión de usuario
router.post('/logout', userController.logoutUser); // Ruta para cerrar sesión de usuario
router.get('/dashboard', userController.authenticateUser); // Ruta para autenticar al usuario
router.get('/user-profile', userController.getUserProfile); // Ruta para obtener el perfil de usuario
router.get('/users', userController.getAllUsers); // Ruta para obtener todos los usuarios
router.put('/users/:id', userController.editUser); // Ruta para editar un usuario
router.delete('/users/:id', userController.deleteUser); // Ruta para eliminar un usuario

// Exportación del enrutador
module.exports = router;
