import BaseView from '../baseView/baseView.js';

export default class AboutView extends BaseView {
    constructor(el) {
        super(el);
    }

    // show() {
    //     this._element.style.display = 'div';
    // }
    //
    // hide() {
    //     this._element.style.display = 'hide';
    // }

    render() {
        this.el.innerHTML = window.abouttemplateTemplate();
    }
}
