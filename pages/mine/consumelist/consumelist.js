// pages/mine/addresslist/addresslist.js
import allreq from '../../../request/allrequest'
import util from '../../../utils/util'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      consumeList:[]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading({
        title: '加载中'
      })
      wx.setNavigationBarTitle({
        title: '消费记录'
      })
    },

    // 获取消费记录列表
    getConsumeList(params) {
      app.allreq.getConsumeList(params).then( res => {
        console.log(res);
        wx.hideLoading();
        if (res.success) {
          res.result.map(item => {
            item.creationTime = util.formatTime(item.creationTime,'-')
          })
          this.setData({
            consumeList: res.result
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
      let params = {
        shopID: wx.getStorageSync('shopID'),
        userID: wx.getStorageSync('userID')
      }
      this.getConsumeList(params);
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