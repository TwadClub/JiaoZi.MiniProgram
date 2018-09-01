// pages/mine/addresslist/addresslist.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      chargeList: []
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '充值'
      })
      this.setData({
        // isCheck:this.data.isCheck,
      })
      this.chargeMoney(1);
      
    },

    /**点击选中 */
    isCheckFun(e) {
      console.log(e)
      let item = e.currentTarget.dataset.item;
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
        chargeList: this.data.chargeList
      })
    },

    chargeMoney (shopID) {
      app.allreq.chargeMoney(shopID).then( res => {
        console.log(res)
        if (res.success) {
          res.result.map((item,i)=> {
            if (i ==0) {
              item.isCheck = true
            } else {
              item.isCheck = false
            }
          })
          this.setData({
            chargeList:res.result
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