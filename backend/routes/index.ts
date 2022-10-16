import { Router } from 'express'
import pages from './pages'
import rentMap from './rentMap'

const routes: Router[] = [
    pages,
    rentMap,
]

export default routes