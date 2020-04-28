import axios from 'axios'

export function request(config){
  const instance = axios.create({
    // baseURL:'http://56classroom.local.amanwu.com',
    baseURL:'http://56.56class.com.cn',
    timeout: 5000,
  })
  instance.interceptors.request.use(config =>{
    //这里拦截成功的
    // console.log(config);
      return config;  
  },err =>{
      //失败
      console.log(err);
  })
  // 响应拦截
  instance.interceptors.response.use(config =>{
      // console.log(config);
      return config
  },err=>{
      console.log(err);
  })

  return instance(config);
}