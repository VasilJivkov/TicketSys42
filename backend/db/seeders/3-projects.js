'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Projects', [{
            title: 'Tick42 ticketing system',
            description: 'Tick42 needs a ticketing sstem, ' +
            'help them design it, so they can save some moneyezz',
            deadline: '2018-05-10 12:10:45',
            ownerId: 1,
            companyID: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Honeybee company showcase website',
            description: 'Honeybee needs a website, to let people know what they are doing ' +
            'help them design it, so they can save some moneyezz',
            deadline: '2018-05-10 12:10:45',
            ownerId: 2,
            companyID: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Projects', null, {});
    },
};
