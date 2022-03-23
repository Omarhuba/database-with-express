const { PromisedDatabase } = require("promised-sqlite3");

const db = new PromisedDatabase();

async function setup() {
  await db.open("./database/messages.db");

  // For multiple statement db.exec
  //DROP delete table om det finns
  db.exec(`
    DROP TABLE IF EXISTS departments; 
    DROP TABLE IF EXISTS messages;

    CREATE TABLE departments(
        department_id INTEGER NOT NULL UNIQUE,
        name TEXT NOT NULL,
        PRIMARY KEY (department_id AUTOINCREMENT)
    );

    CREATE TABLE messages (
        message_id INTEGER NOT NULL UNIQUE,
        department_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        email TEXT NOT NULL,
        answered INTEGER NOT NULL CHECK (answered IS 0 OR answered IS 1),
        PRIMARY KEY(message_id AUTOINCREMENT),
        FOREIGN KEY(department_id)
            REFERENCES departments (department_id)
    );
    `);
  await db.close();
}
setup();
