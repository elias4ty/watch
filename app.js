const koa = require('koa'),
      Router = require('koa-router'),
      app = new koa(),
      router =  new Router(),
      watchRou = require('./back/router/watch'),
      mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'ty1990423',
  database : 'watch'
})

connection.connect();

app.context.sql = connection;

watchRou.routerInit(router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(5555,function(){
  console.log('listen at 5555')
})
