// pages/order/list/list.js
import allreq from '../../../request/allrequest'
import util from '../../../utils/util'
const app = getApp()
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'http://image.twad.club/',
    list:[],
    isEmpty:false,
    balanceAmount:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this)
    wx.showLoading({
      title: '加载中',
    })
    let params = {
      ShopID: wx.getStorageSync('shopID'),
      UserID: wx.getStorageSync('userID')
    } 
    this.getOrderList(params);
    wx.setNavigationBarTitle({
      title: '订单'
    })
  },

  wxCharge(e) {
    let that = this;
    let orderID = e.target.dataset.id;
    let shouldPayAmount = e.target.dataset.pay;
    let params = {
      id: orderID,
      type: 1,
      shopID: wx.getStorageSync('shopID'),
      userID: wx.getStorageSync('userID')
    }
    // app.allreq.wxCharge(params).then( res => {
    //   console.log(res);
    //   let paySign = JSON.parse(res.result.payJson)
    //   console.log(paySign);
    //   this.startWXPay(paySign)
    // })

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
          if (shouldPayAmount > that.data.balanceAmount.balanceAmount) {
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
  // 发起微信支付
  startWXPay(res) {
    wx.requestPayment(
      {
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonceStr,
      'package': res.package,
      'signType': 'MD5',
      'paySign': res.paySign,
      'success':function(res){
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
      },
      'fail':function(res){
        wx.showToast({
          title: '支付失败',
          icon: 'success',
          duration: 3000,
          success: function () {
            wx.navigateTo({
              url: '../list/list'
            })
          }
        })
      },
      'complete':function(res){}
      })
  },
  getOrderList (params) {
    app.allreq.getOrderList(params).then(res => {
      wx.hideLoading()
      console.log(res);
      if (res.success) {
        if (res.result && res.result.length>0) {
          // res.result.map(item => {
          //   item.creationTime = util.formatTime(item.creationTime,'-');
          // })
          this.setData({
            list: res.result,
            isEmpty: false
          })
        } else {
          this.setData({
            list: [],
            isEmpty: true
          })
        }
      }
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

  // 到详情页
  pageChange(e) {
    console.log(e);
    let orderID = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../detail/detail?orderID=' + orderID
    })
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.userShopVIPInfo();
  }


})