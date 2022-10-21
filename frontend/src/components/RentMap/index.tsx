import { FC, ReactElement, useEffect, useState } from 'react'
import { Map, MassMarks, InfoWindow } from '@pansy/react-amap'
import { MassMarksProps } from '@pansy/react-amap/es/mass-marks'
import { getIconUrl } from '@u/util'
import api from '@s/index'
import './style.less'
import { House } from '../../interface/index';
import { InfoWindowProps } from '@pansy/react-amap/es/info-window'
import PriceFilter from './PriceFilter'

// 点标记样式
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

const RentMap: FC = (): ReactElement => {
    const [massDataList, setmMssDataList] = useState<AMap.MassMarks.MassData[]>([])
    const [position, setPosition] = useState<AMap.ExpandPosition>({ longitude: 0, latitude: 0 })
    const [infoWindowVisible, setInfoWindowVisible] = useState<boolean>(false)
    const [clickMassData, setClickMassData] = useState<AMap.MassMarks.MassData>({ name: '', lnglat: [0, 0] })
    const [filterCheckedList, setFilterCheckedList] = useState<number[]>([1000, 2000, 3000, 4000, 5000])

    const infoWindowHtml = `
    <div class='rent-map-infoWindow'>
        <img src="https://pic1.ajkimg.com/display/anjuke/97ffba407dbe4d5b681edc31c2ba0b76/240x180c.jpg?t=1&srotate=1" alt="" />
        <div class='info'>
            <div class='title ellipsis'>${clickMassData.name}</div>
            <div>${clickMassData.room}&nbsp;&nbsp;&nbsp;&nbsp;${clickMassData.size}㎡</div>
            <div>
                <span>${clickMassData.address}</span>
                <span class='price'>${clickMassData.price}元</span>
            </div>
            <div>详情：<a href=${clickMassData.detailLink} target="_blank">点击跳转58详情页面</a></div>
        </div>
    </div>
`
    // 点标记事件
    const markEvents: MassMarksProps['events'] = {
        click: (e) => {
            console.log('点击了', e)
            const lnglat = e.data.location
            setClickMassData(e.data)
            setPosition({ longitude: lnglat[0], latitude: lnglat[1] })
            setInfoWindowVisible(true)
        }
    }

    // 信息弹窗事件
    const infoWindowEvents: InfoWindowProps['events'] = {
        open: (e) => {
            setInfoWindowVisible(true);
        },
        close: () => {
            setInfoWindowVisible(false);
        },
    }

    const getRentList = async () => {
        const res = await api.rentMap.getRentList()
        const houseList: House[] = res.content
        let _massDataList: AMap.MassMarks.MassData[] = []
        houseList.forEach(house => {
            const price = house.price
            let styleIndex = Math.floor(price / 1000)
            styleIndex = styleIndex > 4 ? 4 : styleIndex
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

    const _massDataList = massDataList.filter(massData => {
        let priceLevel = Math.floor((massData.price + 1000) / 1000) * 1000
        priceLevel = priceLevel > 5000 ? 5000 : priceLevel
        return filterCheckedList.includes(priceLevel)
    })

    return (
        <div className='rent-map'>
            <PriceFilter filterCheckedList={filterCheckedList} setFilterCheckedList={setFilterCheckedList} />
            <Map mapKey={'f25324e90f4befb66e2bed0ab1f2111a'} zoom={13}>
                <MassMarks
                    data={_massDataList}
                    // @ts-ignore
                    style={style}
                    events={markEvents} />
                <InfoWindow
                    position={position}
                    visible={infoWindowVisible}
                    closeWhenClickMap
                    isCustom={false}
                    content={infoWindowHtml}
                    offset={[0, -20]}
                    autoMove={false}
                    events={infoWindowEvents}
                />
            </Map>
        </div>
    )
}

export default RentMap