import axios from 'axios';

export default function(config) {

  // 这里的instance其实就是promise
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  });

  // 拦截请求
  instance.interceptors.request.use(
    config => { // 请求成功的拦截
      // 放行
      return config;
    }, err => { // 请求失败的拦截

    }
  )
  // 拦截响应
  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      
    }
  )

  // 返回promise
  return instance(config);
}
