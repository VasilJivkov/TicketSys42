'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Tickets', [{
            title: 'Meeting with XYZ company HR',
            description: 'Discuss the ways we can collaborate and grow together in the WebVR products',
            deadline: '2018-05-01 12:00:00',
            requesterId: 1,
            assigneeId: 2,
            priority: 1,
            ProjectId: 1,
            status: 'IN PROGRESS',
            files: 'no files for now',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            title: 'File a lawsuit against ALPHABET company',
            description: 'file a lawsuit for using our JAVA API in their Android products',
            deadline: '2018-05-02 11:00:00',
            requesterId: 1,
            assigneeId: 2,
            priority: 1,
            ProjectId: 2,
            status: 'IN PROGRESS',
            files: 'no files for now',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Tickets', null, {});
    },
};