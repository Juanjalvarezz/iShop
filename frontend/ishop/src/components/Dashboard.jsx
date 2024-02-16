import Header from "./UserH"; // Importar el componente Header
import React, { useState, useEffect } from "react"; // Importar React y los hooks useState y useEffect
import axios from "axios"; // Importar axios para hacer solicitudes HTTP
import Global from "../Global"; // Importar el archivo Global para obtener la URL base
import Article from "./UserArticles"; // Importar el componente Article

const Dashboard = () => {
    const [articles, setArticles] = useState([]); // Estado para almacenar los artículos
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const articlesPerPage = 10; // Número de artículos por página
    const url = Global.url; // URL base para las solicitudes API

    useEffect(() => {
        getArticles(); // Llamada a la función getArticles() cuando el componente se monta
    }, []);

    // Función para obtener los artículos desde la API
    const getArticles = () => {
        axios.get(url + "/articles").then(res => {
            setArticles(res.data.articles); // Actualizar el estado con los artículos recibidos
        });
    }

    // Función para manejar cambios en el término de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualizar el estado del término de búsqueda
    };

    // Función para manejar cambios en la categoría seleccionada
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Actualizar el estado de la categoría seleccionada
        const timer = setTimeout(() => {
            setSelectedCategory(''); // Restablecer la categoría seleccionada después de un tiempo
        }, 5000);
        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    };

    // Índice del último artículo en la página actual
    const indexOfLastArticle = currentPage * articlesPerPage;
    // Índice del primer artículo en la página actual
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    // Filtrar los artículos según el término de búsqueda y la categoría seleccionada
    const filteredArticles = articles.filter((article) => {
        const { nombre, descripcion, categoria } = article;
        const searchTermLower = searchTerm.toLowerCase();
        // Verificar si el artículo coincide con el término de búsqueda y la categoría seleccionada
        const categoryFilter = selectedCategory === '' ? true : categoria === selectedCategory;
        const nombreIncludes = nombre && nombre.toLowerCase().includes(searchTermLower);
        const descripcionIncludes = descripcion && descripcion.toLowerCase().includes(searchTermLower);
        return (nombreIncludes || descripcionIncludes) && categoryFilter;
    });

    // Obtener los artículos de la página actual
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Función para cambiar a una página específica
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generar números de página para la paginación
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredArticles.length / articlesPerPage); i++) {
        pageNumbers.push(i);
    }

    // Renderizar el componente Dashboard
    return (
        <div className="publicaciones">
            <Header /> {/* Renderizar el componente Header */}
            <div className="search">
                <h1 className="mt-5">Artículos en stock</h1>
                <div className="search-container">
                    {/* Campo de entrada para el término de búsqueda */}
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="category-filter mt-3">
                <label htmlFor="category">Filtrar por categoría:</label>
                {/* Selección de categoría */}
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Todas</option>
                    {/* Generar opciones de categoría */}
                    {Array.from(new Set(articles.map(article => article.categoria))).map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="container mt-3">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2">
                    {currentArticles.length > 0 ? (
                        // Renderizar los artículos actuales
                        currentArticles.map((article, i) => (
                            <Article
                                key={i}
                                id={i}
                                articleData={article}
                            />
                        ))
                    ) : (
                        // Mostrar mensaje si no hay artículos para mostrar
                        <h3 className="mx-auto">No hay artículos que mostrar</h3>
                    )}
                </div>
            </div>

            {/* Paginación */}
            <nav>
                <ul className="pagination justify-content-center">
                    {/* Renderizar números de página como botones */}
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
