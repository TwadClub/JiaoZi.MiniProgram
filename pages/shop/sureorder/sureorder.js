// pages/shop/sureorder/sureorder.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'http://image.twad.club/',
    isSelectH: true, // 送货上门
    isSelectS: false, // 到店自取
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    let goodsIDList = JSON.parse(wx.getStorageSync('createOrderData'));
    console.log(goodsIDList)
    let goIDList = []
    goodsIDList.map(item => {
      goIDList.push(item.id)
    })
    let params = {
      shopID:wx.getStorageSync('shopID'),
      userID:wx.getStorageSync('userID'),
      goodsIDList:goIDList
    }
    this.getGoodsListInfo(params)

  },

  /**送货上门 */
  sendHome() {
    this.setData({
      isSelectH: !this.data.isSelectH,
      isSelectS: !this.data.isSelectS
    })
  },

  /**到店自取 */
  selfGet() {
    this.setData({
      isSelectH: !this.data.isSelectH,
      isSelectS: !this.data.isSelectS
    })
  },

  // 获取所有选中商品价格信息
  getGoodsListInfo(params) {
    let goodsIDList = JSON.parse(wx.getStorageSync('createOrderData'));
    console.log(goodsIDList)
    app.allreq.getGoodsPriceInfo(params).then(res => {
      console.log(res);
      if (res.success) {
        this.setData({
          goodsList: res.result.productPriceDtoList
        })
      }
    })
  },

  /**生成订单 */
  createOrder() {
    let params = {};
    let list = [];
    let arr = JSON.parse(wx.getStorageSync('createOrderData'));
    arr.map(item => {
      let obj = {
        productID:item.id,
        productCount: item.count
      }
      list.push(obj);
    })
    params.orderProductList = list
    params.sendAddress = '湖北省武汉市洪山区';
    params.receiveName = '小小酥';
    params.receivePhone = '15900057123';
    console.log(params)
    app.allreq.createOrder(params).then(res => {
      console.log(res);
      if (res.success) {
        this.data.orderID = res.result;
        this.setData({
          orderID:this.data.orderID
        })
        this.wxCharge()
      }
    })
  },

  wxCharge() {
    let params = {
      id: this.data.orderID,
      type: 1,
      shopID: wx.getStorageSync('shopID'),
      userID: wx.getStorageSync('userID')
    }
    console.log(params)
    app.allreq.wxCharge(params).then( res => {
      let paySign = JSON.parse(res.result.payJson)
      console.log(paySign);
      this.startWXPay(paySign)
    })
  },
  
  // 发起支付
  startWXPay(res) {
    wx.requestPayment(
      {
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonceStr,
      'package': res.package,
      'signType': 'MD5',
      'paySign': res.paySign,
      'success':function(res){
        console.log(res);
        if (res.errMsg  == 'requestPayment:ok') {
          wx.redirectTo({
            url: '../goodcar/goodcar'
          }) 
        }
        wx.clearStorageSync('createOrderData');
        wx.clearStorageSync('carGoodsList');
      },
      'fail':function(res){
        wx.redirectTo({
          // url: '../../../index/index'
        }) 
      },
      'complete':function(res){}
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})