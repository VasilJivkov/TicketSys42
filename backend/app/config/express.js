const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const init = (app) => {
    // defensive programming
    if (typeof app.use !== 'function' ||
        typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    // decorater
    app.use(cors());

    // decorator
    app.use(cookieParser());

    // decorator
    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    app.use(bodyParser.json());

    // decorator
    app.use(morgan('combined'));
};

module.exports = {
    init,
};