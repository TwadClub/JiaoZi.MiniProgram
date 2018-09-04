// pages/mine/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'http://image.twad.club/',
    userInfo:null,
    tips: '',
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.title = '购物车'
      this.data.tips = '亲，购物车还没有宝贝哦～'
    wx.setNavigationBarTitle({
        title: this.data.title
    })
    this.setData({
        tips: this.data.tips,
        title: this.data.title
    })
  },
 
})