/**
 * name: agriknow.js
 * description: 袁记饺子店服务
 * author: 徐瑞
 * date: 2018-8-19
 */
import request from './request.js'
// import { callbackify } from 'util';
class agriknow {
  constructor() {
    this._baseUrl = 'https://jzapi.twad.club'
    this._defaultHeader = { 'Content-Type': 'application/json' }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
    wx.showToast({
      title:res.data.error.message
    })
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
      shopID: 1
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
   let url = ''
   let data = {
      "sendWay": params.sendWay,
      "sendAddress": params.sendAddress?params.sendAddress:' ',
      "jd": 0,
      "wd": 0,
      "receiveName": params.receiveName?params.receiveName:" ",
      "receivePhone": params.receivePhone?params.receivePhone:" ",
      "remark": "",
      "wantReceiveTime": params.wantReceiveTime,
      "shopID": wx.getStorageSync('shopID'),
      "userID": wx.getStorageSync('userID'),
      "openID": wx.getStorageSync('openID'),
      "outAmount": 0,
      "payWay": params.payWay,
      "orderProductList":params.orderProductList
  }
  if (params.payWay == 1) {
    url = '/api/services/app/OrderInfo/CreateOrder'
  } else {
    url = '/api/services/app/OrderInfo/CreateOrder'
  }
  return this._request.postRequest(this._baseUrl + url, data).then(res => res.data)
 }

 /**
  * 余额支付
  */
 balanceAmount(params) {
  let data = {
    "id": params,
    "type": 1,
    "shopID": wx.getStorageSync('shopID'),
    "userID": wx.getStorageSync('userID')
  }
  return this._request.postRequest(this._baseUrl + '/api/services/app/WX/BalancePay', data).then(res => res.data)
 }

 /**
  * 订单列表
  */
 getOrderList(params) {
  let data = {
    ShopID:params.ShopID,
    UserID:params.UserID
  }
  return this._request.getRequest(this._baseUrl + '/api/services/app/OrderInfo/GetOrderList', data).then(res => res.data)
 }

 /**
  * 订单详情商品
  */
 getOrderDetail(params) {
  let data = {
    orderID: params
  }
  return this._request.getRequest(this._baseUrl + '/api/services/app/OrderInfo/GetOrderDetail', data).then(res => res.data)
 }

  // 获取充值列表
  chargeMoney (shopID) {
    let params = {
      "shopID": shopID
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/Recharge/GetRechargeList', params).then(res => res.data)
  }

  /**
   * 获取充值记录列表
   */
  getChargeRecord(params) {
    let data = {
      shopID:params.shopID,
      userID:params.userID
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/Recharge/GetRechargeOrder', data).then(res => res.data)
  }

  /**
   * 获取收货地址列表
   */
  getAddressList (params) {
    let data = {
      ShopID: params.ShopID,
      UserID : params.UserID
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/UserAddress/GetAll', data).then(res => res.data)
  }

  /**
   * 查询地址信息
   */
  getAddressInfo(id){
    let data = {
      Id: id,
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/UserAddress/Get', data).then(res => res.data)
  }

  /**
   * 编辑地址
   */
  editAddress(item){
    return this._request.putRequest(this._baseUrl + '/api/services/app/UserAddress/Update', item).then(res => res.data)
  }

  /**
   * 新增收货地址
   */ 
  newAddress(params) {
    let data = {
      shopID: wx.getStorageSync('shopID'),
      userID: wx.getStorageSync('userID'),
      name: params.name,
      phone: params.phone,
      addressInfo: params.addressInfo
    }
    return this._request.postRequest(this._baseUrl + '/api/services/app/UserAddress/Create', data).then(res => res.data)
  }

  /**
   * 删除地址
   */
  deleteAddress(id) {
    let data = {
    }
    return this._request.deleteRequest(this._baseUrl + '/api/services/app/UserAddress/Delete?Id=' + id, data).then(res => res.data)
  }

  /**
   * 获取店铺用户信息
   */
  getShopUserInfo() {
    let data = {
      userID: wx.getStorageSync('userID'),
      shopID: wx.getStorageSync('shopID')
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/ShopUserAppService/GetShopUserVipInfo', data).then(res => res.data)
  }

  /**
   * 获取分类详情
   */
  getOrderClassList(params) {
    if (!params) {
      params.ProductName = '',
      params.ProductCategoryID = ''
    }
    let data = {
      ProductName: params.ProductName,
      ProductCategoryID: params.ProductCategoryID,
      ShopID: wx.getStorageSync('shopID')
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/ProductInfo/GetProductList', data).then(res => res.data)
  }

  /**
   * 是否是VipDtae
   */
  isVipDate() {
    let data = {
      userID: wx.getStorageSync('userID')
    }
    return this._request.postRequest(this._baseUrl + '/api/services/app/ShopUserAppService/IsShopUserVipData', data).then(res => res.data)
  }

  // 微信充值
  wxCharge(params) {
    return this._request.postRequest(this._baseUrl + '/api/services/app/WX/PrePay', params).then(res => res.data)
  }

  // 获取店铺信息
  getShopInfo() {
    let data = {
      id: wx.getStorageSync('shopID')
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/ShopInfo/Get', data).then(res => res.data)
  }

  // 获取消费记录列表
  getConsumeList(params){
    let data = {
      userID: params.userID,
      shopID: params.shopID
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/ShopUserAppService/GetUserAccountChangeLog', data).then(res => res.data)
  }

  // code 换取openID
  getOpenIDFrom (code) {
    let params = {
      code: code
    }
    return this._request.getRequest(this._baseUrl + '/api/services/app/WX/GetUserWXInfo', params).then(res => res.data)
  }

  // 发起账户余额支付
  setBalancePay (amount) {
    let data = {
      userID: wx.getStorageSync('userID'),
      shopID: wx.getStorageSync('shopID'),
      amount: amount,
      openID: wx.getStorageSync('openID'),
    }
    return this._request.postRequest(this._baseUrl + '/api/services/app/ShopUserAppService/RechargePay', data).then(res => res.data)
  }

}
export default agriknow
