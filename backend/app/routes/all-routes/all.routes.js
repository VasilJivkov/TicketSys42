const {
    Router,
} = require('express');
const Controller = require('../../controllers/all.controller');


const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);

    app.use('/', router);

    router
        .get('/', controller.getHomePageData())
        .get('/createTicket', controller.createTicketPage())
        .post('/createTicket', controller.createTicket())
        .post('/createProject', controller.createProject())
        .get('/user/:username', controller.getUserPage())
        .post('/user/:username', controller.updateUserDetails())
        .get('/:company/logs', controller.getCompanyLogs())
        .get('/:company/employees', controller.getCompanyEmployees())
        .get('/:company', controller.getCompanyPage());
};

module.exports = {
    init,
};