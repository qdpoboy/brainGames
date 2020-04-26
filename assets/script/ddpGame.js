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
        //游戏关卡
        this.level = window.ddpStep;
        //初始得分
        this.initScore = 100;
        //单场得分
        this.singleScore = 100;
        //总得分
        let localTotalScore = cc.sys.localStorage.getItem('totalScore');
        if (localTotalScore) {
            this.totalScore = parseInt(localTotalScore);
        } else {
            this.totalScore = 0;
        }
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
            //适配宽度小的屏幕
            if (cc.winSize.width <= 600) {
                var cardNode = cc.instantiate(this.cardPrefab1);
                // cardNode.width = 68;
            } else {
                var cardNode = cc.instantiate(this.cardPrefab2);
            }
            cardNode.getComponent('ddpCard').randCard(randArr[randIndex]);
            //为了让ddpCard.js可调用ddpGame.js的方法
            cardNode.getComponent('ddpCard').game = this;
            randArr.splice(randIndex, 1);
            this.ctrlArea.addChild(cardNode);
        }
    },

    //两张牌相同，加分
    gainScore: function () {
        this.singleScore += 1;
        //更新得分
        this.scoreLabel.string = '' + this.singleScore;
        //播放得分音效
        //cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    //两张牌不相同，减分分
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

    //本场游戏获胜
    gameWin: function () {
        this.totalScore += this.singleScore;
        //本地存储，总分记录
        cc.sys.localStorage.setItem('totalScore', this.totalScore);
        //删除本地存储
        //cc.sys.localStorage.removeItem(key);
        if (confirm('重新开始一局？')) {
            this.singleScore = this.initScore;
            this.scoreLabel.string = '' + this.initScore;
            this.ctrlArea.destroyAllChildren();
            this.init();
        } else {
            cc.director.loadScene('start');
        }
    },

    gameLost: function () {

    },

    // start () {},

    update(dt) {
        if (this.singleScore == 18) {
            this.gameWin();
        }
    },
});
