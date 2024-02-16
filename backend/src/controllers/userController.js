const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Controlador para registrar un usuario
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, confirmPassword } = req.body;

    // Comprueba si la contraseña y la confirmación de contraseña coinciden
    if (password !== confirmPassword) {
      return res.status(400).send('Las contraseñas no coinciden');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = new User({ firstName, lastName, userName, email, password: hashedPassword });

    // Guarda el usuario en la base de datos
    await newUser.save();

    res.status(201).send('Usuario registrado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar usuario');
  }
};

// Controlador para iniciar sesión de usuario
exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (user && await user.comparePassword(password)) {
      res.cookie('userToken', user._id.toString(), { httpOnly: true });
      // Devuelve el rol del usuario en la respuesta
      res.status(200).json({ role: user.role });
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión');
  }
};

// Controlador para cerrar sesión de usuario
exports.logoutUser = (req, res) => {
  res.clearCookie('userToken');
  res.status(200).send('Cierre de sesión exitoso');
};

// Middleware para autenticar al usuario
exports.authenticateUser = async (req, res, next) => {
  const userId = req.cookies.userToken;
  if (!userId) {
    return res.status(401).send('No estás autorizado');
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send('No estás autorizado');
    } else {
      const userData = {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      return res.status(200).json(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al autenticar usuario');
  }
};

// Controlador para obtener el perfil de usuario
exports.getUserProfile = async (req, res) => {
  try {
    // Busca el usuario en la base de datos por su ID (suponiendo que esté disponible en el token de autenticación)
    const userId = req.user.id; // Suponiendo que tienes un middleware de autenticación que agrega el usuario al objeto de solicitud (req)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devuelve los datos del usuario
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      // Puedes incluir más campos según sea necesario
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find({}, { firstName: 1, lastName: 1, userName: 1, email: 1 }); // Solo seleccionamos los campos requeridos
      res.json(users);
  } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para editar un usuario
exports.editUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { firstName, lastName, userName, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, { firstName, lastName, userName, email }, { new: true });
      res.json(updatedUser);
  } catch (error) {
      console.error("Error al editar usuario:", error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};
