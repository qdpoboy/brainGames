cc.Class({
    extends: cc.Component,

    properties: {
        cardAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        cardSprite: {
            default: null,
            type: cc.Sprite
        }
    },

    onLoad() {
        this.back = true;
        this.cardIndex;
        //图片点击事件，不能用click
        this.cardSprite.node.on(cc.Node.EventType.TOUCH_START, this.flip, this);
    },

    start() { },

    //翻转
    flip: function () {
        if (this.back && cardClick) {
            //this.filpAnimation(this);
            this.node.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame(this.cardIndex);
            this.back = false;
            if (previousSelection) {
                if (previousSelection.cardIndex == this.cardIndex) {
                    cardClick = false;
                    this.scheduleOnce(function () {
                        this.returnOk();
                    }, 1);
                } else {
                    this.filpAnimation(previousSelection);
                    cardClick = false;
                    this.scheduleOnce(function () {
                        this.returnBack();
                    }, 1.5);
                }
            } else {
                previousSelection = this;
            }
        }
        //点击正面无效果
        //  else {
        //     this.filpAnimation(this);
        //     previousSelection = null;
        //     this.node.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame('card_back');
        //     this.back = true;
        // }
    },


    returnBack: function () {
        //执行减分
        this.game.loseScore();
        previousSelection.node.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame('card_back');
        previousSelection.back = true;
        //this.filpAnimation(this);
        this.node.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame('card_back');
        this.back = true;
        previousSelection = null;
        cardClick = true;
    },

    returnOk: function () {
        this.game.sameCard();
        //this.filpAnimation(previousSelection);
        //解除绑定事件
        previousSelection.cardSprite.node.off(cc.Node.EventType.TOUCH_START, previousSelection.flip, previousSelection);
        previousSelection.node.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame('card_ok');
        //this.filpAnimation(this);
        //解除绑定事件
        this.cardSprite.node.off(cc.Node.EventType.TOUCH_START, this.flip, this);
        this.node.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame('card_ok');
        previousSelection = null;
        cardClick = true;
    },

    filpAnimation: function (theOne) {
        //卡牌翻转动画
        if (theOne.back) {
            let rotationTo = cc.rotateTo(0.5, 0, 180);
            theOne.cardSprite.node.runAction(rotationTo);
        } else {
            let rotationTo = cc.rotateTo(0.5, 0, 360);
            theOne.cardSprite.node.runAction(rotationTo);
        }
        theOne.cardSprite.node.setScale(cc.v2(1, 1));//完成翻转
    },

    randCard: function (randIndex) {
        this.cardIndex = randIndex;
        this.node.getComponent(cc.Sprite).spriteFrame = this.cardAtlas.getSpriteFrame('card_back');
    },

    // update (dt) {},
});
