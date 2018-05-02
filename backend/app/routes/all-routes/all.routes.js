const { Router } = require('express');
const Controller = require('../../controllers/all.controller');


const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);

    app.use('/', router);

    router
        .get('/', async (req, res) => {
            const tickets = await data.tickets.getAll();

            res.send(tickets);
        })
        .get('/user/:username', controller.getUserPage())
        .post('/user/:username', controller.updateUserDetails());
};

module.exports = {
    init,
};