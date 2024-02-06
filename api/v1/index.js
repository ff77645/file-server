import Router from '@koa/router'
import fs from 'fs-extra'
import path from 'path'
import { isDir, isExists } from '../../utils/index.js'

const router = new Router()

router.get('/state', async (ctx) => {
  ctx.body = ctx.state.rootDir
})

// 获取文件夹
router.get('/doucument',async (ctx)=>{
  const rootDir = ctx.state.rootDir
  const _path = ctx.query.path || ''
  const dir = path.join(rootDir,_path)

  if(!isExists(dir)) return ctx.body = 'not exists'
  if(!isDir(dir)) return ctx.body = 'not dir'

  const files = fs.readdirSync(dir)
  const data = files.map(file=>{
    const filePath = path.join(_path,file)
    return {
      name:file,
      isDir:isDir(path.resolve(dir,file)),
      path:filePath
    }
  })
  ctx.body = data
})

router.get('/stream',async ctx =>{
  const videoPath = path.resolve(ctx.state.rootDir,ctx.query.path)

  const stat = fs.statSync(videoPath)
  const fileSize = stat.size
  const range = ctx.get('Range')
  if(range){
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    let end = start + 1024 * 1024 * 10
    end = Math.min(end,fileSize-1)
    const chunkSize = end - start + 1
    const file = fs.createReadStream(videoPath,{start,end})
    ctx.set('Content-Range',`bytes ${start}-${end}/${fileSize}`)
    ctx.set('Accept-Ranges','bytes')
    ctx.set('Content-Length',chunkSize)
    // ctx.set('Content-Type','video/mp4')
    ctx.status = 206
    ctx.body = file
  }else{ 
    ctx.set('Accept-Ranges','bytes')
    ctx.set('Content-Length',fileSize)
    ctx.status = 200
    ctx.body = fs.createReadStream(videoPath)
  }
})

router.post('/delete',async ctx =>{
  const rootDir = ctx.state.rootDir
  const _path = ctx.body.path
  const dir = path.resolve(rootDir,_path)
  if(!isExists(dir)) return ctx.body = 'not exists'
  
  
})



export default router