const {
    Companies,
    Labels,
    Notifications,
    Projects,
    Tickets,
    Users,
} = require('../../db/models');

const Data = require('./generic.data');

module.exports = {
    comapnies: new Data(Companies),
    labels: new Data(Labels),
    notifications: new Data(Notifications),
    projects: new Data(Projects),
    tickets: new Data(Tickets),
    users: new Data(Users),
};