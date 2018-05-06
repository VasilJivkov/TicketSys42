const {
    Companies,
    Labels,
    Notifications,
    Projects,
    Tickets,
    Users,
    Logs,
} = require('../../db/models');

const Data = require('./generic.data');
const LogsData = require('./logs-data');

module.exports = {
    companies: new Data(Companies),
    labels: new Data(Labels),
    notifications: new Data(Notifications),
    projects: new Data(Projects),
    tickets: new Data(Tickets),
    users: new Data(Users),
    logs: new LogsData(Logs),
};