/**
 * koa 使用 socket.io 会有问题
 * require('http').Server(app.callback())
 */
const koa = require('koa'),
      Router = require('koa-router'),
      app = new koa(),
      socket_app = require('express')(),
      router =  new Router(),
      watchRou = require('./back/router/watch'),
      mysql = require('mysql'),
      Render = require('./render'),
      http = require('http').Server(socket_app),
      koaBody = require('koa-body');


const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ty1990423',
  database : 'watch'
})

connection.connect();

app.context.sql = connection;
app.context.nun = Render.render();
app.context.so = http;

watchRou.routerInit(router);

app.use(koaBody({
    multipart : true
}))
app.use(router.routes()).use(router.allowedMethods());

app.listen(5555,function(){
  console.log('listen at 5555')
})

http.listen(3000,() => {
  console.log('listen at 3000')
})