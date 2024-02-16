import React, { useState } from "react"; // Importar React y el hook useState
import axios from "axios"; // Importar axios para realizar solicitudes HTTP
import { Navigate } from "react-router-dom"; // Importar Navigate para la navegación entre rutas

const New = () => {

    // Estado para almacenar los datos del nuevo artículo
    const [article, setArticle] = useState({
         nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        categoria: "", 
        imagen: null
    });

    // Estado para controlar la redirección después de enviar los datos
    const [redirect, setRedirect] = useState(false);

   // Función para manejar el cambio en el campo de carga de imágenes
   const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const maxSize = 800; // Tamaño máximo permitido

            let width = image.width;
            let height = image.height;

            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, width, height);

            const resizedImage = canvas.toDataURL('image/jpeg', 0.7); // Reducción de calidad a 70%

            setArticle({ ...article, imagen: resizedImage });
        };
    };

    reader.readAsDataURL(file);
};

    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    // Función para enviar los datos del nuevo artículo al servidor
    const sendData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/save', article)
            .then(res => {
                setRedirect(true);
            })
            .catch(error => {
                console.error('Error en la petición POST:', error);
            });
    };

    // Redirigir a la página de artículos si la redirección está activada
    if (redirect) {
        return <Navigate to="/articles" />;
    }

    // Renderizar el formulario para agregar un nuevo artículo
    return (
        <div className="nueva-publicacion">
            <div id="formulario" className="card mx-auto mb- mt-3" style={{ width: "30em"}}>
                <div className="card-body">
                <div className="card-header text-dark"><h4>Subir nuevo artículo</h4></div>
                    <form onSubmit={sendData}>
                        <div className="mb-3">
                            <label>Nombre</label>
                            <input type="text" className="form-control" name="nombre" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>Descripción</label>
                            <textarea className="form-control" rows="2" cols="30" name="descripcion" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>Precio</label>
                            <input type="number" className="form-control" name="precio" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>Cantidad</label>
                            <input type="number" className="form-control" name="cantidad" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label>Categoría</label>
                            <select className="form-control" name="categoria" onChange={handleChange} required>
                                <option value="">Seleccionar...</option>
                                <option value="Telefono">Telefono</option>
                                <option value="Accesorio">Accesorio</option>
                                <option value="Repuesto">Repuesto</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Imagen</label>
                            <input type="file" className="form-control" name="imagen" onChange={handleImageChange} required />
                        </div>
                        <div className="mb-3">
                            <input className="form-control btn btn-primary" type="submit" value="Publicar" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New; // Exportar el componente New
