import { Request, Response, NextFunction } from "express"
import RentMapService from '../services/RentMapService'

const service = new RentMapService()

class RentMapController {

    public getRentList(req: Request, res: Response, next: NextFunction) {
        const result = service.getRentList()
        res.status(200).send({ message: 'success', status: true, content: JSON.parse(result) })
    }

    public update(req: Request, res: Response, next: NextFunction) {
        service.update()
        res.status(200).send({ message: 'success', status: true })
    }
}

export default RentMapController