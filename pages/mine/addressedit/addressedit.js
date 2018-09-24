// pages/mine/addresslist/addresslist.js
import allreq from '../../../request/allrequest'
import util from '../../../utils/util'
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
      imgUrl:'http://image.twad.club/',
      addressInfo:{
        name:'',
        phone: '',
        addressInfo: ''
      },
      isNewAdd:false
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      wx.setNavigationBarTitle({
        title: '编辑地址'
      })
      console.log(options)
      this.setData({})
      if (options && options.ID) {
        wx.showLoading({
          title: '加载中'
        })
        this.getAddressInfo(options.ID)
        this.setData({
          isNewAdd:false
        })
      } else {
        this.setData({
          isNewAdd:true
        })
      }
    },

    getAddressInfo(id) {
      app.allreq.getAddressInfo(id).then(res => {
        console.log(res);
        wx.hideLoading();
        if (res.success) {
          this.setData({
            addressInfo: res.result
          })
        }
      })
    },

    changeName(e) {
      console.log(e);
      this.data.addressInfo.name = e.detail.value;
      this.setData({
        addressInfo:this.data.addressInfo
      })
    },

    changePhone(e) {
      console.log(e);
      this.data.addressInfo.phone = e.detail.value;
      this.setData({
        addressInfo:this.data.addressInfo
      })
    },

    changeAddress(e) {
      console.log(e);
      this.data.addressInfo.addressInfo = e.detail.value;
      this.setData({
        addressInfo:this.data.addressInfo
      })
    },


    editAddress() {
      console.log(this.data.addressInfo)

      if (!util.phoneCheck(this.data.addressInfo.phone)) {
        wx.showToast({
          title:'手机格式不对',
          icon:'none',
          duration: 1000
        })
        return false;
      }
      if (!this.data.isNewAdd) { // 编辑
        app.allreq.editAddress(this.data.addressInfo).then( res => {
          console.log(res)
          if (res.success) {
            wx.navigateTo({
              url: '../addresslist/addresslist',
            })
          }
        })
      } else { // 新增
        app.allreq.newAddress(this.data.addressInfo).then( res => {
          if (res.success) {
            wx.navigateTo({
              url: '../addresslist/addresslist',
            })
          }
        })
      }
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