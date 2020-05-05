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
            //为了让ddpCard.js可调用ddpGame.js的方法
            // cardNode.getComponent('ddpCard').game = this;
            this.stepLayout.addChild(stepNode);
        }
        //预加载场景
        cc.director.preloadScene('ddpGame');
        //预加载声音资源
        cc.loader.loadResDir('resources/audio/shuffle', cc.AudioClip, function (err, clip) {
        });
    },

    start() {

    },

    // update (dt) {},
});
