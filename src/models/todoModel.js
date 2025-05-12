const {db} = require('../configs/database');

class TodoModel {
    // create
    static create(TodoData){
        const {
            title,
            priority,
            description = null
        } = TodoData;
        
        const stmt = db.prepare(`
            INSERT INTO todos
            (title, priority, description)
            VALUES (?,?,?)
        `);

        const result = stmt.run(title, priority, description);
        return this.findByID(result.lastInsertRowid);
    }

    // find by ID
    static findByID(id) {
        const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
        return stmt.get(id);
    }

    // findAll
    static findAll() {
        const stmt = db.prepare('SELECT * FROM todos ORDER BY priority ASC');
        return stmt.all();
    }
}

module.exports = TodoModel;