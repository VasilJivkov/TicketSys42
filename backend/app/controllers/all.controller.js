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
                    }).map((ticket) => ticket.dataValues);

                const receivedTickets =
                    await this.data.tickets.getAllByCriteria({
                        assigneeId: user.id,
                    }).map((ticket) => ticket.dataValues);

                res.status(200).send({
                    userInfo,
                    issuedTickets,
                    receivedTickets,
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
}

module.exports = Controller;