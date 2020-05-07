cc.Class({
    extends: cc.Component,

    properties: {
        backBtn: {
            default: null,
            type: cc.Sprite
        },
        ddpStepPrefab: {
            default: null,
            type: cc.Prefab
        },
        stepLayout: {
            default: null,
            type: cc.Node
        },
    },

    onLoad() {
        this.init();
    },

    init: function () {
        this.backBtn.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('gameList');
        }, this);
        this.initSteps();
    },

    //初始化所有关卡
    initSteps: function () {
        let stepLenght = 60;
        for (let i = 1; i <= stepLenght; i++) {
            let stepNode = cc.instantiate(this.ddpStepPrefab);
            let localStepScore = cc.sys.localStorage.getItem('ddpScoreStep' + i);
            let stepScore = 0;
            if (localStepScore) {
                stepScore = parseInt(localStepScore);
            }
            stepNode.getComponent('ddpStepItem').initStepShowData(i, stepScore);
            this.stepLayout.addChild(stepNode);
            //动画效果，先设置透明，再逐渐显示
            stepNode.opacity = 0;
            stepNode.runAction(cc.fadeIn(0.6));
        }
        this.fitScreen();
        //预加载场景
        cc.director.preloadScene('ddpGame');
        //加载声音资源
        // cc.loader.loadResDir('resources/audio/shuffle', cc.AudioClip, function (err, clip) {
        // });
    },

    //适配屏幕，根据屏幕宽度，调整layout布局
    fitScreen: function () {
        let length_ = cc.winSize.width - 30 * 2 - 10;
        let yu_ = length_ % 100;
        let zheng_ = Math.floor(length_ / 100);
        let spacingX = (length_ - zheng_ * 100) / (zheng_ - 1);
        this.stepLayout.getComponent(cc.Layout).spacingX = spacingX;
    },

    start() {

    },

    // update (dt) {},
});
