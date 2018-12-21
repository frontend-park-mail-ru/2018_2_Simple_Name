import WsService from '../js/modules/webSocketService.js';
import SimpleObj from './SimpleObj.js';
import AnimatedObj from './AnimatedObj.js';

const backUrl = '127.0.0.1:8082';

export default class GameService {
    constructor(root, backFunc, singleFlag) {
        this.backFunc = backFunc;
        this.gameroot = new SimpleObj(root, 'gameroot', 'gameroot');
        this.WSService = new WsService(`${backUrl}/api/startgame?single=${singleFlag}`);
        this.WSService.subscribe(Status.StatusInfo, this.infoCallback.bind(this));
        this.WSService.subscribe(Status.StatusError, this.errorCallback.bind(this));
        this.WSService.subscribe(Status.StatusWait, this.waitCallback.bind(this));
        this.WSService.subscribe(Status.StatusStartGame, this.startgameCallback.bind(this));
        this.WSService.subscribe(Status.StatusGame, this.gameCallback.bind(this));
        this.WSService.subscribe(Status.StatusGameOver, this.gameoverCallback.bind(this));
        this.WSService.onclose(this.onWSClose.bind(this));
        this.WSService.onerror(this.onWSError.bind(this));

        window.addEventListener('resize', this.updateSize.bind(this));
        this.HeaderState = {};
        this.MobState = {}
    }
    updateSize() {
        if (this.initKey) {

            this.realX = this.gameArea.docPos().x;
            this.realY = this.gameArea.docPos().y;
            this.realH = this.gameArea.area().height;
            this.realW = this.gameArea.area().width;


            this.koefX = this.realW / this.baseW;
            this.koefY = this.realH / this.baseH;
        }
    }
    onWSClose() {
        if (this.Status !== Status.StatusGameOver && this.Status !== Status.StatusError) {
            this.backFunc();
        }
    }
    onWSError() {
        if (this.Status !== Status.StatusGameOver && this.Status !== Status.StatusError) {
            this.backFunc('Проблема соединения с сервером!');
        }
    }

    infoCallback(data) {
        if (this.Status === Status.StatusWait) {
            this.updateMessageBox(data.info);
        } else if (this.footer) {
            this.updateFooter(data);
        }
    }

    errorCallback(data) {
        this.Status = Status.StatusError;
        this.backFunc();
    }

    waitCallback(data) {
        this.gameroot.clearFrame();
        this.gameroot.addType('waitBackground');
        this.gameroot.addType('background');
        this.initMessageBox();

        let weel = new AnimatedObj(this.gameroot.frame, 'weel', 'weel', 2);
        weel.addType('background');
        this.gameroot.frame.addEventListener('click', (event) => {
            weel.setPositionPX(event.clientX, event.clientY);
        });
    }

    startgameCallback(data) {
        this.Status = 'startgame';
        this.gameroot.clearFrame();
        this.gameroot.setType('gameBackground background');

        this.initHeader(data);
        this.initGameArea(data);
        this.initFooter(data);
        this.button = new SimpleObj(this.gameroot.frame, 'button-exit', 'button-exit');
        this.button.frame.addEventListener('click',(event)=>{
            this.WSService.close();
            this.backFunc();
        })
        window.addEventListener('popstate', () => {
            this.WSService.close();
        });

        this.baseW = 1200;
        this.baseH = 500;

        this.realX = this.gameArea.docPos().x;
        this.realY = this.gameArea.docPos().y;
        this.realH = this.gameArea.area().height;
        this.realW = this.gameArea.area().width;

        this.koefX = this.realW / this.baseW;
        this.koefY = this.realH / this.baseH;
        this.initKey = true;
    }

    gameCallback(data) {
        this.Status = 'game';
        this.updateHeader(data);
        this.updateGameArea(data);
    }

