function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function scoreboardtemplateTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug":"extends ..\u002Flayout\u002FmainTemplate\ninclude ..\u002Fmodules\u002FheaderTemplate\n\nblock title\n    | Simple Game\n\nblock header\n    +pageTitle('Leaders')\n\nblock content\n\n    div\n        mixin scoreTable(players)\n            table.score-table\n                tr\n                    each val in ['Nickname', 'Score']\n                        th= val \n                each user in players\n                    tr\n                        td= user.nick\n                        td= user.score\n                \n        mixin pagination(amount, active)\n            .pagination\n                \u002F\u002F- prev arrow\n                if (amount \u003E 1)\n                    a(href='' title=\"Prev page\" name= index) ◀\n\n                    - for (var index = 1; index \u003C= amount; index++)\n\n                        - var titleName = 'Current page ' + index;\n                        - var pageName = index;\n\n                        if (index === active)\n                            a(href='' title= titleName name= pageName).active= index\n                        else\n                            a(href='' title= b name= pageName)= index\n\n                    \u002F\u002F- next arrow\n                    a(href='' title=\"Next page\") ▶\n\n        +scoreTable(inputPlayers)\n\n        div#pagination\n            +pagination(pagesCount, pageIndex)\n\n    a.button-menu.hvr-grow#backtomenu(name='menu' href='') Back to menu\n\n    div.warn-title #{statusText}\n\n\n\n\n","src\u002Fviews\u002Flayout\u002FmainTemplate.pug":"head\n    title\n        block title\n\n    block header\n        \u002F\u002F- h1.pageTitle #{title}\nbody\n    block content\n    ","src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug":"mixin pageTitle(name)\n    h1.pageTitle= name"};
;var locals_for_with = (locals || {});(function (b, inputPlayers, pageIndex, pagesCount, statusText) {;pug_debug_line = 1;pug_debug_filename = "src\u002Fviews\u002Fmodules\u002FheaderTemplate.pug";
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
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "Simple Game\u003C\u002Ftitle\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_mixins["pageTitle"]('Leaders');
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fviews\u002Flayout\u002FmainTemplate.pug";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_mixins["scoreTable"] = pug_interp = function(players){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 14;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctable class=\"score-table\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
// iterate ['Nickname', 'Score']
;(function(){
  var $$obj = ['Nickname', 'Score'];
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var val = $$obj[pug_index0];
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = val) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var val = $$obj[pug_index0];
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = val) ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftr\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
// iterate players
;(function(){
  var $$obj = players;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var user = $$obj[pug_index1];
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.nick) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.score) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var user = $$obj[pug_index1];
;pug_debug_line = 19;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.nick) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.score) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftable\u003E";
};
;pug_debug_line = 23;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_mixins["pagination"] = pug_interp = function(amount, active){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 24;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"pagination\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
if ((amount > 1)) {
;pug_debug_line = 27;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ca" + (" href=\"\" title=\"Prev page\""+pug_attr("name", index, true, false)) + "\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "◀\u003C\u002Fa\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
for (var index = 1; index <= amount; index++)
{
;pug_debug_line = 31;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
var titleName = 'Current page ' + index;
;pug_debug_line = 32;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
var pageName = index;
;pug_debug_line = 34;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
if ((index === active)) {
;pug_debug_line = 35;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"active\""+" href=\"\""+pug_attr("title", titleName, true, false)+pug_attr("name", pageName, true, false)) + "\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = index) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 37;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ca" + (" href=\"\""+pug_attr("title", b, true, false)+pug_attr("name", pageName, true, false)) + "\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = index) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}
;pug_debug_line = 40;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ca href=\"\" title=\"Next page\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "▶\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 42;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_mixins["scoreTable"](inputPlayers);
;pug_debug_line = 44;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Cdiv id=\"pagination\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_mixins["pagination"](pagesCount, pageIndex);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Ca class=\"button-menu hvr-grow\" id=\"backtomenu\" name=\"menu\" href=\"\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "Back to menu\u003C\u002Fa\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"warn-title\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fviews\u002Fscoreboard\u002FscoreboardTemplate.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = statusText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E";}.call(this,"b" in locals_for_with?locals_for_with.b:typeof b!=="undefined"?b:undefined,"inputPlayers" in locals_for_with?locals_for_with.inputPlayers:typeof inputPlayers!=="undefined"?inputPlayers:undefined,"pageIndex" in locals_for_with?locals_for_with.pageIndex:typeof pageIndex!=="undefined"?pageIndex:undefined,"pagesCount" in locals_for_with?locals_for_with.pagesCount:typeof pagesCount!=="undefined"?pagesCount:undefined,"statusText" in locals_for_with?locals_for_with.statusText:typeof statusText!=="undefined"?statusText:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}