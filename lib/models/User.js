const pool = require('../utils/pool');

class User {
    id;
    email;

    constructor(row) {
        this.id = row.id;
        this.email = row.email;
    }

    static async insert({ email, passwordHash }) {
        const { rows } = await pool.query(
            `
            insert into users (email, password_hash)
            values ($1, $2)
            returning *;
            `,
            [email, passwordHash]
        );

        return new User(rows[0]);
    }
}

module.exports.User = User;
