(function () {
    class SimpleObj {
        constructor(root, name, typeClass) {
            this.root = root;
            this.name = name;
            this.typeClass = typeClass;
            this.frame = createFrame(root, name, typeClass);
            this.frame.onmousedown = () => { return false; };
            this.frame.onselectstart = () => { return false; };
        }
        hide() {
            this.frame.classList.add("hide");
        }
        show() {
            this.frame.classList.remove("hide");
        }
        setPositionPX(x, y) {

            if (x + this.area().width / 2 > this.root.getBoundingClientRect().right) {
                x = this.root.getBoundingClientRect().right - this.area().width / 2;
            }
            if (x - this.area().width / 2 < this.root.getBoundingClientRect().left) {
                x = this.root.getBoundingClientRect().left + this.area().width / 2;
            }
            if (y - this.area().height / 2 < this.root.getBoundingClientRect().top) {
                y = this.root.getBoundingClientRect().top + this.area().height / 2;
            }
            if (y + this.area().height / 2 > this.root.getBoundingClientRect().bottom) {
                y = this.root.getBoundingClientRect().bottom - this.area().height / 2;
            }
            this.x = x - this.area().width / 2;
            this.y = y - this.area().height / 2;

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

        setType(typeClass) {
            this.typeClass = typeClass;
            this.frame.className = typeClass;
        }

        setWidth(width) {
            this.frame.style.width = `${width}px`;
        }

        addType(typeClass) {
            this.frame.classList.add(typeClass);
        }
        removeType(typeClass) {
            this.frame.classList.remove(typeClass)
        }
        area() {
            const width = this.frame.getBoundingClientRect().width;
            const height = this.frame.getBoundingClientRect().height;
            return { width: width, height: height }
        }

        pos() {
            const x = this.frame.getBoundingClientRect().x + this.area().width / 2;
            const y = this.frame.getBoundingClientRect().y + this.area().height / 2;
            return { x: x, y: y };
        }

        clearFrame() {
            this.frame.innerHTML = "";
        }

        getTypeClass() {
            return this.typeClass;
        }
    }

    class AnimatedObj extends SimpleObj {
        constructor(root, name, typeClass, speed) {
            super(root, name, typeClass);

            const koefPosDur = 500;
            const overspeed = 4;
            const koefAnimDur = 200;
            if (speed > overspeed) { speed = overspeed - 1; }
            this.speed = speed;

            this.frame.style.animationDuration = `${(overspeed - this.speed) * koefAnimDur}ms`;
            this.frame.style.transitionDuration = `${(overspeed - this.speed) * koefPosDur}ms`;
            this.frame.style.webkitTransitionDuration = `${(overspeed - this.speed) * koefPosDur}ms`;
        }
    }

    function createFrame(root, name, typeClass) {
        const frame = document.createElement('div');
        root.appendChild(frame);
        frame.id = name;
        frame.name = name;
        frame.classList = typeClass;
        return frame;
    }

    window.SimpleObj = SimpleObj;
    window.AnimatedObj = AnimatedObj;
}());