const { Router } = require('express');
const { Secret } = require('../models/Secret');
const authenticate = require('../middleware/authenticate');

const router = Router();

router.get('/', authenticate, async (req, res, next) => {
    try {
        const secrets = await Secret.getAll();

        // Strip ids from response
        res.json(secrets.map(x => ({
            title: x.title,
            description: x.description,
            createdAt: x.createdAt
        })));
    } catch (error) {
        next(error);
    }
});

module.exports = router;
