import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';

export default class signupView extends BaseView {
    constructor(el){
        super(el);

    }

    render () {
        this.el.innerHTML = '';
        const signupSection = document.createElement('section');
        signupSection.dataset.sectionName = 'signup';

        this.section = signupSection;

        const signupHtml = window.signuptemplateTemplate() ;

        // this.section.innerHTML = signinHtml
        this.el.innerHTML = signupHtml;
    }

}