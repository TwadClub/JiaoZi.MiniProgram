//初始化数据
function tabbarinit() {
    return [{
            "current": 0,
            "pagePath": "/pages/index/index",
            "iconPath": "/images/home_01.png",
            "selectedIconPath": "/images/home_02.png",
            "text": "首页"
        },
        {
            "current": 0,
            "pagePath": "/pages/shop/order/order",
            "iconPath": "/images/meal_01.png",
            "selectedIconPath": "/images/meal_02.png",
            "text": "点餐"

        },
        {
            "current": 0,
            "pagePath": "/pages/order/list/list",
            "iconPath": "/images/order_01.png",
            "selectedIconPath": "/images/order_02.png",
            "text": "订单"
        },
        {
            "current": 0,
            "pagePath": "/pages/mine/home/home",
            "iconPath": "/images/person_01.png",
            "selectedIconPath": "/images/person_02.png",
            "text": "我的"
        }
    ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
    var that = target;
    var bindData = {};
    var otabbar = tabbarinit();
    otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath'] //换当前的icon
    otabbar[id]['current'] = 1;
    bindData[bindName] = otabbar
    that.setData({
        bindData
    });
}

module.exports = {
    tabbar: tabbarmain
}