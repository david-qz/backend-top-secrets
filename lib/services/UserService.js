const bcrypt = require('bcrypt');
const { User } = require('../models/User');

class UserService {
    static async create({ email, password }) {
        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );

        return await User.insert({ email, passwordHash });
    }
}

module.exports = { UserService };
