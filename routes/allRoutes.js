'use strict';
const _ = require('lodash');
const slashCommands = require('./slashCommands');

module.exports = (app) => {
    const logger = app.locals.logger;

    app.post('/slash', (request, response, next) => {
        const body = request.body;
        const slashRequest = {
            token: _.get(body, 'token'),
            team_id: _.get(body, 'team_id'),
            teamDomain: _.get(body, 'team_domain'),
            channelId: _.get(body, 'channel_id'),
            userId: _.get(body, 'user_id'),
            userName: _.get(body, 'user_name'),
            command: _.get(body, 'command'),
            commandText: _.get(body, 'text'),
            responseUrl: _.get(body, 'response_url')
        };

        console.log(slashRequest);

        if (slashRequest.token !== 'WjMroPyxOBPjBxvjR59gDB5w') {
            logger.warn('Slash command refused for unknown token');
            return response.sendStatus(401);
        }

        logger.log('SLASH: ' + slashRequest.command);
        if (slashCommands[slashRequest.command]) {
            slashCommands[slashRequest.command](slashRequest, request, response, next);
        } else {
            response.send('Sorry, bitbot has not heard of that command');
        }
    });
};