import Router from '@koa/router'
import * as ctl from '../../controller/index.js'

const router = new Router()

router.get('/state', ctl.getState)

// 获取文件夹
router.get('/folder',ctl.getFolder)

// 获取数据流
router.get('/stream',ctl.getStream)

// 删除文件
router.post('/remove',ctl.removeFile)



export default router