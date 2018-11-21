(function () {
    const Status = {
        StatusError: "error",
        StatusInfo: "info",
        StatusWait: "wait",
        StatusStartGame: "startgame",
        StatusGame: "game",
        StatusEndGame: "endgame"
    };

    let HeaderElems = [
        "ownHealthBar",
        "ownHealthVal",
        "ownNickname",
        "rivalHealthBar",
        "rivalHealthVal",
        "rivalNickname",
        "room",
        "buyPanel"
    ];

    let BuyPanelElems = [
        "buyPanelTab1",
        "buyPanelTab2",
        "buyPanelTab3"
    ];

    SimpleObj = window.SimpleObj;
    AnimatedObj = window.AnimatedObj;

    class GameService {
        constructor(ws, root) {
            this.root = new SimpleObj(root, "gameroot", "gameroot");
            this.StaticState = {};
            this.DynamicState = {};
            this.wsServ = new WsService(ws);
            this.wsServ.subscribe(Status.StatusInfo, this.infoCallback);
            this.wsServ.subscribe(Status.StatusError, this.errorCallback);
            this.wsServ.subscribe(Status.StatusWait, this.waitCallback);
            this.wsServ.subscribe(Status.StatusStartGame, this.startgameCallback);
            this.wsServ.subscribe(Status.StatusGame, this.gameCallback);
            this.wsServ.subscribe(Status.StatusEndGame, this.endgameCallback);
        }
        // constructor(root) {
        //     this.root = new SimpleObj(root, "gameroot", "gameroot");

        //     this.StaticState = {};
        //     this.DynamicState = {};
        // }

        infoCallback(data) {

        }

        errorCallback(data) {

        }

        waitCallback(data) {
            this.root.clearFrame();
            this.root.addType("waitBackground");
            this.root.addType("background");

            let weel = new AnimatedObj(this.root.frame, "weel", "weel", 2);

            // window.onresize = (event) => {
            //     weel.style.left = (this.root.clientWidth - weel.width) / 2 + "px";
            //     weel.style.top = (this.root.clientHeight - weel.height) / 2 + "px";
            // }

            this.root.onclick = (event) => {
                weel.setPosition(event.clientX, event.clientY);
            };
        }

        startgameCallback(data) {
            this.root.clearFrame();
            this.root.addType("gameBackground");

            this.initHeader(data);
            this.initGameArea(data);
            this.initFooter(data);
        }

        gameCallback(data) {
            this.updateHeader(data);
            this.updateGameArea(data);
            this.updateFooter(data);
        }

        endgameCallback(data) {

        }

        initHeader(data) {
            this.header = new SimpleObj(this.root.frame, "header", "header");
            for (let it in HeaderElems) {
                let elem = new SimpleObj(this.header.frame, HeaderElems[it], HeaderElems[it]);
                this.StaticState[HeaderElems[it]] = elem;
            }
            console.log(this.StaticState);

            this.StaticState.room.setTextBox(`Room ${data.room}`);

            this.StaticState.ownNickname.setTextBox(data.ownstate.nickname);
            this.StaticState.ownHealthVal.setTextBox(data.ownstate.hp);

            this.StaticState.rivalNickname.setTextBox(data.rivalstate.nickname);
            this.StaticState.rivalHealthVal.setTextBox(data.rivalstate.hp);

            this.baseHealthBarW = this.StaticState.ownHealthBar.width();
            this.initBuyPanel();
        }

        initBuyPanel() {
            let koefW = 100 / BuyPanelElems.length;
            let BuyPanel = this.StaticState.buyPanel;
            for (let it in BuyPanelElems) {
                let elem = new SimpleObj(BuyPanel.frame, BuyPanelElems[it], "buyPanelTab");
                elem.setPositionPerc(parseInt(it * koefW), parseInt(koefW));
                this.StaticState[BuyPanelElems[it]] = elem;
            }
        }

        initGameArea(data) {
            this.gameArea = new SimpleObj(this.root.frame, "gameArea", "gameArea");
        }

        initFooter(data) {
            this.footer = new SimpleObj(this.root.frame, "footer", "footer");
            this.footer.innerText = data.info;
        }

        updateHeader(data) {
            this.StaticState.ownHealthBar.setWidth(this.baseHealthBarW * 0.01 * data.ownstate.hp);
            this.StaticState.rivalHealthBar.setWidth(this.baseHealthBarW * 0.01 * data.rivalstate.hp);
            this.StaticState.ownHealthVal.setTextBox(data.ownstate.hp);
            this.StaticState.rivalHealthVal.setTextBox(data.rivalstate.hp);
        }

        updateGameArea(data) {
            this.updateMobs(data.ownstate.mobs);
            this.updateMobs(data.rivalstate.mobs);
        }

        updateMobs(mobs) {
            for (let id in mobs) {
                if (mobs[id].isdead) {
                    if (!this.StaticState[`mob${id}`]) {
                        const mob = this.DynamicState[`mob${id}`];
                        if (mob) {
                            mob.setType("deadMob");

                            this.StaticState[`mob${id}`] = mob;
                            delete this.DynamicState[`mob${id}`];
                        }
                    }
                } else {
                    const mob = this.DynamicState[`mob${id}`];
                    if (!mob) {
                        let mob = new AnimatedObj(this.gameArea.frame, `mob${id}`, mobs[id].type, mobs[id].speed);
                        mob.setPositionPX(mobs[id].pos.x, mobs[id].pos.y);
                        this.DynamicState[`mob${id}`] = mob;
                    } else {
                        mob.setPositionPX(mobs[id].pos.x, mobs[id].pos.y);
                    }
                }
            }
        }

        updateFooter(data) {
            this.footer.setTextBox(data.info);
        }
    }
    window.GameModule = GameService;
}());