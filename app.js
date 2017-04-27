const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const serve = require('koa-static');
const sio = require('socket.io');
const app = new Koa();
const router = new Router();
const verifyDao = require('./Dao/judge/verify');
const keyPack = require('./Dao/redis');
const https = require('https');
const fs = require('fs');


// or use absolute paths
app.use(serve(__dirname + '/public'));

app.use(koaBody({formidable:{uploadDir: __dirname}}));

router.post('/signIn',async (ctx,next)=>{
    let req_body = ctx.request.body;
    let pwd = req_body.Pwd;
    let data;
    let userMsg = await verifyDao.query(req_body, next);
    if(userMsg[0]){
        if(pwd === userMsg[0].pwd){
            data = {
                status:200,
                cookie:userMsg[0].name,
                res: '登录成功'
            };
        }
        else {
            data = {
                status:500,
                res: '登录失败, 密码与帐户不匹配'
            };
        }
    }
    else {
        data = {
            status:404,
            res:'没有这个帐户'
        }
    }
    ctx.body = data;
});

app.use(router.routes()).use(router.allowedMethods());

const options = {
    key: fs.readFileSync('./CA/privatekey.pem'),
    cert: fs.readFileSync('./CA/certificate.pem')
}

const server = https.createServer(options, app.callback()).listen(3000,()=>{
    console.log('Https server listening on port ' + 3000);
});

const socketIO = sio.listen(server,{path:'/chat_socket'});

socketIO.on("connection", function (socket) {
    socket.on('client_msg',function(user,id ,data,fn){
        fn(200);        //告知客户端通信成功
        keyPack.post(user, id);
        socket.broadcast.emit('broadcast', data);
    });
});
