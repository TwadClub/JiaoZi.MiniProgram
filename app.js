//app.js
const ald = require('./utils/ald-stat.js')
const mtjwxsdk = require("./utils/mtj-wx-sdk.js");
import allreq from './request/allrequest'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.getOpenID(res.code)
        this.getShopID();
        // this.getUserID();
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.saveUserInfo(res.userInfo)
              // console.log(this.globalData.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  //获取openid
  getOpenID(code) {
    let that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4d9cf8e37e8715d0&secret=a0386ca0fc6e71389f7440e281afaf44&js_code='+ code +'&grant_type=authorization_code',
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        wx.setStorageSync('openID', res.data.openid)
        that.allreq.setOpenID(res.data.openid).then(res => {
          // console.log(res)
        })
        that.allreq.getUserID(res.data.openid).then(res => {
          // console.log(res)
          that.getUserID(res.result)
          
        })
        // that.getToken()
        // openid = res.data.openid //返回openid
      }
    })
  },

  // 根据openID获取userID
  // getUserID (openID) {
  //   that.allreq.getUserID(openID).then(res => {
  //     console.log(res)
  //   })
  // },
  
  // 获取access_token
  getToken() {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4d9cf8e37e8715d0&secret=a0386ca0fc6e71389f7440e281afaf44',
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        // openid = res.data.openid //返回openid
      }
    })
  },

  // 传openid
  setOpenID (openID) {
    wx.request({
      url: 'http://api.jiaozi.twad.club:8081/api/services/app/WX/SaveUserWXInfo?openID=' + openID,
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        // console.log(res)
        // openid = res.data.openid //返回openid
      }
    })
  },

  // 获取店铺ID
  getShopID () {
    wx.setStorageSync('shopID', 1)
  },

  // 获取用户ID
  getUserID (userID) {
    wx.setStorageSync('userID', userID)
  },

  // 缓存openID
  storageOpenID (openID) {
    wx.setStorageSync('openID', openID)
  },

  // 保存全局用户信息
  saveUserInfo (userInfo) {
    wx.setStorageSync('userInfo', userInfo);
  },
  allreq:new allreq()
})