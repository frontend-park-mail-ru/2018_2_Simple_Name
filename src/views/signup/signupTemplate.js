function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function signuptemplateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug":"extends ..\u002Flayout\u002FmainTemplate\ninclude ..\u002Fmodules\u002FheaderTemplate\n\nblock title\n    | Simple Game\n\nblock header\n    +pageTitle('Sign up')\n\nblock content\n  div\n    form#signupForm.info-block(method= 'POST')\n      div.form-group First Name:\n        input#firstname.form-control.capitalSymb(type='text' placeholder='First name' name='firstname')\n\n      div.form-group Last Name:\n        input#lastname.form-control.capitalSymb(type='text' placeholder='Last name' name='lastname')\n\n      div.form-group Age:\n        input#age.form-control(type='number' placeholder='21' min='1' max='125' name='age')\n\n      div.form-group Nickname:\n        input#nickname.form-control(type='text' placeholder='Nickname' name='nickname')\n\n      div.form-group Email:\n        input#email.form-control(type='email' placeholder='name@email.com' name='email')\n\n      div.form-group Password:\n        input#password.form-control(type='password' placeholder='Password', name='password')\n\n      div.form-group Confirm Password:\n        input#repeatPassword.form-control(type='password' placeholder='Repeat password', name='repeatPassword')\n\n      button.button.hvr-grow(type='submit') Sign up\n\n    a.button-menu.hvr-grow#backtomenu(name='menu' href='') Back to menu\n\n  div.warn-title #{statusText}\n\n        \n\n        ","src\u002Fviews\u002Flayout\u002FmainTemplate.pug":"head\n    title\n        block title\n\n    block header\n        \u002F\u002F- h1.pageTitle #{title}\nbody\n    block content\n    ","src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug":"mixin pageTitle(name)\n    h1.pageTitle= name"};
;var locals_for_with = (locals || {});(function (statusText) {;pug_debug_line = 1;pug_debug_filename = "src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug";
pug_mixins["pageTitle"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug";
pug_html = pug_html + "\u003Ch1 class=\"pageTitle\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
};
;pug_debug_line = 1;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Simple Game\u003C\u002Ftitle\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_mixins["pageTitle"]('Sign up');
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cform class=\"info-block\" id=\"signupForm\" method=\"POST\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "First Name:";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control capitalSymb\" id=\"firstname\" type=\"text\" placeholder=\"First name\" name=\"firstname\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Last Name:";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control capitalSymb\" id=\"lastname\" type=\"text\" placeholder=\"Last name\" name=\"lastname\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Age:";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" id=\"age\" type=\"number\" placeholder=\"21\" min=\"1\" max=\"125\" name=\"age\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Nickname:";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" id=\"nickname\" type=\"text\" placeholder=\"Nickname\" name=\"nickname\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Email:";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" id=\"email\" type=\"email\" placeholder=\"name@email.com\" name=\"email\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Password:";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" id=\"password\" type=\"password\" placeholder=\"Password\" name=\"password\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Confirm Password:";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" id=\"repeatPassword\" type=\"password\" placeholder=\"Repeat password\" name=\"repeatPassword\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"button hvr-grow\" type=\"submit\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Sign up\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Ca class=\"button-menu hvr-grow\" id=\"backtomenu\" name=\"menu\" href=\"\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "Back to menu\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"warn-title\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fviews\u002Fsignup\u002FsignupTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = statusText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E";}.call(this,"statusText" in locals_for_with?locals_for_with.statusText:typeof statusText!=="undefined"?statusText:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}