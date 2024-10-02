const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const filePath = path.join(__dirname, '../data/users.json');

// Método para leer los usuarios del archivo users.json
const getUsers = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Método para guardar usuarios en el users.json
const saveUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// Ruta para consultar los usuarios
router.get('/', (req, res) => {
    const users = getUsers();
    res.json(users);
});

// Obtener usuario por su id
router.get('/:id', (req, res) => {
    const users = getUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "Ese usuario no existe parcero, pailas" });
    }
});

// Crear nuevos usuarios
router.post('/', (req, res) => {
    const users = getUsers();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
});

//Actualizando o editando usuarios
router.put('/:id', (req, res)=>{
    const users = getUsers()
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id))

    if (userIndex !== -1) {
        users[userIndex]={
            ...users[userIndex],
        name: req.body.name || users[userIndex].name,
        email: req.body.email || users[userIndex].email
        }
        saveUsers(users)
        res.json(users[userIndex])
    } else {
        res.status(404).json({message: "Huy, manito ese usuario no existe pa"})
    }
})

//Eliminar o borrar un usuario por id
router.delete('/:id', (req, res)=>{
    const users = getUsers()
    const newUsers = users.filter(u => u.id !== parseInt(req.params.id))

    if (newUsers.length !== users.length) {
        saveUsers(newUsers)
        res.json({message: "usuario eliminado satisfactoriamente "})
    } else {
        res.status(404).json({message: "Imposible eliminarlo manito ese usuario no existe pa"})
    }

})







// Exportamos el módulo
module.exports = router;
