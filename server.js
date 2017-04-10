'use strict';

const Koa = require('koa');
const app = new Koa();

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

app.use(ctx => {
    ctx.body = ctx.req.url;
});

const port = process.env.PORT || 3000;

app.listen(port);