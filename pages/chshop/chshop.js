// pages/chshop/chshop.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      shopList:[
        {
          title: "袁记饺子知音路店",
          address: '武汉市汉阳区知音路慈安医院斜对面'
        },{
          title: "袁记饺子知音路店",
          address: '武汉市汉阳区知音路慈安医院斜对面'
        },{
          title: "袁记饺子知音路店",
          address: '武汉市汉阳区知音路慈安医院斜对面'
        }
      ]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '选择地址'
      })
      this.setData({
        // cartList: wx.getStorageSync('cartList'),
        // sumMonney: wx.getStorageSync('sumMonney'),
        // cutMonney: wx.getStorageSync('sumMonney')>19?3:0,
        // cupNumber: wx.getStorageSync('cupNumber'),
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