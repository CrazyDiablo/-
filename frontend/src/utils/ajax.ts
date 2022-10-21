
import { HttpMethod } from "src/interface"

// TODO typescript重构


const _ajax = (method: HttpMethod, url: string, data: string, header: any, callback: Function, async = true) => {
    let r = new XMLHttpRequest()

    r.open(method, url, async)

    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            callback(r.response)
        }
    }
    if (method === 'POST') {
        data = JSON.stringify(data)
    }
    r.send(data)
}

class Ajax {
    get(url: string, callback: Function) {
        let method: HttpMethod = 'GET'
        let headers = {
            'Content-Type': 'application/json',
        }
        _ajax(method, url, '', headers, (r: any) => {
            let t = JSON.parse(r)
            callback(t)
        })
    }

    post(url: string, data: string, callback: Function) {
        let headers = {
            'Content-Type': 'application/json',
        }
        _ajax('POST', url, data, headers, (r: any) => {
            let t = JSON.parse(r)
            callback(t)
        })
    }
}

export default Ajax