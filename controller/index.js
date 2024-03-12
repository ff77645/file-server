import fs from 'fs-extra'
import path from 'path'
import { isDir, isExists,getFullPath } from '../utils/index.js'

export const getState = async ctx=>{
  const filePath = getFullPath(ctx.query.path,ctx.state.rootDir)
  const stat = fs.statSync(filePath)
  ctx.handleSuccess(stat)
}


export const getFolder = async ctx =>{
  const rootDir = ctx.state.rootDir
  const _path = ctx.query.path || ''
  const dir = path.join(rootDir,_path)
  const basename = path.basename(rootDir)

  if(!isExists(dir)) return ctx.handleError('not exists')
  if(!isDir(dir)) return ctx.handleError('not dir')

  const files = fs.readdirSync(dir)
  const data = files.map(file=>{
    const filePath = path.join(basename,_path,file)
    const fullPath = path.resolve(dir,file)
    return {
      name:file,
      isDir:isDir(path.resolve(dir,file)),
      path:filePath,
      fullPath
    }
  })
  ctx.handleSuccess(data)
}

export const getStream = async ctx =>{
  const filePath = path.resolve(ctx.state.rootDir,ctx.query.path)

  const stat = fs.statSync(filePath)
  const fileSize = stat.size
  const range = ctx.get('Range')
  if(range){
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    let end = start + 1024 * 1024 * 20
    end = Math.min(end,fileSize-1)
    const chunkSize = end - start + 1
    const file = fs.createReadStream(filePath,{start,end})
    ctx.set('Content-Range',`bytes ${start}-${end}/${fileSize}`)
    ctx.set('Accept-Ranges','bytes')
    ctx.set('Content-Length',chunkSize)
    // ctx.set('Content-Type','video/mp4')
    ctx.status = 206
    ctx.handleSuccess(file)
  }else{ 
    ctx.set('Accept-Ranges','bytes')
    ctx.set('Content-Length',fileSize)
    ctx.status = 200
    ctx.handleSuccess(fs.createReadStream(filePath))
  }
}

export const removeFile = async ctx =>{
  const rootDir = ctx.state.rootDir
  const _path = ctx.body.path
  const filePath = path.resolve(rootDir,_path)
  fs.removeSync(filePath)
  ctx.handleSuccess('',"删除成功")
}