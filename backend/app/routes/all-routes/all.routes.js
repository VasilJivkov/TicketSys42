const {
    Router,
} = require('express');

const init = (app, data) => {
    const router = new Router();
    const tickets = data.tickets.getAll();
    app.use('/api', router);

    router.get('/', async (req, res) => {
        res.send(tickets);
    });
};

module.exports = {
    init,
};