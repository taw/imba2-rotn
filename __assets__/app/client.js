
var Cs=Symbol.for("#__initor__"),Es=Symbol.for("#__inited__"),Os=Symbol.for("#__hooks__"),Fs=Symbol.for("#type"),at=Symbol.for("#__listeners__");function X(r){let t=typeof r;if(t=="number")return r;if(t=="string"){if(/^\d+fps$/.test(r))return 1e3/parseFloat(r);if(/^([-+]?[\d\.]+)s$/.test(r))return parseFloat(r)*1e3;if(/^([-+]?[\d\.]+)ms$/.test(r))return parseFloat(r)}return null}function ct(r,t,e){if(!r)return;let i=Object.getOwnPropertyDescriptor(r,t);return i||r==e?i||void 0:ct(Reflect.getPrototypeOf(r),t,e)}var ae=function(r,t,e){let i,s,n;for(;(i=e)&&(e=e.next);)(s=e.listener)&&(e.path&&s[e.path]?n=t?s[e.path].apply(s,t):s[e.path]():n=t?s.apply(e,t):s.call(e)),e.times&&--e.times<=0&&(i.next=e.next,e.listener=null)};function It(r,t,e,i){var s;let n,o,l;return n=r[at]||(r[at]={}),o=n[t]||(n[t]={}),l=o.tail||(o.tail=o.next={}),l.listener=e,l.path=i,o.tail=l.next={},l}function Z(r,t,e){let i=It(r,t,e);return i.times=1,i}function ce(r,t,e,i){let s,n,o=r[at];if(!!o&&(s=o[t])){for(;(n=s)&&(s=s.next);)if(s==e||s.listener==e){n.next=s.next,s.listener=null;break}}}function G(r,t,e){let i;(i=r[at])&&(i[t]&&ae(t,e,i[t]),i.all&&ae(t,[t,e],i.all))}function _r(r){let t;return r?(t=r.toIterable)?t.call(r):r:[]}var fe=Symbol.for("#__init__"),Ps=Symbol.for("#__initor__"),Ds=Symbol.for("#__inited__"),Ms=Symbol.for("#__hooks__"),de=Symbol.for("#schedule"),Rt=Symbol.for("#frames"),ft=Symbol.for("#interval"),K=Symbol.for("#stage"),W=Symbol.for("#scheduled"),dt=Symbol.for("#version"),xr=Symbol.for("#fps"),me=Symbol.for("#ticker"),Sr=globalThis.requestAnimationFrame||function(r){return globalThis.setTimeout(r,1e3/60)};var Is=1/60,pe=class{constructor(t=null){this[fe](t)}[fe](t=null){var e;this.owner=t&&(e=t.owner)!==void 0?e:null,this.target=t&&(e=t.target)!==void 0?e:null,this.active=t&&(e=t.active)!==void 0?e:!1,this.value=t&&(e=t.value)!==void 0?e:void 0,this.skip=t&&(e=t.skip)!==void 0?e:0,this.last=t&&(e=t.last)!==void 0?e:0}tick(t,e){return this.last=this.owner[Rt],this.target.tick(this,e),1}update(t,e){let i=this.active,s=t.value;return this.value!=s&&(this.deactivate(),this.value=s),(this.value||i||e)&&this.activate(),this}queue(){this.owner.add(this)}activate(){return this.value===!0?this.owner.on("commit",this):this.value===!1||typeof this.value=="number"&&(this.value/(1e3/60)<=2?this.owner.on("raf",this):this[ft]=globalThis.setInterval(this.queue.bind(this),this.value)),this.active=!0,this}deactivate(){return this.value===!0&&this.owner.un("commit",this),this.owner.un("raf",this),this[ft]&&(globalThis.clearInterval(this[ft]),this[ft]=null),this.active=!1,this}},$e=class{constructor(){var t=this;this.id=Symbol(),this.queue=[],this.stage=-1,this[K]=-1,this[Rt]=0,this[W]=!1,this[dt]=0,this.listeners={},this.intervals={},t.commit=function(){return t.add("commit"),t},this[xr]=0,t.$promise=null,t.$resolve=null,this[me]=function(e){return t[W]=!1,t.tick(e)}}touch(){return this[dt]++}get version(){return this[dt]}add(t,e){return(e||this.queue.indexOf(t)==-1)&&this.queue.push(t),this[W]||this[de](),this}get committing\u03A6(){return this.queue.indexOf("commit")>=0}get syncing\u03A6(){return this[K]==1}listen(t,e){let i=this.listeners[t],s=!i;return i||(i=this.listeners[t]=new Set),i.add(e),t=="raf"&&s&&this.add("raf"),this}unlisten(t,e){var i;let s=this.listeners[t];return s&&s.delete(e),t=="raf"&&s&&s.size==0&&(i=this.listeners.raf,delete this.listeners.raf),this}on(t,e){return this.listen(t,e)}un(t,e){return this.unlisten(t,e)}get promise(){var t=this;return t.$promise||(t.$promise=new Promise(function(e){return t.$resolve=e}))}tick(t){var e=this;let i=this.queue,s=this[Rt]++;if(this.ts||(this.ts=t),this.dt=t-this.ts,this.ts=t,this.queue=[],this[K]=1,this[dt]++,i.length)for(let n=0,o=_r(i),l=o.length;n<l;n++){let u=o[n];typeof u=="string"&&this.listeners[u]?e.listeners[u].forEach(function(a){if(a.tick instanceof Function)return a.tick(e,u);if(a instanceof Function)return a(e,u)}):u instanceof Function?u(e.dt,e):u.tick&&u.tick(e.dt,e)}return this[K]=this[W]?0:-1,e.$promise&&(e.$resolve(e),e.$promise=e.$resolve=null),e.listeners.raf&&e.add("raf"),e}[de](){return this[W]||(this[W]=!0,this[K]==-1&&(this[K]=0),Sr(this[me])),this}schedule(t,e){var i,s;return e||(e=t[i=this.id]||(t[i]={value:!0})),(e[s=this.id]||(e[s]=new pe({owner:this,target:t}))).update(e,!0)}unschedule(t,e={}){e||(e=t[this.id]);let i=e&&e[this.id];return i&&i.active&&i.deactivate(),this}},N=new $e;function k(){return N.add("commit").promise}function vr(r,t){return globalThis.setTimeout(function(){r(),k()},t)}function Tr(r,t){return globalThis.setInterval(function(){r(),k()},t)}var Nr=globalThis.clearInterval,wr=globalThis.clearTimeout,tt=globalThis.imba||(globalThis.imba={});tt.commit=k;tt.setTimeout=vr;tt.setInterval=Tr;tt.clearInterval=Nr;tt.clearTimeout=wr;var ge=Symbol.for("#toStringDeopt"),Ls=Symbol.for("#__initor__"),Vs=Symbol.for("#__inited__"),As=Symbol.for("#__hooks__"),ye=Symbol.for("#symbols"),be=Symbol.for("#batches"),_e=Symbol.for("#extras"),xe=Symbol.for("#stacks"),et=class{constructor(t){this.dom=t,this.string=""}contains(t){return this.dom.classList.contains(t)}add(t){return this.contains(t)?this:(this.string+=(this.string?" ":"")+t,this.dom.classList.add(t),this)}remove(t){if(!this.contains(t))return this;let e=new RegExp("(^|\\s)"+t+"(?=\\s|$)","g");return this.string=this.string.replace(e,""),this.dom.classList.remove(t),this}toggle(t,e){return e===void 0&&(e=!this.contains(t)),e?this.add(t):this.remove(t)}incr(t,e=0){var i=this;let s=this.stacks,n=s[t]||0;return n<1&&this.add(t),e>0&&setTimeout(function(){return i.decr(t)},e),s[t]=Math.max(n,0)+1}decr(t){let e=this.stacks,i=e[t]||0;return i==1&&this.remove(t),e[t]=Math.max(i,1)-1}reconcile(t,e){let i=this[ye],s=this[be],n=!0;if(!i)i=this[ye]=[t],s=this[be]=[e||""],this.toString=this.valueOf=this[ge];else{let o=i.indexOf(t),l=e||"";o==-1?(i.push(t),s.push(l)):s[o]!=l?s[o]=l:n=!1}n&&(this[_e]=" "+s.join(" "),this.sync())}valueOf(){return this.string}toString(){return this.string}[ge](){return this.string+(this[_e]||"")}sync(){return this.dom.flagSync$()}get stacks(){return this[xe]||(this[xe]={})}};var mt=Symbol.for("#__init__"),Se=Symbol.for("#__initor__"),ve=Symbol.for("#__inited__"),Te=Symbol.for("#__hooks__"),Lt=Symbol.for("#getRenderContext"),Cr=Symbol.for("#getDynamicContext"),Ne=Symbol(),$={context:null},we=class{constructor(t=null){this[mt](t)}[mt](t=null){var e;this.stack=t&&(e=t.stack)!==void 0?e:[]}push(t){return this.stack.push(t)}pop(t){return this.stack.pop()}},Bs=new we,V=class extends Map{static[mt](){return this.prototype[Se]=Ne,this}constructor(t,e=null){super();this._=t,this.sym=e,this[Se]===Ne&&(this[Te]&&this[Te].inited(this),this[ve]&&this[ve]())}pop(){return $.context=null}[Lt](t){let e=this.get(t);return e||this.set(t,e=new V(this._,t)),$.context=e}[Cr](t,e){return this[Lt](t)[Lt](e)}run(t){return this.value=t,$.context==this&&($.context=null),this.get(t)}cache(t){return this.set(this.value,t),t}};V[mt]();function Ce(r,t=Symbol(),e=r){return $.context=r[t]||(r[t]=new V(e,t))}function Ee(){let r=$.context,t=r||new V(null);return r&&($.context=null),t}function it(r,t){let e=Object.getOwnPropertyDescriptors(t);return delete e.constructor,Object.defineProperties(r,e),r}function Er(r){let t;return r?(t=r.toIterable)?t.call(r):r:[]}var pt=Symbol.for("#parent"),Oe=Symbol.for("#closestNode"),Or=Symbol.for("#parentNode"),Fr=Symbol.for("#context"),Fe=Symbol.for("#__init__"),ke=Symbol.for("##inited"),Vt=Symbol.for("#getRenderContext"),kr=Symbol.for("#getDynamicContext"),Pe=Symbol.for("#insertChild"),At=Symbol.for("#appendChild"),Ht=Symbol.for("#replaceChild"),De=Symbol.for("#removeChild"),A=Symbol.for("#insertInto"),Me=Symbol.for("#insertIntoDeopt"),rt=Symbol.for("#removeFrom"),Ie=Symbol.for("#removeFromDeopt"),z=Symbol.for("#replaceWith"),Re=Symbol.for("#replaceWithDeopt"),Bt=Symbol.for("#placeholderNode"),Pr=Symbol.for("#attachToParent"),Dr=Symbol.for("#detachFromParent"),Mr=Symbol.for("#placeChild"),Ir=Symbol.for("#beforeReconcile"),Rr=Symbol.for("#afterReconcile"),Lr=Symbol.for("#afterVisit"),Le=Symbol.for("##parent"),Vr=Symbol.for("##up"),Ve=Symbol.for("##context"),q=Symbol.for("#domNode"),$t=Symbol.for("##placeholderNode"),Ae=Symbol.for("#domDeopt"),Ar=Symbol.for("#isRichElement"),He=Symbol.for("#src"),gt=Symbol.for("#htmlNodeName"),Hr=Symbol.for("#getSlot"),Ws=Symbol.for("#ImbaElement"),Be=Symbol.for("#cssns"),Br=Symbol.for("#cssid"),{Event:j,UIEvent:zs,MouseEvent:qe,PointerEvent:Qs,KeyboardEvent:je,CustomEvent:yt,Node:U,Comment:bt,Text:qt,Element:E,HTMLElement:_t,HTMLHtmlElement:Js,HTMLSelectElement:Ue,HTMLInputElement:Ge,HTMLTextAreaElement:Ke,HTMLButtonElement:We,HTMLOptionElement:ze,HTMLScriptElement:Ys,SVGElement:Qe,DocumentFragment:Xs,ShadowRoot:Zs,Document:qr,Window:tn,customElements:en}=globalThis.window,Je={};function Ye(r,t,e){if(!r)return e[t]=null;if(e[t]!==void 0)return e[t];let i=Object.getOwnPropertyDescriptor(r,t);return i!==void 0||r==Qe?e[t]=i||null:Ye(Reflect.getPrototypeOf(r),t,e)}var jt={},Ut={},jr={},Gt={};var Ur={get(r,t){let e=r,i;for(;e&&i==null;)(e=e[pt])&&(i=e[t]);return i},set(r,t,e){let i=r,s;for(;i&&s==null;){if(ct(i,t,E))return i[t]=e,!0;i=i[pt]}return!0}},Xe=class{get flags(){return this.documentElement.flags}};it(qr.prototype,Xe.prototype);var Ze=class{get[pt](){return this[Le]||this.parentNode||this[Vr]}get[Oe](){return this}get[Or](){return this[pt][Oe]}get[Fr](){return this[Ve]||(this[Ve]=new Proxy(this,Ur))}[Fe](){return this}[ke](){return this}[Vt](t){return Ce(this,t)}[kr](t,e){return this[Vt](t)[Vt](e)}[Pe](t,e){return t[A](this,e)}[At](t){return t[A](this,null)}[Ht](t,e){let i=this[Pe](t,e);return this[De](e),i}[De](t){return t[rt](this)}[A](t,e=null){return e?t.insertBefore(this,e):t.appendChild(this),this}[Me](t,e){return e?t.insertBefore(this[q]||this,e):t.appendChild(this[q]||this),this}[rt](t){return t.removeChild(this)}[Ie](t){return t.removeChild(this[q]||this)}[z](t,e){return e[Ht](t,this)}[Re](t,e){return e[Ht](t,this[q]||this)}get[Bt](){return this[$t]||(this[$t]=globalThis.document.createComment("placeholder"))}set[Bt](t){let e=this[$t];this[$t]=t,e&&e!=t&&e.parentNode&&e[z](t)}[Pr](){let t=this[q],e=t&&t.parentNode;return t&&e&&t!=this&&(this[q]=null,this[A](e,t),t[rt](e)),this}[Dr](){(this[Ae]!=!0?(this[Ae]=!0,!0):!1)&&(this[z]=this[Re],this[rt]=this[Ie],this[A]=this[Me]);let t=this[Bt];return this.parentNode&&t!=this&&(t[A](this.parentNode,this),this[rt](this.parentNode)),this[q]=t,this}[Mr](t,e,i){let s=typeof t;if(s==="undefined"||t===null){if(i&&i instanceof bt)return i;let n=globalThis.document.createComment("");return i?i[z](n,this):n[A](this,null)}if(t===i)return t;if(s!=="object"){let n,o=t;return e&128&&e&256,i?i instanceof qt?(i.textContent=o,i):(n=globalThis.document.createTextNode(o),i[z](n,this),n):(this.appendChild(n=globalThis.document.createTextNode(o)),n)}else return i?i[z](t,this):t[A](this,null)}};it(U.prototype,Ze.prototype);var ti=class{log(...t){return console.log(...t),this}emit(t,e,i={bubbles:!0,cancelable:!0}){e!=null&&(i.detail=e);let s=new yt(t,i),n=this.dispatchEvent(s);return s}text$(t){return this.textContent=t,this}[Ir](){return this}[Rr](){return this}[Lr](){this.render&&this.render()}get flags(){return this.$flags||(this.$flags=new et(this),this.flag$==E.prototype.flag$&&(this.flags$ext=this.className),this.flagDeopt$()),this.$flags}flag$(t){let e=this.flags$ns;this.className=e?e+(this.flags$ext=t):this.flags$ext=t}flagDeopt$(){var t=this;this.flag$=this.flagExt$,t.flagSelf$=function(e){return t.flagSync$(t.flags$own=e)}}flagExt$(t){return this.flagSync$(this.flags$ext=t)}flagSelf$(t){return this.flagDeopt$(),this.flagSelf$(t)}flagSync$(){return this.className=(this.flags$ns||"")+(this.flags$ext||"")+" "+(this.flags$own||"")+" "+(this.$flags||"")}set$(t,e){let i=ct(this,t,E);!i||!i.set?this.setAttribute(t,e):this[t]=e}get richValue(){return this.value}set richValue(t){this.value=t}};it(E.prototype,ti.prototype);E.prototype.setns$=E.prototype.setAttributeNS;E.prototype[Ar]=!0;function P(r,t,e,i){let s=globalThis.document.createElement(r);return e&&(s.className=e),i!==null&&s.text$(i),t&&t[At]&&t[At](s),s}var ei=class{set$(t,e){var i;let s=Je[i=this.nodeName]||(Je[i]={}),n=Ye(this,t,s);!n||!n.set?this.setAttribute(t,e):this[t]=e}flag$(t){let e=this.flags$ns;this.setAttribute("class",e?e+(this.flags$ext=t):this.flags$ext=t)}flagSelf$(t){var e=this;return e.flag$=function(i){return e.flagSync$(e.flags$ext=i)},e.flagSelf$=function(i){return e.flagSync$(e.flags$own=i)},e.flagSelf$(t)}flagSync$(){return this.setAttribute("class",(this.flags$ns||"")+(this.flags$ext||"")+" "+(this.flags$own||"")+" "+(this.$flags||""))}};it(Qe.prototype,ei.prototype);var ii=class{set src(t){if((this[He]!=t?(this[He]=t,!0):!1)&&t){if(t.adoptNode)t.adoptNode(this);else if(t.content){for(let e=t.attributes,i=0,s=Object.keys(e),n=s.length,o,l;i<n;i++)o=s[i],l=e[o],this.setAttribute(o,l);this.innerHTML=t.content}}}};it(SVGSVGElement.prototype,ii.prototype);function st(r){return globalThis.document.createComment(r)}function Kt(r){return globalThis.document.createTextNode(r)}var xt=globalThis.navigator,Gr=xt&&xt.vendor||"",ri=xt&&xt.userAgent||"",Kr=Gr.indexOf("Apple")>-1||ri.indexOf("CriOS")>=0||ri.indexOf("FxiOS")>=0,St=!Kr,si=new Map,ni=class extends _t{connectedCallback(){return St?this.parentNode.removeChild(this):this.parentNode.connectedCallback()}disconnectedCallback(){if(!St)return this.parentNode.disconnectedCallback()}};window.customElements.define("i-hook",ni);function Wr(r,t){let e=si.get(t);if(!e){e={};let i=t.prototype,s=[i];for(;(i=i&&Object.getPrototypeOf(i))&&i.constructor!=r.constructor;)s.unshift(i);for(let n=0,o=Er(s),l=o.length;n<l;n++){let u=o[n],a=Object.getOwnPropertyDescriptors(u);Object.assign(e,a)}si.set(t,e)}return e}function oi(r,t,e,i,s){let n;typeof r!="string"&&r&&r.nodeName&&(r=r.nodeName);let o=Ut[r]||r;if(jt[r]){let l=jt[r],u=l.prototype[gt];if(u&&St)n=globalThis.document.createElement(u,{is:r});else if(l.create$&&u){n=globalThis.document.createElement(u),n.setAttribute("is",o);let a=Wr(n,l);Object.defineProperties(n,a),n.__slots={},n.appendChild(globalThis.document.createElement("i-hook"))}else l.create$?(n=l.create$(n),n.__slots={}):console.warn("could not create tag "+r)}else n=globalThis.document.createElement(Ut[r]||r);return n[Le]=t,n[Fe](),n[ke](),i!==null&&n[Hr]("__").text$(i),(e||n.flags$ns)&&n.flag$(e||""),n}function li(r,t,e={}){jr[r]=Gt[r]=t,t.nodeName=r;let i=r,s=t.prototype;if(r.indexOf("-")==-1&&(i=""+r+"-tag",Ut[r]=i),e.cssns){let n=(s._ns_||s[Be]||"")+" "+(e.cssns||"");s._ns_=n.trim()+" ",s[Be]=e.cssns}if(e.cssid){let n=(s.flags$ns||"")+" "+e.cssid;s[Br]=e.cssid,s.flags$ns=n.trim()+" "}return s[gt]&&!e.extends&&(e.extends=s[gt]),e.extends?(s[gt]=e.extends,jt[r]=t,St&&window.customElements.define(i,t,{extends:e.extends})):window.customElements.define(i,t),t}var zr=globalThis.imba||(globalThis.imba={});zr.document=globalThis.document;function Wt(r){let t;return r?(t=r.toIterable)?t.call(r):r:[]}function Qr(r,t){let e=Object.getOwnPropertyDescriptors(t);return delete e.constructor,Object.defineProperties(r,e),r}var vt=Symbol.for("#parent"),ui=Symbol.for("#closestNode"),Jr=Symbol.for("#isRichElement"),Yr=Symbol.for("#afterVisit"),hi=Symbol.for("#__initor__"),ai=Symbol.for("#__inited__"),ci=Symbol.for("#__hooks__"),fi=Symbol.for("#appendChild"),di=Symbol.for("#removeChild"),R=Symbol.for("#insertInto"),Tt=Symbol.for("#replaceWith"),mi=Symbol.for("#insertChild"),Nt=Symbol.for("#removeFrom"),pi=Symbol.for("#placeChild"),$i=Symbol.for("#__init__"),Xr=Symbol.for("#registerFunctionalSlot"),Zr=Symbol.for("#getFunctionalSlot"),gi=Symbol.for("#getSlot"),zt=Symbol.for("##parent"),wt=Symbol.for("##up"),yi=Symbol.for("##flags"),ts=Symbol.for("#domFlags"),F=Symbol.for("#end"),bi=Symbol.for("#textContent"),Ct=Symbol.for("#textNode"),Qt=Symbol.for("#functionalSlots"),_i=Symbol();var nt=class{constructor(){this.childNodes=[]}log(...t){}hasChildNodes(){return!1}set[vt](t){this[zt]=t}get[vt](){return this[zt]||this[wt]}get[ui](){return this[vt][ui]}get[Jr](){return!0}get flags(){return this[yi]||(this[yi]=new et(this))}flagSync$(){return this}[Yr](){return this}},es=0,Jt=class extends nt{static[$i](){return this.prototype[hi]=_i,this}constructor(t,e){super(...arguments);this[wt]=e,this.parentNode=null,this[ts]=t,this.childNodes=[],this[F]=st("slot"+es++),e&&e[fi](this),this[hi]===_i&&(this[ci]&&this[ci].inited(this),this[ai]&&this[ai]())}get[vt](){return this[zt]||this.parentNode||this[wt]}set textContent(t){this[bi]=t}get textContent(){return this[bi]}hasChildNodes(){for(let t=0,e=Wt(this.childNodes),i=e.length;t<i;t++){let s=e[t];if(s instanceof nt&&s.hasChildNodes())return!0;if(!(s instanceof bt)){if(s instanceof U)return!0}}return!1}text$(t){return this[Ct]?this[Ct].textContent=t:this[Ct]=this[pi](t),this[Ct]}appendChild(t){return this.parentNode&&t[R](this.parentNode,this[F]),this.childNodes.push(t)}[fi](t){return this.parentNode&&t[R](this.parentNode,this[F]),this.childNodes.push(t)}insertBefore(t,e){this.parentNode&&this.parentNode[mi](t,e);let i=this.childNodes.indexOf(e);return i>=0&&this.childNodes.splice(i,0,t),t}[di](t){this.parentNode&&this.parentNode[di](t);let e=this.childNodes.indexOf(t);e>=0&&this.childNodes.splice(e,1)}[R](t,e){let i=this.parentNode;if(this.parentNode!=t?(this.parentNode=t,!0):!1){this[F]&&(e=this[F][R](t,e));for(let s=0,n=Wt(this.childNodes),o=n.length;s<o;s++)n[s][R](t,e)}return this}[Tt](t,e){let i=t[R](e,this[F]);return this[Nt](e),i}[mi](t,e){if(this.parentNode&&this.insertBefore(t,e||this[F]),e){let i=this.childNodes.indexOf(e);i>=0&&this.childNodes.splice(i,0,t)}else this.childNodes.push(t);return t}[Nt](t){for(let e=0,i=Wt(this.childNodes),s=i.length;e<s;e++)i[e][Nt](t);return this[F]&&this[F][Nt](t),this.parentNode=null,this}[pi](t,e,i){let s=this.parentNode,n=typeof t;if(n==="undefined"||t===null){if(i&&i instanceof bt)return i;let o=st("");if(i){let l=this.childNodes.indexOf(i);return this.childNodes.splice(l,1,o),s&&i[Tt](o,s),o}return this.childNodes.push(o),s&&o[R](s,this[F]),o}if(t===i)return t;if(n!=="object"){let o,l=t;if(i){if(i instanceof qt)return i.textContent=l,i;{o=Kt(l);let u=this.childNodes.indexOf(i);return this.childNodes.splice(u,1,o),s&&i[Tt](o,s),o}}else return this.childNodes.push(o=Kt(l)),s&&o[R](s,this[F]),o}else if(i){let o=this.childNodes.indexOf(i);return this.childNodes.splice(o,1,t),s&&i[Tt](t,s),t}else return this.childNodes.push(t),s&&t[R](s,this[F]),t}};Jt[$i]();function xi(r,t){let e=new Jt(r,null);return e[wt]=t,e}var Si=class{[Xr](t){let e=this[Qt]||(this[Qt]={});return e[t]||(e[t]=xi(0,this))}[Zr](t,e){let i=this[Qt];return i&&i[t]||this[gi](t,e)}[gi](t,e){var i;return t=="__"&&!this.render?this:(i=this.__slots)[t]||(i[t]=xi(0,this))}};Qr(U.prototype,Si.prototype);function is(r){let t;return r?(t=r.toIterable)?t.call(r):r:[]}var rs=Symbol.for("#afterVisit"),Et=Symbol.for("#insertInto"),vi=Symbol.for("#appendChild"),ss=Symbol.for("#replaceWith"),Yt=Symbol.for("#removeFrom"),Ti=Symbol.for("#__initor__"),Ni=Symbol.for("#__inited__"),wi=Symbol.for("#__hooks__"),Ci=Symbol.for("#__init__"),ns=Symbol.for("#domFlags"),os=Symbol.for("##parent"),H=Symbol.for("#end"),ls=Symbol.for("#removeChild"),us=Symbol.for("#insertChild"),Ei=Symbol(),Xt=class extends nt{static[Ci](){return this.prototype[Ti]=Ei,this}constructor(t,e){super(...arguments);this[ns]=t,this[os]=e,t&256||(this[H]=st("list")),this.$=this.childNodes,this.length=0,e&&e[vi](this),this[Ti]===Ei&&(this[wi]&&this[wi].inited(this),this[Ni]&&this[Ni]())}hasChildNodes(){return this.length!=0}[rs](t){let e=this.length;if(this.length=t,e==t)return;let i=this.parentNode;if(!i)return;let s=this.childNodes,n=this[H];if(e>t)for(;e>t;)i[ls](s[--e]);else if(t>e)for(;t>e;)i[us](s[e++],n);this.length=t}[Et](t,e){this.parentNode=t,this[H]&&this[H][Et](t,e),e=this[H];for(let i=0,s=is(this.childNodes),n=s.length;i<n;i++){let o=s[i];if(i==this.length)break;o[Et](t,e)}return this}[vi](t){}[ss](t,e){let i=t[Et](e,this[H]);return this[Yt](e),i}[Yt](t){let e=this.length;for(;e>0;)this.childNodes[--e][Yt](t);this[H]&&t.removeChild(this[H]),this.parentNode=null}};Xt[Ci]();function Oi(r,t){return new Xt(r,t)}function hs(r){let t;return r?(t=r.toIterable)?t.call(r):r:[]}var Ot=Symbol.for("#__init__"),as=Symbol.for("##inited"),cs=Symbol.for("#afterVisit"),fs=Symbol.for("#beforeReconcile"),ds=Symbol.for("#afterReconcile"),Zt=Symbol.for("#count"),Fi=Symbol.for("#__hooks__"),Q=Symbol.for("#autorender"),ms=new class{constructor(r=null){this[Ot](r)}[Ot](r=null){var t;this.items=r&&(t=r.items)!==void 0?t:[],this.current=r&&(t=r.current)!==void 0?t:null,this.lastQueued=r&&(t=r.lastQueued)!==void 0?t:null,this.tests=r&&(t=r.tests)!==void 0?t:0}flush(){let r=null;for(;r=this.items.shift();){if(!r.parentNode||r.hydrated\u03A6)continue;let t=this.current;this.current=r,r.__F|=1024,r.connectedCallback(),this.current=t}}queue(r){var t=this;let e=this.items.length,i=0,s=this.lastQueued;this.lastQueued=r;let n=U.DOCUMENT_POSITION_PRECEDING,o=U.DOCUMENT_POSITION_FOLLOWING;if(e){let l=this.items.indexOf(s),u=l,a=function(h,w){return t.tests++,h.compareDocumentPosition(w)};(l==-1||s.nodeName!=r.nodeName)&&(u=l=0);let g=t.items[u];for(;g&&a(g,r)&o;)g=t.items[++u];if(u!=l)g?t.items.splice(u,0,r):t.items.push(r);else{for(;g&&a(g,r)&n;)g=t.items[--u];u!=l&&(g?t.items.splice(u+1,0,r):t.items.unshift(r))}}else t.items.push(r),t.current||globalThis.queueMicrotask(t.flush.bind(t))}run(r){var t,e;if(this.active)return;this.active=!0;let i=globalThis.document.querySelectorAll(".__ssr");console.log("running hydrator",r,i.length,Array.from(i));for(let s=0,n=hs(i),o=n.length;s<o;s++){let l=n[s];l[Zt]||(l[Zt]=1),l[Zt]++;let u=l.nodeName,a=(e=this.map)[u]||(e[u]=globalThis.window.customElements.get(u.toLowerCase())||_t);console.log("item type",u,a,!!Gt[u.toLowerCase()]),!(!l.connectedCallback||!l.parentNode||l.hydrated\u03A6)&&console.log("hydrate",l)}return this.active=!1}};var te=class extends _t{constructor(){super();this.flags$ns&&(this.flag$=this.flagExt$),this.setup$(),this.build()}setup$(){return this.__slots={},this.__F=0}[Ot](){return this.__F|=1|2,this}[as](){if(this[Fi])return this[Fi].inited(this)}flag$(t){this.className=this.flags$ext=t}build(){return this}awaken(){return this}mount(){return this}unmount(){return this}rendered(){return this}dehydrate(){return this}hydrate(){return this.autoschedule=!0,this}tick(){return this.commit()}visit(){return this.commit()}commit(){return this.render\u03A6?(this.__F|=256,this.render&&this.render(),this.rendered(),this.__F=(this.__F|512)&~256&~8192):(this.__F|=8192,this)}get autoschedule(){return(this.__F&64)!=0}set autoschedule(t){t?this.__F|=64:this.__F&=~64}set autorender(t){let e=this[Q]||(this[Q]={});e.value=t,this.mounted\u03A6&&N.schedule(this,e)}get render\u03A6(){return!this.suspended\u03A6}get mounting\u03A6(){return(this.__F&16)!=0}get mounted\u03A6(){return(this.__F&32)!=0}get awakened\u03A6(){return(this.__F&8)!=0}get rendered\u03A6(){return(this.__F&512)!=0}get suspended\u03A6(){return(this.__F&4096)!=0}get rendering\u03A6(){return(this.__F&256)!=0}get scheduled\u03A6(){return(this.__F&128)!=0}get hydrated\u03A6(){return(this.__F&2)!=0}get ssr\u03A6(){return(this.__F&1024)!=0}schedule(){return N.on("commit",this),this.__F|=128,this}unschedule(){return N.un("commit",this),this.__F&=~128,this}async suspend(t=null){let e=this.flags.incr("_suspended_");return this.__F|=4096,t instanceof Function&&(await t(),this.unsuspend()),this}unsuspend(){return this.flags.decr("_suspended_")==0&&(this.__F&=~4096,this.commit()),this}[cs](){return this.visit()}[fs](){return this.__F&1024&&(this.__F=this.__F&~1024,this.classList.remove("_ssr_"),this.flags$ext&&this.flags$ext.indexOf("_ssr_")==0&&(this.flags$ext=this.flags$ext.slice(5)),this.__F&512||(this.innerHTML="")),this}[ds](){return this}connectedCallback(){let t=this.__F,e=t&1,i=t&8;if(!e&&!(t&1024)){ms.queue(this);return}if(t&(16|32))return;this.__F|=16,e||this[Ot](),t&2||(this.flags$ext=this.className,this.__F|=2,this.hydrate(),this.commit()),i||(this.awaken(),this.__F|=8),G(this,"mount");let s=this.mount();return s&&s.then instanceof Function&&s.then(N.commit),t=this.__F=(this.__F|32)&~16,t&64&&this.schedule(),this[Q]&&N.schedule(this,this[Q]),this}disconnectedCallback(){if(this.__F=this.__F&(~32&~16),this.__F&128&&this.unschedule(),G(this,"unmount"),this.unmount(),this[Q])return N.unschedule(this,this[Q])}};var ps=Symbol.for("#insertInto"),ki=Symbol.for("#removeFrom");function ee(r,t){let e=t||globalThis.document.body,i=r;if(r instanceof Function){let s=new V(e,null),n=function(){let o=$.context;$.context=s;let l=r(s);return $.context==s&&($.context=o),l};i=n(),N.listen("commit",n)}else i.__F|=64;return i[ps](e),i}function $s(r){return r&&r[ki]&&r[ki](r.parentNode),r}var Pi=globalThis.imba||(globalThis.imba={});Pi.mount=ee;Pi.unmount=$s;function J(r,t){let e=Object.getOwnPropertyDescriptors(t);return delete e.constructor,Object.defineProperties(r,e),r}function ot(r){let t;return r?(t=r.toIterable)?t.call(r):r:[]}var lt=Symbol.for("#afterVisit");function Di(){return!0}var gs={INPUT:!0,SELECT:!0,TEXTAREA:!0,BUTTON:!0},ie=function(r){return r instanceof Array||r&&r.has instanceof Function},re=function(r,t){return r==t?!0:r instanceof Array?r.indexOf(t)>=0:r&&r.has instanceof Function?r.has(t):r&&r.contains instanceof Function?r.contains(t):!1},se=function(r,t){if(r instanceof Array)return r.push(t);if(r&&r.add instanceof Function)return r.add(t)},ne=function(r,t){if(r instanceof Array){let e=r.indexOf(t);if(e>=0)return r.splice(e,1)}else if(r&&r.delete instanceof Function)return r.delete(t)};function ys(r){function t(){return r[0]?r[0][r[1]]:void 0}function e(i){return r[0]?r[0][r[1]]=i:null}return{get:t,set:e}}var Mi=class{getRichValue(){return this.value}setRichValue(t){return this.value=t}bind$(t,e){let i=e||[];return t=="data"&&!this.$$bound&&gs[this.nodeName]&&(this.$$bound=!0,this.change$&&this.addEventListener("change",this.change$=this.change$.bind(this)),this.input$&&this.addEventListener("input",this.input$=this.input$.bind(this),{capture:!0}),this.click$&&this.addEventListener("click",this.click$=this.click$.bind(this),{capture:!0})),Object.defineProperty(this,t,i instanceof Array?ys(i):i),i}};J(E.prototype,Mi.prototype);Object.defineProperty(E.prototype,"richValue",{get:function(){return this.getRichValue()},set:function(r){return this.setRichValue(r)}});var Ii=class{change$(t){let e=this.data,i=this.$$value;this.$$value=void 0;let s=this.getRichValue();if(this.multiple){if(i)for(let n=0,o=ot(i),l=o.length;n<l;n++){let u=o[n];s.indexOf(u)==-1&&ne(e,u)}for(let n=0,o=ot(s),l=o.length;n<l;n++){let u=o[n];(!i||i.indexOf(u)==-1)&&se(e,u)}}else this.data=s[0];return k(),this}getRichValue(){var t;if(this.$$value)return this.$$value;t=[];for(let e=0,i=ot(this.selectedOptions),s=i.length;e<s;e++){let n=i[e];t.push(n.richValue)}return this.$$value=t}syncValue(){let t=this.data;if(this.multiple){let e=[];for(let i=0,s=ot(this.options),n=s.length;i<n;i++){let o=s[i],l=o.richValue,u=re(t,l);o.selected=u,u&&e.push(l)}this.$$value=e}else for(let e=0,i=ot(this.options),s=i.length;e<s;e++){let o=i[e].richValue;if(o==t){this.$$value=[o],this.selectedIndex=e;break}}}[lt](){return this.syncValue()}};J(Ue.prototype,Ii.prototype);var Ri=class{setRichValue(t){return this.$$value=t,this.value=t}getRichValue(){return this.$$value!==void 0?this.$$value:this.value}};J(ze.prototype,Ri.prototype);var Li=class{setRichValue(t){return this.$$value=t,this.value=t}getRichValue(){return this.$$value!==void 0?this.$$value:this.value}input$(t){return this.data=this.value,k()}[lt](){let t=this.data;if(t==null&&(t=""),this.$$bound&&this.value!=t)return this.value=t}};J(Ke.prototype,Li.prototype);var Vi=class{input$(t){let e=this.type;if(!(e=="checkbox"||e=="radio"))return this.$$value=void 0,this.data=this.richValue,k()}change$(t){let e=this.data,i=this.richValue;if(this.type=="checkbox"||this.type=="radio"){let s=this.checked;ie(e)?s?se(e,i):ne(e,i):this.data=s?i:!1}return k()}setRichValue(t){this.$$value!==t&&(this.$$value=t,this.value!==t&&(this.value=t))}getRichValue(){if(this.$$value!==void 0)return this.$$value;let t=this.value,e=this.type;return e=="range"||e=="number"?(t=this.valueAsNumber,Number.isNaN(t)&&(t=null)):e=="checkbox"&&(t==null||t==="on")&&(t=!0),t}[lt](){if(this.$$bound){let t=this.type;if(t=="checkbox"||t=="radio"){let e=this.data;e===!0||e===!1||e==null?this.checked=!!e:this.checked=re(e,this.richValue)}else this.richValue=this.data}}};J(Ge.prototype,Vi.prototype);var Ai=class{get checked(){return this.$checked}set checked(t){t!=this.$checked&&(this.$checked=t,this.flags.toggle("checked",!!t))}setRichValue(t){return this.$$value=t,this.value=t}getRichValue(){return this.$$value!==void 0?this.$$value:this.value}click$(t){let e=this.data,i=this.checked,s=this.richValue;return ie(e)?i?ne(e,s):se(e,s):this.$$value==null?this.data=!i:this.data=i?null:s,this[lt](),k()}[lt](){if(this.$$bound){let t=this.data,e=this.$$value==null?!0:this.$$value;ie(t)?this.checked=re(t,e):this.checked=t==e}}};J(We.prototype,Ai.prototype);function bs(r,t){let e=Object.getOwnPropertyDescriptors(t);return delete e.constructor,Object.defineProperties(r,e),r}function Hi(){return!0}var Bi=class{\u03B1esc(){return this.keyCode==27}\u03B1tab(){return this.keyCode==9}\u03B1enter(){return this.keyCode==13}\u03B1space(){return this.keyCode==32}\u03B1up(){return this.keyCode==38}\u03B1down(){return this.keyCode==40}\u03B1left(){return this.keyCode==37}\u03B1right(){return this.keyCode==39}\u03B1del(){return this.keyCode==8||this.keyCode==46}\u03B1key(t){if(typeof t=="string")return this.key==t;if(typeof t=="number")return this.keyCode==t}};bs(je.prototype,Bi.prototype);function _s(r,t){let e=Object.getOwnPropertyDescriptors(t);return delete e.constructor,Object.defineProperties(r,e),r}function qi(){return!0}var ji=class{\u03B1left(){return this.button==0}\u03B1middle(){return this.button==1}\u03B1right(){return this.button==2}\u03B1shift(){return!!this.shiftKey}\u03B1alt(){return!!this.altKey}\u03B1ctrl(){return!!this.ctrlKey}\u03B1meta(){return!!this.metaKey}\u03B1mod(){let t=globalThis.navigator.platform;return/^(Mac|iPhone|iPad|iPod)/.test(t||"")?!!this.metaKey:!!this.ctrlKey}};_s(qe.prototype,ji.prototype);function oe(r,t){let e=Object.getOwnPropertyDescriptors(t);return delete e.constructor,Object.defineProperties(r,e),r}function Ui(r){let t;return r?(t=r.toIterable)?t.call(r):r:[]}var xs=Symbol.for("#extendType"),Ss=Symbol.for("#modifierState"),Ft=Symbol.for("#sharedModifierState"),Gi=Symbol.for("#onceHandlerEnd"),Pn=Symbol.for("#__initor__"),Dn=Symbol.for("#__inited__"),Mn=Symbol.for("#__hooks__"),Ki=Symbol.for("#extendDescriptors"),O=Symbol.for("#context"),Wi=Symbol.for("#self"),vs=Symbol.for("#target"),zi=Symbol.for("#stopPropagation"),Qi=Symbol.for("#defaultPrevented");Hi();qi();var Ji=class{[xs](t){var e,i,s;let n=t[Ki]||(t[Ki]=(i=Object.getOwnPropertyDescriptors(t.prototype),s=i.constructor,delete i.constructor,i));return Object.defineProperties(this,n)}};oe(yt.prototype,Ji.prototype);var Yi=class{get[Ss](){var t,e;return(t=this[O])[e=this[O].step]||(t[e]={})}get[Ft](){var t,e;return(t=this[O].handler)[e=this[O].step]||(t[e]={})}[Gi](t){return Z(this[O],"end",t)}\u03B1sel(t){return!!this.target.matches(String(t))}\u03B1closest(t){return!!this.target.closest(String(t))}\u03B1log(...t){return console.info(...t),!0}\u03B1trusted(){return!!this.isTrusted}\u03B1if(t){return!!t}\u03B1wait(t=250){return new Promise(function(e){return setTimeout(e,X(t))})}\u03B1self(){return this.target==this[O].element}\u03B1cooldown(t=250){let e=this[Ft];return e.active?!1:(e.active=!0,e.target=this[O].element,e.target.flags.incr("cooldown"),this[Gi](function(){return setTimeout(function(){return e.target.flags.decr("cooldown"),e.active=!1},X(t))}),!0)}\u03B1throttle(t=250){let e=this[Ft];return e.active?(e.next&&e.next(!1),new Promise(function(i){return e.next=function(s){return e.next=null,i(s)}})):(e.active=!0,e.el||(e.el=this[O].element),e.el.flags.incr("throttled"),Z(this[O],"end",function(){let i=X(t);return e.interval=setInterval(function(){e.next?e.next(!0):(clearInterval(e.interval),e.el.flags.decr("throttled"),e.active=!1)},i)}),!0)}\u03B1debounce(t=250){let e=this[Ft],i=this;return e.queue||(e.queue=[]),e.queue.push(e.last=i),new Promise(function(s){return setTimeout(function(){return e.last==i?(i.debounced=e.queue,e.last=null,e.queue=[],s(!0)):s(!1)},X(t))})}\u03B1flag(t,e){let{element:i,step:s,state:n,id:o,current:l}=this[O],u=e instanceof E?e:e?i.closest(e):i;if(!u)return!0;this[O].commit=!0,n[s]=o,u.flags.incr(t);let a=Date.now();return Z(l,"end",function(){let g=Date.now()-a,h=Math.max(250-g,0);return setTimeout(function(){return u.flags.decr(t)},h)}),!0}\u03B1busy(t){return this.\u03B1flag("busy",t)}\u03B1mod(t){return this.\u03B1flag("mod-"+t,globalThis.document.documentElement)}\u03B1outside(){let{handler:t}=this[O];if(t&&t[Wi])return!t[Wi].parentNode.contains(this.target)}};oe(j.prototype,Yi.prototype);function Xi(){return!0}var Zi=class{constructor(t,e){this.params=t,this.closure=e}getHandlerForMethod(t,e){return t?t[e]?t:this.getHandlerForMethod(t.parentNode,e):null}emit(t,...e){return G(this,t,e)}on(t,...e){return It(this,t,...e)}once(t,...e){return Z(this,t,...e)}un(t,...e){return ce(this,t,...e)}get passive\u03A6(){return this.params.passive}get capture\u03A6(){return this.params.capture}get silent\u03A6(){return this.params.silent}get global\u03A6(){return this.params.global}async handleEvent(t){let e=this[vs]||t.currentTarget,i=this.params,s=null,n=i.silence||i.silent;this.count||(this.count=0),this.state||(this.state={});let o={element:e,event:t,modifiers:i,handler:this,id:++this.count,step:-1,state:this.state,commit:null,current:null};if(o.current=o,t.handle$mod&&t.handle$mod.apply(o,i.options||[])==!1)return;let l=j[this.type+"$handle"]||j[t.type+"$handle"]||t.handle$mod;if(!(l&&l.apply(o,i.options||[])==!1)){this.currentEvents||(this.currentEvents=new Set),this.currentEvents.add(t);for(let u=0,a=Object.keys(i),g=a.length,h,w;u<g;u++){if(h=a[u],w=i[h],o.step++,h[0]=="_")continue;h.indexOf("~")>0&&(h=h.split("~")[0]);let L=null,f=[t,o],d,C=null,c,D=!1,Dt=typeof h=="string";if(h[0]=="$"&&h[1]=="_"&&w[0]instanceof Function)h=w[0],h.passive||(o.commit=!0),f=[t,o].concat(w.slice(1)),C=e;else if(w instanceof Array){f=w.slice(),L=f;for(let m=0,p=Ui(f),M=p.length;m<M;m++){let I=p[m];if(typeof I=="string"&&I[0]=="~"&&I[1]=="$"){let ue=I.slice(2).split("."),ht=o[ue.shift()]||t;for(let Mt=0,he=Ui(ue),yr=he.length;Mt<yr;Mt++){let br=he[Mt];ht=ht?ht[br]:void 0}f[m]=ht}}}if(typeof h=="string"&&(c=h.match(/^(emit|flag|mod|moved|pin|fit|refit|map|remap|css)-(.+)$/))&&(L||(L=f=[]),f.unshift(c[2]),h=c[1]),h=="trap")t[zi]=!0,t.stopImmediatePropagation(),t[Qi]=!0,t.preventDefault();else if(h=="stop")t[zi]=!0,t.stopImmediatePropagation();else if(h=="prevent")t[Qi]=!0,t.preventDefault();else if(h=="commit")o.commit=!0;else if(h=="once")e.removeEventListener(t.type,this);else{if(h=="options"||h=="silence"||h=="silent")continue;if(h=="emit"){let m=f[0],p=f[1],M=new yt(m,{bubbles:!0,detail:p});M.originalEvent=t;let I=e.dispatchEvent(M)}else if(typeof h=="string"){h[0]=="!"&&(D=!0,h=h.slice(1));let m="\u03B1"+h,p=t[m];p||(p=this.type&&j[this.type+"$"+h+"$mod"]),p||(p=t[h+"$mod"]||j[t.type+"$"+h]||j[h+"$mod"]),p instanceof Function?(h=p,C=o,f=L||[],t[m]&&(C=t,t[O]=o)):h[0]=="_"?(h=h.slice(1),C=this.closure):C=this.getHandlerForMethod(e,h)}}try{h instanceof Function?d=h.apply(C||e,f):C&&(d=C[h].apply(C,f)),d&&d.then instanceof Function&&d!=N.$promise&&(o.commit&&!n&&N.commit(),d=await d)}catch(m){s=m;break}if(D&&d===!0||!D&&d===!1)break;o.value=d}if(G(o,"end",o),o.commit&&!n&&N.commit(),this.currentEvents.delete(t),this.currentEvents.size==0&&this.emit("idle"),s)throw s}}},tr=class{on$(t,e,i){let s="on$"+t,n;n=new Zi(e,i);let o=e.capture||!1,l=e.passive,u=o;return l&&(u={passive:l,capture:o}),this[s]instanceof Function?n=this[s](e,i,n,u):this.addEventListener(t,n,u),n}};oe(E.prototype,tr.prototype);var er=Symbol.for("#__init__"),Ts=Symbol.for("#beforeReconcile"),le=Symbol.for("#afterVisit"),ir=Symbol.for("##up"),rr=Symbol.for("#placeChild"),Ns=Symbol.for("#afterReconcile"),sr=Symbol(),nr=Symbol(),or=Symbol(),lr=Symbol(),ur=Symbol(),hr=Symbol(),ar=Symbol(),cr=Symbol(),fr=Symbol(),dr=Symbol(),mr=Symbol(),pr=Symbol(),B,ut=Ee(),$r=Symbol(),kt,Pt;Di(),Xi();var gr=class extends te{[er](t=null){var e;super[er](...arguments),this.text=t&&(e=t.text)!==void 0?e:"Hello, World!"}rot(t){return this.text.replace(/[a-z]/gi,function(e){let i=e.charCodeAt(0);return i>=97&&i<=122?String.fromCharCode((i-97+t)%26+97):i>=65&&i<=90?String.fromCharCode((i-65+t)%26+65):e})}upload(t){var e=this;let i=t.target.files[0];if(!i)return;let s=new FileReader;return s.onload=function(n){return e.text=n.target.result,k()},s.readAsText(i)}render(){var t,e,i,s=this._ns_||"",n,o,l,u,a,g,h,w,L,f,d,C,c,D,Dt,m,p,M,I;t=this,t[Ts](),e=i=1,t[sr]===1||(e=i=0,t[sr]=1),e||(n=P("div",t,`contents ${s}`,null)),e||(o=P("header",n,`${s}`,"ROT-N")),u=a=1,(l=t[nr])||(u=a=0,t[nr]=l=P("textarea",n,`${s}`,null)),g=t[or]||(t[or]=l.bind$("data",[this,"text"])),u||!l.setup||l.setup(a),l[le](a),e||(h=P("div",n,`${s}`,null)),e||(w=P("input",h,`${s}`,null)),e||(w.id="file"),e||(w.type="file"),e||w.on$("change",{upload:!0},this),(L=t[lr])||(t[lr]=L=P("table",n,`${s}`,null)),(f=t[ur])||(t[ur]=f=Oi(384,L)),d=0,C=f.$;for(let Y=1;Y<=25;Y++)D=Dt=1,(c=C[d])||(D=Dt=0,C[d]=c=P("tr",f,`${s}`,null)),D||(c[ir]=f),(m=c[hr])||(c[hr]=m=P("th",c,`${s}`,null)),p=Y,p===c[cr]&&D||(c[ar]=m[rr](c[cr]=p,384,c[ar])),(M=c[fr])||(c[fr]=M=P("td",c,`${s}`,null)),$.context=c[mr]||(c[mr]={_:M}),I=this.rot(Y),$.context=null,I===c[pr]&&D||(c[dr]=M[rr](c[pr]=I,384,c[dr])),d++;return f[le](d),t[Ns](i),t}};li("app",gr,{cssns:"ci_ap",cssid:"ci-ap"});ee((kt=Pt=1,(B=ut[$r])||(kt=Pt=0,B=ut[$r]=B=oi("app",null,null,null)),kt||(B[ir]=ut._),kt||ut.sym||!B.setup||B.setup(Pt),ut.sym||B[le](Pt),B));
//__FOOT__
//# sourceMappingURL=./__assets__/app/client.js.map
                     