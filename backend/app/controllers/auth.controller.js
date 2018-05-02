const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const moment = require('moment');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const config = require('../config/app.config');

class AuthController {
    constructor(data) {
        this.data = data;
    }

    login() {
        return async (req, res) => {
            const user = await this.data.users.getOneByCriteria({
                username: req.body.username,
            });
            if (user) {
                const company = await this.data.companies.getOneByCriteria({
                    id: user.CompanyId,
                });
                bcrypt.compare(req.body.password, user.password,
                    (err, response) => {
                        if (err) {
                            res.status(401).send({
                                err: 'Unauthorized!',
                            });
                        }

                        if (response) {
                            const expire = moment(new Date())
                                .add(config.JWT_EXPIRE_TIME, 'seconds').unix();

                            const payload = {
                                sub: user.id,
                                username: user.username,
                                email: user.email,
                                exp: expire,
                                iss: config.JWT_ISS,
                                role: user.role,
                            };

                            payload.company = company.title;

                            if (user.nickname) {
                                payload.nickname = user.nickname;
                            }

                            const secret = config.JWT_SECRET;

                            const token = jwt.encode(payload, secret);
                            res.status(200).send({
                                token,
                            });
                        } else {
                            res.status(401).send({
                                err: 'Wrong username or password.',
                            });
                        }
                    });
            } else {
                res.status(401).send({
                    err: 'Wrong username or password.',
                });
            }
        };
    }

    register() {
        return async (req, res) => {
            const userToCreate = req.body;
            userToCreate.role = 'User';

            // Defensive programming
            if (userToCreate.company) {
                const company = await this.data.companies.getOneByCriteria({
                    title: userToCreate.company,
                });

                if (company) {
                    return res.status(401).send({
                        err: 'Company name already exists.',
                    });
                }
            }

            // Defensive programming
            let user = await this.data.users.getOneByCriteria({
                [op.or]: [{
                        username: userToCreate.username,
                    },
                    {
                        email: userToCreate.email,
                    },
                ],
            });

            // Actually creating user and? company
            if (!user) {
                let company = null;
                if (userToCreate.company) {
                    company = await this.data.companies.create({
                        title: userToCreate.company,
                    });
                    delete userToCreate.company;
                    userToCreate.CompanyId = company.id;
                }

                user = await this.data.users.create(userToCreate);

                const expire = moment(new Date())
                    .add(config.JWT_EXPIRE_TIME, 'seconds').unix();

                const payload = {
                    sub: user.id,
                    username: user.username,
                    email: user.email,
                    exp: expire,
                    iss: config.JWT_ISS,
                    role: user.role,
                };

                if (company) {
                    payload.company = company.title;
                }

                if (user.nickname) {
                    payload.nickname = user.nickname;
                }

                const secret = config.JWT_SECRET;

                const token = jwt.encode(payload, secret);

                res.status(200).send({
                    token,
                });
            } else {
                res.status(401).send({
                    err: 'Username or email already exists.',
                });
            }
            return null;
        };
    }
}

module.exports = AuthController;