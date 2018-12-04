import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';

export default class signinView extends BaseView {
    constructor(el){
        super(el);

    }

    render () {
        this.el.innerHTML = '';
        const signinSection = document.createElement('section');
        signinSection.dataset.sectionName = 'signin';

        this.section = signinSection;

        const signinHtml = window.signintemplateTemplate() ;

        // this.section.innerHTML = signinHtml
        this.el.innerHTML = signinHtml;
    }

}