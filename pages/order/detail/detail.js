// pages/order/detail/detail.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({})
    this.getOrderDetail(37);
  },

  // 获取订单详情
  getOrderDetail(orderNo) {
    app.allreq.getOrderDetail(orderNo).then(res => {
      console.log(res)
      if (res.success) {
        this.setData({
          orderDetail: res.result
        })
      }

    })
  },

  // 复制订单号
  copyOrderNO() {
    var self = this;
    wx.setClipboardData({
      data: self.data.taokouling,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    });
  },

  wxCharge() {
    let params = {
      id: 2,
      type: 1,
      shopID: wx.getStorageSync('shopID'),
      userID: wx.getStorageSync('userID')

    }
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
        wx.redirectTo({
          url: '../list/list'
        })
      },
      'fail':function(res){},
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