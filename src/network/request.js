import axios from 'axios'
export function request(config){
    const instance = axios.create({
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout:5000
    })
    //这是真正发送网络请求的地方,instance()本身返回Promise
    return instance(config)
}