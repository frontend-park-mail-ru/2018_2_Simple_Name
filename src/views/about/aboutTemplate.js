function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function abouttemplateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"src\u002Fviews\u002Fabout\u002FaboutTemplate.pug":"extends ..\u002Flayout\u002FmainTemplate\ninclude ..\u002Fmodules\u002FheaderTemplate\n\nblock title\n    | Simple Game\n\nblock header\n    +pageTitle('About')\n\nblock content\n    div.about-page\n        p\n            | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt\n            | ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco\n            | laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in                 \n            | voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat\n            | non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n    a#backtomenu.button-menu.hvr-grow(name='menu' href='\u002F') Back to menu","src\u002Fviews\u002Flayout\u002FmainTemplate.pug":"head\n    title\n        block title\n\n    block header\n        \u002F\u002F- h1.pageTitle #{title}\nbody\n    block content\n    ","src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug":"mixin pageTitle(name)\n    h1.pageTitle= name"};
;pug_debug_line = 1;pug_debug_filename = "src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug";
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
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "Simple Game\u003C\u002Ftitle\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_mixins["pageTitle"]('About');
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"about-page\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in                 ";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "\u003Ca class=\"button-menu hvr-grow\" id=\"backtomenu\" name=\"menu\" href=\"\u002F\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fabout\u002FaboutTemplate.pug";
pug_html = pug_html + "Back to menu\u003C\u002Fa\u003E\u003C\u002Fbody\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}