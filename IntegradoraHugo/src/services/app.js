const express = require("express");
const cors = require("cors"); // Importa el middleware cors
const jwt = require("jsonwebtoken"); // Importa el módulo jsonwebtoken
const authRoutes = require("../routes/authRoutes");
const { connect } = require("../config/database");
const fileRouthes = require("../routes/fileRouthes");
require("../config/database");

const app = express();

app.use(cors());

app.use(express.json());



// Middleware para verificar y decodificar el token JWT
function verificarToken(req, res, next) {
  // Obtener el token del encabezado de autorización
  const token = req.headers.authorization;

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  // Verificar y decodificar el token
  jwt.verify(token.split(" ")[1], "tu_clave_secreta", (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: "Token inválido" });
    }

    // Almacenar la información del usuario decodificada en el objeto de solicitud
    req.usuario = decoded;
    next();
  });
}

app.use(async (req, res, next) => {
  try {
    req.db = await connect(); // Conecta a la base de datos
    next(); // Continúa con la siguiente función de middleware o ruta
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    res.status(500).send("Error interno del servidor"); // Envía una respuesta de error al cliente
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/file", verificarToken, fileRouthes); // Aplicar el middleware de verificación del token JWT a las rutas protegidas

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Servidor corriendo");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
