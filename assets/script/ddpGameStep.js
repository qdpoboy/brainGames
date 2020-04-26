var ddpStepConfig = require('config/ddpStep');
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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();
        console.log(ddpStepConfig);
    },

    init: function() {
        this.backBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.director.loadScene('gameList');
        }, this);
        this.initSteps();
    },

    //初始化所有关卡
    initSteps: function() {
        let stepArr = [1, 2, 3, 4, 5, 6];
        for (let i = 0; i < stepArr.length; i++) {
            let stepNode = cc.instantiate(this.ddpStepPrefab);
            stepNode.getComponent('ddpStep').initStepShowData(stepArr[i], 0);
            //为了让ddpCard.js可调用ddpGame.js的方法
            // cardNode.getComponent('ddpCard').game = this;
            this.stepLayout.addChild(stepNode);
        }
    },

    start () {

    },

    // update (dt) {},
});
