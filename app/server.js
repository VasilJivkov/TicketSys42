const express = require('express');

const app = express();

const data = require('./data/data');

const config = require('./config');

require('./config/express').init(app);
require('./config/auth').init(app, data);

app.use((req, res, next) => {
    if (req.user) {
        res.locals.user = req.user.dataValues;
        delete res.locals.user.password;
        const role = req.user.userRoleId;
        if (role === 1) {
            res.locals.user.userRole = 'admin';
        } else if (role === 2) {
            res.locals.user.userRole = 'user';
        } else if (role === 3) {
            res.locals.user.userRole = 'guest';
        }
    } else {
        res.locals.user = null;
    }
    return next();
});

require('./routes').init(app, data);

app.listen(config.port);
console.log(`App running at port: ${config.port}`);
