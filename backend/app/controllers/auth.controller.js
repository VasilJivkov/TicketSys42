const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('../config/app.config');

class AuthController {
    constructor(data) {
        this.data = data;
    }

    login() {
        return async (req, res) => {
            console.log(req);
            const user = await this.data.users.getOneByCriteria({
                username: req.body.username,
            });
            console.log(user);
            if (user) {
                bcrypt.compare(req.body.password, user.password,
                    (err, response) => {
                        if (err) {
                            res.status(401).send({
                                err: 'Incorrect username or password',
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

                            const secret = config.JWT_SECRET;

                            const token = jwt.encode(payload, secret);

                            res.status(200).send({
                                token,
                            });
                        }
                    });
            } else {
                res.status(401).send({
                    err: 'Unsuccessful login.',
                });
            }
        };
    }

    register() {
        return async (req, res) => {
            const userToCreate = req.body;
            userToCreate.role = 'User';
            userToCreate.CompanyId = 1;

            const user = await this.data.users.findOrCreate(userToCreate);

            // check if user is new or already exists
            const isNew = user[user.length - 1];

            if (isNew) {
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
        };
    }
}

module.exports = AuthController;