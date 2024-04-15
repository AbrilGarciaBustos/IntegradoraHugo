const express = require('express');
const cors = require('cors'); // Importa el middleware cors
const app = express();
const authRoutes = require('../routes/authRoutes');
const { connect } = require('../config/database')
const fileRouthes = require('../routes/fileRouthes');
require('../config/database');

app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST'] // Permitir métodos GET y POST desde el origen especificado
}));


app.use(async (req, res, next) => {
    try {
        req.db = await connect(); // Conecta a la base de datos
        next(); // Continúa con la siguiente función de middleware o ruta
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        res.status(500).send('Error interno del servidor'); // Envía una respuesta de error al cliente
    }
});

app.use('/api/auth', authRoutes);
app.use("/api/file", fileRouthes);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Servidor corriendo');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});