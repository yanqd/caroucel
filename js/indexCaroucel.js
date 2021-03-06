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
var moving = false;
var imgCount = 5;
var index = 0;//图片下标
var allPoint = document.getElementsByTagName("span");

click("prev", function(){
    nextPage(false);
});
click("next", function(){
    nextPage(true);
});

//给每个圆点加入点击监听
for(var i=0, length=allPoint.length; i < length; i++){
    allPoint[i].index = i;
    allPoint[i].onclick = function(){
        //alert(i);
        nextPage(this.index);
    }
}

function nextPage(next){
    if (moving){
        return;
    }
    //moving = true; //这句移动到了下面，是有用意的，好好理解。
    //pointChanger(next);//这几句位置也发生了变化
    var offset;
    if(typeof next == "boolean"){
        //偏移总量
        offset= next ? -800 : 800;
    } else {
        if(next==index){
            return;
        }
        offset = -800*(next-index);
    }
    moving = true;//从上面移到下面

    //总时间
    var time = 400;
    //单次移动时间;
    var preTimes = 20;
    //移动次数
    var itemMove = offset/(time/preTimes);
    //目标位置
    var targetLeft = allImg.offsetLeft + offset;

    //第二种方式
    //第二次调优
    //实际上是在点击之前截获行为。
    var intervalId = setInterval(function(){
        var left = allImg.offsetLeft + itemMove;
        allImg.style.left = left + "px";
        if((offset>0 && left>=targetLeft)
            || (offset<0 && left<=targetLeft)){
            clearInterval(intervalId);
            left = targetLeft;
            if(left==0){
                left = -800*imgCount;
            } else if (left==-800*(imgCount+1)){
                left = -800;
            }
            moving = false;
        }
        allImg.style.left = left + "px";
    }, preTimes);
    pointChanger(next);//这句也是从上面移动到下面，想象为什么
}

function pointChanger(next){
    //更新当前圆点
    allPoint[index].removeAttribute("class");
    //更新目标圆点
    var targetIndex = 0;//这一步也写错了，index+1
    if (typeof next == "boolean"){
        if(next){
            targetIndex = index + 1;
            if (targetIndex==imgCount){
                targetIndex = 0;
            }
        } else {
            targetIndex = index - 1;
            if (targetIndex==-1){
                targetIndex = 4;//下标是 0,4就是5
            }
        }
    } else {//typeof END
        targetIndex = next;
    }
    allPoint[targetIndex].setAttribute("class", "on");
    //这一步忘了，这是最重要额一步。
    index = targetIndex;
}