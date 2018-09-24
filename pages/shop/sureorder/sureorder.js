// pages/shop/sureorder/sureorder.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'http://image.twad.club/',
    isSelectH: true, // 送货上门
    isSelectS: false, // 到店自取
    goodsList: [],
    goodsDiscount:{},
    orderPrice:0,
    sendWay: 1, // 送货上门 2自取
    payWay: 1, // 在线 2扫描
    stratTime: '',
    sendTxt:'送达时间',
    addressInfo:{},
    isDefaultAddress: false,
    balanceAmount: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    let goodsIDList = JSON.parse(wx.getStorageSync('createOrderData'));
    console.log(goodsIDList)
    let goIDList = []
    goodsIDList.map(item => {
      goIDList.push(item.id)
    })
    let params = {
      shopID:wx.getStorageSync('shopID'),
      userID:wx.getStorageSync('userID'),
      goodsIDList:goIDList
    }
    this.getGoodsListInfo(params)
    let d = new Date();
    d = +Date.parse(d) + 30 * 60 *1000;
    console.log(new Date(d))
    this.setData({
      stratTime: new Date(d).getHours() + ":" + new Date(d).getMinutes()
    })
  },

  /**送货上门 */
  sendHome() {
    this.setData({
      isSelectH: true,
      isSelectS: false,
      sendTxt: '送达时间'
    })

  },

  /**到店自取 */
  selfGet() {
    this.setData({
      isSelectH: false,
      isSelectS: true,
      sendTxt: '自取时间'
    })
  },

  /** */
  chooseTime(e) {
    console.log(e)
    this.setData({
      stratTime: e.detail.value
    })
  },

  // 获取地址信息
  getAddressInfo(id) {
    app.allreq.getAddressInfo(id).then(res => {
      console.log(res);
      if (res.success) {
        this.setData({
          addressInfo: res.result,
          isDefaultAddress: true
        })
      }
    })
  },

  // 获取所有选中商品价格信息
  getGoodsListInfo(params) {
    let goodsIDList = JSON.parse(wx.getStorageSync('createOrderData'));
    this.data.goodsDiscount.goodsPrice = 0;
    this.data.goodsDiscount.packagePrice = 0;
    console.log(goodsIDList)
    app.allreq.getGoodsPriceInfo(params).then(res => {
      console.log(res);
      if (res.success) {
        
        this.data.goodsDiscount.sendPrice = res.result.sendPrice;
        if (res.result.productPriceDtoList.length) {
          res.result.productPriceDtoList.map(item => {
            this.data.goodsDiscount.goodsPrice += item.salePrice;
            this.data.goodsDiscount.packagePrice += item.packagePrice;
          })
        }
        // console.log(this.data.goodsDiscount)
        this.isVipDate();
        this.setData({
          goodsList: res.result.productPriceDtoList,
          goodsDiscount: this.data.goodsDiscount
        })
      }
    })
  },

  /**会员日优惠 */
  isVipDate() {
    app.allreq.isVipDate().then( res => {
      console.log(this.data.goodsDiscount);
      if (res.success) {
        this.data.goodsDiscount.discount = res.result.discount;
        if (res.result.discount !== 0) {
          this.data.goodsDiscount.discountPrice = this.data.goodsDiscount.goodsPrice * this.data.goodsDiscount.discount
        } else {
          this.data.goodsDiscount.discountPrice = 0
        }
        this.data.orderPrice = this.data.goodsDiscount.goodsPrice + this.data.goodsDiscount.packagePrice + this.data.goodsDiscount.sendPrice - this.data.goodsDiscount.discountPrice 
        this.setData({
          goodsDiscount: this.data.goodsDiscount,
          orderPrice: this.data.orderPrice
        })
      }
    })
  },

  /**用户店铺vip信息 */
  userShopVIPInfo() {
    app.allreq.getShopUserInfo().then(res => {
      console.log(res);
      if (res.success) {
        this.data.balanceAmount.isVip = res.result.isVip;
        this.data.balanceAmount.balanceAmount = res.result.balanceAmount;
        this.data.balanceAmount.discount = res.result.discount;
          this.setData({
            balanceAmount: this.data.balanceAmount
          })
      }
    })
  },

  /**生成订单 */
  createOrder() {
    let params = {};
    let list = [];
    let arr = JSON.parse(wx.getStorageSync('createOrderData'));
    let that = this;
    wx.showActionSheet({
      itemList: ['在线支付', '余额支付'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          that.data.payWay = 1;
        } else {
          that.data.payWay = 2;
        }
        arr.map(item => {
          let obj = {
            productID:item.id,
            productCount: item.count
          }
          list.push(obj);
        })
        params.orderProductList = list;
        if (that.data.addressInfo) {
          params.sendAddress = that.data.addressInfo.addressInfo;
          params.receiveName = that.data.addressInfo.name;
          params.receivePhone = that.data.addressInfo.phone;

        } else {

        }
        params.sendWay = that.data.sendWay;
        params.payWay = that.data.payWay;
        let d = new Date();
        let y = d.getFullYear();
        let m = d.getMonth() + 1;
        let dd = d.getDate();
        if (m<=9) {
          m = '0' + m;
        }
        if (dd <= 9) {
          dd = "0" + dd
        }
        params.wantReceiveTime = y +"-" + m +"-" + dd + " " + that.data.stratTime + ':00'

        if (params.payWay == 2) {
          if (that.data.orderPrice > that.data.balanceAmount.balanceAmount) {
            wx.showToast({
              title:"当前余额不足，请选择在线支付",
              icon: 'none'
            })
            return false
          }
        }
        console.log(params)
        app.allreq.createOrder(params).then(res => {
          console.log(res);
          if (res.success) {
            that.data.orderID = res.result;
            that.setData({
              orderID:that.data.orderID
            })
            if (params.payWay == 1) {
              that.wxCharge()
            } else {
              that.balanceAmount(that.data.orderID)
            }
          }
        })
      },
      fail: function(res) {
      }
    })
  },

  /**余额支付 */
  balanceAmount(params) {
    let that = this;
    app.allreq.balanceAmount(params).then( res => {
      console.log(res);
      if (res.success) {
        wx.removeStorageSync('createOrderData');
        wx.removeStorageSync('carGoodsList');
        wx.showToast({
          title:'支付成功',
          icon: 'success',
          duration: 3000,
          success:function(){
            wx.navigateTo({
              url: '../list/list'
            })
          }
        })
      } else {
        wx.showToast({
          title:'支付失败',
          icon: 'success',
          duration: 3000,
          success:function(){
            wx.navigateTo({
              url: '../list/list'
            })
          }
        })
      }
    })
  },

  wxCharge() {
    let params = {
      id: this.data.orderID,
      type: 1,
      shopID: wx.getStorageSync('shopID'),
      userID: wx.getStorageSync('userID')
    }
    console.log(params)
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
        if (res.errMsg  == 'requestPayment:ok') {
          wx.redirectTo({
            url: '../list/list'
          }) 
        }
        wx.removeStorageSync('createOrderData');
        wx.removeStorageSync('carGoodsList');
      },
      'fail':function(res){
        wx.redirectTo({
          url: '../list/list'
        }) 
      },
      'complete':function(res){}
      })
  },

  chooseAddress() {
    wx.navigateTo({
      url: '../../mine/addresslist/addresslist',
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
    this.userShopVIPInfo()
    let addressInfoID = wx.getStorageSync('addressID');
    if (addressInfoID) {
      this.getAddressInfo(addressInfoID);
    }
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