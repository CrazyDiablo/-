import { Request, Response, NextFunction } from "express"
import RentMapService from '../services/RentMapService'

const service = new RentMapService()

class RentMapController {

    public rentList(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({ message: 'success', status: true, data: '11111' })
    }

    public update(req: Request, res: Response, next: NextFunction) {
        service.update()
        res.status(200).send({ message: 'success', status: true })
    }
}

export default RentMapController