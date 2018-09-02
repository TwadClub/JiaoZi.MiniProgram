// pages/order/list/list.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'http://image.twad.club/',
    list:[
      {
        shopName: '袁记水饺(楚河店)',
        logo: "http://image.twad.club/logo.jpg",
        createTime: '2018-08-30 12:23:35',
        goods:[
          {
            code:'001',
            value:'水饺'
          },          {
            code:'002',
            value:'云吞'
          }
        ],
        orderStatus:0,
        price:25
      },{
        shopName: '袁记水饺(楚河店)',
        logo: "http://image.twad.club/logo.jpg",
        createTime: '2018-08-30 12:23:35',
        goods:[
          {
            code:'001',
            value:'水饺'
          },          {
            code:'002',
            value:'云吞'
          }
        ],
        orderStatus:1,
        price:25
      },{
        shopName: '袁记水饺(楚河店)',
        logo: "http://image.twad.club/logo.jpg",
        createTime: '2018-08-30 12:23:35',
        goods:[
          {
            code:'001',
            value:'水饺'
          },          {
            code:'002',
            value:'云吞'
          }
        ],
        orderStatus:2,
        price:25
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  changeTab:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
    })
  },
  golist: function () {
    wx.navigateTo({
      url: '../../list/list'
    })
  },
  wxCharge() {
    let params = {
      id: 2,
      type: 1,
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
      },
      'fail':function(res){},
      'complete':function(res){}
      })
  },
})