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

  // 首页接口
  /**
   * 获取首页推荐商品
   */
  getIndexGoods () {
    let data = {
      // openID: openID
  }
  return this._request.getRequest(this._baseUrl + '/api/services/app/ProductInfo/GetIndexProductIndex', data).then(res => res.data)
  }

  /**
   * 获取首页分类
   */
  getIndexClass () {
    let params = {

    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/ProductCategory/GetAllCategory', params).then(res => res.data)
  }



  // 充值
  chargeMoney (shopID) {
    let params = {
      "shopID": shopID
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/Recharge/GetRechargeList', params).then(res => res.data)
  }
}
export default agriknow
