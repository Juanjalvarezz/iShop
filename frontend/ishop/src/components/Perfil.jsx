import React, { useState, useEffect } from 'react'; // Importar React, useState y useEffect desde React
import axios from "axios"; // Importar axios para realizar solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la navegación entre rutas
import { NavLink } from 'react-router-dom'; // Importar NavLink para enlaces de navegación
import foto from '../assets/image/profile.png' // Importar la imagen de perfil

const Perfil = () => {
    let redirect = useNavigate(); // Obtener la función de navegación
    const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

    useEffect(() => {
        // Función asincrónica para verificar la autenticación del usuario
        const checkAuthentication = async () => {
            try {
                // Realizar una solicitud GET al servidor para obtener los datos del usuario
                const response = await axios.get('http://localhost:4000/api/dashboard', {
                    withCredentials: true,
                });
                setUserData(response.data); // Establecer los datos del usuario en el estado
            } catch (error) {
                redirect("/login"); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
            }
        }

        checkAuthentication(); // Llamar a la función de verificación de autenticación al cargar el componente
    }, [redirect]); // Dependencia de useEffect

    return (
        <div className='ha'>
            <div className='profile'>

                {/* Mostrar el mensaje de bienvenida con el nombre del usuario */}
                {userData && (
                    <h2>Welcome {userData.firstName}</h2>
                )}

                {/* Enlace para volver al panel de control */}
                <NavLink to='/dashboard' className="navbar-brand">
                    <button className="nav-link" value="Publicar">Atras <i class="fa-solid fa-backward"></i></button>
                </NavLink>

            </div>

            {/* Mostrar los datos del perfil del usuario */}
            {userData && (
                <div className='profileData'>
                    <img src={foto} alt="Perfil foto" width={200}/> {/* Mostrar la imagen de perfil */}
                    <p>Nombre: {userData.firstName}</p> {/* Mostrar el nombre del usuario */}
                    <p>Apellido: {userData.lastName}</p> {/* Mostrar el apellido del usuario */}
                    <p>Username: {userData.userName}</p> {/* Mostrar el nombre de usuario */}
                    <p>Email: {userData.email}</p> {/* Mostrar el correo electrónico del usuario */}
                </div>
            )}
        </div>
    );
};

export default Perfil; // Exportar el componente Perfil
