exports.pic = function(){

    return async function(ctx,next){

        let sql = 'select count(*) as count,type from error group by type',
            msg = '哈哈哈';

        let [err,result] = await new Promise((rv,rj) => {
            ctx.sql.query(sql,(err,res) => {
                rv([err,res])
            })
        })

        if(err){
            console.log('err---',err)
            msg = 'failed'
        }else{
            msg = encodeURIComponent(JSON.stringify(result))
        }

        ctx.body = ctx.nun.render('interval.html',{msg})

        await next()
    }
}
