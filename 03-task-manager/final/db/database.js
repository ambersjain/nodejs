const sqlite3 = require('sqlite3').verbose();

// Open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

// Alternatively, to open a database on disk:
// let db = new sqlite3.Database('./mydb.sqlite', (err) => { ... });

function initDb() {
  db.run(` AUTOINCREMENT,
    name TEXT,
    completed INTEGER 
  )`, (err) => {
    if (err) {
      console.error('Error creating table', err);
    } else {
      console.log('Tasks table created or already exists.');
    }
  });
}

initDb();

module.exports = db;
