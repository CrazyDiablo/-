import fs from 'fs'
import cheerio from 'cheerio'
import request from 'sync-request'
import { House } from '../interface'
import { sleep } from '../utils/util'

// XXX  爬虫属于什么？service或者modal? 该放在哪里？是否需要面向对象式写法？

const getHouseFromElement = (houseElement: cheerio.Element) => {
    const e = cheerio.load(houseElement)
    // 房子标题
    const title = e('.des h2 a').text().trim()
    // 房子详情58跳转链接
    const detailLink = e('.des h2 a').attr('href')
    console.log('detailLink', detailLink)
    // 房子居室
    const roomText = e('.room').text()
    const room = e('.room').text().trim().split(/\s+/)[0]
    // 房子居室数量
    const roomNum = Number(roomText.trim().split(/\s+/)[0].replace(/[^0-9]/ig, ''))
    // 房子面积 单位 ㎡
    const size = Number(roomText.trim().split(/\s+/)[1].replace(/[^0-9]/ig, ''))
    // 房子价格 单位 元
    const price = Number(e('.money .strongbox').text())
    // 房子地址
    const address = (e('.infor').text()).replace(/\ +/g, '').replace(/[\r\n]/g, '').split('距')[0]
    // 房子高德地图坐标 TODO 拆出去
    const urlAMap = encodeURI(`https://restapi.amap.com/v3/geocode/geo?address=${address}&output=JSON&key=26e4233fff29cfb5b7a9fd52409ff407&city=苏州`)
    const body = request('GET', urlAMap).getBody('utf8')
    const geocodes = JSON.parse(body).geocodes || []
    const location = geocodes[0]
        ? [
            Number(geocodes[0]?.location.split(',')[0]),
            Number(geocodes[0]?.location.split(',')[1]),
        ]
        : [0, 0]
    const house: House = {
        title,
        detailLink,
        room,
        roomNum,
        size,
        price,
        address,
        location,
    }
    return house
}

const getHouseListFromPage = (url: string): House[] => {
    const houseList: House[] = []
    const page = getPage(url)
    let e = cheerio.load(page)
    // 触发反爬登录页面时停止爬虫
    const loginBtnText = e('#btnSubmit').attr()?.value
    if (loginBtnText) {
        throw new Error('触发反爬啦')
    }

    const houseElementList = e('.house-list .house-cell')
    houseElementList.each((index, houseElement) => {
        const house: House = getHouseFromElement(houseElement)
        houseList.push(house)
    })

    return houseList
}

const getPage = (url: string): string => {
    console.log('url', url)
    let body: string
    const path = 'cached_html' + '/' + (url.split('pn')[1]).replace(/[^0-9]/ig, '') + '.html'
    const isExsists = fs.existsSync(path)
    console.log('path', path)
    // 如果链接路径已存在就返回缓存的页面，否则就先请求和缓存页面后再返回页面
    if (isExsists) {
        body = fs.readFileSync(path, 'utf8')
    } else {
        const res = request('GET', url, {
            headers: {
                // authority: 'su.58.com',
                // ':method': 'GET',
                // ':path': '/chuzu/',
                // ':scheme': 'https',
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", "accept-encoding": "gzip, deflate, br", "accept-language": "zh-CN,zh;q=0.9", "cookie": "f=n; commontopbar_new_city_info=5%7C%E8%8B%8F%E5%B7%9E%7Csu; commontopbar_ipcity=su%7C%E8%8B%8F%E5%B7%9E%7C0; id58=CocNF2Kh1m6wC0W/CriyAg==; 58home=su; city=su; wmda_uuid=40be22cea32d43fc17b3e565014c3258; wmda_new_uuid=1; xxzl_cid=38cbf37ba3984d69ae48d115e9025e44; xxzl_deviceid=IBJKk3fLj9VqWSdh9OaslNJmimZOXi4aC6wx7Z9ToMm7sVl+2aCCZHROsdvc831X; 58tj_uuid=420f23c4-ccaa-4709-b8dc-a5e98f89d6a3; als=0; xxzl_smartid=2659864952e4bf255828981193921f93; ppStore_fingerprint=0ADE160B41CE6160B06BAFF60A8C7E256AC3BBAD111C42D1%EF%BC%BF1665930950239; f=n; wmda_session_id_11187958619315=1666277068200-dcc9f4b3-8f21-498f; new_uv=3; utm_source=; spm=; init_refer=https%253A%252F%252Fsu.58.com%252Fchuzu%252Fpn2%252F; new_session=0; wmda_session_id_10104579731767=1666280058227-990367e0-0d58-8a96; wmda_visited_projects=%3B11187958619315%3B10104579731767; www58com=\"UserID=44325517946388&UserName=bbzf96\"; 58cooper=\"userid=44325517946388&username=bbzf96\"; 58uname=bbzf96; passportAccount=\"atype=0&bstate=0\"; PPU=UID=44325517946388&UN=bbzf96&TT=02010c70891f5c8f7fae83e5246395c1&PBODY=i06PcEWU4d5kNkWRi9J0w29nrZHKG-VP8tvVDdJ4Y0J4_5fB3EH4d2Pi62H14FUexWEmKhok6wwYrrJuYNni1KJKdc1dwO3Q1IRlIQReH8b5d5-7St-yVHWRXEFmf9tvTRHgR-FSwgwpTPiQoFJaJEN_Vta4mO_VihMWD3YdcNY&VER=1&CUID=F4n8hHeFPH1hdyIqS2dLZQ; xxzl_cid=38cbf37ba3984d69ae48d115e9025e44; xxzl_deviceid=IBJKk3fLj9VqWSdh9OaslNJmimZOXi4aC6wx7Z9ToMm7sVl%2B2aCCZHROsdvc831X", "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"", "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "\"Windows\"", "sec-fetch-dest": "document", "sec-fetch-mode": "navigate", "sec-fetch-site": "none", "sec-fetch-user": "?1", "upgrade-insecure-requests": "1", "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
            }
        })
        body = res.getBody('utf8')
        fs.writeFileSync(path, body)
        sleep(60000)
    }
    return body
}

export const spider58 = (pageStart: number = 2, pageEnd: number = 28) => {
    console.log('58租房 抓取开始')
    let houseList: House[] = []
    for (let i = pageStart; i < pageEnd; i++) {
        console.log('page', i)
        const url = `https://su.58.com/chuzu/pn${i}/`
        const _houseList: House[] = getHouseListFromPage(url)
        houseList = [...houseList, ..._houseList]
    }
    return houseList
}
