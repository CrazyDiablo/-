import Ajax from '@u/ajax'

let baseUrl = 'http://127.0.0.1:4090/'
let ajax = new Ajax()

// TODO typescript重构
const createAPI = (name, options) => {
    const result = {}
    for (let key in options) {
        const { method, path } = options[key]
        result[key] = (params) => {
            return new Promise((resolve, reject) => {
                let url = baseUrl + path
                if (method.toLowerCase() === 'get') {
                    if (params) {
                        let paramsStr = ''
                        Object.keys(params).forEach((key, index) => {
                            if (index === 0) {
                                paramsStr += `?${key}=${params[key]}`
                            } else {
                                paramsStr += `&${key}=${params[key]}`
                            }
                        })

                        url = url + paramsStr
                    }

                    ajax.get(url, (res) => {
                        resolve(res)
                    })

                } else if (method.toLowerCase() === 'post') {
                    ajax.post(url, params, (res) => {
                        resolve(res)
                    })
                }

            })
        }
    }
    return result
}

export default createAPI