import axios from 'axios'
const url = process.env.NODE_ENV === 'development' ? '/cmdy' : '/cmdy_multi'
axios.defaults.withCredentials = true;  //跨域访问需要发送cookie时

const api = axios.create({
    baseURL: url,
    // transformRequest: [function(data) {
    //     if (data instanceof FormData) {
    //         return data
    //     }
    //     let ret = ''
    //     for (let it in data) {
    //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //     }
    //     return ret
    // }],
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
    }
})

api.interceptors.response.use(response => {
    if (response.data.errCode === 401) {
        response.data.message = '亲，页面空闲时间过长了'
        if (url === '/cmdy_multi') {
            setTimeout(() => {
                window.location.href = '/cmdy_multi/login.jsp'
            }, 2000)
        }
    }
    return response
}, error => {
    return Promise.reject(error)
})
export default api