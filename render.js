const nun = require('nunjucks');

exports.render = function(){
  return nun.configure('back/views',{
    watch : true
  });
}
