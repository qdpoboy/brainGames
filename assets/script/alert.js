cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: {
            default: null,
            type: cc.Label
        },
        yesBtn: {
            default: null,
            type: cc.Button
        },
        noBtn: {
            default: null,
            type: cc.Button
        }
    },

    onLoad() { },

    //下一关弹窗
    setNext: function (title) {
        this.titleLabel.string = title;
        this.yesBtn.node.getChildByName('Background').getChildByName('yesLabel').getComponent(cc.Label).string = '下一关';
        this.yesBtn.node.on(cc.Node.EventType.TOUCH_START, function () {
            window.ddpStep++;
            cc.director.loadScene('ddpGame');
        }, this);
        this.noBtn.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('ddpGameStep');
        }, this);
    },

    start() {

    },

    // update (dt) {},
});
