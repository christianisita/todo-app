const db = require('../configs/database');

class TodoModel {
    // create
    static create({title, priority, description}){
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

    // update todo
    static update(id, {title, priority, description}) {
        const stmt = db.prepare(
            `
            UPDATE todos
            SET
                title = COALESCE(?, title),
                priority = COALESCE(?, priority),
                description = COALESCE(?, description),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `
        );
        stmt.run(title, priority, description, id);
        return this.findByID(id);
    }

    static toggleStatus(id) {
        const stmt = db.prepare(
            `
            UPDATE todos
            SET
                completed = NOT completed
            WHERE id = ?
            `
        );
        stmt.run(id);
        return this.findByID(id);
    }

    static delete(id) {
        const stmt = db.prepare(
            `
            DELETE FROM todos WHERE id=?
            `
        )
        return stmt.run(id);
    }
}

module.exports = TodoModel;