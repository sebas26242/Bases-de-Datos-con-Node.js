const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Definir el esquema del usuario
  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });

  // Crear el modelo de usuario
  const User = mongoose.model('User', userSchema);

  // Insertar un documento
  const user = new User({ name: 'Alice', age: 25 });
  user.save((err) => {
    if (err) return console.error(err);
    console.log('User saved');

    // Buscar documentos
    User.find((err, users) => {
      if (err) return console.error(err);
      console.log('Users found:', users);

      // Actualizar un documento
      User.updateOne({ name: 'Alice' }, { $set: { age: 26 } }, (err, res) => {
        if (err) return console.error(err);
        console.log('User updated');

        // Eliminar un documento
        User.deleteOne({ name: 'Alice' }, (err) => {
          if (err) return console.error(err);
          console.log('User deleted');
          
          // Cerrar la conexión a la base de datos
          mongoose.connection.close();
        });
      });
    });
  });
});
