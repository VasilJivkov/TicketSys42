const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const { Strategy } = require('passport-local');

const init = (app, data) => {
    passport.use(new Strategy(
        async (username, password, done) => {
            const user = await data.users.getOneByCriteria({
                username: username,
            });

            /**
             * @description Check if username is correct
             * @async
             * @throws Throws errors from the validations
             * @param {Object} user User object with
             * properties from the login form
             * @return {Object} Logged user
             */

            if (!user) {
                done(null, false, {
                    message: `Login failed, reason given:
                    Incorrect username!`,
                });
            } else {
                /**
                 * @description Compares the plain
                 * text password with a hashed one
                 * @param {string} password Password in plain text
                 * @param {string} hash Hashed password
                 * @return {boolean} True if the passwords are the same.
                 * False if the passwords are different
                 */

                bcrypt.compare(password, user.password, function(err, res) {
                    if (err) {
                        return done(err);
                    }

                    /**
                     * @description Check if password given is correct
                     * @param {string} password Password in plain text
                     * @param {string} hash Hashed password
                     * @return {boolean} True if the passwords are the same.
                     * False if the passwords are different
                     */

                    if (res === false) {
                        return done(null, false, {
                            message: `Login failed, reason given:
                            Incorrect password!`,
                        });
                    }
                    // User with such username and password exists
                    return done(null, user);
                });
            }
        }));


    /**
     * @description Cookie generator
     * @param {string} cookie user to string
     * @return {boolean} true
    * False if not exist
     */

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    /**
     * @description Cookie receiver - string to user
     * @param {string} cookie string to user
     * @return {boolean} true if exist
     * False if not exist
     */
    passport.deserializeUser(async (username, done) => {
        const user = await data.users.getOneByCriteria({
            username: username,
        });
        if (!user) {
            return done(new Error('System did not recognize your username!'));
        }
        return done(null, user);
    });

    /**
     * @description Middleware
     */

    app.use(cookieParser());

    /**
     * @description Session
     * @param {string} secret password
     * @param {boolean} resave
     * @param {boolean} saveUninitialized
     */
    app.use(session({
        secret: 'Little teapot',
        resave: false,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = {
    init,
};