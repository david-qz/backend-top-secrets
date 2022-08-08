const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
    email: 'tester@defense.gov',
    password: '123456'
};

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

    afterAll(() => {
        pool.end();
    });
});
