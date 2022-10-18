import { FC, ReactElement, useEffect, useState } from 'react'
import { Map, MassMarks, InfoWindow } from '@pansy/react-amap'
import { MapProps, } from '@pansy/react-amap/es/map'
import { MassMarksProps } from '@pansy/react-amap/es/mass-marks'
import { getIconUrl } from '@u/util'

import api from '@s/index'
import './style.less'
import { House } from '../../interface/index';

const RentMap: FC = (): ReactElement => {

    const [massDataList, setmMssDataList] = useState<AMap.MassMarks.MassData[]>([])
    const [position, setPosition] = useState<AMap.ExpandPosition>({ longitude: 0, latitude: 0 })
    const [infoWindowVisible, setInfoWindowVisible] = useState<boolean>(false)
    const [clickMassData, setClickMassData] = useState<AMap.MassMarks.MassData>({ name: '', lnglat: [0, 0] })


    const mapEvents: MapProps['events'] = {
        // click: (e) => { console.log('点击了', e.lnglat) }
    }
    const markEvents: MassMarksProps['events'] = {
        click: (e) => {
            console.log('点击了', e)
            const lnglat = e.data.location
            setClickMassData(e.data)
            setPosition({ longitude: lnglat[0], latitude: lnglat[1] })
            setInfoWindowVisible(true)
        }
    }
    const infoWindowEvents = {
        open: (e) => {
            console.log('infoWindowEvents', e)
            setInfoWindowVisible(true);
        },
        close: () => {
            setInfoWindowVisible(false);
        },
    }
    const style = [
        {
            url: getIconUrl('marker-gray.svg'),
            anchor: 'center',
            size: [30, 30],
            zIndex: 1,
        },
        {
            url: getIconUrl('marker-blue.svg'),
            anchor: 'center',
            size: [30, 30],
            zIndex: 2,
        },
        {
            url: getIconUrl('marker-green.svg'),
            anchor: 'center',
            size: [30, 30],
            zIndex: 3,
        },
        {
            url: getIconUrl('marker-yellow.svg'),
            anchor: 'center',
            size: [30, 30],
            zIndex: 4,
        },
        {
            url: getIconUrl('marker-purple.svg'),
            anchor: 'center',
            size: [30, 30],
            zIndex: 5,
        },
    ]

    const getRentList = async () => {
        const res = await api.rentMap.getRentList()
        const houseList: House[] = res.content
        let _massDataList: AMap.MassMarks.MassData[] = []
        houseList.forEach(house => {
            const price = Number(house.price)
            let styleIndex = Math.floor(price / 1000)
            styleIndex = styleIndex > 4 ? 4 : styleIndex
            price === 3600 && console.log('styleIndex', styleIndex)
            const massData: AMap.MassMarks.MassData = {
                lnglat: house.location,
                name: house.title,
                style: styleIndex,
                ...house
            }
            _massDataList.push(massData)
        })
        setmMssDataList(_massDataList)
    }

    useEffect(() => {
        getRentList()
    }, [])
    const html = `<div class='rent-map-infoWindow'>
        <img src="https://pic1.ajkimg.com/display/anjuke/97ffba407dbe4d5b681edc31c2ba0b76/240x180c.jpg?t=1&srotate=1" alt="" />
    <div class='info'>
        <div class='title ellipsis'>${clickMassData.name}</div>
        <div>${clickMassData.room}&nbsp;&nbsp;&nbsp;&nbsp;${clickMassData.size}㎡</div>
        <div>
        <span>${clickMassData.address}</span>
        <span class='price'>${clickMassData.price}元</span>
        </div>
        <div>详情：<a href="">点击跳转58详情页面</a></div>
    </div>
</div>`
    //     const html = `<div cla>
    //     <div>${clickMassData.name}</div>
    //     <div>价格：${clickMassData.price}元</div>
    //     <div>居室：${clickMassData.room} ${clickMassData.size}㎡</div>
    //     <div>地址：${clickMassData.address}</div>
    // </div>`

    const jsx = <div className='rent-map-infoWindow'>
        <div>
            <img src="https://pic1.ajkimg.com/display/anjuke/97ffba407dbe4d5b681edc31c2ba0b76/240x180c.jpg?t=1&srotate=1" alt="" />
        </div>
        <div className='info'>
            <div className='title'>{clickMassData.name}</div>
            <div>详情：<a href="">点击跳转58详情页面</a></div>
            <div>{clickMassData.room}</div>
            <div>{clickMassData.address}{clickMassData.price}元</div>
        </div>
    </div>

    return (
        <div className='rent-map'>
            <Map
                // center={{ longitude: 120.587895, latitude: 31.299218 }}
                events={mapEvents}
                mapKey={'f25324e90f4befb66e2bed0ab1f2111a'}>
                <MassMarks
                    data={massDataList}
                    style={style}
                    events={markEvents} />
                <InfoWindow
                    position={position}
                    visible={infoWindowVisible}
                    // isCustom={true}
                    isCustom={false}
                    content={html}
                    // size={{
                    //     width: 300,
                    //     height: 150,
                    // }}
                    offset={[0, -20]}
                    autoMove={false}
                    events={infoWindowEvents}
                />
            </Map>
        </div>
    )
}

export default RentMap