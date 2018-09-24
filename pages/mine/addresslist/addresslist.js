// pages/chshop/chshop.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'http://image.twad.club/',
    shopList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.setNavigationBarTitle({
      title: '选择地址'
    })

    let params = {
      ShopID: wx.getStorageSync('shopID'),
      UserID: wx.getStorageSync('userID')
    }
    this.getAddressList(params);
  },

  // 选中地址
  chooseAddress(e) {
    let index = e.target.dataset.index;
    let item = e.target.dataset.item;
    this.data.shopList.map((it, i) => {
      it.isChoose = false;
    })
    this.data.shopList.map((it, i) => {
      if (i == index) {
        it.isChoose = !it.isChoose;
      }
    })
    this.setData({
      shopList: this.data.shopList
    })
    wx.setStorageSync('addressID', item.id) // 缓存地址
    console.log(item);
  },

  getAddressList(params) {
    app.allreq.getAddressList(params).then(res => {
      console.log(res);
      wx.hideLoading()
      if (res.success) {
        this.setData({
          shopList: res.result.items
        })
      }
    })
  },

  editAddress(e) {
    //
    wx.navigateTo({
      url: '../addressedit/addressedit?ID=' + e.target.dataset.id,
    })
    // app.allreq.editAddress(e.target.dataset.id).then(res => {
    //   console.log(res)
    // })
  },

  deleteAddress(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您确认删除当前地址吗？',
      success: function (res) {
        if (res.confirm) {
          app.allreq.deleteAddress(e.target.dataset.id).then(res => {
            console.log(res);
            if (res.success) {
              let params = {
                ShopID: wx.getStorageSync('shopID'),
                UserID: wx.getStorageSync('userID')
              }
              that.getAddressList(params);
            }
          })
        }
      }
    })
  },

  pageChange() {
    wx.navigateTo({
      url: '../addressedit/addressedit'
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