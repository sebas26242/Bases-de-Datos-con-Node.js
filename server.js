const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(user);
  });
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(users);
  });
});

// Ruta para obtener un usuario por ID
app.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  });
});

// Ruta para actualizar un usuario por ID
app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  });
});

// Ruta para eliminar un usuario por ID
app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('User deleted');
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
