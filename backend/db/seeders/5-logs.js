'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Logs', [{
            title: 'Admin logged in',
            companyID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Admin logged out',
            companyID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Logs', null, {});
    },
};
