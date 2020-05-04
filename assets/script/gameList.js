var ddpStepConfig = require('./config/ddpStep');
cc.Class({
    extends: cc.Component,

    properties: {
        ddpGameIcon: {
            default: null,
            type: cc.Sprite
        },
        ddpGameTotalScore: {
            default: null,
            type: cc.Label
        },
        ddpGameRank: {
            default: null,
            type: cc.Label
        }
    },

    onLoad() {
        //默认对对碰选中的关卡
        window.ddpStep = 1;
        //计算ddp所有关卡总分之和
        this.ddpTotalScore = 0;
        for (let i = 0; i < ddpStepConfig.length; i++) {
            let ddpScoreStep = cc.sys.localStorage.getItem('ddpScoreStep' + ddpStepConfig[i].step);
            if (ddpScoreStep) {
                this.ddpTotalScore += parseInt(ddpScoreStep);
            }
        }
        //得分超过10000调整字体大小
        if (this.ddpTotalScore >= 10000) {
            this.ddpGameTotalScore.fontSize = 40;
        }
        this.ddpGameTotalScore.string = this.ddpTotalScore;
        //预加载
        cc.director.preloadScene('ddpGameStep');
        this.ddpGameIcon.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('ddpGameStep');
        }, this);
    },

    start() {

    },

    // update (dt) {},
});
