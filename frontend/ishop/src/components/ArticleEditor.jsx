import React, { useState } from 'react';
import axios from 'axios';
import Global from '../Global'; // Importa el archivo Global donde se encuentra la URL del servidor

const ArticleEditor = ({ articleId, initialData, onUpdate }) => {
    const [formData, setFormData] = useState(initialData);
    const url = Global.url; // Obtiene la URL del servidor desde el archivo Global

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateArticle(articleId, formData);
            onUpdate(); // Llama a la función onUpdate para actualizar la lista de artículos después de la edición
        } catch (error) {
            console.error(error);
        }
    };

    // Función para actualizar un artículo
    const updateArticle = async (id, updatedData) => {
        try {
            const response = await axios.put(`${url}/put/${id}`, updatedData);
            return response.data; // Suponiendo que el servidor devuelve datos actualizados después de la edición
        } catch (error) {
            throw new Error('Error al actualizar el artículo');
        }
    };

    return (
        <div>
            <h2>Editar Artículo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="quantity">Cantidad:</label>
                    <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="category">Categoría:</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
};

export default ArticleEditor;

