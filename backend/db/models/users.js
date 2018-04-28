'use strict';
const bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        nickname: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {});
    Users.associate = function (models) {
        // associations can be defined here
    };

    /**
     * @description Using hook before user creation
     * @param {string} password
     * @return {string} Hashed password
     */

    Users.beforeCreate(async (user, options) => {
        const hashPassword = await cryptPassword(user.password);
        user.password = hashPassword;
    })

    const cryptPassword = (password) => {
        return new Promise(function (resolve, reject) {

            /**
             * @description Takes a password in plain text and hashes it
             * @param {string} password
             * @return {string} Hashed password
             */

            bcrypt.genSalt(10, function (err, salt) {

                /**
                 * @description Encrypt password using bcrypt module
                 * @async
                 * @throws Throws errors from the validations
                 * @return {Object} hashed password
                 */
                if (err) {
                    return reject(err);
                }

                bcrypt.hash(password, salt, null, function (err, hash) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(hash);
                });
            })
        })
    }

    return Users;
};