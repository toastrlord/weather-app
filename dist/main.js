(()=>{"use strict";const t=async function(){return`&appid=${await a("api_key.txt","text")}`}(),e=async function(){return a("city_list.json","json")}(),n=async function(){return a("country_codes.json","json")}(),r=async function(){return a("us_states.json","json")}();async function a(t,e){try{const n=await fetch(t);return await n[e]()}catch(t){console.log(t)}}function i(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function o(t){i(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function u(t){i(1,arguments);var e=o(t);return!isNaN(e)}var s={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function c(t){return function(e){var n=e||{},r=n.width?String(n.width):t.defaultWidth;return t.formats[r]||t.formats[t.defaultWidth]}}var d,l={date:c({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:c({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:c({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},h={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function m(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,o=a.width?String(a.width):i;r=t.formattingValues[o]||t.formattingValues[i]}else{var u=t.defaultWidth,s=a.width?String(a.width):t.defaultWidth;r=t.values[s]||t.values[u]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function f(t){return function(e,n){var r=String(e),a=n||{},i=a.width,o=i&&t.matchPatterns[i]||t.matchPatterns[t.defaultMatchWidth],u=r.match(o);if(!u)return null;var s,c=u[0],d=i&&t.parsePatterns[i]||t.parsePatterns[t.defaultParseWidth];return s="[object Array]"===Object.prototype.toString.call(d)?function(t,e){for(var n=0;n<t.length;n++)if(t[n].test(c))return n}(d):function(t,e){for(var n in t)if(t.hasOwnProperty(n)&&t[n].test(c))return n}(d),s=t.valueCallback?t.valueCallback(s):s,{value:s=a.valueCallback?a.valueCallback(s):s,rest:r.slice(c.length)}}}const g={code:"en-US",formatDistance:function(t,e,n){var r;return n=n||{},r="string"==typeof s[t]?s[t]:1===e?s[t].one:s[t].other.replace("{{count}}",e),n.addSuffix?n.comparison>0?"in "+r:r+" ago":r},formatLong:l,formatRelative:function(t,e,n,r){return h[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:m({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:m({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:m({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:m({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:m({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(d={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t,e){var n=String(t),r=e||{},a=n.match(d.matchPattern);if(!a)return null;var i=a[0],o=n.match(d.parsePattern);if(!o)return null;var u=d.valueCallback?d.valueCallback(o[0]):o[0];return{value:u=r.valueCallback?r.valueCallback(u):u,rest:n.slice(i.length)}}),era:f({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:f({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:f({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:f({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:f({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function w(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function y(t,e){i(2,arguments);var n=o(t).getTime(),r=w(e);return new Date(n+r)}function v(t,e){i(2,arguments);var n=w(e);return y(t,-n)}function p(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const b=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return p("yy"===e?r%100:r,e.length)},C=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):p(n+1,2)},T=function(t,e){return p(t.getUTCDate(),e.length)},M=function(t,e){return p(t.getUTCHours()%12||12,e.length)},x=function(t,e){return p(t.getUTCHours(),e.length)},D=function(t,e){return p(t.getUTCMinutes(),e.length)},k=function(t,e){return p(t.getUTCSeconds(),e.length)},P=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return p(Math.floor(r*Math.pow(10,n-3)),e.length)};var S=864e5;function E(t){i(1,arguments);var e=1,n=o(t),r=n.getUTCDay(),a=(r<e?7:0)+r-e;return n.setUTCDate(n.getUTCDate()-a),n.setUTCHours(0,0,0,0),n}function U(t){i(1,arguments);var e=o(t),n=e.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(n+1,0,4),r.setUTCHours(0,0,0,0);var a=E(r),u=new Date(0);u.setUTCFullYear(n,0,4),u.setUTCHours(0,0,0,0);var s=E(u);return e.getTime()>=a.getTime()?n+1:e.getTime()>=s.getTime()?n:n-1}function W(t){i(1,arguments);var e=U(t),n=new Date(0);n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0);var r=E(n);return r}var N=6048e5;function Y(t,e){i(1,arguments);var n=e||{},r=n.locale,a=r&&r.options&&r.options.weekStartsOn,u=null==a?0:w(a),s=null==n.weekStartsOn?u:w(n.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=o(t),d=c.getUTCDay(),l=(d<s?7:0)+d-s;return c.setUTCDate(c.getUTCDate()-l),c.setUTCHours(0,0,0,0),c}function L(t,e){i(1,arguments);var n=o(t,e),r=n.getUTCFullYear(),a=e||{},u=a.locale,s=u&&u.options&&u.options.firstWeekContainsDate,c=null==s?1:w(s),d=null==a.firstWeekContainsDate?c:w(a.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(r+1,0,d),l.setUTCHours(0,0,0,0);var h=Y(l,e),m=new Date(0);m.setUTCFullYear(r,0,d),m.setUTCHours(0,0,0,0);var f=Y(m,e);return n.getTime()>=h.getTime()?r+1:n.getTime()>=f.getTime()?r:r-1}function q(t,e){i(1,arguments);var n=e||{},r=n.locale,a=r&&r.options&&r.options.firstWeekContainsDate,o=null==a?1:w(a),u=null==n.firstWeekContainsDate?o:w(n.firstWeekContainsDate),s=L(t,e),c=new Date(0);c.setUTCFullYear(s,0,u),c.setUTCHours(0,0,0,0);var d=Y(c,e);return d}var O=6048e5;function j(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=e||"";return n+String(a)+o+p(i,2)}function F(t,e){return t%60==0?(t>0?"-":"+")+p(Math.abs(t)/60,2):z(t,e)}function z(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+p(Math.floor(a/60),2)+n+p(a%60,2)}const H={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return b(t,e)},Y:function(t,e,n,r){var a=L(t,r),i=a>0?a:1-a;return"YY"===e?p(i%100,2):"Yo"===e?n.ordinalNumber(i,{unit:"year"}):p(i,e.length)},R:function(t,e){return p(U(t),e.length)},u:function(t,e){return p(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return p(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return p(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return C(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return p(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){var a=function(t,e){i(1,arguments);var n=o(t),r=Y(n,e).getTime()-q(n,e).getTime();return Math.round(r/O)+1}(t,r);return"wo"===e?n.ordinalNumber(a,{unit:"week"}):p(a,e.length)},I:function(t,e,n){var r=function(t){i(1,arguments);var e=o(t),n=E(e).getTime()-W(e).getTime();return Math.round(n/N)+1}(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):p(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):T(t,e)},D:function(t,e,n){var r=function(t){i(1,arguments);var e=o(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var r=e.getTime(),a=n-r;return Math.floor(a/S)+1}(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):p(r,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return p(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return p(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return p(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return M(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):x(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):p(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):p(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):D(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):k(t,e)},S:function(t,e){return P(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return F(a);case"XXXX":case"XX":return z(a);case"XXXXX":case"XXX":default:return z(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return F(a);case"xxxx":case"xx":return z(a);case"xxxxx":case"xxx":default:return z(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+j(a,":");case"OOOO":default:return"GMT"+z(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+j(a,":");case"zzzz":default:return"GMT"+z(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return p(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return p((r._originalDate||t).getTime(),e.length)}};function X(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}}function Q(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}}const G={p:Q,P:function(t,e){var n,r=t.match(/(P+)(p+)?/),a=r[1],i=r[2];if(!i)return X(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;case"PPPP":default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",X(a,e)).replace("{{time}}",Q(i,e))}};function B(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var $=["D","DD"],A=["YY","YYYY"];function R(t){return-1!==$.indexOf(t)}function _(t){return-1!==A.indexOf(t)}function J(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var I=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,K=/^'([^]*?)'?$/,Z=/''/g,tt=/[a-zA-Z]/;function et(t){return t.match(K)[1].replace(Z,"'")}function nt(t,e){i(2,arguments);var n=o(t),r=w(e);return isNaN(r)?new Date(NaN):r?(n.setDate(n.getDate()+r),n):n}function rt(t,e){i(2,arguments);var n=o(t),r=w(e);if(isNaN(r))return new Date(NaN);if(!r)return n;var a=n.getDate(),u=new Date(n.getTime());u.setMonth(n.getMonth()+r+1,0);var s=u.getDate();return a>=s?u:(n.setFullYear(u.getFullYear(),u.getMonth(),a),n)}const at="F";let it=at;function ot(t,e){if(it===e)return t;if("C"===it)return 5*(t-32)/9;if(it===at)return 9*t/5+32;throw new Error(`Invalid units system! (${e})`)}function ut(t,e,n){const r=ot(e,n);return`${t} ${Math.round(r)}°${it}`}const st=new Date,ct=(new Date).getDay(),dt={clear:"01d",clouds:"02d","scattered clouds":"03d","broken clouds":"04d","shower rain":"09d",rain:"10d",thunderstorm:"11d",snow:"13d",mist:"50d"};function lt(t,e,n){const r=document.createElement("div");return r.textContent=ut(t,e,n),r.classList.add("temperature"),r.dataset.unroundedTemp=ot(e,n),r}function ht(t,e){const n=document.createElement("div");n.classList.add("weather-data-display"),n.appendChild(function(t){const e=document.createElement("div");return e.classList.add("weekday"),e.textContent=function(t){return function(t,e,n){i(2,arguments);var r=String(e),a=n||{},s=a.locale||g,c=s.options&&s.options.firstWeekContainsDate,d=null==c?1:w(c),l=null==a.firstWeekContainsDate?d:w(a.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=s.options&&s.options.weekStartsOn,m=null==h?0:w(h),f=null==a.weekStartsOn?m:w(a.weekStartsOn);if(!(f>=0&&f<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var y=o(t);if(!u(y))throw new RangeError("Invalid time value");var p=v(y,B(y)),b={firstWeekContainsDate:l,weekStartsOn:f,locale:s,_originalDate:y};return r.match(V).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,G[e])(t,s.formatLong,b):t})).join("").match(I).map((function(n){if("''"===n)return"'";var r=n[0];if("'"===r)return et(n);var i=H[r];if(i)return!a.useAdditionalWeekYearTokens&&_(n)&&J(n,e,t),!a.useAdditionalDayOfYearTokens&&R(n)&&J(n,e,t),i(p,n,s.localize,b);if(r.match(tt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+r+"`");return n})).join("")}(function(t,e){if(i(2,arguments),!e||"object"!=typeof e)return new Date(NaN);var n="years"in e?w(e.years):0,r="months"in e?w(e.months):0,a="weeks"in e?w(e.weeks):0,u="days"in e?w(e.days):0,s="hours"in e?w(e.hours):0,c="minutes"in e?w(e.minutes):0,d="seconds"in e?w(e.seconds):0,l=o(t),h=r||n?rt(l,r+12*n):l,m=u||a?nt(h,u+7*a):h,f=1e3*(d+60*(c+60*s));return new Date(m.getTime()+f)}(st,{days:t}),"MMMM do")}(t),e}(e)),n.appendChild(function(t){const e=document.createElement("div");return e.classList.add("weekday"),e.textContent=function(t){if(0===t)return"Today";switch((ct+t)%7){case 0:return"Sunday";case 1:return"Monday";case 2:return"Tuesday";case 3:return"Wednesday";case 4:return"Thursday";case 5:return"Friday";case 6:return"Saturday"}}(t),e}(e)),n.appendChild(function(t){const e=document.createElement("img");return e.src=function(t){if(dt.hasOwnProperty(t))return`http://openweathermap.org/img/wn/${dt[t]}@2x.png`;console.log(`No icon found for ${t}`)}(t.weatherDescription.toLowerCase()),e}(t)),n.appendChild(function(t){const e=document.createElement("div");return e.textContent=t.weatherDescription,e.classList.add("weather-condition"),e}(t));const r=document.createElement("div");return r.classList.add("temperature-container"),r.appendChild(lt("Hi:",t.maxTemp,t.units)),r.appendChild(lt("Lo:",t.minTemp,t.units)),n.appendChild(r),n}function mt(t){const e=document.createElement("div");return e.textContent=t,e.classList.add("city-entry"),e}const ft=document.querySelector("#submit-button"),gt=document.querySelector("#city-name"),wt=(document.querySelector("#fahrenheit"),document.querySelector("#celsius"),document.querySelector("#display")),yt=document.querySelector("#temp-swap"),vt=document.querySelector("form");function pt(){for(;wt.firstChild;)wt.firstChild.remove()}async function bt(e){pt();try{const n=document.createElement("div");void 0!==e.state?n.textContent=`Weekly forecast for ${e.name}, ${e.state}, ${e.country}`:n.textContent=`Weekly forecast for ${e.name}, ${e.country}`,n.classList.add("city-header");const r=await async function(e){try{const n=`https://api.openweathermap.org/data/2.5/onecall?lat=${e.coord.lat}&lon=${e.coord.lon}&exclude=minutely,hourly&units=imperial${await t}`,r=await fetch(n,{mode:"cors"});return(await r.json()).daily.map((t=>{return{weatherDescription:(e=t).weather[0].main,clouds:e.clouds,humidity:e.humidity,rain:e.rain,maxTemp:e.temp.max,minTemp:e.temp.min,units:"F"};var e}))}catch(t){console.log(t)}}(e),a=document.createElement("div");a.classList.add("flex-container"),r.forEach(((t,e)=>{const n=ht(t,e);a.appendChild(n)})),wt.appendChild(n),wt.appendChild(a)}catch(t){console.log(t)}}ft.addEventListener("click",(()=>{gt.checkValidity()&&async function(t){pt();const a=await async function(t){const a=t.toLowerCase().trim();try{const t=(await e).filter((t=>t.name.toLowerCase()===a)),i=await n,o=await r;return(await t).map((t=>{const e=i[t.country];if(t.hasOwnProperty("state")){const n=o[t.state];return{name:t.name,state:n,country:e,coord:t.coord}}return{name:t.name,country:e,coord:t.coord}}))}catch(t){console.log(t)}}(t);if(0===a.length)!function(t){const e=document.createElement("div");e.classList.add("error-message"),e.textContent="No cities found!",wt.appendChild(e)}();else if(1===a.length)bt(a[0]);else{const t=document.createElement("div");t.classList.add("city-message"),t.textContent=`${a.length} cities found! Select one:`,wt.appendChild(t);const e=document.createElement("div");e.classList.add("flex-container"),wt.appendChild(e),a.forEach((t=>{const n=function(t){const e=document.createElement("div");return e.classList.add("city-data-display"),e.appendChild(mt(t.name)),t.hasOwnProperty("state")&&e.appendChild(mt(t.state)),t.hasOwnProperty("country")&&e.appendChild(mt(t.country)),e}(t);e.appendChild(n),n.addEventListener("click",(()=>{bt(t)}))}))}}(gt.value)})),yt.addEventListener("change",(()=>{it=it===at?"C":at;const t=wt.querySelectorAll(".weather-data-display");t&&t.forEach((t=>{t.querySelectorAll(".temperature").forEach((t=>{const e=t.textContent.split(" ")[0],n=t.textContent.split("°")[1],r=parseFloat(t.dataset.unroundedTemp);t.textContent=ut(e,r,n),t.dataset.unroundedTemp=ot(r,n)}))}))})),vt.addEventListener("keydown",(t=>{"Enter"===t.key&&ft.click()}))})();