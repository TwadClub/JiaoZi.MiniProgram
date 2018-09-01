//index.js
//获取应用实例
import allreq from '../../request/allrequest'
const app = getApp()

Page({
  data: {
    imgUrl:'http://image.twad.club/',
    //轮播图
    imgUrls: [
      '../../images/1.png',
      '../../images/3.png',
      '../../images/4.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indexGoods:[]
  },
  onLoad: function () {
    this.getIndexGoods();
    this.getIndexClass();
  },
  golist: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  getIndexGoods () {
    app.allreq.getIndexGoods().then(res => {
      console.log(res)
      if (res.success) {
        this.setData({
          indexGoods: res.result
        })
      }
    })
  },
  getIndexClass () {
    app.allreq.getIndexClass().then( res => {
      console.log(res)
    }) 
  }
})
