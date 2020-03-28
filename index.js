var oBarrageInput = document.getElementsByClassName("barrage-input")[0];
var oBtn = document.getElementsByClassName("btn")[0];
var oMain = document.getElementsByClassName("main")[0];
var barrageArr=["床前明月光","疑是地下霜","举头望明月","低头思故乡","呵呵"];
oBtn.onclick = function () {
    send();
}
oBarrageInput.onkeydown = function (e) {
    if (e.key == "Enter") {
        send();
    }
}
function autoBarrage(){
    var len=barrageArr.length;
    oBarrageInput.value=barrageArr[round(0,len-1,1)];
    send();
}




function send() {
    var str = oBarrageInput.value;
    if (str.length <= 0 || /^\s+$/.test(str)) {
        alert("输入内容不能为空");
        return;
    } else if (str.length > 20) {
        alert("输入的内容不能超过20");
        return;
    }

    createBarrage(str);
    oBarrageInput.value="";
}
// 生成弹幕
function createBarrage(val) {
    var oSpan = document.createElement("span");
    oSpan.innerText = val;
    oSpan.classList.add('subtitle')
    barrageStyle(oSpan, {
        color: "rgb(" + round(0, 250, 1) + "," + round(0, 250, 1) + "," + round(0, 250, 1) + ")",
        fontSize: round(12, 20, 2),
        top: round(0, 440, 30),
        // timing: barrageSpeed(val),
        timing:round(2,6,2)

    })
    oMain.appendChild(oSpan)

}
// 生成弹幕样式
function barrageStyle(dom, obj) {
    dom.style.color = obj.color;
    dom.style.fontSize = obj.fontSize + "px";
    dom.style.top = obj.top + "px";
    dom.timer = setInterval(function () {
        dom.speed = -obj.timing;
        dom.style.left = dom.offsetLeft + dom.speed + "px";
        if (dom.offsetLeft + dom.offsetWidth < 0) {
            dom.remove();
        }
    }, 16.7)
}
// 生成随机数
function round(min, max, step) {
    var num = Math.floor((max - min) / step);
    return Math.floor(Math.random() * (num + 1)) * step + min
}
// 弹幕速度函数
function barrageSpeed(str) {
    var len = str.byteLength();
    if (len < 6) {
        return 2;
    }else if(len<13){
        return 4;
    }else{
        return 6
    }
}

// 检测字符长度函数
function sizeof(str) {
    var len = str.length,
        total = 0,
        code;
    for (var i = 0; i < len; i++) {
        code = str.charCodeAt(i);
        if (code <= 0x007f) {
            total += 1;
        } else if (code <= 0x07ff) {
            total += 2;
        } else if (code <= 0xffff) {
            total += 3;
        }
    }
    return total;
}

String.prototype.byteLength = function () {
    //获取字符串的字节数，扩展string类型方法
    var b = 0; l = this.length;
    //初始化字节数递加变量并获取字符串参数的字符个数
    if (l) {
        //如果存在字符串，则执行计划
        for (var i = 0; i < l; i++) {
            //遍历字符串，枚举每个字符
            if (this.charCodeAt(i) > 255) {
                //字符编码大于255，说明是双字节字符
                b += 2;
                //则累加2个
            } else {
                b++;
                //否则递加一次
            }
        }
        return b;
        //返回字节数
    } else {
        return 0;
        //如果参数为空，则返回0个
    }
}



