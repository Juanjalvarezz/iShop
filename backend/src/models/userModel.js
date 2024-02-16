// Importación de paquetes necesarios
const mongoose = require('mongoose'); // Mongoose para modelar objetos MongoDB
const bcrypt = require('bcrypt'); // bcrypt para encriptar contraseñas

// Esquema de usuario
const userSchema = new mongoose.Schema({
  firstName: String, // Nombre del usuario
  lastName: String, // Apellido del usuario
  userName: String, // Nombre de usuario único
  email: String, // Correo electrónico del usuario
  password: String, // Contraseña del usuario encriptada
  role: { type: String, default: 'user' }  // Rol del usuario (por defecto: 'user')
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Modelo de usuario
const User = mongoose.model('User', userSchema);

// Exporta el modelo de usuario
module.exports = User;

