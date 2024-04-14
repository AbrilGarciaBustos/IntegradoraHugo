const express = require('express');
const app = express();
const authRoutes = require('../routes/authRoutes');
const { connect } = require('../config/database')
require('../config/database');
const path = require('path'); // Importar el módulo 'path' de Node.js

require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta 'public'

app.use(async (req, res, next) => {
    req.db = await connect();
    next();
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Servidor corriendo');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});