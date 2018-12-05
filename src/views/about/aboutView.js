import BaseView from '../baseView/baseView.js';

export default class AboutView extends BaseView {
    constructor(el) {
        super(el);
    }

    render() {
        this.el.innerHTML = window.abouttemplateTemplate();
    }
}
