const { Router } = require('express');
const { UserService } = require('../services/UserService');

const ONE_DAY_IN_MS = 3600 * 24 * 1000;

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const user = await UserService.create(req.body);
        res.json(user);
    } catch (error) {
        error.status = 401;
        next(error);
    }
});

router.post('/sessions', async (req, res, next) => {
    try {
        const token = await UserService.signIn(req.body);

        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS,
        });
        res.json({ message: 'Signed in successfully!' });
    } catch (error) {
        next(error);
    }
});

router.delete('/sessions', async (req, res, next) => {
    try {
        res.clearCookie(process.env.COOKIE_NAME, {
            httpOnly: true
        });
        res.status(204);
        res.send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
