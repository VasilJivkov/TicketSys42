const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

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

                    this.data.logs.log(
                        user.username + ' updated his details.',
                        user.CompanyId
                    );

                    res.status(200).send({
                        success: 'Details updated successfuly.',
                    });
                } else if (updateDetails.infoType === 'password') {
                    const hashPassword =
                        await cryptPassword(updateDetails.password);
                    user.updateAttributes({
                        password: hashPassword,
                    });

                    this.data.logs.log(
                        user.username + ' updated his password.',
                        user.CompanyId
                    );

                    res.status(200).send({
                        success: 'Password changed successfuly.',
                    });
                }
            } else {
                res.status(401).send({
                    err: 'No user with that username found.',
                });
            }
        };
    }

    getCompanyDetails() {
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

    getCompanyLogs() {
        return async (req, res) => {
            const companyTitle = req.params.company;

            const company = await this.data.companies.getOneByCriteria({
                title: companyTitle,
            });

            const logs = await this.data.logs.getAllByCriteria({
                CompanyId: company.id,
            }).map((log) => log.dataValues);

            res.status(200).send({
                logs,
            });
        };
    }

    getHomePageData() {
        return async (req, res) => {
            const tickets = await this.data.tickets.getAll();
            const companies = await this.data.companies.getAll();
            const users = await this.data.users.getAll();

            const usersCount = users.length;
            const ticketsLength = tickets.length;
            const companieslenght = companies.length;

            res.status(200).send({
                ticketsLength,
                companieslenght,
                usersCount,
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

    getTicketDetails() {
        return async (req, res) => {
            const ticketId = req.params.ticketId;

            let ticket = await this.data.tickets.getById(ticketId);
            ticket = ticket.dataValues;

            const assignee = await this.data.users.getById(ticket.assigneeId);
            const requester =
                await this.data.users.getById(ticket.requesterId);
            ticket.assignee = assignee.username;
            ticket.requester = requester.username;

            let comments = await this.data.comments.getAllByCriteria({
                TicketId: ticketId,
            });
            comments = await Promise.all(comments.map(async (comment) => {
                const user = await this.data.users.getById(comment.UserId);
                comment = comment.dataValues;
                comment.user = user.username;
                return comment;
            }));

            const project = await this.data.projects.getById(ticket.ProjectId);
            const users = await project.getUsers()
                .map((user) => user.username)
                .filter((user) => user !== assignee.username);
            res.status(200).send({
                ticket,
                comments,
                users,
            });
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
                const createdTicket =
                    await this.data.tickets.create(ticketToCreate);

                const assignee =
                    await this.data.users.getById(ticketToCreate.assigneeId);
                const company =
                    await this.data.companies.getOneByCriteria({
                        title: user.company,
                    });

                const notification = await this.data.notifications.create({
                    title: 'A new ticket was assigned to you.',
                    read: false,
                    deleted: false,
                    url: '/ticket/' + createdTicket.id,
                });
                notification.setUsers([assignee.id]);
                this.data.logs.log(
                    user.username + ' assigned a ticket to ' +
                    assignee.username,
                    company.id,
                );

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

    addTicketComment() {
        return async (req, res) => {
            const TicketId = req.body.ticketId;
            const description = req.body.comment;
            const UserId = req.body.userId;

            this.data.comments.create({
                TicketId,
                description,
                UserId,
            });

            const notification = await this.data.notifications.create({
                title: 'A new comment was added to your ticket.',
                read: false,
                deleted: false,
                url: '/ticket/' + TicketId,
            });

            const ticket = await this.data.tickets.getById(TicketId);

            const users = [ticket.assigneeId, ticket.requesterId]
                .filter((userId) => userId !== UserId);

            notification.setUsers(users);

            res.status(201).send({
                success: 'Comment added successfully',
            });
        };
    }

    createProject() {
        return async (req, res) => {
            const projectToCreate = req.body.project;
            const user = req.body.user;

            const company = await this.data.companies.getOneByCriteria({
                title: user.company,
            });

            if (company) {
                projectToCreate.deadline = new Date(projectToCreate.deadline);
                projectToCreate.ownerId = user.sub;
                projectToCreate.CompanyId = company.id;

                const projectExists =
                    await this.data.projects.getOneByCriteria({
                        [op.and]: [{
                                title: projectToCreate.title,
                            },
                            {
                                CompanyId: projectToCreate.CompanyId,
                            },
                        ],
                    });

                if (projectExists) {
                    res.status(403).send({
                        err: 'Project with that title already exists',
                    });
                } else {
                    const project =
                        await this.data.projects.create(projectToCreate);

                    this.data.logs.log(
                        user.username +
                        ' created a new project - ' + project.title,
                        projectToCreate.CompanyId
                    );

                    project.setUsers([user.sub]);
                    res.status(201).send({
                        success: true,
                    });
                }
            } else {
                res.status(403).send({
                    err: 'There was a problem acquiring your company.',
                });
            }
        };
    }

    getProjectDetails() {
        return async (req, res) => {
            const projectTitle = req.params.title;

            const project =
                await this.data.projects.getOneByCriteria({
                    title: projectTitle,
                });

            const projectUsers = await project.getUsers()
                .map((user) => {
                    delete user.dataValues.password;
                    return user.dataValues;
                });

            const companyUsers = await this.data.users.getAllByCriteria({
                CompanyId: projectUsers[0].CompanyId,
            }).map((user) => {
                delete user.dataValues.password;
                return user.dataValues;
            });

            const projectInfo = project.dataValues;

            res.status(200).send({
                projectInfo,
                projectUsers,
                companyUsers,
            });
        };
    }

    inviteToProject() {
        return async (req, res) => {
            const username = req.body.username;
            const ProjectId = req.body.projectId;
            const user = await this.data.users.getOneByCriteria({
                username,
            });
            const project = await this.data.projects.getById(ProjectId);
            // await user.setProjects([projectId]);
            const notification = await this.data.notifications.create({
                title: 'You were invited to join a project - ' + project.title,
                read: false,
                deleted: false,
                url: '/project/' + project.title,
                ProjectId,
            });
            notification.setUsers([user.id]);

            res.status(200).send({
                success: true,
            });
        };
    }

    promoteUser() {
        return async (req, res) => {
            const userId = req.body.userId;
            const projectId = req.body.projectId;

            const project = await this.data.projects.getById(projectId);

            await project.updateAttributes({
                ownerId: userId,
            });

            res.status(200).send({
                success: true,
            });
        };
    }

    leaveProject() {
        return async (req, res) => {
            const userId = req.body.userId;
            const projectId = req.body.projectId;

            const user = await this.data.users.getById(userId);
            await user.removeProjects([projectId]);

            res.status(204).send({});
        };
    }

    getCompanyProjects() {
        return async (req, res) => {
            const companyTitle = req.params.title;
            const company = await this.data.companies.getOneByCriteria({
                title: companyTitle,
            });
            let companyProjects;
            if (company) {
                companyProjects =
                    await this.data.projects.getAllByCriteria({
                        CompanyId: company.id,
                    });
                companyProjects = await Promise
                    .all(companyProjects.map(async (project) => {
                        let usersForProject = await project.getUsers();
                        usersForProject = usersForProject
                            .map((user) => user.dataValues);
                        project = project.dataValues;
                        project.users = usersForProject;
                        return project;
                    }));
                res.status(200).send(companyProjects);
            } else {
                res.status(404).send({
                    err: 'Company not found',
                });
            }
        };
    }

    updateTicketStatus() {
        return async (req, res) => {
            const ticketId = req.body.ticketId;
            const status = req.body.status;

            const ticket = await this.data.tickets.getById(ticketId);

            if (ticket) {
                await ticket.updateAttributes({
                    status,
                });

                res.status(200).send({
                    success: true,
                });
            } else {
                res.status(404).send({
                    err: 'No ticket with that id found',
                });
            }
        };
    }

    reassignTicket() {
        return async (req, res) => {
            const username = req.body.username;
            const ticketId = req.body.ticketId;

            const ticket = await this.data.tickets.getById(ticketId);
            const user = await this.data.users.getOneByCriteria({
                username,
            });
            const assigneeId = user.id;
            await ticket.updateAttributes({
                assigneeId,
            });

            res.status(200).send({
                success: true,
            });
        };
    }

    getUserNotifications() {
        return async (req, res) => {
            const userId = req.params.userId;
            const user = await this.data.users.getById(userId);

            const notifications = await user.getNotifications()
                .map((notif) => notif.dataValues);

            res.status(200).send({
                notifications,
            });
        };
    }

    respondProjectInvitation() {
        return async (req, res) => {
            const {
                userId,
                projectId,
                answer,
                notificationId,
            } = req.body;

            const user = await this.data.users.getById(userId);
            if (answer) {
                await user.setProjects([projectId]);
            }


            const notification =
                await this.data.notifications.getById(notificationId);

            await notification.updateAttributes({
                deleted: true,
            });

            const project = await this.data.projects.getById(projectId);
            if (answer) {
                this.data.logs.log(
                    user.username + ' just joined ' + project.title + '.',
                    user.CompanyId
                );
            } else {
                this.data.logs.log(
                    user.username +
                    ' declined invitation to join ' +
                    project.title + '.',
                    user.CompanyId
                );
            }

            res.status(204).send({});
        };
    }

    deleteNotification() {
        return async (req, res) => {
            const {
                notificationId,
            } = req.body;

            const notification =
                await this.data.notifications.getById(notificationId);

            await notification.updateAttributes({
                deleted: true,
            });

            res.status(204).send({});
        };
    }
}

module.exports = Controller;