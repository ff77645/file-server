import fs from 'fs-extra'
import path from 'path'

export const isDir = path => fs.statSync(path).isDirectory()

export const isExists = path => fs.existsSync(path)

export const getFullPath = (filePath='',rootDir)=>{
  if(path.isAbsolute(filePath)) return filePath
  return path.join(rootDir,filePath)
}