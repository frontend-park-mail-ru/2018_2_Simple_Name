function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function mainTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug":"\u002F\u002F- doctype html\n\u002F\u002F- html(lang=\"ru-RU\")\n\u002F\u002F- link(href=\"style.css\" rel=\"stylesheet\")\nhead\n    \u002F\u002F- meta(http-equiv=\"Content-Type\", content=\"text\u002Fhtml; charset=UTF-8\")\n    title\n        block title\n    \n    \u002F\u002F- link(rel=\"stylesheet\", type=\"text\u002Fcss\" href=\"css\u002Fmain.css\")\n\n    block header\nbody\n    block content\n    "};
var pug_indent = [];
;pug_debug_line = 4;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n\u003Chead\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n  \u003Ctitle\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n  \u003C\u002Ftitle\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n\u003C\u002Fhead\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n\u003Cbody\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fstatic\u002Fviews\u002Flayout\u002Fmain.pug";
pug_html = pug_html + "\n\u003C\u002Fbody\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}