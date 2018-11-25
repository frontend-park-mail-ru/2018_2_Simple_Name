(function () {
    const Status = {
        StatusError: "error",
        StatusInfo: "info",
        StatusWait: "wait",
        StatusStartGame: "startgame",
        StatusGame: "game",
        StatusGameOver: "gameover"
    };

    let HeaderElems = [
        "own-healthBar",
        "own-healthVal",
        "own-nickname",
        "points",
        "rival-healthBar",
        "rival-healthVal",
        "rival-nickname",
        "room",
        "buyPanel"
    ];

    let BuyPanelElems = [
        "buyPanel-tab1",
        "buyPanel-tab2",
        "buyPanel-tab3"
    ];

    SimpleObj = window.SimpleObj;
    AnimatedObj = window.AnimatedObj;

    class GameService {
        constructor(root, onDoneCallback, onErrCallback) {
            this.onDone = onDoneCallback;
            this.onErr = onErrCallback;
            this.gameroot = new SimpleObj(root, "gameroot", "gameroot");
            this.WSService = new WsService("95.163.209.195:80/startgame");
            this.WSService.subscribe(Status.StatusInfo, this.infoCallback.bind(this));
            this.WSService.subscribe(Status.StatusError, this.errorCallback.bind(this));
            this.WSService.subscribe(Status.StatusWait, this.waitCallback.bind(this));
            this.WSService.subscribe(Status.StatusStartGame, this.startgameCallback.bind(this));
            this.WSService.subscribe(Status.StatusGame, this.gameCallback.bind(this));
            this.WSService.subscribe(Status.StatusGameOver, this.gameoverCallback.bind(this));
            this.WSService.onclose(this.onWSClose.bind(this));
            this.WSService.onerror(this.onWSClose.bind(this));


            this.StaticState = {};
            this.DynamicState = {};
        }

        onWSClose() {
            if (!this.Status) {
                const errText = 'Server Connection problem';
                this.onErr(errText);
            }
        }

        infoCallback(data) {
            if (this.messageBox) {
                this.updateMessageBox(data.info);
            } else {
                this.updateFooter(data);
            }
        }

        errorCallback(data) {
            this.onErr(data.info);
        }

        waitCallback(data) {
            console.log("wait-call");

            this.gameroot.clearFrame();
            this.gameroot.addType("waitBackground");
            this.gameroot.addType("background");
            this.initMessageBox();

            let weel = new AnimatedObj(this.gameroot.frame, "weel", "weel", 2);
            let box = new SimpleObj(this.gameroot.frame, "box", "box");
            // window.onresize = (event) => {
            //     weel.style.left = (this.gameroot.clientWidth - weel.width) / 2 + "px";
            //     weel.style.top = (this.gameroot.clientHeight - weel.height) / 2 + "px";
            // }

            this.gameroot.frame.onclick = (event) => {
                weel.setPositionPX(event.clientX, event.clientY);
            };
        }

        startgameCallback(data) {
            console.log("startgame-call");
            this.gameroot.clearFrame();
            this.gameroot.setType("gameBackground");

            this.initHeader(data);
            this.initGameArea(data);
            this.initFooter(data);

            const owntarget = this.owntarget;
            const rivaltarget = this.rivaltarget;
            const area = this.gameArea.area();
            this.WSService.send({
                command: "update",
                owntarget: owntarget,
                rivaltarget: rivaltarget,
                area: area,
            });

            this.timerID = setInterval(this.sendUpdate(), 2000);
        }

        sendUpdate() {
            const owntarget = this.owntarget;
            const rivaltarget = this.rivaltarget;
            const area = this.gameArea.area();
            this.WSService.send({
                command: "update",
                owntarget: owntarget,
                rivaltarget: rivaltarget,
                area: area,
            })
        }

        gameCallback(data) {
            console.log("game-call");
            this.updateHeader(data);
            this.updateGameArea(data);
        }

        gameoverCallback(data) {
            console.log("gameover-call");
            clearInterval(this.timerId);
            this.Status = "gameover"
            let checkOwn = data.ownstate.hp > 0;
            let checkRival = data.rivalstate.hp > 0;
            let text = "";
            if (checkOwn && checkRival) {
                text = "User " + data.rivalstate.nickname + " disconnected.";
                this.onErr(text);
                return;
            }
            this.gameroot.clearFrame();
            this.gameroot.addType("gameoverBackground");
            const w = new SimpleObj(this.gameroot.frame, "gameover-window", "gameover-window")
            if (!checkOwn && !checkRival) {
                text = "Draw =)";
            } else {
                if (checkOwn) {
                    text = "You win!";
                    w.addType("win");
                } else {
                    text = "You lose :(";
                    w.addType("lose");
                }
            }
            w.setTextBox(text);
        }

        initHeader(data) {
            this.header = new SimpleObj(this.gameroot.frame, "header", "header");
            this.header.addType("text-style");
            for (let id in HeaderElems) {
                let obj = new SimpleObj(this.header.frame, HeaderElems[id], HeaderElems[id]);
                this.StaticState[HeaderElems[id].replace("-", "_")] = obj;
            }
            this.StaticState.room.setTextBox(`Room ${data.room}`);

            this.StaticState.own_nickname.setTextBox(data.ownstate.nickname);
            this.StaticState.own_nickname.addType("nicknameBox");

            this.StaticState.own_healthVal.setTextBox(data.ownstate.hp);
            this.StaticState.own_healthVal.addType("healthVal");

            this.StaticState.own_healthBar.addType("healthBar");

            this.StaticState.rival_nickname.setTextBox(data.rivalstate.nickname);
            this.StaticState.rival_nickname.addType("nicknameBox");

            this.StaticState.rival_healthVal.setTextBox(data.rivalstate.hp);
            this.StaticState.rival_healthVal.addType("healthVal");

            this.StaticState.rival_healthBar.addType("healthBar");

            this.StaticState.points.setTextBox(data.ownstate.points);

            this.baseHealthBarW = this.StaticState.own_healthBar.area().width;
            this.initBuyPanel();
        }

        initBuyPanel() {
            let koefW = 100 / BuyPanelElems.length;
            let BuyPanel = this.StaticState.buyPanel;
            let w = BuyPanel.area().width * koefW / 100;
            for (let id in BuyPanelElems) {
                let obj = new SimpleObj(BuyPanel.frame, BuyPanelElems[id], BuyPanelElems[id]);
                obj.addType("buyPanel-tab")
                obj.setPositionPerc(parseInt(id * koefW), 0);
                obj.setWidth(w);
                obj.frame.onclick = this.buyPanelClickCallback.bind(this);
                this.StaticState[BuyPanelElems[id].replace("-", "_")] = obj;
            }
        }

        initGameArea(data) {
            this.gameArea = new SimpleObj(this.gameroot.frame, "gameArea", "gameArea");

            const own_target = new SimpleObj(this.gameArea.frame, "own-target", "target own-target");
            this.StaticState["own_target"] = own_target;
            this.owntarget = {
                area: own_target.area(),
                pos: own_target.pos(),
            };

            const rival_target = new SimpleObj(this.gameArea.frame, "rival-target", "target rival-target");
            this.StaticState["rival_target"] = rival_target;
            this.rivaltarget = {
                area: rival_target.area(),
                pos: rival_target.pos(),
            };
        }

        initFooter(data) {
            this.footer = new SimpleObj(this.gameroot.frame, "footer", "footer");
            this.footer.addType("text-style");
            this.footer.innerText = data.info;
        }

        initMessageBox() {
            this.messageBox = new AnimatedObj(this.gameroot.frame, "messageBox", "messageBox", 0.5)
            this.messageBox.addType("text-style");
        }

        updateMessageBox(text) {
            this.messageBox.setTextBox(text);
            this.messageBox.addType("messageBox-show");
            setTimeout(() => {
                this.messageBox.addType("messageBox-hide");
                this.messageBox.removeType("messageBox-show");
            }, 7000);
            setTimeout(() => {
                this.messageBox.removeType("messageBox-hide");
            }, 7700);
        }

        updateHeader(data) {
            this.StaticState.own_healthBar.setWidth(this.baseHealthBarW * 0.01 * data.ownstate.hp);
            this.StaticState.rival_healthBar.setWidth(this.baseHealthBarW * 0.01 * data.rivalstate.hp);
            this.StaticState.own_healthVal.setTextBox(data.ownstate.hp);
            this.StaticState.rival_healthVal.setTextBox(data.rivalstate.hp);
            this.StaticState.points.setTextBox(data.ownstate.points);
        }

        updateGameArea(data) {
            let own_mobs = data.ownstate.mobs;
            this.set_mob_types(own_mobs, "own-");
            this.updateMobs(own_mobs);

            let rival_mobs = data.rivalstate.mobs;

            rival_mobs = this.reverse_mob_position(rival_mobs, this.gameArea.area().width);
            this.set_mob_types(rival_mobs, "rival-");

            this.updateMobs(rival_mobs);
        }

        set_mob_types(mobs, types) {
            for (let id in mobs) {
                mobs[id].type = types + mobs[id].type;
            }
        }

        reverse_mob_position(mobs, dist) {
            for (let id in mobs) {
                mobs[id].pos.x = dist - mobs[id].pos.x;
            }
            return mobs;
        }

        updateMobs(mobs) {
            for (let id in mobs) {
                const mob = this.DynamicState[`mob${id}`];
                switch (mobs[id].status) {
                    case "run":
                        if (!mob) {
                            let obj = new AnimatedObj(this.gameArea.frame, `mob${id}`, mobs[id].type, mobs[id].speed);
                            obj.addType("mob");
                            obj.frame.onclick = this.mobClickCallback.bind(this);
                            obj.setPositionPX(mobs[id].pos.x, mobs[id].pos.y);
                            this.DynamicState[`mob${id}`] = obj;
                        }
                        else {
                            mob.setPositionPX(mobs[id].pos.x, mobs[id].pos.y);
                        }
                        break;
                    case "dead":
                        if (!this.StaticState[`mob${id}`]) {
                            if (mob) {
                                mob.setType("deadmob");
                                this.StaticState[`mob${id}`] = mob;
                                delete this.DynamicState[`mob${id}`];
                            }
                        } else {
                            this.StaticState[`mob${id}`].setType("deadmob");
                        }
                        break;
                    case "attack":
                        if (mob) {
                            mob.addType(mob.getTypeClass() + "-attack");
                            mob.removeType(mob.getTypeClass())
                            this.StaticState[`mob${id}`] = mob;
                            delete this.DynamicState[`mob${id}`];
                        }
                        break;
                }
            }
        }

        updateFooter(data) {
            this.footer.setTextBox(data.info);
        }

        mobClickCallback(event) {
            const owntarget = this.owntarget;
            const rivaltarget = this.rivaltarget;
            const area = this.gameArea.area();
            const pos = { x: this.gameArea.area().width - event.clientX, y: event.clientY }
            this.WSService.send({
                command: "killmob",
                clickpos: pos,
                owntarget: owntarget,
                rivaltarget: rivaltarget,
                area: area,
            })
        }

        buyPanelClickCallback(event) {
            const mobtype = this.pars_mobtype(event.target.name);
            const owntarget = this.owntarget;
            const rivaltarget = this.rivaltarget;
            const area = this.gameArea.area();
            this.WSService.send({
                command: "addmob",
                createmobtype: mobtype,
                owntarget: owntarget,
                rivaltarget: rivaltarget,
                area: area,
            })
        }

        pars_mobtype(name) {
            if (name.includes("tab1")) {
                return "mob1";
            }
            if (name.includes("tab2")) {
                return "mob2";
            }
            if (name.includes("tab3")) {
                return "mob3";
            }
        }
    }
    window.GameModule = GameService;
}());