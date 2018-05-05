const bcrypt = require('bcrypt-nodejs');

const cryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        /**
         * @description Takes a password in plain text and hashes it
         * @param {string} password
         * @return {string} Hashed password
         */

        bcrypt.genSalt(10, (err, salt) => {
            /**
             * @description Encrypt password using bcrypt module
             * @async
             * @throws Throws errors from the validations
             * @return {Object} hashed password
             */
            if (err) {
                return reject(err);
            }

            bcrypt.hash(password, salt, null, (error, hash) => {
                if (error) {
                    return reject(error);
                }

                return resolve(hash);
            });
            return null;
        });
    });
};

class Controller {
    constructor(data) {
        this.data = data;
    }

    getUserPage() {
        return async (req, res) => {
            const user = await this.data.users.getOneByCriteria({
                username: req.params.username,
            });

            if (user) {
                const userInfo = {
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nickname: user.nickname,
                    role: user.role,
                };

                const issuedTickets =
                    await this.data.tickets.getAllByCriteria({
                        requesterId: user.id,
                    }).map(async (ticket) => {
                        const projectId = ticket.dataValues.ProjectId;
                        const project =
                            await this.data.projects.getById(projectId);
                        ticket.dataValues.project = project.title;

                        const assigneeId = ticket.dataValues.assigneeId;
                        const assignee =
                            await this.data.users.getById(assigneeId);
                        ticket.dataValues.assignee = assignee.username;

                        return ticket.dataValues;
                    });

                const receivedTickets =
                    await this.data.tickets.getAllByCriteria({
                        assigneeId: user.id,
                    }).map(async (ticket) => {
                        const projectId = ticket.dataValues.ProjectId;
                        const project =
                            await this.data.projects.getById(projectId);
                        ticket.dataValues.project = project.title;

                        const requesterId = ticket.dataValues.requesterId;
                        const requester =
                            await this.data.users.getById(requesterId);
                        ticket.dataValues.requester = requester.username;

                        return ticket.dataValues;
                    });

                const userProjects = await user.getProjects()
                    .map(async (project) => {
                        const ownerId = project.dataValues.ownerId;
                        const owner = await this.data.users.getById(ownerId);
                        project.dataValues.owner = owner.username;
                        return project.dataValues;
                    });

                res.status(200).send({
                    userInfo,
                    issuedTickets,
                    receivedTickets,
                    userProjects,
                });
            } else {
                res.status(401).send({
                    err: 'No user found.',
                });
            }
        };
    }

    updateUserDetails() {
        return async (req, res) => {
            const updateDetails = req.body;

            const user = await this.data.users.getOneByCriteria({
                username: updateDetails.username,
            });

            if (user) {
                if (updateDetails.infoType === 'personal details') {
                    delete updateDetails.username;
                    delete updateDetails.infoType;

                    user.updateAttributes(updateDetails);
                } else if (updateDetails.infoType === 'password') {
                    const hashPassword =
                        await cryptPassword(updateDetails.password);
                    user.updateAttributes({
                        password: hashPassword,
                    });
                }
                res.status(200).send({
                    success: 'Password changed successfuly.',
                });
            } else {
                res.status(401).send({
                    err: 'No user with that username found.',
                });
            }
        };
    }

    getCompanyPage() {
        return async (req, res) => {
            const companyTitle = req.params.company;

            let companyInfo =
                await this.data.companies.getOneByCriteria({
                    title: companyTitle,
                });

            companyInfo = companyInfo.dataValues;

            res.status(200).send({
                companyInfo,
            });
        };
    }

    getCompanyEmployees() {
        return async (req, res) => {
            const companyTitle = req.params.company;

            const company = await this.data.companies.getOneByCriteria({
                title: companyTitle,
            });

            const employees = await this.data.users.getAllByCriteria({
                CompanyId: company.id,
            }).map((employee) => {
                delete employee.dataValues.password;
                return employee.dataValues;
            });

            res.status(200).send({
                employees,
            });
        };
    }

    getHomePageData() {
        return async (req, res) => {
            const tickets = await this.data.tickets.getAll();
            const companies = await this.data.companies.getAll();

            const ticketsLength = tickets.length;
            const companieslenght = companies.length;

            res.status(200).send({
                ticketsLength,
                companieslenght,
            });
        };
    }

    createTicketPage() {
        return async (req, res) => {
            const username = req.query.username;

            const user = await this.data.users.getOneByCriteria({
                username: username,
            });
            if (user) {
                let projects = await user.getProjects();

                const usersByProjects =
                    await Promise.all(projects.map(async (project) => {
                        const projectUsers = await project.getUsers()
                            .map((projectUser) => projectUser.dataValues)
                            .filter((projectUser) =>
                                projectUser.username !== user.username);

                        return projectUsers;
                    }));

                projects = projects.map((project, index) => {
                    project.dataValues.index = index;
                    return project.dataValues;
                });

                res.status(200).send({
                    projects,
                    usersByProjects,
                });
            } else {
                res.status(401).send({
                    err: 'No user with that username found.',
                });
            }
        };
    }

    createTicket() {
        return async (req, res) => {
            const ticketToCreate = req.body.ticket;
            const user = req.body.user;

            ticketToCreate.requesterId = user.sub;
            ticketToCreate.deadline = new Date(ticketToCreate.deadline);
            ticketToCreate.priority = 1;
            ticketToCreate.status = 'IN PROGRESS';

            try {
                await this.data.tickets.create(ticketToCreate);
                res.status(201).send({
                  success: true,
                });
            } catch (error) {
                res.status(403).send({
                    err: 'There was a problem creating your ticket.',
                });
            }
        };
    }
}

module.exports = Controller;