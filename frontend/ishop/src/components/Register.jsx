import React, { useState } from 'react'; // Importar React y useState desde React
import axios from 'axios'; // Importar axios para realizar solicitudes HTTP
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la navegación entre rutas
import Default from './Default'; // Importar el componente Default

const Register = () => {
  const [firstName, setFirstName] = useState(''); // Estado para almacenar el nombre
  const [lastName, setLastName] = useState(''); // Estado para almacenar el apellido
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para almacenar la confirmación de la contraseña
  const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar el mensaje de error
  const navigate = useNavigate(); // Obtener la función de navegación

  // Función para manejar el registro del usuario
  const handleRegister = async () => {
    // Validar que todos los campos estén llenos
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      setErrorMessage('Todos los campos son requeridos'); // Establecer el mensaje de error
      return;
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden'); // Establecer el mensaje de error
      return;
    }

    const data = {
      firstName,
      lastName,
      userName: username,
      email,
      password,
      confirmPassword
    };

    try {
      // Realizar una solicitud POST al servidor para registrar al usuario
      await axios.post('http://localhost:4000/api/register', data);
      console.log('Registrado Correctamente'); // Mensaje de éxito en la consola
      alert('Registrado Correctamente'); // Alerta de éxito para el usuario
      navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
    } catch (error) {
      console.log('Hubo algun error en el registro', error); // Manejo de errores
    }
  };

  return (
    <div className='ha'>
     <Default /> 
    <div className='container2'>
    <div className='form2'>
      <div className='login'>
      <h2 className='title'>Registro</h2>
      <input type="text"  placeholder='Nombre...' name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      <br />

      <input type="text"  placeholder='Apellido...' name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      <br />

      <input type="text"  placeholder='Username...' name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <br />

      <input type="email"  placeholder='Email...' name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br />

      <input type="password"  placeholder='Contraseña...' name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <br />
  
      <input type="password"  placeholder='Confirma contraseña...' name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostrar el mensaje de error si existe */}
      <button onClick={handleRegister}>Registro</button> {/* Botón para iniciar el proceso de registro */}
    </div>
    </div>
    </div>
    </div>
  );
};

export default Register; // Exportar el componente Register
