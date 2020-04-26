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
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('ddpGame');
        }, this);
    },

    start() { },

    initStepShowData: function (num, score) {
        window.ddpStep = num;
        if (num >= 10) {
            this.stepNumber.string = 'NO 0' + num;
        } else {
            this.stepNumber.string = 'NO 00' + num;
        }
        this.stepScore.string = '' + score;
    },

    // update (dt) {},
});
