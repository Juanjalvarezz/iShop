'use strict';

const express = require('express'); // Importa Express para la creación de rutas
const Article = require('../controllers/article'); // Importa el controlador de artículos
const multer = require('multer'); // Importa Multer para el manejo de carga de archivos

const router = express.Router(); // Crea un enrutador de Express
const upload = multer({ dest: 'uploads/' }); // Define la carpeta donde se guardarán las imágenes

// Rutas para las operaciones CRUD de artículos
router.post('/save', Article.save); // Ruta para guardar un artículo
router.get('/articles', Article.getArticles); // Ruta para obtener todos los artículos
router.delete('/delete/:id', Article.delete); // Ruta para eliminar un artículo
router.put('/put/:id', Article.edit); // Ruta para editar un artículo
router.post('/upload-image', upload.single('imagen'), Article.uploadImage); // Ruta para subir una imagen

module.exports = router; // Exporta el enrutador

