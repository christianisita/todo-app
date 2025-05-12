const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../todo.db');

const db = new Database(dbPath);
console.log(dbPath);

function initializeDatabase(){
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(160) NOT NULL,
            description TEXT,
            priority INTEGER NOT NULL,
            completed BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.prepare(createTableSQL).run();
    console.log("Data initialized successfully")
}

module.exports = {
    db,
    initializeDatabase
};