import React, { useState, useEffect } from "react"; // Importar React y los hooks useState, useEffect
import axios from "axios"; // Importar axios para realizar solicitudes HTTP
import Global from "../Global"; // Importar el archivo Global para obtener la URL base de la API
import Article from "./FavArticles"; // Importar el componente Article para mostrar los artículos favoritos
import { NavLink } from "react-router-dom"; // Importar NavLink para la navegación entre rutas

const Favoritos = () => {
  const [articles, setArticles] = useState([]); // Estado para almacenar los artículos
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [selectedCategory, setSelectedCategory] = useState(''); // Nuevo estado para la categoría seleccionada
  const url = Global.url; // Obtener la URL base de la API desde el archivo Global

  useEffect(() => {
      getArticles(); // Llamar a la función getArticles al montar el componente
  }, []);

  // Función para obtener todos los artículos de la API
  const getArticles = () => {
      axios.get(url + "/articles").then(res => {
          setArticles(res.data.articles); // Actualizar el estado de los artículos con la respuesta de la API
      });
  }

  // Función para filtrar los artículos según el término de búsqueda y la categoría seleccionada
  const filteredArticles = articles.filter((article) => {
    if (!article) return false; // Retornar falso si no hay artículo
    const { nombre, descripcion, categoria } = article; // Obtener nombre, descripción y categoría del artículo
    const searchTermLower = searchTerm.toLowerCase(); // Convertir el término de búsqueda a minúsculas
    const categoryFilter = selectedCategory === '' ? true : categoria === selectedCategory; // Filtrar por categoría seleccionada

    // Verificar si nombre y descripción incluyen el término de búsqueda
    const nombreIncludes = nombre && nombre.toLowerCase().includes(searchTermLower);
    const descripcionIncludes = descripcion && descripcion.toLowerCase().includes(searchTermLower);

    // Retornar verdadero si el artículo cumple con el filtro de búsqueda y categoría
    return (
        (nombreIncludes || descripcionIncludes) &&
        categoryFilter
    );
  });

  // Obtener todas las categorías disponibles de los artículos
  const categories = [...new Set(articles.map(article => article.categoria))];

  // Renderizar el componente Favoritos
  return (
    <div>
      <div className="profile">
        <h2>Mis Favoritos</h2>
        <NavLink to='/dashboard' className="navbar-brand">
          <button className="nav-link" value="Publicar">Atras <i className="fa-solid fa-backward"></i></button>
        </NavLink>
      </div>

      <div className="publicaciones">
        <div className="search">
          <h1 className="mt-5">Añade Artículos a Favoritos</h1>
        </div>

        <div className="container mt-3">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
            {filteredArticles.length > 0 ? ( // Verificar si hay artículos para mostrar
              filteredArticles.map((article, i) => {
                return (
                  <Article // Renderizar el componente Article para cada artículo filtrado
                    key={i} // Propiedad key única para cada artículo
                    articleData={article} // Pasar los datos del artículo como propiedad
                  />
                );
              })
            ) : (
              <h3 className="mx-auto"> No hay artículos que mostrar</h3> // Mensaje si no hay artículos
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favoritos;
