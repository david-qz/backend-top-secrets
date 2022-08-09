const request = require('supertest');
const app = require('../../lib/app');
const { UserService } = require('../../lib/services/UserService');

const mockUser = {
    email: 'tester@defense.gov',
    password: '123456'
};

async function registerAndLogin(user = {}) {
    const agent = request.agent(app);

    // Make a new user
    user = { ...mockUser, ...user };
    const newUserResponse = await UserService.create(user);

    // ...then sign in.
    const signInResponse = await agent.post('/api/v1/users/sessions').send({
        email: user.email,
        password: user.password
    });
    return [agent, newUserResponse, signInResponse];
}

module.exports = {
    mockUser,
    registerAndLogin
};
