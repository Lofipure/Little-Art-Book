const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const path = require("path");

app.use(cors());
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}));

app.use(require('koa-static')(
    path.join(__dirname, '/public')
))

app.use(async (ctx, next) => {
    console.log(`请求方法: ${ctx.method}`);
    console.log(`请求路径: ${ctx.url}`);

    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(18081, () => {
    console.log("please visit http://localhost:18081");
});