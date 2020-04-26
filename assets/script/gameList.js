cc.Class({
    extends: cc.Component,

    properties: {
        ddpGameIcon: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //对对碰选中的关卡
        window.ddpStep = 1;
        this.ddpGameIcon.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('ddpGameStep');
        }, this);
    },

    start() {

    },

    // update (dt) {},
});
