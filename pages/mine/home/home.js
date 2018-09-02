// pages/mine/home/home.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'http://image.twad.club/',
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    console.log(wx.getStorageSync('userInfo'));
  },

  // 跳充值页面
  goCharge() {

  }
 

 
})