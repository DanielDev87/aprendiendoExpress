const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/users')

const miApp = express()
const PUERTO = 3000

miApp.use(bodyParser.json())
//Ruta principal
miApp.use('/api/users', userRoutes)

//manejo de error si no existe la ruta
miApp.use((req, res)=>{
    res.status(404).json({message: "Ups, ruta no encontrada"})
})

miApp.listen(PUERTO,()=>{
    console.log("Servidor corriendo en el puerto: ", PUERTO)
})