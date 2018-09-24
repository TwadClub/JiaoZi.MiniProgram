// pages/order/detail/detail.js
import allreq from '../../../request/allrequest'
import util from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: null,
    balanceAmount: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })

    console.log(options)
    this.getOrderDetail(options.orderID);
  },

  // 获取订单详情
  getOrderDetail(orderNo) {
    app.allreq.getOrderDetail(orderNo).then(res => {
      console.log(res)
      if (res.success) {
        res.result.wantReceiveTime = util.formatTime(res.result.wantReceiveTime, '-');
        res.result.creationTime = util.formatTime(res.result.creationTime, '-');
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
      data: self.data.orderDetail.orderCode,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    });
  },

  wxCharge() {
    let that = this;
    let params = {
      id: this.data.orderDetail.id,
      type: 1,
      shopID: wx.getStorageSync('shopID'),
      userID: wx.getStorageSync('userID')
    }
    wx.showActionSheet({
      itemList: ['在线支付', '余额支付'],
      success: function (res) {
        console.log(res.tapIndex)
        let payWay = 1;
        if (res.tapIndex == 0) {
          payWay = 1; // 在线支付
        } else {
          payWay = 2; // 余额支付
        }

        if (payWay == 1) {
          app.allreq.wxCharge(params).then(res => {
            let paySign = JSON.parse(res.result.payJson)
            console.log(paySign);
            that.startWXPay(paySign)
          })
        } else if (payWay == 2) {
          if (that.data.orderDetail.shouldPayAmount > that.data.balanceAmount.balanceAmount) {
            wx.showToast({
              title:"当前余额不足，请选择在线支付",
              icon: 'none'
            })
            return false
          }
          app.allreq.balanceAmount(that.data.orderDetail.id).then(res => {
            if (res.success) {
              wx.removeStorageSync('createOrderData');
              wx.removeStorageSync('carGoodsList');
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 3000,
                success: function () {
                  wx.navigateTo({
                    url: '../list/list'
                  })
                }
              })
            } else {
              wx.showToast({
                title: '支付失败',
                icon: 'error',
                duration: 3000,
                success: function () {
                  wx.navigateTo({
                    url: '../list/list'
                  })
                }
              })
            }
          })
        }


      },
      fail: function (res) {

      }
    })

  },
  // 发起支付
  startWXPay(res) {
    wx.requestPayment({
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonceStr,
      'package': res.package,
      'signType': 'MD5',
      'paySign': res.paySign,
      'success': function (res) {
        console.log(res);
        wx.redirectTo({
          url: '../list/list'
        })
      },
      'fail': function (res) {
        wx.redirectTo({
          url: '../list/list'
        })
      },
      'complete': function (res) {}
    })
  },

  /**用户店铺vip信息 */
  userShopVIPInfo() {
    app.allreq.getShopUserInfo().then(res => {
      console.log(res);
      if (res.success) {
        this.data.balanceAmount.isVip = res.result.isVip;
        this.data.balanceAmount.balanceAmount = res.result.balanceAmount;
        this.data.balanceAmount.discount = res.result.discount;
        this.setData({
          balanceAmount: this.data.balanceAmount
        })
      }
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
    this.userShopVIPInfo();
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