const sqlite3 = require('sqlite3').verbose();

// Crear una nueva base de datos en memoria
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  // Crear la tabla 'user' con las columnas 'id' y 'name'
  db.run("CREATE TABLE user (id INT, name TEXT)");

  // Preparar la declaración de inserción
  const stmt = db.prepare("INSERT INTO user VALUES (?, ?)");

  // Insertar dos filas de datos
  stmt.run(1, "Alice");
  stmt.run(2, "Bob");

  // Finalizar la declaración de inserción
  stmt.finalize();

  // Consultar y mostrar los datos de la tabla 'user'
  db.each("SELECT id, name FROM user", (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`User ID: ${row.id}, Name: ${row.name}`);
  });
});

// Cerrar la conexión a la base de datos
db.close();
