import request from './request'

export default {
  getMultiData() {
    return request({
      url: '/home/multidata',
      method: 'get'
    })
  },
  getHomeData(type, page) {
    return request({
      url: '/home/data',
      method: 'get',
      params: {
        type,
        page
      }
    })
  }
}