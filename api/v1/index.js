import Router from '@koa/router'



const router = new Router()



router.get('/state', async (ctx) => {
  ctx.body = 'Hello World'
})

// 获取目录下的所有文件
router.get('/file',async (ctx)=>{
  ctx.body = 'get files'
})




export default router