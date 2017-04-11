'use strict';

const _ = require('lodash');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

// x-response-time

app.use(async function (ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async function (ctx, next) {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(bodyParser());

app.use(ctx => {
    const inputCommand = _.get(ctx, 'request.body.text', '');
    const bitbucketRegex = /^https:\/\/bitbucket.org\/([a-z0-9\-_]+)\/([a-z0-9\-_]+)\/pull-requests\/([0-9]+)/gi
    const bitbucketMatch = inputCommand.match(bitbucketRegex);

    const user = _.get(ctx, 'request.body.username');

    if (bitbucketMatch) {
        const responseObj = {
            "text": `${user} needs someone to look at a pull request.`,
            "attachments": [
                {
                    "text": `${request.body.text}`
                }
            ]
        };
        ctx.body = JSON.stringify(responseObj);
    } else {
        ctx.body = 'Sorry, but this wasn\'t recognised.  Either it\'s not a Bitbucket pull request, or @owen sucks at regex';
    }
});

const port = process.env.PORT || 3000;

app.listen(port);