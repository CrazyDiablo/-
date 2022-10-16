import express, { Router } from 'express'
import path from 'path'
const logger = require('morgan')
var cookieParser = require('cookie-parser')

class App {
    app: express.Application

    constructor(routes: Router[]) {
        this.app = express()
        this.initMiddlewares()
        this.registerRoutes(routes)
    }

    // 初始化中间件
    private initMiddlewares() {
        // 配置静态文件目录
        this.app.use(express.static(path.join(__dirname, 'public')))
        // 请求解析相关
        this.app.use(express.urlencoded({ extended: false }))   // 解析 application/x-www-form-urlencoded 格式请求体
        this.app.use(express.json())    // 解析 json 格式请求体
        this.app.use(cookieParser())    // 解析cookie
        // 配置日志系统
        this.app.use(logger('dev'))
    }

    // 注册路由
    private registerRoutes(routes: Router[]) {
        routes.forEach(router => {
            this.app.use('/', router)
        })
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`Express server start at http://localhost:${port}/`)
        })
    }
}

export default App