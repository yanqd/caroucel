/**
 * Created by Administrator on 2016/8/9.
 */
/*
 功能说明:
 1. 点击向右(左)的图标, 平滑切换到下(上)一页
 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
 3. 每隔3s自动滑动到下一页
 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
 5. 切换页面时, 下面的圆点也同步更新
 6. 点击圆点图标切换到对应的页
 */
/*
 功能:
 目标:
 点击向右(左)瞬间切换到下(上)一页
 技术点:
 常用功能函数封装:
 根据id得到元素对象
 给指定id的元素绑定点击监听
 元素定位:
 offsetLeft
 style.left
 分析:
 给'下一页'和'上一页'绑定点击监听
 得到div的当前left坐标, 并计算出新的left
 将其赋值为样式坐标
 */
/*
* 编写工具函数*/
//获取 id 的工具函数
function $(id){
    return document.getElementById(id);
}

function click (id, callback){
    $(id).onclick = callback;
}
//得到所有的图片
var allImg = $("list");


click("prev", function(){
    nextPage(false);
});
click("next", function(){
    nextPage(true);
});

function nextPage(next){
    //偏移总量
    var offset= next ? -800 : 800;
    //总时间
    var time = 400;
    //单次移动时间;
    var preTimes = 20;
    //移动次数
    var itemMove = offset/(time/preTimes);
    //目标位置
    var targetLeft = allImg.offsetLeft + offset;

    //第二种方式
    //调优
    var intervalId = setInterval(function(){
        var left = allImg.offsetLeft + itemMove;
        allImg.style.left = left + "px";
        if((offset>0 && left>=targetLeft)
            || (offset<0 && left<=targetLeft)){
            clearInterval(intervalId);
            left = targetLeft;
        }
    }, preTimes);
}

