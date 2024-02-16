import React, { useState } from "react";

const Article = ({ id, articleData, delArticle, updateArticle }) => {
    // Inicializar los estados siempre, incluso si los datos del artículo son undefined
    const [editedData, setEditedData] = useState(articleData || {});
    const [editing, setEditing] = useState(false);

    // Verificar si articleData es undefined antes de intentar desestructurarlo
    if (!articleData) {
        // Si no hay datos disponibles, se muestra un mensaje de aviso
        return <div>No hay datos disponibles</div>;
    }

    // Desestructurar los datos del artículo
    const { nombre, descripcion, precio, cantidad, categoria, imagen } = articleData;

    // Función para eliminar el artículo
    const del = () => {
        delArticle(id);
    }

    // Función para activar el modo de edición
    const edit = () => {
        setEditing(true);
    }

    // Función para manejar los cambios en los campos editables
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Actualizar el estado de los datos editados
        setEditedData({ ...editedData, [name]: value });
    };

    // Función para manejar la acción de guardar cambios
    const handleSubmit = () => {
        // Enviar los datos editados al componente padre para actualizar el artículo
        updateArticle(id, editedData);
        // Desactivar el modo de edición después de guardar los cambios
        setEditing(false);
    };

    return (
        <div className="col">
            <div className="card mx-auto mb-3">
                <div className="card-header">
                    {/* Mostrar el nombre del artículo en la cabecera de la tarjeta */}
                    <h3 className="card-title">{nombre}</h3>
                </div>

                {/* Verificar si se está editando el artículo */}
                {editing ? (
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <label>Nombre:</label>
                                {/* Input para editar el nombre */}
                                <input className="form-control" type="text" name="nombre" value={editedData.nombre} onChange={handleChange} />
                                <label>Descripción:</label>
                                {/* Textarea para editar la descripción */}
                                <textarea className="form-control" name="descripcion" value={editedData.descripcion} onChange={handleChange}></textarea>
                            </div>
                            <div className="col">
                                <label>Precio:</label>
                                {/* Input para editar el precio */}
                                <input className="form-control" type="number" name="precio" value={editedData.precio} onChange={handleChange} />
                                <label>Cantidad:</label>
                                {/* Input para editar la cantidad */}
                                <input className="form-control" type="number" name="cantidad" value={editedData.cantidad} onChange={handleChange} />
                                <label>Categoría:</label>
                                {/* Input para editar la categoría */}
                                <input className="form-control" type="text" name="categoria" value={editedData.categoria} onChange={handleChange} />
                            </div>
                        </div>
                        {/* Botón para guardar los cambios */}
                        <button className="btn btn-warning mt-3" onClick={handleSubmit}>Guardar cambios</button>
                    </div>
                ) : (
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                {/* Mostrar la descripción del artículo */}
                                <label className="card-text text-start">Descripción: {descripcion}</label>
                                <ul className="list-group list-group-flush">
                                    {/* Mostrar el precio del artículo */}
                                    <li className="list-pub list-group-item">Precio: {precio}$</li>
                                    {/* Mostrar la cantidad disponible del artículo */}
                                    <li className="list-pub list-group-item">Cantidad: {cantidad} en stock</li>
                                    {/* Mostrar la categoría del artículo */}
                                    <li className="list-pub list-group-item">Categoría: {categoria}</li>
                                </ul>
                            </div>
                            <div className="col">
                                {/* Mostrar la imagen del artículo */}
                                <img src={imagen} alt="Imagen del artículo" className="img-fluid mt-3 small-image" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Botones para eliminar y editar el artículo */}
                <div className="card-footer">
                    <button className="space btn btn-danger btn-m" type="button" onClick={del}>Eliminar <i className="fa-solid fa-trash"></i></button>
                    <button className="btn btn-primary btn-m " type="button" onClick={edit}>Editar <i className="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>
    );
};

export default Article;

