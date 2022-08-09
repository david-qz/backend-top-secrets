const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { mockUser, registerAndLogin } = require('./__utils__/test-utils');

describe('/api/v1/users', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('POST /api/v1/users should create a new user and return it', async () => {
        const response = await request(app).post('/api/v1/users').send(mockUser);
        expect(response.status).toEqual(200);

        const user = response.body;
        expect(user).toEqual({
            id: expect.any(String),
            email: mockUser.email
        });
    });

    it('POST /api/v1/users/sessions should log a user in', async () => {
        const [,, signInResponse] = await registerAndLogin(mockUser);

        expect(signInResponse.status).toEqual(200);
        expect(signInResponse.body).toEqual({
            message: 'Signed in successfully!'
        });
    });

    it('DELETE /api/v1/users/session should log a user out', async () => {
        const [agent] = await registerAndLogin(mockUser);

        const response = await agent.delete('/api/v1/users/sessions');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            message: 'Signed out successfully!'
        });
    });

    afterAll(() => {
        pool.end();
    });
});
