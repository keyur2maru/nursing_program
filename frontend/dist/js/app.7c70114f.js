(function(){"use strict";var e={3295:function(e,t,r){var n=r(9242),a=r(3396),o=r(7139);const i=(0,a._)("div",{class:"title-container"},[(0,a._)("h1",{class:"title"},"Nursing Program Results")],-1),s={class:"container"},c={class:"tab-buttons"},d=["onClick"],u={class:"search-bar"},l={class:"candidates"},f=(0,a._)("canvas",{id:"confetti-canvas"},null,-1);function p(e,t,r,p,h,b){const v=(0,a.up)("CandidateTable");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",{class:(0,o.C_)({"dark-mode":h.isDarkMode,app:!0})},[i,(0,a._)("div",s,[(0,a._)("div",c,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(h.tabs,(e=>((0,a.wg)(),(0,a.iD)("button",{key:e,class:(0,o.C_)({active:h.activeTab===e}),onClick:t=>h.activeTab=e},(0,o.zw)(e)+" Candidates",11,d)))),128)),(0,a._)("button",{class:"toggle-theme",onClick:t[0]||(t[0]=(...e)=>b.toggleDarkMode&&b.toggleDarkMode(...e))},"🌓 Toggle Dark/Light Mode")]),(0,a._)("div",u,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>h.searchQuery=e),type:"text",placeholder:"Search by name..."},null,512),[[n.nr,h.searchQuery]])]),(0,a._)("div",l,[(0,a.Wm)(v,{candidates:b.sortedCandidates,sortOptions:{currentSort:h.currentSort,currentSortDir:h.currentSortDir},onSort:b.handleSort},null,8,["candidates","sortOptions","onSort"])])])],2),f],64)}const h={class:"candidate-table"},b={class:"min-w-full table-auto border-collapse border border-gray-200 mt-4"},v={class:"bg-gray-100"},g=["onClick","aria-label","aria-sort"],y={key:0},m={class:"border border-gray-300 p-2"},S={class:"border border-gray-300 p-2"},w={class:"border border-gray-300 p-2"},C={class:"border border-gray-300 p-2"},_={class:"border border-gray-300 p-2"},k={class:"border border-gray-300 p-2"},O={class:"border border-gray-300 p-2"};function A(e,t,r,n,i,s){return(0,a.wg)(),(0,a.iD)("div",h,[(0,a._)("table",b,[(0,a._)("thead",v,[(0,a._)("tr",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.headers,(e=>((0,a.wg)(),(0,a.iD)("th",{key:e.value,onClick:t=>s.requestSort(e.value),role:"button","aria-label":`Sort by ${e.text}`,"aria-sort":s.getAriaSort(e.value),class:"sort-header"},[(0,a.Uk)((0,o.zw)(e.text)+" ",1),r.sortOptions.currentSort===e.value?((0,a.wg)(),(0,a.iD)("span",y,(0,o.zw)("asc"===r.sortOptions.currentSortDir?"↑":"↓"),1)):(0,a.kq)("",!0)],8,g)))),128))])]),(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.candidates,(e=>((0,a.wg)(),(0,a.iD)("tr",{key:e.name,class:"hover:bg-gray-50"},[(0,a._)("td",m,(0,o.zw)(e.name),1),(0,a._)("td",S,(0,o.zw)(e.scoreBreakdown.teasScoreGreaterThan62),1),(0,a._)("td",w,(0,o.zw)(e.scoreBreakdown.nonScienceGPAGreaterThan2_5),1),(0,a._)("td",C,(0,o.zw)(e.scoreBreakdown.scienceGPAGreaterThan3_0),1),(0,a._)("td",_,(0,o.zw)(e.scoreBreakdown.hasAllPreReqs),1),(0,a._)("td",k,(0,o.zw)(e.scoreBreakdown.hasAaAs),1),(0,a._)("td",O,(0,o.zw)(e.totalScore),1)])))),128))])])])}var D={name:"CandidateTable",props:{candidates:Array,sortOptions:{type:Object,default:()=>({currentSort:"",currentSortDir:""})}},data(){return{headers:[{text:"Student Name",value:"name"},{text:"TEAS Score",value:"teasScoreGreaterThan62"},{text:"Non-Science GPA",value:"nonScienceGPAGreaterThan2_5"},{text:"Science GPA",value:"scienceGPAGreaterThan3_0"},{text:"Has all Pre-Reqs?",value:"hasAllPreReqs"},{text:"Has AA/AS?",value:"hasAaAs"},{text:"Total Score",value:"totalScore"}]}},methods:{requestSort(e){let t="asc";this.sortOptions.currentSort===e&&(t="asc"===this.sortOptions.currentSortDir?"desc":"asc"),this.$emit("sort",{sortKey:e,sortDir:t})},getAriaSort(e){return this.sortOptions.currentSort===e?"asc"===this.sortOptions.currentSortDir?"ascending":"descending":"none"}}},j=r(89);const T=(0,j.Z)(D,[["render",A],["__scopeId","data-v-0d856252"]]);var P=T;const x=(e,t,r)=>[...e].sort(((e,n)=>{let a="asc"===r?1:-1,o=N(e,t),i=N(n,t);return o<i?-1*a:o>i?1*a:0})),N=(e,t)=>{if(t in e.scoreBreakdown){let r=e.scoreBreakdown[t];return!isNaN(parseFloat(r))&&isFinite(r)?Number(r):r}if("name"===t)return e[t].toLowerCase();{let r=e[t];return!isNaN(parseFloat(r))&&isFinite(r)?Number(r):r}};var G={sortCandidates:x},M=r(74),z={name:"App",components:{CandidateTable:P},data(){return{approvedCandidates:[],notApprovedCandidates:[],searchQuery:"",activeTab:"Selected",currentSort:"name",currentSortDir:"asc",isDarkMode:!1,tabs:["Selected","Rejected"]}},computed:{sortedCandidates(){return this.sortCandidates("Selected"===this.activeTab?this.filteredApprovedCandidates:this.filteredRejectedCandidates)},filteredApprovedCandidates(){return this.filterCandidates(this.approvedCandidates)},filteredRejectedCandidates(){return this.filterCandidates(this.notApprovedCandidates)}},methods:{toggleDarkMode(){this.isDarkMode=!this.isDarkMode},filterCandidates(e){return e.filter((e=>e.name.toLowerCase().includes(this.searchQuery.toLowerCase())))},handleSort({sortKey:e,sortDir:t}){this.currentSort=e,this.currentSortDir=t},sortCandidates(e){return G.sortCandidates(e,this.currentSort,this.currentSortDir)},launchConfetti(){const e=document.getElementById("confetti-canvas"),t=M.Z.create(e,{resize:!0});t({particleCount:150,spread:70,origin:{y:.6}})}},mounted(){Promise.all([r.e(817).then(r.t.bind(r,1817,19)),r.e(571).then(r.t.bind(r,3571,19))]).then((([e,t])=>{this.approvedCandidates=e.selectedCandidates,this.notApprovedCandidates=t.rejectedCandidates,this.launchConfetti()})).catch((e=>{console.error("Error loading candidate data:",e)}))}};const E=(0,j.Z)(z,[["render",p]]);var B=E;(0,n.ri)(B).mount("#app")}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}r.m=e,function(){var e=[];r.O=function(t,n,a,o){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],o=e[u][2];for(var s=!0,c=0;c<n.length;c++)(!1&o||i>=o)&&Object.keys(r.O).every((function(e){return r.O[e](n[c])}))?n.splice(c--,1):(s=!1,o<i&&(i=o));if(s){e.splice(u--,1);var d=a();void 0!==d&&(t=d)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,a,o]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};r.t=function(n,a){if(1&a&&(n=this(n)),8&a)return n;if("object"===typeof n&&n){if(4&a&&n.__esModule)return n;if(16&a&&"function"===typeof n.then)return n}var o=Object.create(null);r.r(o);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&a&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((function(e){i[e]=function(){return n[e]}}));return i["default"]=function(){return n},r.d(o,i),o}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,n){return r.f[n](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/"+e+"."+{571:"582f5937",817:"894f0674"}[e]+".js"}}(),function(){r.miniCssF=function(e){}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="nursing-college-app:";r.l=function(n,a,o,i){if(e[n])e[n].push(a);else{var s,c;if(void 0!==o)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var l=d[u];if(l.getAttribute("src")==n||l.getAttribute("data-webpack")==t+o){s=l;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+o),s.src=n),e[n]=[a];var f=function(t,r){s.onerror=s.onload=null,clearTimeout(p);var a=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),a&&a.forEach((function(e){return e(r)})),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.p="/"}(),function(){var e={143:0};r.f.j=function(t,n){var a=r.o(e,t)?e[t]:void 0;if(0!==a)if(a)n.push(a[2]);else{var o=new Promise((function(r,n){a=e[t]=[r,n]}));n.push(a[2]=o);var i=r.p+r.u(t),s=new Error,c=function(n){if(r.o(e,t)&&(a=e[t],0!==a&&(e[t]=void 0),a)){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,a[1](s)}};r.l(i,c,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,i=n[0],s=n[1],c=n[2],d=0;if(i.some((function(t){return 0!==e[t]}))){for(a in s)r.o(s,a)&&(r.m[a]=s[a]);if(c)var u=c(r)}for(t&&t(n);d<i.length;d++)o=i[d],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},n=self["webpackChunknursing_college_app"]=self["webpackChunknursing_college_app"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(3295)}));n=r.O(n)})();
//# sourceMappingURL=app.7c70114f.js.map