    gameoverCallback(data) {
        this.Status = 'gameover';
        let checkOwn = data.ownstate.hp > 0;
        let checkRival = data.rivalstate.hp > 0;
        let text = '';
        if (checkOwn && checkRival) {
            text = `User ${data.rivalstate.nickname} disconnected.`;
            this.backFunc(text);
            return;
        }
        this.gameroot.clearFrame();
        this.gameroot.addType('gameoverBackground');
        const w = new SimpleObj(this.gameroot.frame, 'gameover-window', 'gameover-window');
        if (!checkOwn && !checkRival) {
            text = 'Draw =)';
        } else {
            if (checkOwn) {
                text = 'Победа!';
                w.addType('win');
            } else {
                text = 'Проиграл :(';
                w.addType('lose');
            }
        }
        w.setTextBox(text);
        this.menubutton = new SimpleObj(this.gameroot.frame, 'button-gameover', 'button-gameover');
        this.menubutton.setTextBox('Меню');
        this.menubutton.frame.addEventListener('click',(event)=>{
            this.WSService.close();
            this.backFunc();
        })
    }

    initHeader(data) {
        this.header = new SimpleObj(this.gameroot.frame, 'header', 'header');
        this.header.addType('text-style');
        for (let id in HeaderElems) {
            let obj = new SimpleObj(this.header.frame, HeaderElems[id], HeaderElems[id]);
            this.HeaderState[HeaderElems[id].replace('-', '_')] = obj;
        }
        this.HeaderState.own_nickname.setTextBox(data.ownstate.nickname);
        this.HeaderState.own_nickname.addType('nicknameBox');
        this.HeaderState.own_nickname.addType('border');

        this.HeaderState.own_healthVal.setTextBox(data.ownstate.hp);
        this.HeaderState.own_healthVal.addType('healthVal');
        this.HeaderState.own_healthVal.addType('border');

        this.HeaderState.own_healthBar.addType('healthBar');
        this.HeaderState.own_healthBar.addType('border');

        this.HeaderState.rival_nickname.setTextBox(data.rivalstate.nickname);
        this.HeaderState.rival_nickname.addType('nicknameBox');
        this.HeaderState.rival_nickname.addType('border');

        this.HeaderState.rival_healthVal.setTextBox(data.rivalstate.hp);
        this.HeaderState.rival_healthVal.addType('healthVal');
        this.HeaderState.rival_healthVal.addType('border');

        this.HeaderState.rival_healthBar.addType('healthBar');
        this.HeaderState.rival_healthBar.addType('border');

        this.HeaderState.points.setTextBox(data.ownstate.points);
        this.HeaderState.points.addType('border');

        this.initBuyPanel();
    }

    initBuyPanel() {
        let koefW = 100 / BuyPanelElems.length;
        let BuyPanel = this.HeaderState.buyPanel;
        for (let id in BuyPanelElems) {
            let obj = new SimpleObj(BuyPanel.frame, BuyPanelElems[id], BuyPanelElems[id]);
            obj.addType('buyPanel-tab');
            obj.addType('background');
            obj.setPositionPerc(parseInt((id * koefW), 10), 0);
            obj.setWidthPer(koefW / 2);
            obj.frame.addEventListener('click', this.buyPanelClickCallback.bind(this));
            this.HeaderState[BuyPanelElems[id].replace('-', '_')] = obj;
        }
    }

    initGameArea(data) {
        this.gameArea = new SimpleObj(this.gameroot.frame, 'gameArea', 'gameArea');

        const ownTarget = new SimpleObj(this.gameArea.frame, 'own-target', 'target own-target background');

        const rivalTarget = new SimpleObj(this.gameArea.frame, 'rival-target', 'target rival-target background');

    }

    initFooter(data) {
        this.footer = new SimpleObj(this.gameroot.frame, 'footer', 'footer');
        this.footer.addType('text-style');
        this.footer.innerText = data.info;
    }

    initMessageBox() {
        this.messageBox = new AnimatedObj(this.gameroot.frame, 'messageBox', 'messageBox', 0.5);
        this.messageBox.addType('text-style');
    }

    updateMessageBox(text) {
        this.messageBox.setTextBox(text);
        this.messageBox.addType('messageBox-show');
        setTimeout(() => {
            this.messageBox.addType('messageBox-hide');
            this.messageBox.removeType('messageBox-show');
        }, 7000);
        setTimeout(() => {
            this.messageBox.removeType('messageBox-hide');
        }, 7700);
    }


