import { Router } from 'express'
import path from 'path'

const router = Router()

// home page
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public', 'serverPage.html'))
})

export default router