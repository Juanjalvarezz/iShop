'use strict';

const Article = require("../models/article");

// Función para guardar un artículo en la base de datos
exports.save = async (req, res) => {
    try {
        const params = req.body;
        console.log("Datos recibidos:", params); // Verifica los datos recibidos del frontend
        const article = new Article(params);
        const articleStored = await article.save();
        console.log("Artículo guardado:", articleStored); // Verifica si el artículo se guardó correctamente

        if (!articleStored) {
            return res.status(404).send({
                status: 'error',
                message: 'No se ha podido guardar con éxito'
            });
        }

        return res.status(200).send({
            status: 'success',
            article: articleStored
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
};

// Función para obtener todos los artículos de la base de datos
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).sort('-date').exec();

        if (!articles || articles.length === 0) {
            return res.status(200).send({
                status: 'success',
                message: 'No hay artículos para mostrar',
                articles: []
            });
        }

        return res.status(200).send({
            status: 'success',
            articles
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            status: 'error',
            message: 'Error al extraer datos'
        });
    }
};

// Función para eliminar un artículo de la base de datos
exports.delete = async (req, res) => {
    try {
        const articleId = req.params.id;
        const articleRemoved = await Article.findOneAndDelete({ _id: articleId });

        if (!articleRemoved) {
            return res.status(404).send({
                status: 'error',
                message: 'No se ha encontrado el artículo a eliminar'
            });
        }

        return res.status(200).send({
            status: 'success',
            article: articleRemoved
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            status: 'error',
            message: 'Error al eliminar'
        });
    }
};

// Función para editar un artículo en la base de datos
exports.edit = async (req, res) => {
    try {
        const articleId = req.params.id;
        const newData = req.body;
        const updatedArticle = await Article.findOneAndUpdate({ _id: articleId }, newData, { new: true });

        if (!updatedArticle) {
            return res.status(404).send({
                status: 'error',
                message: 'No se ha encontrado el artículo a editar'
            });
        }

        return res.status(200).send({
            status: 'success',
            article: updatedArticle
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            status: 'error',
            message: 'Error al editar el artículo'
        });
    }
};

// Función para subir una imagen al servidor y guardar su URL en la base de datos
exports.uploadImage = async (req, res) => {
    try {
        // Suponiendo que estás utilizando Multer para manejar la carga de archivos en el backend
        // En este punto, req.file contiene la información del archivo subido
        const imageUrl = req.file.path;

        // Aquí debes guardar la URL de la imagen en el artículo correspondiente en la base de datos
        // Puedes acceder al ID del artículo a través de req.body.articleId o cualquier otro método que utilices

        return res.status(200).send({
            status: 'success',
            message: 'Imagen subida correctamente',
            imageUrl: imageUrl // Opcional: puedes devolver la URL de la imagen en la respuesta
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            status: 'error',
            message: 'Error al subir la imagen'
        });
    }
};
