const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const init = (app) => {
    // defensive programming
    if (typeof app.use !== 'function' ||
        typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    // decorator
    app.use(cookieParser());

    // decorator
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    // decorator
    app.use(morgan('combined'));
};

module.exports = {
    init,
};