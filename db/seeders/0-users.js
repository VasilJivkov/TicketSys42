'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'admin',
            password: 'admin',
            email: 'admin@ticketsys42.com',
            firstName: 'Bill',
            lastName: 'Gates',
            nickname: 'Trey',
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            username: 'user',
            password: 'user',
            email: 'user@ticketsys42.com',
            firstName: 'Steve',
            lastName: 'Jobs',
            nickname: 'Mac',
            role: 'User',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
