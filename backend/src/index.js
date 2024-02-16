'use strict';

const express = require (`express`); // Importa Express para la creación de la aplicación
const bodyParser = require(`body-parser`); // Importa body-parser para analizar cuerpos de solicitud
const cors = require('cors'); // Importa CORS para habilitar el intercambio de recursos entre distintos dominios
const mongoose = require(`mongoose`); // Importa Mongoose para la conexión a MongoDB
const cookieParser = require('cookie-parser'); // Importa cookie-parser para analizar cookies
const userRoutes = require('./routes/userRoutes'); // Importa las rutas relacionadas con usuarios

// Crea una aplicación Express
const app =  express();

// Define el puerto en el que se ejecutará el servidor
const port = process.env.PORT || 4000;

require('dotenv').config(); // Carga las variables de entorno desde un archivo .env

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Habilita CORS para permitir solicitudes desde el cliente en el puerto 3000
app.use(cookieParser()); // Utiliza cookie-parser para analizar las cookies de las solicitudes
app.use(express.json()); // Middleware para analizar cuerpos de solicitud JSON
app.use(bodyParser.json({ limit: '50mb' })); // Middleware para analizar cuerpos de solicitud JSON con un límite de tamaño
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // Middleware para analizar cuerpos de solicitud URL codificados con un límite de tamaño

// Middleware para manejar errores de carga demasiado grandes
app.use((err, req, res, next) => {
    // Verifica si el error es de tipo 'payload too large'
    if (err && err instanceof SyntaxError && err.status === 413 && 'body' in err) {
      res.status(413).send('Payload too large'); // Envia una respuesta de error cuando el cuerpo de la solicitud es demasiado grande
    } else {
      next(); // Pasa al siguiente middleware si no hay errores de carga demasiado grandes
    }
  });

// Configuración de MongoDB
var url = "mongodb://localhost:27017/istore"; // URL de la base de datos MongoDB
mongoose.Promise = global.Promise; // Configura la promesa global de Mongoose

// Importa las rutas relacionadas con artículos
var article_routes = require(`./routes/article`);

// Rutas
app.use(`/api`, article_routes); // Utiliza las rutas relacionadas con artículos bajo el prefijo '/api'
app.use('/api', userRoutes); // Utiliza las rutas relacionadas con usuarios bajo el prefijo '/api'

// Conexión a MongoDB y inicio del servidor
mongoose.connect(url).then(() => {
    console.log(`Conexion a la bd exitosa`); // Mensaje de éxito al conectarse a la base de datos
    app.listen(port, () => {
        console.log(`Conectado en puerto: ` + port); // Mensaje de éxito al iniciar el servidor
    });
}).catch(error => {
    console.error(`Error al conectar a la base de datos: ${error}`); // Mensaje de error en caso de fallo al conectar a la base de datos
});
