const app = getApp();
import allreq from '../../request/allrequest'
Page({
      /**
   * 页面的初始数据
   */
    data: {
        logged: false,
        logo: "",
        title: ""
    },
    onLoad: function () {},
    login: function (e) {
        wx.login({
            success: function (r) {
                var code = r.code; //登录凭证
                console.log(code)
                if (code) {

                    // 1. code 换openid
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4d9cf8e37e8715d0&secret=a0386ca0fc6e71389f7440e281afaf44&js_code='+ code +'&grant_type=authorization_code',
                        data: {},
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function(res) {
                          wx.setStorageSync('openID', res.data.openid)
                          // that.getToken()
                          wx.showToast({
                                title: res.data.openid,
                                icon: 'none',
                                duration: 10000
                          })
                          app.allreq.getUserID(res.data.openid).then(res => {
                            wx.showToast({
                                title: '成功获取userid',
                                icon: 'none',
                                duration: 10000
                          })
                            wx.setStorageSync('userID', res.result)
                            // wx.redirectTo({
                            //     url: '../index/index',
                            // })
                          })
                        }
                    })

                    //2、调用获取用户信息接口
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res)
                            wx.setStorageSync('userInfo', res.userInfo);
                        },
                        fail: function () {
                            console.log('获取用户信息失败')
                        }
                    })
                   

                } else {
                    console.log('获取用户登录态失败！' + r.errMsg)
                }
            },
            fail: function () {
                console.log('登陆失败')
            }
        })
    }
})