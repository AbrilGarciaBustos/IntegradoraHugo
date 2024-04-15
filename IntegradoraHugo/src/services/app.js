const express = require('express');
const app = express();
const authRoutes = require('../routes/authRoutes');
const {connect} = require('../config/database')
require('../config/database');

app.use(express.json());

app.use(async(req,res,next)=>{
    req.db=await connect();
    next();


})


app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) =>{
    res.send('Servidor corriendo');
});

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});