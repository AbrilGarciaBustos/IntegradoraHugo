const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb"); 
const jwt = require("jsonwebtoken"); // Importa el módulo jsonwebtoken

// Define una clave secreta para firmar los tokens JWT
const secretKey = "tu_clave_secreta"; 

//Metodod de registro 
router.post("/register", async (req, res) => {
  try {
    const database = req.db;
    const person = req.body;
    const persona = database.collection('persona');
    
    // Comprobación de datos 
    if (!person.nombre || !person.apellidoP || !person.nombre_usuario || !person.correo || !person.contrasenia) {
      return res.status(400).send({ message: "Faltan datos requeridos para el registro" });
    }
    
    // Genera el id del usuario
    const id_usuario = new ObjectId();
    person.id_usuario = id_usuario;
    
    // lo registra en la base de datos 
    await persona.insertOne(person);
    res.status(201).send({ message: "Persona registrada exitosamente", id_usuario });
  } catch (error) {
    console.error("Error al registrar persona:", error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
});

// Metodo de inicio de sesión
router.post("/signin", async (req, res) => {
  try {
    const database = req.db;
    const credentials = req.body;
    const persona = database.collection('persona');

    // Comprobar si las credenciales son válidas en la base de datos
    const user = await persona.findOne({ nombre_usuario: credentials.nombre_usuario, contrasenia: credentials.contrasenia });
    if (!user) {
      return res.status(404).send({ message: "Credenciales inválidas" });
    }

    // Si las credenciales son válidas, genera un token JWT
    const token = jwt.sign({ id_usuario: user.id_usuario }, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora

    // Envía el token al cliente como respuesta
    res.status(200).send({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
});

module.exports = router;
