(function () {
    class SimpleObj {
        constructor(root, name, type) {
            this.root = root;
            this.name = name;
            this.type = type;
            this.frame = createFrame(root, name, type);
            this.frame.onmousedown = () => { return false; };
            this.frame.onselectstart = () => { return false; };
        }

        setPositionPX(x, y) {

            if (x + this.width() / 2 > this.root.getBoundingClientRect().right) {
                x = this.root.getBoundingClientRect().right - this.width() / 2;
            }
            if (x - this.width() / 2 < this.root.getBoundingClientRect().left) {
                x = this.root.getBoundingClientRect().left + this.width() / 2;
            }
            if (y - this.height() / 2 < this.root.getBoundingClientRect().top) {
                y = this.root.getBoundingClientRect().top + this.height() / 2;
            }
            if (y + this.height() / 2 > this.root.getBoundingClientRect().bottom) {
                y = this.root.getBoundingClientRect().bottom - this.height() / 2;
            }
            this.x = x - this.width() / 2;
            this.y = y - this.height() / 2;

            this.frame.style.left = `${this.x}px`;
            this.frame.style.top = `${this.y}px`;
        }

        setPositionPerc(x, y) {
            this.frame.style.left = `${x}%`;
            this.frame.style.top = `${y}%`;
        }

        setTextBox(text) {
            this.frame.innerText = text;
        }

        setType(type) {
            this.type = type;
            this.frame.className = type;
        }

        setWidth(width) {
            this.frame.style.width = `${width}px`;
        }

        addType(type) {
            this.frame.classList.add(type);
        }

        width() {
            return this.frame.clientWidth;
        }

        height() {
            return this.frame.clientHeight;
        }

        x() {
            return this.frame.getBoundingClientRect().x;
        }

        y() {
            return this.frame.getBoundingClientRect().y;
        }

        clearFrame() {
            this.frame.innerHTML = "";
        }
    }

    class AnimatedObj extends simpleObj {
        constructor(root, name, type, speed) {
            super(root, name, type);

            const koefPosDur = 500;
            const overspeed = 4;
            const koefAnimDur = 200;
            if (speed > overspeed) { speed = overspeed - 1; }
            this.speed = speed;

            this.frame.style.animationDuration = `${(overspeed - this.speed) * koefAnimDur}ms`;
            this.frame.style.animationIterationCount = "infinite";
            this.frame.style.transitionDuration = `${(overspeed - this.speed) * koefPosDur}ms`;
            this.frame.style.webkitTransitionDuration = `${(overspeed - this.speed) * koefPosDur}ms`;
        }
    }

    function createFrame(root, name, type) {
        const frame = document.createElement('div');
        root.appendChild(frame);
        frame.id = name;
        frame.className = type;
        return frame;
    }

    window.SimpleObj = SimpleObj;
    window.AnimatedObj = AnimatedObj;
}());