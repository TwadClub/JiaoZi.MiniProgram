// pages/shop/order/order.js
import allreq from '../../../request/allrequest'
const app = getApp()
var template = require('../../template/template.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      template.tabbar("tabBar", 1, this)
      wx.setNavigationBarTitle({
        title: '袁记水饺'
      })
      this.setData({
        // cartList: wx.getStorageSync('cartList'),
        // sumMonney: wx.getStorageSync('sumMonney'),
        // cutMonney: wx.getStorageSync('sumMonney')>19?3:0,
        // cupNumber: wx.getStorageSync('cupNumber'),
      })
      
    },

    navPage: function () {
      wx.navigateTo({
        url: '../goodcar/goodcar'
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