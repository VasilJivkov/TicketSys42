const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./app.config');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
    issuer: config.JWT_ISS,
    // audience: ''
};

const init = (data) => {
    passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
        console.log(jwtPayload);
        const user = await data.users.getOneByCriteria({
            username: jwtPayload.username,
        });

        if (user) {
            return done(null, user);
        }
        return done('Not authenticated', false);
    }));

    /**
     * @description Middleware
     */
};

module.exports = {
    init,
};