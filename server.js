/* jshint node:true */
'use strict';
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/default.js');
const winston = require('winston');

const logger = new (winston.Logger)({
   transports: [
       new (winston.transports.Console)(),
       new (winston.transports.File)({ filename: 'logs/events.log'})
   ]
});
const app = express();

app.locals.config = config;
app.locals.logger = logger;

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/allRoutes.js')(app);

app.use((request, response) => {
    response.sendStatus(400);
});

const port = process.env.PORT || config.listenPort || 3000;
app.locals.port = port;

app.listen(port);
logger.info (`BitBot listening on port ${port}`);
