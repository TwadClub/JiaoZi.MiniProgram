// pages/order/list/list.js
import allreq from '../../../request/allrequest'
const app = getApp()
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'http://image.twad.club/',
    list:[]
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

  wxCharge() {
    let params = {
      id: 2,
      type: 1,
      shopID: wx.getStorageSync('shopID'),
      userID: wx.getStorageSync('userID')

    }
    app.allreq.wxCharge(params).then( res => {
      console.log(res);
      // let paySign = JSON.parse(res.result.payJson)
      // console.log(paySign);
      // this.startWXPay(paySign)
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
      },
      'fail':function(res){},
      'complete':function(res){}
      })
  },
  getOrderList (params) {
    app.allreq.getOrderList(params).then(res => {
      wx.hideLoading()
      console.log(res);
      if (res.success) {
        res.result.map(item => {
          let time = new Date(item.creationTime);
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          let h = time.getHours();
          let m = time.getMinutes();
          let s = time.getSeconds();
          if (month <=9) {
            month = '0' + month;
          }
          if (day <= 9) {
            day = '0' + day;
          }
          item.creationTime = year + '-' + month + '-' + day + ' ' + h + ":" + m + ":" + s;
        })
        this.setData({
          list: res.result
        })
      }
    })
  },

  // 到详情页
  pageChange() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})