import BaseView from '../baseView/baseView.js';
import aboutTemplate from './aboutTemplate.pug';

export default class AboutView extends BaseView {
    constructor(el) {
        super(el);
    }

    render() {
        this.el.innerHTML = aboutTemplate();
    }
}
