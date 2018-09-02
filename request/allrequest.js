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

  /**
   * 根据openID 获取userID
   */
  getUserID (openID) {
    let data = {
      "openID":openID
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/WX/GetUserInfo', data).then(res => res.data)
  }

  // 首页接口
  /**
   * 获取首页推荐商品
   */
  getIndexGoods (shopID) {
    let data = {
      shopID: shopID
    }
    console.log(shopID)
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


  // 购物车页面
  /**
   * 根据商品ID获取价格信息
   */
  getGoodsPriceInfo (params) {
    let data = {
      ShopID:params.shopID,
      UserID:params.userID,
      ProductIDList :params.goodsIDList
    }
    console.log(wx.getStorageSync('shopID'))
    return this._request.postRequest(this._baseUrl + '/api/services/app/ProductInfo/GetProductPriceList', data).then(res => res.data)
  }

  /**
   * 订单创建
  */
 createOrder(params) {
   let data = {
      "sendWay": "1",
      "sendAddress": params.sendAddress,
      "jd": 0,
      "wd": 0,
      "receiveName": params.receiveName,
      "receivePhone": params.receivePhone,
      "remark": "string",
      "wantReceiveTime": "2018-09-02T12:39:06.897Z",
      "shopID": wx.getStorageSync('shopID'),
      "userID": wx.getStorageSync('userID'),
      "openID": wx.getStorageSync('openID'),
      "outAmount": 0,
      "payWay": "1",
      "orderProductList":params.orderProductList
  }
  return this._request.postRequest(this._baseUrl + '/api/services/app/OrderInfo/CreateOrder', data).then(res => res.data)
 }


  // 获取充值列表
  chargeMoney (shopID) {
    let params = {
      "shopID": shopID
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/Recharge/GetRechargeList', params).then(res => res.data)
  }

  // 微信充值
  wxCharge(params) {
    return this._request.postRequest(this._baseUrl + '/api/services/app/WX/PrePay', params).then(res => res.data)
  }
}
export default agriknow
