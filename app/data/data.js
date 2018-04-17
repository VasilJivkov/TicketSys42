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
    answers: new Data(Companies),
    categories: new Data(Labels),
    posts: new Data(Notifications),
    threads: new Data(Projects),
    userRoles: new Data(Tickets),
    users: new Data(Users),
};