const { Router } = require('express');
const { UserService } = require('../services/UserService');

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const user = await UserService.create(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
