const app = getApp();
import allreq from '../../request/allrequest'
Page({
      /**
   * 页面的初始数据
   */
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrl: 'http://image.twad.club/'
    },
    bindGetUserInfo: function (e) {
        // 获取用户信息 并缓存
        wx.getUserInfo({
            success: function (res) {
                console.log(res);
                wx.setStorageSync('userInfo', res.userInfo) // 缓存用户信息
                //用户已经授权过
                wx.redirectTo({
                    url: '/pages/index/index',
                })

            }
        });
    }
})