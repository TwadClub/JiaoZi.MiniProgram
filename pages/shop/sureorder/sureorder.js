// pages/shop/sureorder/sureorder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      isSelectH:true, // 送货上门
      isSelectS:false, // 到店自取
      goodsList:[
        {
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
        }
      ]
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '订单详情'
      })
    },

    /**送货上门 */
    sendHome() {
      this.setData({
        isSelectH: !this.data.isSelectH,
        isSelectS: !this.data.isSelectS
      })
    },

    /**到店自取 */
    selfGet() {
      this.setData({
        isSelectH: !this.data.isSelectH,
        isSelectS: !this.data.isSelectS
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