import {Command } from 'commander'
import startServer from "./server.js"
import path from 'path'
import { isExists,isDir } from './utils/index.js'

const program = new Command()

program
  .command('serve [path]')
  .description('启动服务')
  .action(_path => {
    _path = _path || '.'
    const isAbsolute = path.isAbsolute(_path)
    const rootDir = isAbsolute ? _path : path.join(process.cwd(), _path)
    if(!isExists(rootDir)) return console.log('路径不存在')
    if(!isDir(rootDir)) return console.log('路径不是文件夹')
    console.log({rootDir})
    startServer({rootDir}) 
  })


program.parse(process.argv)
