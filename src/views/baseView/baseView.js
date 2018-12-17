export default class BaseView {
    constructor(el) {
        this.el = el;

        this.el.dataset.view = this.constructor.name;
        this.el.hidden = true;
    }

    get active() {
        return !this.el.hidden;
    }

    hide() {
        this.el.hidden = true;
    }

    show(text = null) {
        this.el.hidden = false;
        this.render(text);
    }

    render() {

    }
}
