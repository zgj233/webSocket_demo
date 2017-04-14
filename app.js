const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const socket = require('socket.io');
const app = new Koa();
const router = new Router();
const verifyDao = require('./Dao/judge/verify');



// or use absolute paths
app.use(serve(__dirname + '/public'));

router.get('/user',async (ctx,next)=>{
    let userMsg = await verifyDao.query(ctx, next);
    let data = {
        status:200,
        res: userMsg
    };
    ctx.body = data;

});

app.use(router.routes()).use(router.allowedMethods());



app.listen(3000);