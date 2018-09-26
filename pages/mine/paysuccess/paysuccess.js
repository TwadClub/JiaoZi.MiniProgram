// pages/mine/addresslist/addresslist.js
import allreq from '../../../request/allrequest'
import util from '../../../utils/util'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      payInfo:{},
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    //   wx.showLoading({
    //     title: '加载中'
    //   })
      wx.setNavigationBarTitle({
        title: '支付成功'
      })
    },

    // 改变价格
    changepayPrice(e) {
        console.log(e)
        this.setData({
            payPrice: e.detail.value
        })
    },

    // 点击支付
    surePay() {
        wx.showLoading({
            title:'加载中...',
        })
        app.allreq.setBalancePay(this.data.payPrice).then(res => {
            console.log(res);
            if (res.success) {
                wx.navigateTo({
                    url: 'String',
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
        this.data.payInfo = wx.getStorageSync('paySuccess');
        if (this.data.payInfo) {
            this.data.payInfo = JSON.parse(this.data.payInfo);
        }
        this.setData({
            payInfo: this.data.payInfo
        })
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