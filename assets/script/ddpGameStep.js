// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        step1: {
            default: null,
            type: cc.Sprite
        },
        backBtn: {
            default: null,
            type: cc.Sprite
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.step1.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.director.loadScene('ddpGame');
        }, this);
        this.backBtn.node.on(cc.Node.EventType.TOUCH_START, function() {
            cc.director.loadScene('gameList');
        }, this);
    },

    start () {

    },

    // update (dt) {},
});
