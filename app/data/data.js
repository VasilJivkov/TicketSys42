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
    Comapnies: new Data(Companies),
    Labels: new Data(Labels),
    Notifications: new Data(Notifications),
    Projects: new Data(Projects),
    Tickets: new Data(Tickets),
    Users: new Data(Users),
};