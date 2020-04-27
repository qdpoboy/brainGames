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
        let stepArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        for (let i = 0; i < stepArr.length; i++) {
            let stepNode = cc.instantiate(this.ddpStepPrefab);
            let localStepScore = cc.sys.localStorage.getItem('ddpScoreStep' + stepArr[i]);
            let stepScore = 0;
            if (localStepScore) {
                stepScore = parseInt(localStepScore);
            }
            stepNode.getComponent('ddpStepItem').initStepShowData(stepArr[i], stepScore);
            //为了让ddpCard.js可调用ddpGame.js的方法
            // cardNode.getComponent('ddpCard').game = this;
            this.stepLayout.addChild(stepNode);
        }
    },

    start() {

    },

    // update (dt) {},
});
