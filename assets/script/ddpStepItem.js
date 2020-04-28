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
        this.checkStepPlay(num);
        if (num >= 10) {
            this.stepNumber.string = 'NO 0' + num;
        } else {
            this.stepNumber.string = 'NO 00' + num;
        }
        this.stepScore.string = '' + score;
        //改变颜色，代表玩过了
        if (score > 0) {
            //#3795E8 == 55,149,232
            this.stepNumber.node.color = new cc.Color(55, 149, 232);
            this.stepScore.node.color = new cc.Color(55, 149, 232);
        }
    },

    //验证当前关卡是否可以玩，必须前一关通过了才能玩下一关
    checkStepPlay: function (num) {
        let ddpScoreNowStep = cc.sys.localStorage.getItem('ddpScoreStep' + num);
        //当前关卡玩过的，肯定可以点击玩，第一关任何时候都可以点击玩
        if (ddpScoreNowStep != null || num == 1) {
            this.node.on(cc.Node.EventType.TOUCH_END, function () {
                window.ddpStep = this.ddpStep;
                cc.director.loadScene('ddpGame');
            }, this);
        } else {
            //当前关卡未玩过，取上一关卡，如果玩过，则当前关卡可以点击玩
            let ddpScoreLastStep = cc.sys.localStorage.getItem('ddpScoreStep' + (num - 1));
            if (ddpScoreLastStep != null) {
                this.node.on(cc.Node.EventType.TOUCH_END, function () {
                    window.ddpStep = this.ddpStep;
                    cc.director.loadScene('ddpGame');
                }, this);
            }
        }
    },

    // update (dt) {},
});
