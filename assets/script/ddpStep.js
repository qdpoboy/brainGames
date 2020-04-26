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

    onLoad () {
        // this.onDestroy.on();
    },

    start () {},

    initStepShowData: function(num, score) {
        if (num >= 10) {
            this.stepNumber.string = 'NO 0' + num;
        } else {
            this.stepNumber.string = 'NO 00' + num;
        }
        this.stepScore.string = '' + score;
    },

    // update (dt) {},
});
