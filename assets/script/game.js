// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        ctrlArea: {
            default: null,
            type: cc.Node
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init();
    },

    init: function () {
        //记录选中的卡牌
        window.cardClick = true;
        //上一张选中的卡牌节点
        window.previousSelection = null;
        //游戏难度等级
        this.level = 6;
        //单场得分
        this.singleScore = 0;
        //总得分
        this.totalScore = 0;
        this.initMap();
    },

    initMap: function () {
        if (this.level > 6) {
            this.level = 6;
        }
        let ballCnt = 6 * this.level;
        // let randArr = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5];
        let randArr = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6];
        for (let i = 0; i < ballCnt; i++) {
            let randIndex = Math.floor(Math.random() * randArr.length);
            let cardNode = cc.instantiate(this.cardPrefab);
            cardNode.getComponent('card').randCard(randArr[randIndex]);
            //为来让card.js可调用，game.js的方法
            cardNode.getComponent('card').game = this;
            randArr.splice(randIndex, 1);
            this.ctrlArea.addChild(cardNode);
        }
    },

    gainScore: function() {
        this.singleScore += 1;
        this.totalScore += 1;
        //更新得分
        this.scoreLabel.string = '得分: ' + this.totalScore;
        //播放得分音效
        //cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameWin: function() {
        this.singleScore = 0;
        this.scoreLabel.string = '得分: 0';
        if (confirm('重新开始一局？')) {
            this.ctrlArea.destroyAllChildren();
            this.init();
        } else {
            cc.director.loadScene('start');
        }
    },

    gameLost: function() {
        
    },

    // start () {},

    update (dt) {
        if (this.singleScore == 18) {
            this.gameWin();
        }
    },
});
