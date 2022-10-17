import { Router, RequestHandler } from 'express';
import RentMapController from '../controllers/rentMap'

const router = Router()
const controller = new RentMapController()

router.get('/rentMap/rentList', controller.getRentList)

router.get('/rentMap/update', controller.update)

export default router