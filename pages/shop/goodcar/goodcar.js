// pages/shop/goodcar/goodcar.js
import allreq from '../../../request/allrequest'
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
      imgUrl:'http://image.twad.club/',
      isEmpty:false,
      isAllChecked:false,
      allPrice:0,
      allPriceInt:0,
      allPriceDecimal:0,
      allNum:0,
      cartArr:[],
      orderDataList:[]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '购物车'
      })
      let orderDataList = wx.getStorageSync('carGoodsList');
      if (orderDataList) {
        orderDataList = JSON.parse(orderDataList);
        orderDataList.map( item => {
          item.isChecked = false;
        })
        this.setData({
          orderDataList:orderDataList
        })
      }
      let goodsIDList = wx.getStorageSync('carGoodsList');
      console.log('---' + goodsIDList)
      if (goodsIDList) {
        goodsIDList = JSON.parse(goodsIDList)
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
      } else {
        this.setData({
          isEmpty:true
        })
      }
    },

    // 获取所有选中商品价格信息
    getGoodsListInfo(params) {
      let goodsIDList = JSON.parse(wx.getStorageSync('carGoodsList'));
      console.log(goodsIDList)
      app.allreq.getGoodsPriceInfo(params).then(res => {
        console.log(res);
        if (res.success) {
          res.result.productPriceDtoList.map(item => {
            item.isChecked = false;
            item.subFlag = false;
            goodsIDList.map(it => {
              if (it.id == item.id) {
                item.quality = it.count
              }
            })
          })
          this.setData({
            cartArr:res.result.productPriceDtoList
          })
        }
      })
    },

    /**全选 */
    allSelect: function (e) {
      if (!this.data.isAllChecked) {
        for (let i=0; i<this.data.cartArr.length; i++) {
          this.data.cartArr[i].isChecked = true;
          // this.data.allPrice += this.data.cartArr[i].salePrice
          this.data.allNum++
        }
        this.data.orderDataList.map(item => {
          item.isChecked = true
        })
      } else {
        for (let i=0; i<this.data.cartArr.length; i++) {
          this.data.cartArr[i].isChecked = false;
        }
        this.data.allPrice = 0;
        this.data.allNum = 0;
        this.data.orderDataList.map(item => {
          item.isChecked = false
        })
      }
      this.setData({
        cartArr:this.data.cartArr,
        // allPrice: this.data.allPrice,
        isAllChecked: !this.data.isAllChecked,
        allNum: this.data.allNum,
        orderDataList: this.data.orderDataList
      })
      this.getAllPrice()
    },

    /**选择 */
    switchSelect: function (e) {
      console.log(e);
      let id = e.target.dataset.id;
      let allPrice = 0;
      let index = e.target.dataset.index;
      let goodID = e.target.dataset.goodid;
      this.data.cartArr[index].isChecked = !this.data.cartArr[index].isChecked; //选择样式
      // 计算价格 
      if (this.data.cartArr[index].isChecked) {
        // this.data.allPrice =  this.data.allPrice + this.data.cartArr[index].salePrice * this.data.cartArr[i].quality;
        this.data.allNum += 1;
        this.data.orderDataList.map(item => {
          if (item.id == goodID) {
            item.isChecked = true
          }
        })
      } else {
        // this.data.allPrice =  this.data.allPrice - this.data.cartArr[index].salePrice * this.data.cartArr[i].quality;
        this.data.allNum -= 1;
        if (this.data.allNum <=0) {
          this.data.allNum  = 0;
        }
        this.data.orderDataList.map(item => {
          if (item.id == goodID) {
            item.isChecked = false
          }
        })
      }
      
      // 是否全选
      let isCheckedNum = 0;
      for (let i =0; i <this.data.cartArr.length; i++) {
        if (this.data.cartArr[i].isChecked) {
          isCheckedNum ++ ;
        }
      }

      if (isCheckedNum == this.data.cartArr.length) {
        this.data.isAllChecked = true;
      } else {
        this.data.isAllChecked = false;
      }
 
      this.setData({
        cartArr:this.data.cartArr,
        allPrice: this.data.allPrice,
        isAllChecked: this.data.isAllChecked,
        allNum: this.data.allNum,
        orderDataList: this.data.orderDataList
      })
      this.getAllPrice()
    },

    /**计算价格 */
    getAllPrice () {
      let allPrice  = 0;
      for (let i=0; i<this.data.cartArr.length;i++) {
        if (this.data.cartArr[i].isChecked) {
          allPrice += this.data.cartArr[i].salePrice * this.data.cartArr[i].quality;
        }
      }
      // console.log(allPrice.toFixed(2).split('.')[1]);
      this.setData({
        allPrice: allPrice.toFixed(2),
        allPriceInt: allPrice.toFixed(2).split('.')[0],
        allPriceDecimal: allPrice.toFixed(2).split('.')[1]
      })
    },

    /**增加数量 */
    addQuality(e) {
      let index = e.target.dataset.index;
      this.data.cartArr[index].quality ++;
      this.data.cartArr[index].subFlag = false;
      this.setData({
        cartArr: this.data.cartArr,
      })
      this.getAllPrice()
    },

    /**减少数量 */
    subQuality(e) {
      let index  = e.target.dataset.index;
      let item = e.target.dataset.item;
      this.data.cartArr[index].quality --;
      if (this.data.cartArr[index].quality <= 0) {
        this.data.cartArr[index].subFlag = true;
        this.data.cartArr[index].quality = 0
        this.data.cartArr[index].isChecked = false;
        this.data.isAllChecked = false;
        this.data.orderDataList.splice(index,1)
        this.data.cartArr.splice(index,1);
      }
      if (this.data.orderDataList.length<=0) {
        this.data.isEmpty = true;
        this.data.orderDataList = []
      }
      this.setData({
        cartArr: this.data.cartArr,
        isAllChecked: this.data.isAllChecked,
        isEmpty: this.data.isEmpty,
      })
      wx.setStorageSync('carGoodsList', JSON.stringify(this.data.orderDataList))
      this.getAllPrice()
    },

    /**清空购物车 */
    deleteCarArr () {
      this.data.cartArr = [];
      this.data.isEmpty = true;
      this.setData({
        cartArr:this.data.cartArr,
        isEmpty: this.data.isEmpty
      })
      wx.removeStorageSync('carGoodsList');
    },

    /**生成订单 */
    createOrder() {
      console.log(this.data.orderDataList)
      if (this.data.allNum<=0) {
        wx.showToast({
          title: '亲，赶快选择购买的商品吧！',
          icon: 'none'
        })
        return false
      }
      let flag = false;
      let dataList = [] 
      this.data.orderDataList.map((item,i) => {
        if (item.isChecked) {
          dataList.push(item)
          flag = true
        }
      })

      if (!flag) {
        wx.showToast({
          title: '亲，赶最少购买一件商品哦！',
          icon: 'none'
        })
        return false
      }

      console.log(dataList)
      wx.setStorageSync('createOrderData',JSON.stringify(dataList))
      wx.navigateTo({
        url: '../sureorder/sureorder'
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
        },
        'fail':function(res){},
        'complete':function(res){}
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
      // this.initIndexCar(); 
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