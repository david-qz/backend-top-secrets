const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { mockUser, registerAndLogin } = require('./__utils__/test-utils');

describe('/api/v1/secrets', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('GET /api/v1/secrets should return a list of secrets when logged in', async () => {
        const [agent] = await registerAndLogin(mockUser);

        const response = await agent.get('/api/v1/secrets');
        expect(response.status).toEqual(200);

        const secrets = response.body;
        expect(secrets[0]).toEqual({
            title: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(String)
        });
    });

    it('GET /api/v1/secrets should return an error if logged out', async () => {
        const response = await request(app).get('/api/v1/secrets');
        expect(response.status).toEqual(401);
    });

    it('POST /api/v1/secrets should create and return a new secret', async () => {
        const [agent] = await registerAndLogin(mockUser);

        const message = {
            title: 'Urgent!',
            description: 'Does anybody know where I put my lunchbox?'
        };

        const response = await agent.post('/api/v1/secrets').send(message);
        expect(response.status).toEqual(200);

        const secret = response.body;
        expect(secret).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(String),
        });
    });

    it('POST /api/v1/secrets should fail if user isn\'t logged in', async () => {
        const message = {
            title: 'Urgent!',
            description: 'Does anybody know where I put my lunchbox?'
        };

        const response = await request(app).post('/api/v1/secrets').send(message);
        expect(response.status).toEqual(401);
    });

    afterAll(() => {
        pool.end();
    });
});
