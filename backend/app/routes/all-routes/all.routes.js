const {
    Router,
} = require('express');

const init = (app, data) => {
    const router = new Router();
    app.use('/', router);

    router.get('/', async (req, res) => {
        const tickets = await data.tickets.getAll();
        res.send(tickets);
    });
};

module.exports = {
    init,
};