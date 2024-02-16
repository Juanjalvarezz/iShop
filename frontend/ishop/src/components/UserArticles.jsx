import React from "react"; // Importar React

const UserArticles = ({ articleData }) => {

    // Verificar si articleData es undefined antes de intentar desestructurarlo
    if (!articleData) {
        return <div>No hay datos disponibles</div>; // Renderizar un mensaje si no hay datos disponibles
    }

    const { nombre, descripcion, precio, cantidad, categoria, imagen } = articleData; // Desestructurar los datos del artículo

    const handleFavClick = () => {
        // Lógica para el botón "Juan"
        console.log("Anadido a Favoritos"); // Mensaje en consola cuando se hace clic en "Juan"
    };
   
    return (
        <div className="col">
            <div className="card mx-auto mb-3">
                <div className="card-header">
                    <h3 className="card-title">{nombre}</h3> {/* Mostrar el nombre del artículo */}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <label className="card-text text-start">Descripción: {descripcion}</label>
                            <ul className="list-group list-group-flush">
                                <li className="list-pub list-group-item">Precio: {precio}$</li> {/* Mostrar el precio */}
                                <li className="list-pub list-group-item">Cantidad: {cantidad} en stock</li> {/* Mostrar la cantidad */}
                                <li className="list-pub list-group-item">Categoría: {categoria}</li> {/* Mostrar la categoría */}
                            </ul>
                        </div>
                        <div className="col">
                            {/* Agregar la imagen del artículo */}
                            <img src={imagen} alt="Imagen del artículo" className="img-fluid mt-3 small-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserArticles; // Exportar el componente UserArticles
