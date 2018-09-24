// pages/mine/home/home.js
import allreq from '../../../request/allrequest'
const app = getApp()
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'http://image.twad.club/',
    userInfo: null,
    shopUserInfo: null,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // })

    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
    template.tabbar("tabBar", 3, this)
    var that = this;
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(wx.getStorageSync('userInfo'));
    let str = wx.getStorageSync('userID');
    wx.showToast({
      icon:'none',
      title:str,
      mask: 4000
    })
  },

  // 跳充值页面
  goCharge() {
    wx.navigateTo({
      url: '../charge/charge'
    })
  },

  // 跳充值记录
  chargeRecord() {
    wx.navigateTo({
      url: '../chargerecord/chargerecord'
    })
  },

  // 选择收货地址
  chooseAddress() {
    wx.navigateTo({
      url: '../addresslist/addresslist'
    })
  },

  // 消费记录页面
  consumeList() {
    wx.navigateTo({
      url: '../consumelist/consumelist'
    })
  },

  // 获取店铺用户信息
  getShopUserInfo() {
    app.allreq.getShopUserInfo().then(res => {
      console.log(res);
      if (res.success) {
        this.setData({
          shopUserInfo: res.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready')
    this.setData({
      show: true
    })
  },

  onShow: function () {
    console.log(wx.getStorageSync('userInfo'));
    this.getShopUserInfo();
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  }

})