    updateHeader(data) {
        this.HeaderState.own_healthBar.setWidthPer(0.2 * data.ownstate.hp);
        this.HeaderState.rival_healthBar.setWidthPer(0.2 * data.rivalstate.hp);
        this.HeaderState.own_healthVal.setTextBox(data.ownstate.hp + "HP");
        this.HeaderState.rival_healthVal.setTextBox(data.rivalstate.hp + "HP");
        this.HeaderState.points.setTextBox(data.ownstate.points + "₽");
    }

    updateGameArea(data) {
        let ownMobs = data.ownstate.mobs;
        this.setMobTypes(ownMobs, 'own-');
        this.updateMobs(ownMobs);

        let rivalMobs = data.rivalstate.mobs;

        rivalMobs = this.reverseMobPosition(rivalMobs, this.baseW);
        this.setMobTypes(rivalMobs, 'rival-');

        this.updateMobs(rivalMobs);
    }

    setMobTypes(mobs, types) {
        for (let id in mobs) {
            mobs[id].type = types + mobs[id].type;
        }
    }

    reverseMobPosition(mobs, dist) {
        for (let id in mobs) {
            mobs[id].pos.x = dist - mobs[id].pos.x;
        }
        return mobs;
    }

    updateMobs(mobs) {
        for (let id in mobs) {
            const mob = this.MobState[`mob${id}`];
            if (!mob) {
                let obj = new AnimatedObj(this.gameArea.frame, `mob${id}`, mobs[id].type, mobs[id].speed);
                obj.addType('mob');
                obj.addType('background');
                obj.frame.addEventListener('click', this.mobClickCallback.bind(this));
                obj.setPositionPX(this.realX + this.koefX * mobs[id].pos.x, this.realY + this.koefY * mobs[id].pos.y);
                this.MobState[`mob${id}`] = obj;
            } else {
                switch (mobs[id].status) {
                    case 'dead':
                        if (mob.getTypeClass().indexOf("deadmob") == -1) {
                            mob.setType('deadmob');
                            mob.addType('background');
                        }
                        break;
                    case 'attack':
                        if (mob) {
                            if (mob.getTypeClass().indexOf("attack") == -1)
                                mob.addType(`${mob.getTypeClass()}-attack`);
                                mob.removeType(mob.getTypeClass());
                        }
                        break;
                    default: break;
                }
                mob.setPositionPX(this.realX + this.koefX * mobs[id].pos.x, this.realY + this.koefY * mobs[id].pos.y);
            }
        }
    }

    updateFooter(data) {
        this.footer.setTextBox(data.info);
        this.footer.addType('footer-show');
        setTimeout(() => {
            this.footer.addType('footer-hide');
            this.footer.removeType('footer-show');
        }, 7000);
        setTimeout(() => {
            this.footer.removeType('footer-hide');
        }, 7700);
    }

    mobClickCallback(event) {
        console.log(this.baseW - (event.clientX / this.koefX - this.realX));
        const pos = { x: this.baseW - (event.clientX / this.koefX - this.realX), y: event.clientY / this.koefY - this.realY };
        this.WSService.send({
            command: 'killmob',
            clickpos: pos
        });
    }

    buyPanelClickCallback(event) {
        const mobtype = this.parsMobtype(event.target.name);
        this.WSService.send({
            command: 'addmob',
            createmobtype: mobtype
        });
    }

    parsMobtype(name) {
        if (name.includes('tab1')) {
            return 'mob1';
        }
        if (name.includes('tab2')) {
            return 'mob2';
        }
        if (name.includes('tab3')) {
            return 'mob3';
        }
    }
}

const Status = {
    StatusError: 'error',
    StatusInfo: 'info',
    StatusWait: 'wait',
    StatusStartGame: 'startgame',
    StatusGame: 'game',
    StatusGameOver: 'gameover'
};

let HeaderElems = [
    'own-healthBar',
    'own-healthVal',
    'own-nickname',
    'points',
    'rival-healthBar',
    'rival-healthVal',
    'rival-nickname',
    'buyPanel'
];

let BuyPanelElems = [
    'buyPanel-tab1',
    'buyPanel-tab2',
    'buyPanel-tab3'
];