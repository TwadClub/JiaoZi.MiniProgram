/**
 * name: agriknow.js
 * description: 袁记饺子店服务
 * author: 徐瑞
 * date: 2018-5-19
 */
import request from './request.js'
class agriknow {
  constructor() {
    this._baseUrl = 'http://api.jiaozi.twad.club:8081'
    this._defaultHeader = { 'Content-Type': 'application/json' }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 向后台保存openID
   */
  setOpenID (openID) {
    let data = {
        // openID: openID
    }
    return this._request.postRequest(this._baseUrl + '/api/services/app/WX/SaveUserWXInfo?openID='+ openID, data).then(res => res.data)
  }
}
export default agriknow
