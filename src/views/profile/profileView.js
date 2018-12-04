import BaseView from "../baseView/baseView.js";
import bus from '../../js/modules/EventBus.js';

export default class profileView extends BaseView {
    constructor(el){
        super(el);

    }

    render () {
        this.el.innerHTML = '';
        const profileSection = document.createElement('section');
        profileSection.dataset.sectionName = 'profile';

        this.section = profileSection;

        const profileHtml = window.profiletemplateTemplate() ;

        // this.section.innerHTML = signinHtml
        this.el.innerHTML = profileHtml;
    }

}