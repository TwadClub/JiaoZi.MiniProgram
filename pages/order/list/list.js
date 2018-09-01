// pages/order/list/list.js
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
})