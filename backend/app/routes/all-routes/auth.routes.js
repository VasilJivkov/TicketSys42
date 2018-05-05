const {
    Router,
} = require('express');
const AuthController = require('../../controllers/auth.controller');

const init = (app, data) => {
    const controller = new AuthController(data);

    const router = new Router();
    app.use('/', router);

    router
        .post('/login', controller.login())
        .get('/register', controller.getCompanies())
        .post('/register', controller.register());
};

module.exports = {
    init,
};