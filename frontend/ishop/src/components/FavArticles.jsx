import React, { useState } from "react"; // Importar React y el hook useState

const UserArticles = ({ articleData }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar si el artículo es favorito

  // Función para manejar el clic en el botón de favoritos
  const handleFavClick = () => {
    setIsFavorite(!isFavorite); // Cambiar el estado de favoritos al contrario del estado actual
  };

  // Estilo condicional para el botón de favoritos
  const buttonStyle = {
    backgroundColor: isFavorite ? "orange" : "white",
    color: isFavorite ? "white" : "black",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  };

  // Si no hay datos de artículo, mostrar un mensaje
  if (!articleData) {
    return <div>No hay datos disponibles</div>;
  }

  // Renderizar el componente del artículo
  return (
    <div className="col">
      <div className="card mx-auto mb-3">
        <div className="card-header">
          <h3 className="card-title">Artículo</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <ul className="list-group list-group-flush">
                {/* Mostrar detalles del artículo */}
                <li className="list-group-item">Descripción: {articleData.descripcion}</li>
                <li className="list-group-item">Precio: {articleData.precio}$</li>
                <li className="list-group-item">Cantidad: {articleData.cantidad} en stock</li>
                <li className="list-group-item">Categoría: {articleData.categoria}</li>
              </ul>
            </div>
            <div className="col">
              {/* Mostrar la imagen del artículo */}
              <img src={articleData.imagen} alt="Imagen del artículo" className="img-fluid mt-3 small-image" />
            </div>
          </div>
        </div>
        <div className="card-footer">
          {/* Botón para agregar o quitar de favoritos */}
          <button style={buttonStyle} onClick={handleFavClick}>
            {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}{" "}
            <i className="fa-solid fa-star"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserArticles;
