import express from 'express'
import path from 'path'


class App {
    app: express.Application
    port: string = process.env.PORT || '3000'

    constructor(routes: express.Router[]) {
        this.app = express()
        this.registerRoutes(routes)
        this.initMiddlewares()
    }

    // 初始化中间件
    private initMiddlewares() {
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    // 注册路由
    private registerRoutes(routes: express.Router[]) {
        routes.forEach(router => {
            this.app.use('/', router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Express server start at http://localhost:${this.port}/`)
        })
    }
}

export default App