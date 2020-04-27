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

    // LIFE-CYCLE CALLBACKS:

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
    },

    // update (dt) {},
});
