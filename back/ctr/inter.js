var sql = "select count(*) as count,type from error where date like ? group by type",
    date = '',
    paras = [],
    sum = 0,len = 0;

 function query(ctx,errCall,sucCall) {
    return new Promise((rv,rj) => {
        ctx.sql.query(sql,paras,(err,res) => {

            if(err){
                rv(errCall(err))
            }else{
                sum = res.reduce((total,r) => {
                    return total + r.count
                },0)
                len = res.length;

                rv(sucCall(res))
            }
        })
    })
}

exports.pic = function(){

    return async function(ctx,next){

        let msg = '哈哈哈',
        date =  [new Date().getFullYear(),
                new Date().getMonth() < 9 ? ('0' + (new Date().getMonth()+1)): (new Date().getMonth()+1),
                new Date().getDate() < 10 ? ('0' + new Date().getDate()): new Date().getDate()].join('-');
        paras = [date+'%'];

        await query(ctx,function (err) {
            console.log('err---',err)
            msg = 'failed'
        },function (result) {
            msg = encodeURIComponent(JSON.stringify(result))
        })

        ctx.body = ctx.nun.render('interval.html',{
            msg,
            sum,
            len,
            date
        })

        await next()
    }
}

exports.forDate = function () {

    return async function (ctx,next) {
         date = ctx.request.body.fields.date,
         paras = [date+'%'];
         let res = ctx.response;

        /**
         * res.status 为状态码
         * res.body 为 responseText
         * res.message 为 statusText
         */
        await query(ctx,function () {
            res.status = 500;
            res.body = '查询出错';
        },function (result) {
            res.status = 200;
            res.body = {
                result,
                sum,
                len,
                date
            };
        })

        await next()
    }
}