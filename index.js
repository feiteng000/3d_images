
/**
 * Created by qing on 2017/6/15.
 */
/*
* 1.让所有图片旋转一定角度
*       全局    函数
* 2.拖拽
*       按下去  移动鼠标  松开
*       找到旋转的角度>>鼠标移动的距离
*       移动的角度 鼠标移动的事件的当前事件与上一次移动的事件的差距
*       当前坐标值 上一次坐标值  坐标差
*       赋值
*       差值是不能直接赋值给角度 会覆盖本身的一个角度 在原来的基础上加差值
* 3.鼠标松开一瞬间 惯性就有了
*       惯性 >> 度数变化就是差值变化    差值在一定的时间内慢慢的变小
*       当差值小到某一个程度  改变结束
*
* */
var oImg = document.getElementsByTagName("img");
var nowX , nowY , lastX , lastY , minusX , minusY , roX = -10 , roY = 0;
var oWrap = document.getElementById("wrap");
var timer = 0;
(function (i) {
    var imgLen = oImg.length;
    var deg = 360/imgLen;//每个图片旋转一定角度
    for (;i<imgLen;i++){
        oImg[i].style.transform = "rotateY("+deg*i+"deg) translateZ(350px)";
    }
})(0);
document.onmousedown = function (e) {
    //按下
    var e = e || window.event;//event  IE不支持参数调用
    this.onmousemove = function (e) {
        //移动
        //var e = e || window.event;
        nowX = e.clientX;//每移动一次生成一个新坐标值
        nowY = e.clientY;
        //计算差
        //console.log(nowX,nowY);

        minusX = nowX - lastX;
        minusY = nowY - lastY;
        //console.log(minusX,minusY);

        //求旋转度数
        roX += minusX*0.2;
        roY -= minusY*0.1;
        console.log(roX,roY);

        //赋值给度数
        oWrap.style.transform = "rotateX("+roX+"deg) rotateY"+roY+"deg)";

        lastX = nowX;//用完变成旧的值
        lastY = nowY;
    };
    this.onmouseup = function () {
        //松开
        this.onmousemove = null;
        //在一段时间内持续做某件事情
        timer = setInterval(function () {

            minusX *= 0.95;
            minusY *= 0.95;

            roX -= minusX * 0.2;
            roY += minusY * 0.1;

            oWrap.style.transform = 'rotateX('+roX+'deg) rotateY'+roY+'deg)';

            if (Math.abs(minusX)<0.1 || Math.abs(minusY)<0.1){
                clearInterval(timer);//停止当前定时器
            }
        },1000/60);
    }
};
console.log("每天靠近目标一点点");