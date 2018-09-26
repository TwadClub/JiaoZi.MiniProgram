// pages/mine/addresslist/addresslist.js
import allreq from '../../../request/allrequest'
import util from '../../../utils/util'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      payPrice:Number,
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    //   wx.showLoading({
    //     title: '加载中'
    //   })
      wx.setNavigationBarTitle({
        title: '支付'
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
        console.log(this.data.payPrice)
        let that = this;
        setTimeout(function(){
            app.allreq.setBalancePay(that.data.payPrice).then(res => {
                console.log(res);
                wx.hideLoading()
                if (res.success) {
                    let obj = {
                        payTime:res.result.payTime,
                        payAmount: res.result.payAmount,
                    }
                    wx.setStorageSync('paySuccess', JSON.stringify(obj))
                    wx.navigateTo({
                        url: '../paysuccess/paysuccess',
                    })
                }
            })
        },300)
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