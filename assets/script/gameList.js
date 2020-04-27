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

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //默认对对碰选中的关卡
        window.ddpStep = 1;
        let ddpTotalScore = cc.sys.localStorage.getItem('ddpTotalScore');
        if (ddpTotalScore) {
            this.ddpGameTotalScore.string = ddpTotalScore;
        }
        this.ddpGameIcon.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('ddpGameStep');
        }, this);
    },

    start() {

    },

    // update (dt) {},
});
