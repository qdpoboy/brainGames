cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        //预加载
        cc.director.preloadScene('gameList');
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('gameList');
        }, this);
    },

    // start () {},

    // update (dt) {},
});
