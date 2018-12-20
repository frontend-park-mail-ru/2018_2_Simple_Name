import SimpleObj from './SimpleObj.js';

export default class AnimatedObj extends SimpleObj {
    constructor(root, name, typeClass, speed) {
        super(root, name, typeClass);

        const koefPosDur = 100;
        const overspeed = 4;
        const koefAnimDur = 300;
        if (speed > overspeed) { speed = overspeed - 1; }
        this.speed = speed;

        this.frame.style.animationDuration = `${(overspeed - this.speed) * koefAnimDur}ms`;
        this.frame.style.transitionDuration = `${koefPosDur}ms`;
        this.frame.style.webkitTransitionDuration = `${koefPosDur}ms`;
    }
}
