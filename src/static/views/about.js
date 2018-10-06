function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}

var pug_match_html=/["&<>]/;
export default function template(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;pug_mixins["pageTitle"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Ch1 class=\"pageTitle\"\u003E" + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
};
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"ru-RU\"\u003E\u003C\u002Fhtml\u003E\u003Clink href=\"style.css\" rel=\"stylesheet\"\u003E\u003Chead\u003E\u003Ctitle\u003ESimple Game\u003C\u002Ftitle\u003E";
pug_mixins["pageTitle"]('About');
pug_html = pug_html + "\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv class=\"about-page\"\u003E\u003Cp\u003ELorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt\nut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in                 | voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\nnon proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\u003C\u002Fp\u003E\u003Ca class=\"button-menu\" href=\"menu.html\"\u003EBack to menu\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E";;return pug_html;}