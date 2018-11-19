import BaseView from '../baseView/baseView.js';

export default class AboutView extends BaseView {
    constructor() {
        // this._data = {};
        this._element = document.createElement('div');
        document.querySelector('#root').appendChild(this._element);

        aboutView.__instance = this;
    }

    // get data() {
    //     return this._data;
    // }

    // set data(data = {}) {
    //     this._data = data;
    // }

    show() {
        this._element.style.display = 'div';
    }

    hide() {
        this._element.style.display = 'hide';
    }

    render() {
        this._element.innerHTML = window.abouttemplateTemplate(this._data);
    }
}
