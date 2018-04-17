'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Notifications', [{
            title: 'Project creation',
            description: 'The project was created in the deep waters of the Telerik Academy Ocean of Knowledge',
            read: true,
            deleted: true,
            url: 'https://google.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Project published',
            description: 'The project was published',
            read: true,
            deleted: true,
            url: 'https://apple.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Notifications', null, {});
    },
};
