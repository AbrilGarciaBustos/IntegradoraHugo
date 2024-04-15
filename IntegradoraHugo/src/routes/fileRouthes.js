const express = require("express");
const router = express.Router();
const cors = require('cors');
const { ObjectId } = require("mongodb");
const multer = require("multer");
const fs = require("fs");

router.use(cors()); // Usar CORS en este router

// Crea una nueva instancia de ObjectId
const objectId = new ObjectId();

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "carpeta_de_archivos"); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Metodo para subir archivos
router.post("/subir", upload.single("archivo"), async (req, res) => {
  try {
    const database = req.db;
    const archivo = req.file;
    const archivos = database.collection("archivo");

    // Comprueba si existe el archivo
    if (!archivo) {
      return res
        .status(400)
        .send({ message: "No se ha proporcionado ningún archivo" });
    }
    const archivoId = new ObjectId();

    // Guardar información del archivo en la base de datos
    const nuevoArchivo = {
      _id: archivoId,
      nombre: archivo.originalname,
      ruta: archivo.path,
      tamaño: archivo.size,
      tipo: archivo.mimetype,
    };

    await archivos.insertOne(nuevoArchivo);

    res.status(201).send({ message: "Archivo subido correctamente" });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
});

// Metodo para eliminar archivo
router.delete("/eliminar/:archivoId", async (req, res) => {
  try {
    const database = req.db;
    const archivoId = req.params.archivoId;

    // Comprobar si el ID es válido
    if (!ObjectId.isValid(archivoId)) {
      return res
        .status(400)
        .send({ message: "El formato del ID de archivo no es válido" });
    }

    const archivos = database.collection("archivo");

    // Buscar el archivo en la base de datos
    const archivo = await archivos.findOne({ _id: new ObjectId(archivoId) });
    if (!archivo) {
      return res.status(404).send({ message: "Archivo no encontrado" });
    }

    // Eliminar el archivo de la base de datos
    await archivos.deleteOne({ _id: new ObjectId(archivoId) });

    // Eliminar el archivo del sistema de archivos
    const rutaArchivo = archivo.ruta;
    if (fs.existsSync(rutaArchivo)) {
      fs.unlinkSync(rutaArchivo);
      res.status(200).send({ message: "Archivo eliminado correctamente" });
    } else {
      res.status(404).send({ message: "Archivo no encontrado en el sistema de archivos" });
    }
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
});

// Metodo para descargar archivo
router.get("/descargar/:archivoId", async (req, res) => {
  try {
    const database = req.db;
    const archivoId = req.params.archivoId;
    const archivos = database.collection("archivo");

    // Busca el archivo en la base de datos
    const archivo = await archivos.findOne({ _id: new ObjectId(archivoId) });
    if (!archivo) {
      return res.status(404).send({ message: "Archivo no encontrado" });
    }

    // Se envia el archivo como respuesta al cliente
    const rutaArchivo = archivo.ruta;
    res.download(rutaArchivo);
  } catch (error) {
    console.error("Error al descargar archivo:", error);
    res
      .status(500)
      .send({ message: "Error interno del servidor", error: error.message });
  }
});

router.get("/listar", async (req, res) => {
  try {
    const database = req.db;
    const archivos = database.collection("archivo");

    // Busca todos los archivos en la base de datos
    const listaArchivos = await archivos.find().toArray();

    // Retorna la lista de archivos al cliente
    res.status(200).send(listaArchivos);
  } catch (error) {
    console.error("Error al obtener la lista de archivos:", error);
    res.status(500).send({ message: "Error interno del servidor" });
  }
});


module.exports = router;