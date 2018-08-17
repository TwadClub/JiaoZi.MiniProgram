// pages/shop/goodcar/goodcar.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      isEmpty:false,
      isAllChecked:false,
      allPrice:0,
      allPriceInt:0,
      allPriceDecimal:0,
      allNum:0,
      cartArr:[
        {
          "id": 0,
          "productTitle": "韭菜猪肉(大份)",
          "saleCount": 0,
          "quality":1,
          "logo": "../../../images/goods-01.png",
          "picture": [
            "string"
          ],
          "remark": "大份15个/份",
          "saleStatusMsg": "string",
          "productCategoryName": "string",
          "salePrice": 14.50,
          "saleUnit": "string",
          "isDeleted": true,
          "deleterUserId": 0,
          "deletionTime": "2018-08-14T02:11:10.887Z",
          "lastModificationTime": "2018-08-14T02:11:10.887Z",
          "lastModifierUserId": 0,
          "creationTime": "2018-08-14T02:11:10.887Z",
          "creatorUserId": 0,
          isChecked:false,
          "subFlag":false
        },{
          "id": 1,
          "productTitle": "韭菜猪肉(大份)",
          "saleCount": 0,
          "quality":1,
          "logo": "../../../images/goods-01.png",
          "picture": [
            "string"
          ],
          "remark": "大份15个/份",
          "saleStatusMsg": "string",
          "productCategoryName": "string",
          "salePrice": 14.00,
          "saleUnit": "string",
          "isDeleted": true,
          "deleterUserId": 0,
          "deletionTime": "2018-08-14T02:11:10.887Z",
          "lastModificationTime": "2018-08-14T02:11:10.887Z",
          "lastModifierUserId": 0,
          "creationTime": "2018-08-14T02:11:10.887Z",
          "creatorUserId": 0,
          isChecked:false,
          "subFlag":false
        },{
          "id": 1,
          "productTitle": "韭菜猪肉(大份)",
          "saleCount": 0,
          "quality":1,
          "logo": "../../../images/goods-01.png",
          "picture": [
            "string"
          ],
          "remark": "大份15个/份",
          "saleStatusMsg": "string",
          "productCategoryName": "string",
          "salePrice": 13.00,
          "saleUnit": "string",
          "isDeleted": true,
          "deleterUserId": 0,
          "deletionTime": "2018-08-14T02:11:10.887Z",
          "lastModificationTime": "2018-08-14T02:11:10.887Z",
          "lastModifierUserId": 0,
          "creationTime": "2018-08-14T02:11:10.887Z",
          "creatorUserId": 0,
          isChecked:false,
          "subFlag":false
        }
      ]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '购物车'
      })
      this.setData({
        // cartList: wx.getStorageSync('cartList'),
        // sumMonney: wx.getStorageSync('sumMonney'),
        // cutMonney: wx.getStorageSync('sumMonney')>19?3:0,
        // cupNumber: wx.getStorageSync('cupNumber'),
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
      } else {
        for (let i=0; i<this.data.cartArr.length; i++) {
          this.data.cartArr[i].isChecked = false;
        }
        this.data.allPrice = 0;
        this.data.allNum = 0;
      }
      this.setData({
        cartArr:this.data.cartArr,
        // allPrice: this.data.allPrice,
        isAllChecked: !this.data.isAllChecked,
        allNum: this.data.allNum
      })
      this.getAllPrice()
    },

    /**选择 */
    switchSelect: function (e) {
      console.log(e);
      let id = e.target.dataset.id;
      let allPrice = 0;
      let index = e.target.dataset.index;
      this.data.cartArr[index].isChecked = !this.data.cartArr[index].isChecked; //选择样式
      // 计算价格 
      if (this.data.cartArr[index].isChecked) {
        // this.data.allPrice =  this.data.allPrice + this.data.cartArr[index].salePrice * this.data.cartArr[i].quality;
        this.data.allNum += 1;
      } else {
        // this.data.allPrice =  this.data.allPrice - this.data.cartArr[index].salePrice * this.data.cartArr[i].quality;
        this.data.allNum -= 1;
        if (this.data.allNum <=0) {
          this.data.allNum  = 0;
        }
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
      console.log(allPrice.toFixed(2).split('.')[0]);
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
      this.data.cartArr[index].quality --;
      if (this.data.cartArr[index].quality <= 0) {
        this.data.cartArr[index].subFlag = true;
        this.data.cartArr[index].quality = 0
        this.data.cartArr[index].isChecked = false;
        this.data.isAllChecked = false;
      }
      this.setData({
        cartArr: this.data.cartArr,
        isAllChecked: this.data.isAllChecked
      })
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