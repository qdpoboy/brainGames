cc.Class({
    extends: cc.Component,

    properties: {
        stepNumber: {
            default: null,
            type: cc.Label
        },
        stepScore: {
            default: null,
            type: cc.Label
        }
    },

    onLoad() {

    },

    start() { },

    initStepShowData: function (num, score) {
        //当前关卡
        this.ddpStep = num;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            window.ddpStep = this.ddpStep;
            cc.director.loadScene('ddpGame');
        }, this);
        if (num >= 10) {
            this.stepNumber.string = 'NO 0' + num;
        } else {
            this.stepNumber.string = 'NO 00' + num;
        }
        this.stepScore.string = '' + score;
        //改变颜色，代表玩过了
        if (score > 0) {
            this.stepNumber.node.color = new cc.Color('#3795E8');
            this.stepScore.node.color = new cc.Color('#3795E8');
        }
    },

    //验证当前关卡是否可以玩，必须前一关通过了才能玩下一关
    checkStepPlay: function () {

    },

    // update (dt) {},
});
