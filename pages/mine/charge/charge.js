// pages/mine/addresslist/addresslist.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      chargeList: [],
      payItem:null,
      shopUserInfo: null
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading({
        title: '加载中',
      })
      wx.setNavigationBarTitle({
        title: '充值'
      })
      this.setData({
        // isCheck:this.data.isCheck,
      })
      let shopID = wx.getStorageSync('shopID');
      console.log(shopID)
      this.getShopUserInfo();
      this.chargeMoney(shopID);
      
    },

    /**点击选中 */
    isCheckFun(e) {
      console.log(e)
      let item = e.currentTarget.dataset.item;
      this.data.payItem = item;
      let id  = item.id;
      this.data.chargeList.map((item) => {
        if (item.id !== id) {
          item.isCheck = false;
        } else {
          item.isCheck = true;
        }
      })
      console.log(this.data.chargeList)
      this.setData({
        chargeList: this.data.chargeList,
        payItem: this.data.payItem
      })
    },

    chargeMoney (shopID) {
      app.allreq.chargeMoney(shopID).then( res => {
        console.log(res)
        wx.hideLoading()
        if (res.success) {
          res.result.map((item,i)=> {
            if (i ==0) {
              item.isCheck = true
              this.data.payItem = item;
            } else {
              item.isCheck = false
            }
          })
          this.setData({
            chargeList:res.result,
            payItem:this.data.payItem
          })
        }
      })
    },

    wxCharge() {
      console.log(this.data.payItem);
      let params = {
        id: this.data.payItem.id,
        type: 2,
        shopID: wx.getStorageSync('shopID'),
        userID: wx.getStorageSync('userID')

      }
      app.allreq.wxCharge(params).then( res => {
        let paySign = JSON.parse(res.result.payJson)
        console.log(paySign);
        this.startWXPay(paySign)
      })
    },
    

    // 发起支付
    startWXPay(res) {
      wx.requestPayment(
        {
        'timeStamp': res.timeStamp,
        'nonceStr': res.nonceStr,
        'package': res.package,
        'signType': 'MD5',
        'paySign': res.paySign,
        'success':function(res){
          console.log(res);
          wx.redirectTo({
            url: '../chargerecord/chargerecord',
          })
        },
        'fail':function(res){
          wx.redirectTo({
            url: '../chargerecord/chargerecord',
          })
        },
        'complete':function(res){}
        })
    },

    // 用户账户余额
    getShopUserInfo() {
      app.allreq.getShopUserInfo().then( res => {
        console.log(res);
        if (res.success) {
          this.setData({
            shopUserInfo: res.result
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