/**
 * Created by Yangyue on 2017/3/13.
 */
$(document).ready(function () {

    //创建场景
    var s = new C3D.Stage();
    s.size(window.innerWidth, window.innerHeight-80).material({
        color: "#cccccc"
    }).update();
    document.getElementById('main').appendChild(s.el);

    //小鸡层
    var chickenPanoRect = {w: 420, h: 60};
    var gameBgData = [
        {url: 'images/game/c1_60x60.png'},
        {url: 'images/game/c2_60x60.png'},
        {url: 'images/game/c3_60x60.png'},
        {url: 'images/game/c4_60x60.png'},
        {url: 'images/game/c8_60x60.png'},
        {url: 'images/game/c6_60x60.png'},
        {url: 'images/game/c7_60x60.png'}
    ];
    var chickenPosY=randomArray(7,-180,210);       //小鸡随机Y坐标

    //商店层
    var shopPanoRect = {w: 2360, h: 1206};
    var shopBgData = [
        {url: 'images/qp/qp1.png'},
        {url: 'images/qp/qp2.png'},
        {url: 'images/qp/qp3.png'},
        {url: 'images/qp/qp4.png'},
        {url: 'images/qp/qp5.png'},
        {url: 'images/qp/qp6.png'},
        {url: 'images/qp/qp7.png'},
        {url: 'images/qp/qp8.png'},
        {url: 'images/qp/qp9.png'},
        {url: 'images/qp/qp10.png'},
        {url: 'images/qp/qp11.png'},
        {url: 'images/qp/qp12.png'},
        {url: 'images/qp/qp13.png'},
        {url: 'images/qp/qp14.png'},
        {url: 'images/qp/qp15.png'},
        {url: 'images/qp/qp16.png'},
        {url: 'images/qp/qp17.png'},
        {url: 'images/qp/qp18.png'},
        {url: 'images/qp/qp19.png'},
        {url: 'images/qp/qp20.png'}
    ];

    //背景层
    var mountainPanoRect = {w: 2580, h: 1306};
    var mountainBgData = [
        {url: 'images/bp/bp1.jpg'},
        {url: 'images/bp/bp2.jpg'},
        {url: 'images/bp/bp3.jpg'},
        {url: 'images/bp/bp4.jpg'},
        {url: 'images/bp/bp5.jpg'},
        {url: 'images/bp/bp6.jpg'},
        {url: 'images/bp/bp7.jpg'},
        {url: 'images/bp/bp8.jpg'},
        {url: 'images/bp/bp9.jpg'},
        {url: 'images/bp/bp10.jpg'},
        {url: 'images/bp/bp11.jpg'},
        {url: 'images/bp/bp12.jpg'},
        {url: 'images/bp/bp13.jpg'},
        {url: 'images/bp/bp14.jpg'},
        {url: 'images/bp/bp15.jpg'},
        {url: 'images/bp/bp16.jpg'},
        {url: 'images/bp/bp17.jpg'},
        {url: 'images/bp/bp18.jpg'},
        {url: 'images/bp/bp19.jpg'},
        {url: 'images/bp/bp20.jpg'}
    ];

    //创建3d背景函数
    function createPano(imgs, rect) {          
        var _len = imgs.length;         //背景图片数量
        var _step = rect.w / _len;       //每张图片宽度
        var _radius = Math.floor(_step / 2 / Math.tan(Math.PI / _len)) - 1;    //圆柱体半径大小

        var _sp = new C3D.Sprite();        //容器
        for (var i = 0; i < _len; i++) {
            var _p = new C3D.Plane();        //平面
            var _r = 360 / _len * i;              //旋转角度
            var _a = Math.PI * 2 / _len * i;          //位置角度
            _p.size(_step, rect.h).position(Math.sin(_a) * _radius, 0, -Math.cos(_a) * _radius).rotation(0, -_r, 0).material({
                image: imgs[i].url,
                repeat: 'no-repeat',
                bothsides: false,
            }).update();
            _sp.addChild(_p);
        }

        return _sp;
    }

    function createChickenPano(imgs, rect) {
        var _len = imgs.length;
        var _step = rect.w / _len;
        var _radius = 200;

        var _sp = new C3D.Sprite();
        for (var i = 0; i < _len; i++) {
            var _p = new C3D.Plane();
            var _r = 360 / _len * i;
            var _a = Math.PI * 2 / _len * i;
            _p.size(_step, rect.h).position(Math.sin(_a) * _radius, chickenPosY[i], -Math.cos(_a) * _radius).rotation(0, -_r, 0).material({
                image: imgs[i].url,
                repeat: 'no-repeat',
                bothsides: false,
            }).update();
            _sp.addChild(_p);
        }

        return _sp;
    }

    function randomArray(n,min,max){
        var array=[];
        for(var i=0;i<n;i++){
            array[i]=min+Math.floor(Math.random()*(max-min));
        }
        return array;
    }

     //游戏层(第一层)
    var chickenPano = createChickenPano(gameBgData, chickenPanoRect);
    chickenPano.name("game").position(0, 0, -200).updateT();
    s.addChild(chickenPano);

    //商店层(第二层)
    var shopPano = createPano(shopBgData, shopPanoRect);
    shopPano.position(0, 0, -400).updateT();
    s.addChild(shopPano);

    //背景层(第三层)
    var mountainPano = createPano(mountainBgData, mountainPanoRect);
    mountainPano.position(0, 0, -600).updateT();
    s.addChild(mountainPano);

    //响应屏幕调整尺寸
    function resize() {
        s.size(window.innerWidth, window.innerHeight).update();
    }

    window.onresize = function () {
        resize();
    };
    resize();

    //刷新场景
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
        function (callback) {
            setTimeout(callback, 1000 / 60);
        };

    //旋转背景
    function go(){
        touch.angleX = (touch.curMouseX - touch.lastMouseX ) * 0.2;
        chickenPano.rotate(0, -touch.angleX, 0).updateT();
        shopPano.rotate(0, -touch.angleX, 0).updateT();
        mountainPano.rotate(0, -touch.angleX, 0).updateT();
        requestAnimationFrame(go);
    }

    requestAnimationFrame(go);

    //触摸坐标信息
    var touch={
        lastMouseX : 0,
        curMouseX : 0,
        lastAngleX :0,
        angleX : 0
    };

    document.addEventListener("touchstart",touchStartHandler);
    document.addEventListener("touchmove",touchMoveHandler);
    document.addEventListener("touchend",touchEndHandler);

    function touchStartHandler(event){
        var target=event.touches[0];
        touch.lastMouseX=target.clientX;
        touch.curMouseX=target.clientX;
        chickenPano.position(0, 0, -230).updateT();
        shopPano.position(0, 0, -430).updateT();
        mountainPano.position(0, 0, -630).updateT();
    }

    function touchMoveHandler(event){
        var target=event.changedTouches[0];
        touch.lastMouseX=touch.curMouseX;
        touch.curMouseX=target.clientX;
    }

    function touchEndHandler(event){
        var target=event.changedTouches[0];
        touch.curMouseX=target.clientX;
        touch.lastMouseX=target.clientX;
        chickenPano.position(0, 0, -200).updateT();
        shopPano.position(0, 0, -400).updateT();
        mountainPano.position(0, 0, -600).updateT();
    }

    var number_find=0;
    //---------------------------小鸡的点击事件--------------------------
    $("#main").delegate("div[data-name='game']>div", "click", function () {
        $(this).fadeOut();
        number_find++;
        $(".number_find").text(number_find);
        $(".number_rest").text(7 - number_find);
    });
    //---------------------------小鸡的点击事件--------------------------


});