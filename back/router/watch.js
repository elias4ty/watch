const sendErr = require('../ctr/senderr');

function routerInit(router){
  router.get('/sendErr',sendErr.getMessage());
}

exports.routerInit = routerInit;
