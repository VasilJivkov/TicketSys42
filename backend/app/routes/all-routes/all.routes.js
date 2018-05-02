const {
    Router,
} = require('express');

const init = (app, data) => {
    const router = new Router();


    app.use('/', router);

    router.get('/company/', async (req, res) => {
        const company = await data.companies.getAll();
        res.send(company);
    });

    router.get('/company/:id', async (req, res) => {
        const companyInfo = await data.companies.getOneByCriteria(req.params);
        res.send({companyInfo});
    });

    router.get('/', async (req, res) => {
        const tickets = await data.tickets.getAll();
        const companies = await data.companies.getAll();

        let ticketsLength = tickets.length;
        let companieslenght = companies.length;

        let statsObj =  {
            ticketsLength,
            companieslenght
        };

        res.send(statsObj);
    });

};

module.exports = {
    init,
};