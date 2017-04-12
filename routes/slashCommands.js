'use strict';
const commands = {
    '/pullreq': (slashRequest, request, response) => {
        response.send('Hello world');
    }
};

module.exports = commands;