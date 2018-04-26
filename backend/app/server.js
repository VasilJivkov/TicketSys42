const express = require('express');

const app = express();

const data = require('./data/data');

const config = require('./config/app.config');

require('./config/express').init(app);
require('./config/auth').init(data);

require('./routes').init(app, data);

app.listen(config.PORT);
console.log(`App running at port: ${config.PORT}`);