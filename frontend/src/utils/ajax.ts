const _ajax = (method, url, data, headers, callback, async = true) => {
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

    get(url, callback) {
        let method = 'GET'
        console.log('this.baseUrl', this.baseUrl)
        console.log('url', url)
        let headers = {
            'Content-Type': 'application/json',
        }
        _ajax(method, url, '', headers, (r) => {
            let t = JSON.parse(r)
            callback(t)
        })
    }

    post(url, data, callback) {
        let headers = {
            'Content-Type': 'application/json',
        }
        _ajax('POST', url, data, headers, (r) => {
            let t = JSON.parse(r)
            callback(t)
        })
    }
}

export default Ajax