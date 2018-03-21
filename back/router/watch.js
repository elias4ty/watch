const sendErr = require('../ctr/sendErr'),
      inter = require('../ctr/inter');

function routerInit(router){
  router.get('/',async function(ctx,next){
     ctx.body = ctx.nun.render('send.html');
     await next();
  })
  router.get('/sendErr',sendErr.getMessage());
  router.get('/interval',inter.pic());
  router.post('/queryDate',inter.forDate());
}

exports.routerInit = routerInit;
