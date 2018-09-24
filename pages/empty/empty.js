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
    let params = wx.getStorageSync('toEmpty');
    if (params) {
      params = JSON.parse(params);
      this.data.title = params.title;
      this.data.tips = params.tips;
    }
    wx.setNavigationBarTitle({
        title: this.data.title
    })
    this.setData({
        tips: this.data.tips,
        title: this.data.title
    })
  },
 
})