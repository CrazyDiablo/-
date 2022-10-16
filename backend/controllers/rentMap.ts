import { Request, Response, NextFunction } from "express"
import RentMapService from '../services/RentMapService'

const service = new RentMapService()

class RentMapController {
    public update(req: Request, res: Response, next: NextFunction) {
        const result = service.update()
        res.status(200).send({ message: 'success', status: true, data: result })
    }
}

export default RentMapController