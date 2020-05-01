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
        //两张牌相同时音效
        okAudio: {
            default: null,
            type: cc.AudioClip
        },
        //翻牌音效
        filpAudio: {
            default: null,
            type: cc.AudioClip
        },
        //洗牌音效
        shuffleAudio: {
            default: null,
            type: cc.AudioClip
        },
        //确认弹框
        alertPrefab: {
            default: null,
            type: cc.Prefab
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
        //播放洗牌音效
        cc.audioEngine.playEffect(this.shuffleAudio, false);
        let extendTime = 0.7;
        if (this.nowStepData.totalcard <= 16) {
            extendTime = 0.4;
        }
        //配合洗牌音效，延时执行
        this.scheduleOnce(function () {
            this.initMap();
        }, extendTime);
    },

    initMap: function () {
        let randArrStr = JSON.stringify(this.nowStepData.cards);
        let randArr = JSON.parse(randArrStr);
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
        //播放得分音效
        cc.audioEngine.playEffect(this.okAudio, false);
        this.sameCnt++;
        if (this.sameCnt >= this.nowStepData.totalcard / 2) {
            this.gameWin();
        }
    },

    //执行减分
    loseScore: function () {
        //播放翻牌音效
        cc.audioEngine.playEffect(this.filpAudio, false);
        if (this.singleScore <= 0) {
            this.singleScore = 0;
        } else {
            this.singleScore -= 1;
        }
        //更新得分
        this.scoreLabel.string = '' + this.singleScore;
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
        cc.director.preloadScene('ddpGame');
        cc.director.preloadScene('ddpGameStep');
        var alert = cc.instantiate(this.alertPrefab);
        this.node.addChild(alert);
        alert.getComponent('alert').setNext('恭喜过关！此局得分' + this.singleScore + '！');
        // if (confirm('重新开始一局？')) {
        //     cc.director.loadScene('ddpGame');
        // } else {
        //     cc.director.loadScene('ddpGameStep');
        // }
    },

    gameLost: function () {

    },

    // start () {},

    // update(dt) {},
});
