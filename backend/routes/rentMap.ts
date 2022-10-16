import { Router, RequestHandler } from 'express';
import RentMapController from '../controllers/rentMap'

const router = Router()
const controller = new RentMapController()

router.get('/rentList', controller.update)

export default router