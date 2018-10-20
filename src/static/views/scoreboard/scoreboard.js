function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function scoreboardTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"src\u002Fstatic\u002Fviews\u002Fscoreboard\u002Fscoreboard.pug":"extends ..\u002Flayout\u002Fmain\ninclude ..\u002Fmodules\u002Fheader\n\nblock title\n    | Simple Game\n\nblock header\n    +pageTitle('Leaders')\n\nblock content\n    div\n        a.button-menu(name='menu' href='') Back to menu\n\n\n\n\n","src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug":"\u002F\u002F- doctype html\n\u002F\u002F- html(lang=\"ru-RU\")\n\u002F\u002F- link(href=\"style.css\" rel=\"stylesheet\")\nhead\n    \u002F\u002F- meta(http-equiv=\"Content-Type\", content=\"text\u002Fhtml; charset=UTF-8\")\n    title\n        block title\n    \n    \u002F\u002F- link(rel=\"stylesheet\", type=\"text\u002Fcss\" href=\"css\u002Fmain.css\")\n\n    block header\nbody\n    block content\n    ","src\u002Fstatic\u002Fviews\u002Fmodules\u002Fheader.pug":"mixin pageTitle(name)\n    h1.pageTitle= name"};
var pug_indent = [];
;pug_debug_line = 1;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fmodules\u002Fheader.pug";
pug_mixins["pageTitle"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fmodules\u002Fheader.pug";
pug_html = pug_html + "\n";
pug_html = pug_html + pug_indent.join("");
pug_html = pug_html + "\u003Ch1 class=\"pageTitle\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fmodules\u002Fheader.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = name) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
};
;pug_debug_line = 4;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n\u003Chead\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n  \u003Ctitle\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "Simple Game\n  \u003C\u002Ftitle\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fscoreboard\u002Fscoreboard.pug";
pug_indent.push('  ');
pug_mixins["pageTitle"]('Leaders');
pug_indent.pop();
pug_html = pug_html + "\n\u003C\u002Fhead\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n\u003Cbody\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\n  \u003Cdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "\u003Ca class=\"button-menu\" name=\"menu\" href=\"\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Fscoreboard\u002Fscoreboard.pug";
pug_html = pug_html + "Back to menu\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n\u003C\u002Fbody\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}