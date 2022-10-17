import { spider58 } from './spider58'
import { House } from '../interface'
import fs from 'fs'
class RentMapService {
    private saveHouseList(houses: House[]) {
        let s = JSON.stringify(houses, null, 2)
        let path = 'db/house.json'
        fs.writeFileSync(path, s)
        console.log('houses保存成功')
    }

    public update() {
        const houseList: House[] = spider58()
        this.saveHouseList(houseList)

        return new Date()
    }
}

export default RentMapService