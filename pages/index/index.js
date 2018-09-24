//index.js
//获取应用实例
import allreq from '../../request/allrequest'
const app = getApp()
var template = require('../template/template.js');
Page({
  data: {
    imgUrl: 'http://image.twad.club/',
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
    indexGoods: [],
    indexClass: [],
    carGoodsList: [],
    carGoodsCount: 0,
    show: false
  },
  onLoad: function () {
    template.tabbar("tabBar", 0, this)
    wx.showLoading({
      title: '加载中',
    })
    console.log(wx.getStorageSync('shopID'))
    setTimeout(_ => {
      this.getIndexGoods(wx.getStorageSync('shopID'));
    }, 1000)
    this.getIndexClass();


  },
  golist: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },

  // 初始化首页购物车是否有商品
  initIndexCar() {
    let carGoodsList = wx.getStorageSync('carGoodsList');
    console.log('carGoodsList:' + carGoodsList)
    let count = 0;
    if (carGoodsList) {
      carGoodsList = JSON.parse(carGoodsList);
      carGoodsList.map(item => {
        count += item.count
      })
    } else {
      carGoodsList = []
    }
    this.setData({
      carGoodsCount: count,
      carGoodsList: carGoodsList
    })
  },

  getIndexGoods(shopID) {
    app.allreq.getIndexGoods(shopID).then(res => {
      console.log(res);
      wx.hideLoading()
      if (res.success) {
        this.setData({
          indexGoods: res.result
        })
      }
    })
  },
  getIndexClass() {
    app.allreq.getIndexClass().then(res => {
      if (res.success) {
        console.log(res.result)
        this.setData({
          indexClass: res.result
        })
        
      }
    })
  },

  isAdd(attr, goodID) {
    let bool = null;
    let count = 0;
    attr.map(item => {
      if (item.id == goodID) {
        bool = true
        count++
      } else {
        bool = false
      }
    })
    if (count > 0) {
      return true
    } else {
      return bool
    }
  },

  addGood(e) {
    wx.showToast({
      title: '加入商品成功！',
      icon: 'success',
      duration: 1000
    })
    let that = this;
    let item = e.target.dataset.item;
    let newGoodID = item.id
    // console.log(newGoodID)
    if (this.data.carGoodsList.length) {
      let bool = this.isAdd(this.data.carGoodsList, newGoodID);
      console.log(bool)
      if (bool) {
        for (let i in this.data.carGoodsList) {
          if (this.data.carGoodsList[i].id == newGoodID) {
            this.data.carGoodsList[i].count++
          }
        }
      } else {
        let obj = {
          id: newGoodID,
          count: 1
        }
        this.data.carGoodsList.push(obj);
      }

    } else {
      let obj = {
        id: newGoodID,
        count: 1
      }
      this.data.carGoodsList.push(obj);
    }

    let allCount = 0;
    this.data.carGoodsList.map(item => {
      allCount += item.count
    })
    console.log(allCount)
    this.setData({
      carGoodsList: this.data.carGoodsList,
      carGoodsCount: allCount
    })
    wx.setStorageSync('carGoodsList', JSON.stringify(this.data.carGoodsList))
  },
  pageChange() {
    if (this.data.carGoodsCount) {
      wx.navigateTo({
        url: '../shop/goodcar/goodcar'
      })
    } else {
      let params = {
        title: '购物车',
        tips: '亲，购物车还没有宝贝哦～'
      }
      wx.setStorageSync('toEmpty', JSON.stringify(params));
      wx.navigateTo({
        url: '../empty/empty'
      })
    }
  },


  /**切換到点餐页面 */
  pageToOrder(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item);
    wx.navigateTo({
      url: '../shop/order/order?ProductName=' + item.categoryName + "&ProductCategoryID=" + item.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('ready')
    this.setData({
      show: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('show')
    this.initIndexCar();
    // wx.hideLoading();
  },

})