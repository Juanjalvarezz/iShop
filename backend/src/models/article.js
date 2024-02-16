'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Categorías permitidas para los artículos
const allowedCategories = ["Teléfono", "Accesorio", "Repuesto"];

// Esquema del artículo
const ArticleSchema = new Schema({
    nombre: String, // Nombre del artículo
    descripcion: String, // Descripción del artículo
    precio: Number, // Precio del artículo
    cantidad: Number, // Cantidad disponible del artículo
    categoria: { type: String, enum: allowedCategories }, // Categoría del artículo
    imagen: String  // URL de la imagen del artículo
});

// Exporta el modelo de artículo
module.exports = mongoose.model('Article', ArticleSchema);
