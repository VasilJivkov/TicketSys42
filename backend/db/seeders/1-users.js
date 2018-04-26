'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'gosho',
            password: '$2a$10$k6jB0bjpyOSI6b7PD7cbbepqr69DnGSgvi0m4p4M4aXYzJ6RN4ENS',
            email: 'admin@ticketsys42.com',
            firstName: 'Bill',
            lastName: 'Gates',
            nickname: 'Trey',
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            CompanyId: 1,
        }, {
            username: 'pesho',
            password: '$2a$10$k6jB0bjpyOSI6b7PD7cbbepqr69DnGSgvi0m4p4M4aXYzJ6RN4ENS',
            email: 'user@ticketsys42.com',
            firstName: 'Steve',
            lastName: 'Jobs',
            nickname: 'Mac',
            role: 'User',
            createdAt: new Date(),
            updatedAt: new Date(),
            CompanyId: 2,
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};