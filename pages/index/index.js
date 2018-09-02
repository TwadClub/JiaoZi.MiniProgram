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
    indexGoods:[],
    indexClass:[],
    carGoodsList:[],
    carGoodsCount: 0,
  },
  onLoad: function () {
    setTimeout( _ => {
      this.getIndexGoods(wx.getStorageSync('shopID'));
    },0)
    this.getIndexClass();
  },
  golist: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  getIndexGoods (shopID) {
    app.allreq.getIndexGoods(shopID).then(res => {
      // console.log(res);
      if (res.success) {
        this.setData({
          indexGoods: res.result
        })
      }
    })
  },
  getIndexClass () {
    app.allreq.getIndexClass().then( res => {
      if (res.success) {
        this.setData({
          indexClass: res.result
        })
      }
    }) 
  },

  isAdd(attr,goodID) {
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
    if (count>0) {
      return true
    } else {
      return bool
    }
  },

  addGood(e) {
    let that = this;
    let item  = e.target.dataset.item;
    let newGoodID = item.id
    // console.log(newGoodID)
    if (this.data.carGoodsList.length) {
      let bool = this.isAdd(this.data.carGoodsList,newGoodID);
      console.log(bool)
      if (bool) {
        for (let i in this.data.carGoodsList) {
          if (this.data.carGoodsList[i].id == newGoodID) {
            this.data.carGoodsList[i].count++
          }
        }
      } else {
        let obj = {
          id:newGoodID,
          count:1
        }
        this.data.carGoodsList.push(obj);
      }

    } else {
      let obj = {
        id:newGoodID,
        count:1
      }
      this.data.carGoodsList.push(obj);
    }

    let allCount = 0;
    this.data.carGoodsList.map(item => {
      allCount +=item.count
    })
    console.log(allCount)
    this.setData({
      carGoodsList: this.data.carGoodsList,
      carGoodsCount: allCount
    })
    wx.setStorageSync('carGoodsList',JSON.stringify(this.data.carGoodsList))
  },
  pageChange() {
    wx.navigateTo({
      url: '../shop/goodcar/goodcar'
    })
  }
})
