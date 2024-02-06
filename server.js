import Koa from 'koa'
import {koaBody} from 'koa-body'
import KoaLogger from 'koa-logger'
import Router from '@koa/router'
import apiV1 from './api/v1/index.js'
import serve from 'koa-static'


const startServer = config =>{
  const app = new Koa()
  app.use(koaBody())
  app.use(KoaLogger())
  app.use(serve(config.rootDir,{
    defer:true,
  }))
  app.use(async (ctx,next) => {
    ctx.state.rootDir = config.rootDir
    next()
  })

  const router = new Router()
  router.use('/api/v1',apiV1.routes())
  app.use(router.routes())

  app.listen(3000, () => {
    console.log('config.rootDir',config.rootDir);
    console.log('server is running on port 3000')
  })
}

export default startServer