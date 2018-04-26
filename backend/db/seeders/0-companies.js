'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Companies', [{
            title: 'Tick42',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'Honeybee',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Companies', null, {});
    },
};
