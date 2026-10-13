import { _decorator, Component, Node, Vec3, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => Math.random() * (max - min) + min;

@ccclass('Pipes')
export class Pipes extends Component {
    @property({ type: Node, tooltip: 'Top Pipe' })
    public topPipe: Node;

    @property({ type: Node, tooltip: 'Bottom Pipe' })
    public bottomPipe: Node;

    public game;
    public pipeSpeed: number;
    public isPass: boolean;
    public spawnedNext: boolean;

    onLoad() {
        this.game = find("GameControl").getComponent("GameControl");
        this.pipeSpeed = this.game.pipeSpeed;
    }

    onEnable() {
        this.initPos();
        this.isPass = false;
        this.spawnedNext = false;
    }

    initPos() {
        const gap = random(180, 260);
        const centerY = random(300, 660);
        const s = this.node.scale.y;

        this.topPipe.setPosition(0, gap / (2 * s), 0);
        this.bottomPipe.setPosition(0, -(320 + gap / (2 * s)), 0);
        this.node.setPosition(744, centerY, 0);

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        this.node.setPosition(pos.x - this.pipeSpeed * deltaTime, pos.y, pos.z);

        if (!this.isPass && this.node.position.x <= 320) {
            this.isPass = true;
            this.game.passPipe();
        }

        if (!this.spawnedNext && pos.x <= 400) {
            this.spawnedNext = true;
            this.game.createPipe();
        }

        if (this.node.position.x < -110) {
            this.node.destroy();
        }
    }
}