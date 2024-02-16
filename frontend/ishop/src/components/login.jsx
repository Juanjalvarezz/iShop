import React, { useState } from 'react'; // Importar React y el hook useState
import axios from 'axios'; // Importar axios para realizar solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la navegación entre rutas
import "../assets/css/App.css"; // Importar el archivo de estilos CSS
import Default from './Default'; // Importar el componente Default

const Login = () => {
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [error] = useState(''); // Estado para el mensaje de error (sin uso actualmente)
  const navigate = useNavigate(); // Función de navegación entre rutas

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
        // Realizar una solicitud POST al servidor de autenticación
        const response = await axios.post(
            'http://localhost:4000/api/login', // URL del endpoint de inicio de sesión
            { userName: username, password: password }, // Datos de inicio de sesión
            { withCredentials: true } // Opción para enviar las credenciales con la solicitud
        );

        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
            // Obtener el rol del usuario desde la respuesta
            const role = response.data.role;
            // Redireccionar según el rol del usuario
            if (role === 'user') {
                navigate('/dashboard'); // Redireccionar al dashboard del usuario
            } else if (role === 'admin') {
                navigate('/admin'); // Redireccionar al dashboard del administrador
            } else {
                // Manejar otro rol si es necesario
            }
        } else {
            alert('Usuario o contraseña incorrecta'); // Alerta en caso de credenciales incorrectas
        }
    } catch (error) {
        console.error('Error en:', error); // Mostrar el error en la consola en caso de error de solicitud
        alert('Ocurrió un error iniciando sesión'); // Alerta en caso de error de solicitud
    }
};

// Renderizar el componente Login
return (
  <div className='ha'>
    <Default /> 
    <div className='form'>
      <div className='login'>
        <h1 className='title'>Inicio de sesión</h1>
        <input
          type="text"
          name="username"
          placeholder='Username...'
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Manejar cambios en el nombre de usuario
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder='Contraseña...'
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Manejar cambios en la contraseña
        />
        <br />
        {error && <div className="error">{error}</div>} {/* Mostrar mensaje de error si existe */}
        <button onClick={handleLogin}>Iniciar sesión</button> {/* Manejar clic en el botón de inicio de sesión */}
      </div>
    </div>
  </div>
);
};

export default Login; // Exportar el componente Login
