import { _decorator, Component, Node, Vec3, UITransform, find } from 'cc';
import { GameControl } from './GameControl';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    
    @property({
        type:Node,
        tooltip:'Ground 1 is here'
    })
    public ground1: Node;
    
    @property({
        type:Node,
        tooltip:'Ground 2 is here'
    })
    public ground2: Node;

    @property({
        type:Node,
        tooltip:'Ground 3 is here'
    })
    public ground3: Node;

    @property({
        type:Node,
        tooltip:'Ground 4 is here'
    })
    public ground4: Node;

    public groundWidth1: number;
    public groundWidth2: number;
    public groundWidth3: number;
    public groundWidth4: number;

    public temptStartLocation1 = new Vec3;
    public temptStartLocation2 = new Vec3;
    public temptStartLocation3 = new Vec3;
    public temptStartLocation4 = new Vec3;

    public gameCtrlSpeed = new GameControl;
    public gameSpeed: number = 50;

    onLoad(){
        this.gameCtrlSpeed = find("GameControl").getComponent(GameControl);
        this.startUp();
    }

    startUp() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;
        this.groundWidth4 = this.ground3.getComponent(UITransform).width;

        const y = this.ground1.position.y;
    
        this.temptStartLocation1.set(0, y, 0);
        this.temptStartLocation2.set(this.groundWidth1, y, 0);
        this.temptStartLocation3.set(this.groundWidth1 + this.groundWidth2, y, 0);
        this.temptStartLocation4.set(this.groundWidth1 + this.groundWidth2 + this.groundWidth3, y, 0);
        
        this.ground1.setPosition(this.temptStartLocation1);
        this.ground2.setPosition(this.temptStartLocation2);
        this.ground3.setPosition(this.temptStartLocation3);
        this.ground4.setPosition(this.temptStartLocation4);
    }

    update(deltaTime: number) {
        this.gameSpeed = this.gameCtrlSpeed.speed;

        this.temptStartLocation1.x -= this.gameSpeed * deltaTime;
        this.temptStartLocation2.x -= this.gameSpeed * deltaTime;
        this.temptStartLocation3.x -= this.gameSpeed * deltaTime;
        this.temptStartLocation4.x -= this.gameSpeed * deltaTime;

        if(this.temptStartLocation1.x <= -this.groundWidth1) {
            this.temptStartLocation1.x += this.groundWidth1 * 4;
        }
        if(this.temptStartLocation2.x <= -this.groundWidth2) {
            this.temptStartLocation2.x += this.groundWidth2 * 4;
        }
        if(this.temptStartLocation3.x <= -this.groundWidth3) {
            this.temptStartLocation3.x += this.groundWidth3 * 4;
        }
        if(this.temptStartLocation4.x <= -this.groundWidth4) {
            this.temptStartLocation4.x += this.groundWidth4 * 4;
        }

        this.ground1.setPosition(this.temptStartLocation1);
        this.ground2.setPosition(this.temptStartLocation2);
        this.ground3.setPosition(this.temptStartLocation3);
        this.ground4.setPosition(this.temptStartLocation4);
    }
}