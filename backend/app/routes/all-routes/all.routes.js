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


    router.get('/companies', async (req, res) => {
        const companies = await data.companies.getAll();

        res.send(companies);
    });
};

module.exports = {
    init,
};