var ddpStepConfig = require('./config/ddpStep');
cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab1: {
            default: null,
            type: cc.Prefab
        },
        cardPrefab2: {
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
        },
        backBtn: {
            default: null,
            type: cc.Sprite
        },
        nowStep: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.backBtn.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('ddpGameStep');
        }, this);
        this.init();
    },

    init: function () {
        //记录选中的卡牌
        window.cardClick = true;
        //上一张选中的卡牌节点
        window.previousSelection = null;
        //初始得分
        this.initScore = 100;
        //单场得分
        this.singleScore = 100;
        //单场两张牌相同消除的次数
        this.sameCnt = 0;
        //显示当前关卡
        if (window.ddpStep >= 10) {
            this.nowStep.string = 'NO 0' + window.ddpStep;
        } else {
            this.nowStep.string = 'NO 00' + window.ddpStep;
        }
        //当前游戏关卡数据
        this.nowStepData = ddpStepConfig[window.ddpStep - 1];
        this.initMap();
    },

    initMap: function () {
        let randArr = this.nowStepData.cards;
        let bigCard = false;
        //根据卡牌数量，适配屏幕，调整layout布局
        if (this.nowStepData.totalcard == 4) {
            this.ctrlArea.getComponent(cc.Layout).spacingX = 50;
            this.ctrlArea.getComponent(cc.Layout).spacingY = 50;
            this.ctrlArea.getComponent(cc.Layout).paddingLeft = 150;
            this.ctrlArea.getComponent(cc.Layout).paddingTop = 200;
            this.ctrlArea.getComponent(cc.Layout).paddingRight = 150;
            bigCard = true;
        } else if (this.nowStepData.totalcard == 8) {
            this.ctrlArea.getComponent(cc.Layout).spacingX = 50;
            this.ctrlArea.getComponent(cc.Layout).spacingY = 50;
            this.ctrlArea.getComponent(cc.Layout).paddingLeft = 60;
            this.ctrlArea.getComponent(cc.Layout).paddingTop = 200;
            this.ctrlArea.getComponent(cc.Layout).paddingRight = 60;
            bigCard = true;
        } else if (this.nowStepData.totalcard == 16) {
            this.ctrlArea.getComponent(cc.Layout).spacingX = 50;
            this.ctrlArea.getComponent(cc.Layout).spacingY = 50;
            this.ctrlArea.getComponent(cc.Layout).paddingLeft = 60;
            this.ctrlArea.getComponent(cc.Layout).paddingTop = 100;
            this.ctrlArea.getComponent(cc.Layout).paddingRight = 60;
            bigCard = true;
        }
        for (let i = 0; i < this.nowStepData.totalcard; i++) {
            let randIndex = Math.floor(Math.random() * randArr.length);
            //适配宽度小的屏幕
            if (cc.winSize.width > 600 || bigCard) {
                var cardNode = cc.instantiate(this.cardPrefab2);
                // cardNode.width = 68;
            } else {
                var cardNode = cc.instantiate(this.cardPrefab1);
            }
            cardNode.getComponent('ddpCard').randCard(randArr[randIndex]);
            //为了让ddpCard.js可调用ddpGame.js的方法
            cardNode.getComponent('ddpCard').game = this;
            randArr.splice(randIndex, 1);
            this.ctrlArea.addChild(cardNode);
        }
    },

    //两张牌相同
    sameCard: function () {
        this.sameCnt++;
        if (this.sameCnt >= this.nowStepData.totalcard / 2) {
            this.gameWin();
        }
        //播放得分音效
        //cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    //执行减分
    loseScore: function () {
        if (this.singleScore <= 0) {
            this.singleScore = 0;
        } else {
            this.singleScore -= 1;
        }
        //更新得分
        this.scoreLabel.string = '' + this.singleScore;
        //播放得分音效
        //cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    //游戏获胜
    gameWin: function () {
        //本地存储，关卡积分记录
        let kk = 'ddpScoreStep' + window.ddpStep;
        let ddpScoreStep = cc.sys.localStorage.getItem(kk);
        if (ddpScoreStep) {
            if (this.singleScore > parseInt(ddpScoreStep)) {
                cc.sys.localStorage.setItem(kk, this.singleScore);
            }
        } else {
            cc.sys.localStorage.setItem(kk, this.singleScore);
        }
        //JSON.stringify();//json转字符串
        //JSON.parse();//字符串转json
        //删除本地存储
        //cc.sys.localStorage.removeItem(key);
        if (confirm('重新开始一局？')) {
            this.singleScore = this.initScore;
            this.scoreLabel.string = '' + this.initScore;
            this.ctrlArea.destroyAllChildren();
            this.init();
        } else {
            cc.director.loadScene('ddpGameStep');
        }
    },

    gameLost: function () {

    },

    // start () {},

    // update(dt) {},
});
