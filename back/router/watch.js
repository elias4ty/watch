const sendErr = require('../ctr/senderr'),
      inter = require('../ctr/inter');

function routerInit(router){
  router.get('/sendErr',sendErr.getMessage());
  router.get('/interval',inter.pic());
}

exports.routerInit = routerInit;
