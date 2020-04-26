cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            //cc.director.loadScene('ddpGame');
            cc.director.loadScene('gameList');
        }, this);
    },

    // start () {},

    // update (dt) {},
});
