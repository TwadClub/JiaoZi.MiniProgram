// pages/shop/order/order.js
import allreq from '../../../request/allrequest'
const app = getApp()
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'http://image.twad.club/',
    screenInfo: {},
    leftNavInfo: '',
    bottomHeight: '',
    leftNav: [], // 左侧导航
    goodList: [],
    scrollInfo: {},
    scrollTop: 0,
    carGoodsCount: 0,
    carGoodsList: [],
    initPage:{},
    shopInfo:{},
    shopOpen:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
    template.tabbar("tabBar", 1, this)
    wx.setNavigationBarTitle({
      title: '袁记水饺'
    })
    // this.getLetfNavH
    console.log(options)
    if (options) {
      this.data.initPage.ProductName = options.ProductName;
      this.data.initPage.ProductCategoryID = options.ProductCategoryID;
    }
    this.setData({
      initPage: this.data.initPage
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

  navPage: function () {
    wx.navigateTo({
      url: '../goodcar/goodcar'
    })
  },

  // 获取左边导航高度
  getLetfNavH(screenInfo) {
    let that = this
    var query = wx.createSelectorQuery();
    //选择id
    query.select('.shop-top').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      //取高度
      that.setData({
        leftNavInfo: screenInfo.height - res[0].height - that.data.bottomHeight + 'px'
      })
      console.log(that.data.leftNavInfo);

    })
  },


  getSysScrenInfo() {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.data.screenInfo.height = res.windowHeight;
        that.setData({
          screenInfo: that.data.screenInfo
        })
        that.getLetfNavH(that.data.screenInfo)
      }
    })
  },

  getBottomHeight() {
    let that = this
    var query = wx.createSelectorQuery();
    //选择id
    query.select('.tabBar').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      //取高度
      that.setData({
        bottomHeight: res[0].height
      })
      console.log(that.data.bottomHeight);

    })
  },

  // 获取分类接口
  getClassInfo() {
    let params = {};
    app.allreq.getIndexClass().then(res => {
      console.log(res)
      if (res.success) {
        if (res.result.length) {
          res.result.map((item, i) => {
            item.isNav = false
            if (this.data.initPage.ProductName) {
              if (item.id == this.data.initPage.ProductCategoryID) {
                item.isNav = true
              }
            } else {
              if (i == 0) {
                item.isNav = true
              }
            }
            // res.result.push(item)
          })
        }
        params.ProductName = this.data.initPage.ProductName?this.data.initPage.ProductName : res.result[0].categoryName
        params.ProductCategoryID = this.data.initPage.ProductCategoryID?this.data.initPage.ProductCategoryID : res.result[0].id
        this.data.scrollInfo.ProductName = res.result[0].categoryName;
        this.data.scrollInfo.ProductCategoryID = res.result[0].id
        this.setData({
          leftNav: res.result,
          scrollInfo: this.data.scrollInfo
        })
        this.getAllClassInfo(params)
        console.log(this.data.leftNav)
      }
    })
  },

  // 左侧切换分类
  changeClass(e) {
    let index = e.target.dataset.index;
    let obj = e.target.dataset.item;
    console.log(obj)
    this.data.leftNav.map((item, i) => {
      item.isNav = false;
      if (i == index) {
        item.isNav = true;
      }
    })
    let params = {
      ProductName: obj.categoryName,
      ProductCategoryID: obj.id
    }
    this.data.scrollInfo.ProductName = obj.categoryName;
    this.data.scrollInfo.ProductCategoryID = obj.id;
    this.getAllClassInfo(params)
    this.setData({
      leftNav: this.data.leftNav,
      scrollInfo: this.data.scrollInfo
    })
  },

  // 获取当前分类下商品列表
  getAllClassInfo(params) {
    app.allreq.getOrderClassList(params).then(res => {
      console.log(res);
      wx.hideLoading();
      if (res.success) {
        if (res.result.length) {
          res.result.map(item => {
            item.quality = 0
          })
        }
        this.data.scrollInfo.ProductName = params.ProductName,
          this.data.scrollInfo.ProductCategoryID = params.ProductCategoryID
        this.setData({
          goodList: res.result,
          scrollTop: 0,
          scrollInfo: this.data.scrollInfo
        })
      }
    })
  },

  // 监听 滑动到顶部
  upper() {
    console.log('upper')
    // let count = 0;
    // // console.log(this.data.scrollInfo)
    // for (let i in this.data.leftNav) {
    //   if (this.data.leftNav[i].id == this.data.scrollInfo.ProductCategoryID) {
    //     count = parseInt(i) - 1
    //   }
    // }
    // if (count <= 0 ) {
    //   count = this.data.leftNav.length-1
    // }
    // this.data.leftNav.map((item, i) => {
    //   item.isNav = false;
    //   if (i == count) {
    //     item.isNav = true;
    //   }
    // })
    // let params = {
    //   ProductName: this.data.leftNav[count].categoryName,
    //   ProductCategoryID: this.data.leftNav[count].id
    // }
    // this.getAllClassInfo(params)
    // this.setData({
    //   leftNav: this.data.leftNav
    // })
  },

  // 滑动到底部
  lower() {
    console.log('lower')
    let count = 0;
    // console.log(this.data.scrollInfo)
    for (let i in this.data.leftNav) {
      if (this.data.leftNav[i].id == this.data.scrollInfo.ProductCategoryID) {
        count = parseInt(i) + 1
      }
    }
    if (count == this.data.leftNav.length) {
      count = 0
    }
    this.data.leftNav.map((item, i) => {
      item.isNav = false;
      if (i == count) {
        item.isNav = true;
      }
    })
    let params = {
      ProductName: this.data.leftNav[count].categoryName,
      ProductCategoryID: this.data.leftNav[count].id
    }
    this.getAllClassInfo(params)
    this.setData({
      leftNav: this.data.leftNav
    })
  },

  // 滑动
  scroll(e) {
    // console.log(e)
  },

  pageChange(e) {
    wx.navigateTo({
      url: '../goodcar/goodcar',
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

    this.data.goodList.map(it => {
      if (it.id == item.id) {
        it.quality++;
      }
    })

    this.setData({
      carGoodsList: this.data.carGoodsList,
      carGoodsCount: allCount,
      goodList: this.data.goodList
    })
    wx.setStorageSync('carGoodsList', JSON.stringify(this.data.carGoodsList))
    console.log(this.data.carGoodsList)
  },

  subGood(e) {
    console.log(e);
    let that = this;
    let item = e.target.dataset.item;
    let newGoodID = item.id
    if (this.data.carGoodsList.length) {
      let bool = this.isAdd(this.data.carGoodsList, newGoodID);
      console.log(bool)
      if (bool) {
        for (let i in this.data.carGoodsList) {
          if (this.data.carGoodsList[i].id == newGoodID) {
            if (this.data.carGoodsList[i].count !== 0 ) {
              this.data.carGoodsList[i].count--
              if (this.data.carGoodsList[i].count == 0) {
                this.data.carGoodsList.splice(i,1)
              }
            } else {
              this.data.carGoodsList[i].count = 0
            }
          }
        }
      }
    }

    let allCount = 0;
    this.data.carGoodsList.map(item => {
      allCount += item.count
    })

    this.data.goodList.map(it => {
      if (it.id == item.id && it.quality) {
        if (it.quality !== 0) {
          it.quality--;
        } else {
          it.quality = 0;
        }
      }
    })

    this.setData({
      carGoodsList: this.data.carGoodsList,
      carGoodsCount: allCount,
      goodList: this.data.goodList
    })
    wx.setStorageSync('carGoodsList', JSON.stringify(this.data.carGoodsList))
  },

  getShopInfo() {
    let that = this;
    app.allreq.getShopInfo().then(function(res){
      console.log(res);
      if (res.success) {
        let hours = new Date().getHours();
        if (hours > res.result.endTime || hours<res.result.startTime){
          that.data.shopOpen = false;
        } else {
          that.data.shopOpen = true;
        }
        that.setData({
          shopInfo: res.result,
          shopOpen: that.data.shopOpen
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
    this.initIndexCar(); 
    this.getClassInfo();
    this.getBottomHeight()
    this.getSysScrenInfo();
    this.getShopInfo()
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