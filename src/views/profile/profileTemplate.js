function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function profiletemplateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug":"extends ..\u002Flayout\u002FmainTemplate\ninclude ..\u002Fmodules\u002FheaderTemplate\n\nblock title\n    | Simple Game\n\nblock header\n    +pageTitle('Profile')\n\nblock content\n    - var nickname = playerNickname\n    - var wayToAva = 'http:\u002F\u002F127.0.0.1:8080\u002Fuserpic'\n    div\n        form(method='POST' action='\u002F')#profileForm\n            div.form-group #{playerNickname}\n            img.form-group.profile-pic(src= imgSrc)\n            div.form-group Upload avatar:\n                input#newavatar(type='file', name='newavatar' enctype='multipart\u002Fform-data')\n            div.form-group Change password:\n                input#newpassword(type='password', placeholder='New Password', name='newpassword')\n            div.form-group\n                input#repeatnewpassword(type='password', placeholder='Repeat New Password', name='repeatnewpassword')\n                \n                button.button(type='submit') Save changes\n\n                div #{errText}\n    a.button-menu(name='menu' href='') Back to menu\n\n        ","src\u002Fviews\u002Flayout\u002FmainTemplate.pug":"head\n    title\n        block title\n\n    block header\n        \u002F\u002F- h1.pageTitle #{title}\nbody\n    block content\n    ","src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug":"mixin pageTitle(name)\n    h1.pageTitle= name"};
;var locals_for_with = (locals || {});(function (errText, imgSrc, playerNickname) {;pug_debug_line = 1;pug_debug_filename = "src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug";
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
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "Simple Game\u003C\u002Ftitle\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_mixins["pageTitle"]('Profile');
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
var nickname = playerNickname
;pug_debug_line = 12;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
var wayToAva = 'http://127.0.0.1:8080/userpic'
;pug_debug_line = 13;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cform method=\"POST\" action=\"\u002F\" id=\"profileForm\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = playerNickname) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"form-group profile-pic\""+pug_attr("src", imgSrc, true, false)) + "\u002F\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "Upload avatar:";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cinput id=\"newavatar\" type=\"file\" name=\"newavatar\" enctype=\"multipart\u002Fform-data\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "Change password:";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cinput id=\"newpassword\" type=\"password\" placeholder=\"New Password\" name=\"newpassword\"\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cinput id=\"repeatnewpassword\" type=\"password\" placeholder=\"Repeat New Password\" name=\"repeatnewpassword\"\u002F\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"button\" type=\"submit\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "Save changes\u003C\u002Fbutton\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = errText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "\u003Ca class=\"button-menu\" name=\"menu\" href=\"\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fviews\u002Fprofile\u002FprofileTemplate.pug";
pug_html = pug_html + "Back to menu\u003C\u002Fa\u003E\u003C\u002Fbody\u003E";}.call(this,"errText" in locals_for_with?locals_for_with.errText:typeof errText!=="undefined"?errText:undefined,"imgSrc" in locals_for_with?locals_for_with.imgSrc:typeof imgSrc!=="undefined"?imgSrc:undefined,"playerNickname" in locals_for_with?locals_for_with.playerNickname:typeof playerNickname!=="undefined"?playerNickname:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}