import { useReducer, FC, ReactElement, useEffect, useState } from 'react'
import { Map, MassMarks } from '@pansy/react-amap'
import { MapProps } from '@pansy/react-amap/es/map'
import api from '@s/index'
import './style.less'
import { House } from '../../interface/index';




const RentMap: FC = (): ReactElement => {

    const [massDataList, setmMssDataList] = useState<AMap.MassMarks.MassData[]>([])

    const mapEvents: MapProps['events'] = {
        click: (e) => { console.log('点击了', e.lnglat) }
    }

    const style = [
        {
            url: 'https://webapi.amap.com/images/mass/mass0.png',
            anchor: 'center',
            size: [64, 30],
            zIndex: 3,
        },
        {
            url: 'https://webapi.amap.com/images/mass/mass1.png',
            anchor: 'center',
            size: [64, 30],
            zIndex: 2,
        },
        {
            url: 'https://webapi.amap.com/images/mass/mass2.png',
            anchor: 'center',
            size: [64, 30],
            zIndex: 1,
        },
    ];

    const getRentList = async () => {
        const res = await api.rentMap.getRentList()
        const houseList: House[] = res.content
        let _massDataList: AMap.MassMarks.MassData[] = []
        houseList.forEach(house => {
            const massData: AMap.MassMarks.MassData = {
                lnglat: house.location,
                name: house.title,
                style: 1,
                ...house
            }
            _massDataList.push(massData)
        })
        setmMssDataList(_massDataList)
    }

    useEffect(() => {
        getRentList()
    }, [])

    return (
        <div className='rent-map'>
            <Map
                center={{ longitude: 120.587895, latitude: 31.299218 }}
                events={mapEvents}
                mapKey={'f25324e90f4befb66e2bed0ab1f2111a'}>
                <MassMarks data={massDataList} style={style} />
            </Map>
        </div>
    )
}

export default RentMap