const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

class UserService {
    static async create({ email, password }) {
        if (!verifyEmail(email)) {
            throw new Error('You must have a defense.gov email to sign up for this service.');
        }

        const passwordHash = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );

        return await User.insert({ email, passwordHash });
    }

    static async signIn({ email, password }) {
        try {
            const user = await User.getByEmail(email);

            if (!user) throw new Error('Invalid email');
            if (!bcrypt.compareSync(password, user.passwordHash)) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
                expiresIn: '1 day',
            });

            return token;
        } catch (error) {
            error.status = 401;
            throw error;
        }
    }
}

function verifyEmail(email) {
    return email.match(/(?<=@)defense\.gov$/) !== null;
}
module.exports = { UserService };
