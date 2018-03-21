exports.getMessage = function(){
    return async function(ctx,next){
        let query = ctx.query,
            res = ctx.response,
            addSql = 'INSERT INTO error(id,type,date,filename,message,lineno,colno,src) VALUES(?,?,?,?,?,?,?,?)',
            addPara = [new Date().getTime(),query.type,query.Date,query.filename,query.message,query.lineno,query.colno,query.src || ''],
            io = require('socket.io')(ctx.so,{
                "serveClient": false ,
                "transports":['websocket', 'polling']
            });


        let [err,result] = await new Promise((rv,rj) => {
            ctx.sql.query(addSql,addPara,(err,result) => {
                rv([err,result])
            })
        })

        if(err){
            console.log('Insert error----',err.message)
            res.status = 404;
            res.message = 'Insert error'
            res.body = 'failed'
        }else{

            io.on('connection',socket => {
                socket.on('insert',msg => {
                    console.log('emit')
                    io.emit('toast',msg)
                })
            })

            console.log('Insert success')
            res.status = 200;
            res.message = 'Insert success'
            res.body = 'success'
        }

        await next()
    }
}
