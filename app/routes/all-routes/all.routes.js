const {
    Router,
} = require('express');

const init = (app, data) => {
    const router = new Router();
    const tickets = data.Tickets.getAll();
    app.use('/api', router);

    router.get('/', async (req, res) => {
        res.send(tickets);
    });
};

module.exports = {
    init,
};