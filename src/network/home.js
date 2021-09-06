import request from './request'

export default {
  getMultiData() {
    return request({
      url: '/home/multidata',
      method: 'get'
    })
  }
}