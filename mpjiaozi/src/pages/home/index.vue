<template>
    <div class="home">
        <div class="banner">
            <div class="address clearfix">
                <i class="icon iconfont icon-dizhi fl" ></i>
                <span class="fl">汉正街</span>
                <i class="icon iconfont icon-sanjiao_xia fl" ></i>
            </div>
            <div class="search clearfix">
                <i class="icon iconfont icon-iconfontzhizuobiaozhun22"></i>
                <span>搜索</span>
            </div>
            <img src="../../../static/images/banner.jpg" alt="" class="banner-img">
        </div>

        <div class="goods-class">
            <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" :display-multiple-items="num" @change="swiperChange" @animationfinish="animationfinish">
                <div v-for="(item, index) in imgUrls" :key="index" class="swiper-con">
                    <swiper-item class="swiper-item">
                        <image :src="item" class="slide-image" />
                    </swiper-item>
                </div>
            </swiper>
        </div>

        <div class="content"> 
            <div class="title">
                <span class="line"></span>
                <span class="txt">热卖推荐</span>
                <span class="line"></span>
                <p class="info">纯手工制作</p>
            </div>
            <ul class="goods clearfix">
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
                <li class="fl">
                    <img src="../../../static/images/goods.png" alt="">
                    <div class="info">
                        <p class="tips">优惠套餐A</p>
                        <p class="info">玉米鲜肉饺+凉拌毛豆</p>
                        <p class="price">￥18.00</p>
                    </div>
                </li>
            </ul>
        </div>

            <div class="weui-footer_fixed-bottom weui-flex">
                <a class="weui-tabbar__item weui-bar__item_on">
                   <i class="icon iconfont icon-shouye"></i>
                <p class="weui-tabbar__label">微信</p>
                </a>
                <a class="weui-tabbar__item">
                     <i class="icon iconfont icon-shouye"></i>
                    <p class="weui-tabbar__label">通讯录</p>
                </a>
                <a  class="weui-tabbar__item">
                    <i class="icon iconfont icon-shouye"></i>
                    <p class="weui-tabbar__label">发现</p>
                </a>
                <a class="weui-tabbar__item">
                     <i class="icon iconfont icon-shouye"></i>
                    <p class="weui-tabbar__label">我</p>
                </a>
            </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      num: 3,
      imgUrls: [
        '../../../static/images/goods.png',
        '../../../static/images/goods.png',
        '../../../static/images/goods.png'
      ],
      nav: [{
        name: '购物车',
        current: 1,
        style: 0,
        ico: 'icon-qiugouguanli',
        fn: 'gotoCompanyIndex'
      }]
    }
  },
  methods: {
    swiperChange (e) {
      console.log('第' + e.mp.detail.current + '张轮播图发生了滑动')
    },
    animationfinish (e) {
      console.log('第' + e.mp.detail.current + '张轮播图滑动结束')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
    padding-bottom: 80rpx;
  .banner {
    position: relative;
    .address {
      position: absolute;
      left: 5%;
      top: 5%;
      color: #fff;
      i {
        margin: 0 10rpx;
      }
    }
    .search {
      position: absolute;
      right: 5%;
      top: 5%;
      width: 300rpx;
      height: 60rpx;
      border-radius: 30rpx;
      background: #ccc;
      line-height: 60rpx;
      text-align: center;
      color: #fff;
      i {
        display: inline-block;
      }
      span {
        display: inline-block;
      }
    }
    .banner-img {
      width: 100%;
      display: block;
    }
  }
  .goods-class{
      margin-top: 30rpx;
      background: #fff;
      .swiper{
          .swiper-con{
            //   padding: 5%;
              .swiper-item{
                  padding: 20rpx;
                  img{
                      width: 100%;
                      border-radius: 20rpx;
                  }
              }
          }
      }
  }
  .content{
      margin-top: 30rpx;
      background: #fff;
        .title{
            text-align: center;
            padding: 30rpx 0 0 0;
            .line{
                margin: 0 10rpx;
                display: inline-block;
                height: 2rpx;
                width: 40rpx;
                background: #000;
                vertical-align: middle;
            }
            .txt{
                font-size: 36rpx;
                color: #666;
                display: inline-block;
                vertical-align: middle;
            }
            .info{
                color: #999;
            }
        }
        .goods{
            padding: 5%;
            background: #fff;
            margin-right: -5%;
            li{
                width: 45%;
                margin-right: 5%;
                margin-bottom: 20rpx;
                img{
                    width: 100%;
                    height: 300rpx;
                    border-radius: 20rpx;
                }
                .info{
                    .tips{
                        font-size: 32rpx;
                        color: #000;
                    }
                    .info{
                        color: #666;
                    }
                    .price{
                        color: #ff9600;
                        font-size: 32rpx;
                    }
                }
            }
        }
    }
}
</style>

