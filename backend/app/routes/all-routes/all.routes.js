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
        .post('/ticket/update', controller.updateTicketStatus())
        .post('/ticket/reassign', controller.reassignTicket())
        .get('/ticket/:ticketId', controller.getTicketDetails())
        .post('/project/invite', controller.inviteToProject())
        .post('/project/leave', controller.leaveProject())
        .post('/project/promote', controller.promoteUser())
        .get('/project/company/:title', controller.getCompanyProjects())
        .get('/project/:title', controller.getProjectDetails())
        .get('/:company/logs', controller.getCompanyLogs())
        .get('/:company/employees', controller.getCompanyEmployees())
        .get('/:company', controller.getCompanyDetails());
};

module.exports = {
    init,
};