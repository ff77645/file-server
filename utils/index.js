import fs from 'fs-extra'
import path from 'path'

export const isDir = path => fs.statSync(path).isDirectory()

export const isExists = path => fs.existsSync(path)

export const getFullPath = (path,rootDir)=>{
  if(path.isAbsolute(path)) return path
  return path.join(rootDir,path)
}