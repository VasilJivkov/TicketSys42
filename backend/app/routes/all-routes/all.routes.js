const {
    Router,
} = require('express');
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
        .post('/user/:username', controller.updateUserDetails())
        .get('/company/', async (req, res) => {
            const company = await data.companies.getAll();
            res.send(company);
        })
        .get('/company/:id', async (req, res) => {
            const companyInfo =
                await data.companies.getOneByCriteria(req.params);
            res.send({
                companyInfo,
            });
        })
        .get('/', async (req, res) => {
            const tickets = await data.tickets.getAll();
            const companies = await data.companies.getAll();

            const ticketsLength = tickets.length;
            const companieslenght = companies.length;

            const statsObj = {
                ticketsLength,
                companieslenght,
            };

            res.send(statsObj);
        });
};

module.exports = {
    init,
};