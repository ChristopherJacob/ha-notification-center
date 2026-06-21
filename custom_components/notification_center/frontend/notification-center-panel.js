/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=(e,t,c)=>(c.configurable=true,c.enumerable=true,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;return e$1(n,s,{get(){return o(this)}})}}

const sharedStyles = i$3 `
  :host {
    --nc-primary: var(--primary-color, #03a9f4);
    --nc-primary-text: var(--text-primary-color, #ffffff);
    --nc-bg: var(--card-background-color, #ffffff);
    --nc-bg-secondary: var(--secondary-background-color, #f5f5f5);
    --nc-text: var(--primary-text-color, #212121);
    --nc-text-secondary: var(--secondary-text-color, #757575);
    --nc-border: var(--divider-color, #e0e0e0);
    --nc-radius: 12px;
    --nc-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    --nc-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
    --nc-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    font-family: var(
      --paper-font-common-base_-_font-family,
      "Roboto",
      sans-serif
    );
    color: var(--nc-text);
    height: 100%;
    overflow-y: auto;
  }

  .nc-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 24px;
  }

  .nc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--nc-border);
  }

  .nc-header h1 {
    font-size: 28px;
    font-weight: 500;
    margin: 0;
    color: var(--nc-text);
  }

  .nc-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 24px;
    background: var(--nc-bg-secondary);
    border-radius: var(--nc-radius);
    padding: 4px;
  }

  .nc-tab {
    flex: 1;
    padding: 10px 20px;
    border: none;
    border-radius: calc(var(--nc-radius) - 4px);
    background: transparent;
    color: var(--nc-text-secondary);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all var(--nc-transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .nc-tab.active {
    background: var(--nc-bg);
    color: var(--nc-primary);
    box-shadow: var(--nc-shadow);
  }

  .nc-tab:hover:not(.active) {
    color: var(--nc-text);
  }

  .nc-badge {
    background: var(--nc-primary);
    color: var(--nc-primary-text);
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .nc-empty-state {
    text-align: center;
    padding: 48px 24px;
    color: var(--nc-text-secondary);
  }

  .nc-empty-state ha-icon {
    --mdc-icon-size: 64px;
    color: var(--nc-border);
    margin-bottom: 16px;
  }

  .nc-empty-state h3 {
    font-weight: 400;
    margin: 8px 0;
  }

  .nc-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--nc-transition);
    background: var(--nc-bg-secondary);
    color: var(--nc-text);
  }

  .nc-btn:hover {
    background: #e8e8e8;
  }

  .nc-btn.primary {
    background: var(--nc-primary);
    color: var(--nc-primary-text);
  }

  .nc-btn.primary:hover {
    filter: brightness(1.1);
  }

  .nc-btn.danger {
    background: #ffebee;
    color: #c62828;
  }

  .nc-btn.danger:hover {
    background: #ffcdd2;
  }

  .nc-card {
    background: var(--nc-bg);
    border-radius: var(--nc-radius);
    box-shadow: var(--nc-shadow);
    padding: 16px 20px;
    transition: box-shadow var(--nc-transition);
  }

  .nc-card:hover {
    box-shadow: var(--nc-shadow-hover);
  }

  /* Priority colors */
  .priority-urgent {
    --priority-color: #d32f2f;
    --priority-bg: #ffebee;
  }
  .priority-high {
    --priority-color: #f57c00;
    --priority-bg: #fff3e0;
  }
  .priority-normal {
    --priority-color: var(--nc-primary);
    --priority-bg: #e3f2fd;
  }
  .priority-low {
    --priority-color: var(--nc-text-secondary);
    --priority-bg: var(--nc-bg-secondary);
  }

  .pulse {
    animation: nc-pulse 2s ease-in-out infinite;
  }

  @keyframes nc-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--nc-border);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--nc-text-secondary);
  }
`;

let RuleEditorDialog = class RuleEditorDialog extends i {
    constructor() {
        super(...arguments);
        this.rule = null;
        this.groups = [];
        this.open = false;
        this._name = "";
        this._description = "";
        this._enabled = true;
        this._targetGroup = "all_devices";
        this._priorityOverride = "";
        this._conditions = [];
    }
    updated(changed) {
        if (changed.has("open") && this.open && this.rule) {
            this._name = this.rule.name;
            this._description = this.rule.description || "";
            this._enabled = this.rule.enabled;
            this._targetGroup = this.rule.target_group;
            this._priorityOverride = this.rule.priority_override || "";
            this._conditions = [...(this.rule.conditions || [])];
        }
    }
    _addCondition() {
        this._conditions = [
            ...this._conditions,
            { type: "priority", values: ["normal"] },
        ];
    }
    _removeCondition(idx) {
        this._conditions = this._conditions.filter((_, i) => i !== idx);
    }
    _updateCondition(idx, updates) {
        this._conditions = this._conditions.map((c, i) => i === idx ? { ...c, ...updates } : c);
    }
    _save() {
        const rule = {
            id: this.rule?.id || `rule_${Date.now()}`,
            name: this._name || "Untitled Rule",
            description: this._description,
            enabled: this._enabled,
            conditions: this._conditions,
            target_group: this._targetGroup,
            priority_override: this._priorityOverride || null,
        };
        this.dispatchEvent(new CustomEvent("rule-save", { detail: rule, bubbles: true, composed: true }));
        this.close();
    }
    _delete() {
        if (this.rule) {
            this.dispatchEvent(new CustomEvent("rule-delete", {
                detail: this.rule.id,
                bubbles: true,
                composed: true,
            }));
        }
        this.close();
    }
    close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("dialog-close", { bubbles: true, composed: true }));
    }
    render() {
        if (!this.open)
            return b ``;
        const conditionTypes = ["priority", "time_range", "presence", "keyword"];
        const priorityOptions = ["low", "normal", "high", "urgent"];
        return b `
      <div class="backdrop" @click=${this.close}></div>
      <div class="dialog">
        <h2>${this.rule?.id && this.rule.id !== "default" ? "Edit Rule" : "New Rule"}</h2>

        <div class="field">
          <label>Name</label>
          <input
            .value=${this._name}
            @input=${(e) => (this._name = e.target.value)}
            placeholder="e.g., Quiet Hours"
          />
        </div>

        <div class="field">
          <label>Description</label>
          <input
            .value=${this._description}
            @input=${(e) => (this._description = e.target.value)}
            placeholder="Optional description"
          />
        </div>

        <div class="field">
          <div class="toggle-row">
            <span>Enabled</span>
            <input
              type="checkbox"
              .checked=${this._enabled}
              @change=${(e) => (this._enabled = e.target.checked)}
            />
          </div>
        </div>

        <div class="field">
          <label>Target Group</label>
          <select
            .value=${this._targetGroup}
            @change=${(e) => (this._targetGroup = e.target.value)}
          >
            ${this.groups.map((g) => b `<option value=${g.id}>${g.name}</option>`)}
          </select>
        </div>

        <div class="field">
          <label>Priority Override (optional)</label>
          <select
            .value=${this._priorityOverride}
            @change=${(e) => (this._priorityOverride = e.target.value)}
          >
            <option value="">None</option>
            ${priorityOptions.map((p) => b `<option value=${p}>${p}</option>`)}
          </select>
        </div>

        <div class="field">
          <label>Conditions</label>
          ${this._conditions.map((cond, idx) => b `
              <div class="condition-row">
                <select
                  .value=${cond.type}
                  @change=${(e) => this._updateCondition(idx, {
            type: e.target.value,
        })}
                >
                  ${conditionTypes.map((t) => b `<option value=${t}>${t}</option>`)}
                </select>
                ${cond.type === "priority"
            ? b `
                      <div class="chip">
                        ${priorityOptions.map((p) => b `
                            <label style="display:inline-flex;align-items:center;gap:2px;cursor:pointer;margin:0 2px;">
                              <input
                                type="checkbox"
                                .checked=${cond.values?.includes(p) || false}
                                @change=${(e) => {
                const checked = e.target.checked;
                const vals = cond.values || [];
                this._updateCondition(idx, {
                    values: checked
                        ? [...vals, p]
                        : vals.filter((v) => v !== p),
                });
            }}
                                style="margin:0;"
                              />
                              ${p}
                            </label>
                          `)}
                      </div>
                    `
            : cond.type === "time_range"
                ? b `
                      <input
                        type="time"
                        .value=${cond.after || ""}
                        @change=${(e) => this._updateCondition(idx, {
                    after: e.target.value,
                })}
                        placeholder="After"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        .value=${cond.before || ""}
                        @change=${(e) => this._updateCondition(idx, {
                    before: e.target.value,
                })}
                        placeholder="Before"
                      />
                    `
                : cond.type === "presence"
                    ? b `
                      <input
                        .value=${cond.entity_id || ""}
                        @input=${(e) => this._updateCondition(idx, {
                        entity_id: e.target.value,
                    })}
                        placeholder="person.name"
                      />
                      <select
                        .value=${cond.state || "home"}
                        @change=${(e) => this._updateCondition(idx, {
                        state: e.target.value,
                    })}
                      >
                        <option value="home">home</option>
                        <option value="not_home">not_home</option>
                      </select>
                    `
                    : cond.type === "keyword"
                        ? b `
                      <input
                        .value=${cond.value || ""}
                        @input=${(e) => this._updateCondition(idx, {
                            value: e.target.value,
                        })}
                        placeholder="garage"
                      />
                    `
                        : ""}
                <button
                  style="background:none;border:none;cursor:pointer;font-size:18px;color:#c62828;padding:0 4px;"
                  @click=${() => this._removeCondition(idx)}
                >
                  ×
                </button>
              </div>
            `)}
          <button class="add-btn" @click=${this._addCondition}>
            + Add Condition
          </button>
        </div>

        <div class="actions">
          ${this.rule?.id && this.rule.id !== "default"
            ? b `<button class="btn-delete" @click=${this._delete}>Delete</button>`
            : ""}
          <button class="btn-cancel" @click=${this.close}>Cancel</button>
          <button class="btn-save" @click=${this._save}>Save Rule</button>
        </div>
      </div>
    `;
    }
};
RuleEditorDialog.styles = i$3 `
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
    }
    :host([open]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    .dialog {
      position: relative;
      background: var(--card-background-color, #fff);
      border-radius: 16px;
      padding: 24px;
      width: 90%;
      max-width: 560px;
      max-height: 85vh;
      overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    .dialog h2 {
      margin: 0 0 20px 0;
      font-size: 20px;
      font-weight: 500;
    }
    .field {
      margin-bottom: 16px;
    }
    .field label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 4px;
    }
    .field input,
    .field select,
    .field textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-sizing: border-box;
    }
    .field textarea {
      resize: vertical;
      min-height: 50px;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .toggle-row span {
      font-size: 14px;
    }
    .condition-row {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .condition-row select,
    .condition-row input {
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      font-size: 13px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
    }
    .condition-row input {
      width: 120px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 16px;
      font-size: 12px;
    }
    .chip button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      padding: 0;
      line-height: 1;
    }
    .actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    button {
      padding: 10px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-save {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .btn-save:hover {
      filter: brightness(1.1);
    }
    .btn-cancel {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #212121);
    }
    .btn-delete {
      background: #ffebee;
      color: #c62828;
      margin-right: auto;
    }
    .add-btn {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-color, #03a9f4);
      font-size: 13px;
      padding: 8px 16px;
      margin-top: 8px;
    }
  `;
__decorate([
    n({ type: Object })
], RuleEditorDialog.prototype, "rule", void 0);
__decorate([
    n({ type: Array })
], RuleEditorDialog.prototype, "groups", void 0);
__decorate([
    n({ type: Boolean, reflect: true })
], RuleEditorDialog.prototype, "open", void 0);
__decorate([
    r()
], RuleEditorDialog.prototype, "_name", void 0);
__decorate([
    r()
], RuleEditorDialog.prototype, "_description", void 0);
__decorate([
    r()
], RuleEditorDialog.prototype, "_enabled", void 0);
__decorate([
    r()
], RuleEditorDialog.prototype, "_targetGroup", void 0);
__decorate([
    r()
], RuleEditorDialog.prototype, "_priorityOverride", void 0);
__decorate([
    r()
], RuleEditorDialog.prototype, "_conditions", void 0);
RuleEditorDialog = __decorate([
    t("rule-editor-dialog")
], RuleEditorDialog);

let GroupEditorDialog = class GroupEditorDialog extends i {
    constructor() {
        super(...arguments);
        this.group = null;
        this.open = false;
        this._name = "";
        this._description = "";
        this._icon = "mdi:bell-ring";
        this._targets = "";
        this._availableServices = [];
        this._selectedServices = new Set();
        this._useChecklist = true;
    }
    updated(changed) {
        if (changed.has("open") && this.open) {
            if (this.group) {
                this._name = this.group.name;
                this._description = this.group.description || "";
                this._icon = this.group.icon || "mdi:bell-ring";
                this._targets = (this.group.targets || []).join("\n");
                this._selectedServices = new Set(this.group.targets || []);
            }
            else {
                this._name = "";
                this._description = "";
                this._icon = "mdi:bell-ring";
                this._targets = "";
                this._selectedServices = new Set();
            }
            this._loadServices();
        }
    }
    _loadServices() {
        try {
            const haApp = document.querySelector("home-assistant");
            const haMain = document.querySelector("home-assistant-main");
            const hass = haApp?.hass || haMain?.hass;
            if (!hass?.services)
                return;
            const notifyServices = hass.services.notify || {};
            // Filter to mobile_app services only
            const services = [];
            for (const name of Object.keys(notifyServices)) {
                if (name.startsWith("mobile_app_")) {
                    services.push(`notify.${name}`);
                }
            }
            this._availableServices = services;
        }
        catch {
            // Silently fail — user can still type manually
        }
    }
    _toggleService(service) {
        const next = new Set(this._selectedServices);
        if (next.has(service)) {
            next.delete(service);
        }
        else {
            next.add(service);
        }
        this._selectedServices = next;
        // Sync to textarea
        this._targets = [...next].join("\n");
    }
    _selectAll() {
        const all = new Set(this._availableServices);
        this._selectedServices = all;
        this._targets = [...all].join("\n");
    }
    _clearAll() {
        this._selectedServices = new Set();
        this._targets = "";
    }
    _save() {
        const targets = this._useChecklist
            ? [...this._selectedServices]
            : this._targets
                .split("\n")
                .map((t) => t.trim())
                .filter((t) => t.length > 0);
        const group = {
            id: this.group?.id || `group_${Date.now()}`,
            name: this._name || "Untitled Group",
            description: this._description,
            icon: this._icon,
            targets: targets,
        };
        this.dispatchEvent(new CustomEvent("group-save", {
            detail: group,
            bubbles: true,
            composed: true,
        }));
        this.close();
    }
    _delete() {
        if (this.group) {
            this.dispatchEvent(new CustomEvent("group-delete", {
                detail: this.group.id,
                bubbles: true,
                composed: true,
            }));
        }
        this.close();
    }
    close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("dialog-close", { bubbles: true, composed: true }));
    }
    render() {
        if (!this.open)
            return b ``;
        const commonIcons = [
            "mdi:bell-ring",
            "mdi:cellphone",
            "mdi:tablet",
            "mdi:speaker",
            "mdi:account-group",
            "mdi:home",
            "mdi:star",
        ];
        return b `
      <div class="backdrop" @click=${this.close}></div>
      <div class="dialog">
        <h2>
          ${this.group?.id && this.group.id !== "all_devices"
            ? "Edit Group"
            : "New Group"}
        </h2>
        <div class="field">
          <label>Name</label>
          <input
            .value=${this._name}
            @input=${(e) => (this._name = e.target.value)}
            placeholder="e.g., Phones Only"
            ?disabled=${this.group?.id === "all_devices"}
          />
        </div>
        <div class="field">
          <label>Description</label>
          <input
            .value=${this._description}
            @input=${(e) => (this._description = e.target.value)}
            placeholder="Optional description"
          />
        </div>
        <div class="field">
          <label>Icon</label>
          <div class="icon-preview">
            <ha-icon icon=${this._icon}></ha-icon>
            <select
              .value=${this._icon}
              @change=${(e) => (this._icon = e.target.value)}
            >
              ${commonIcons.map((i) => b `<option value=${i}>${i}</option>`)}
            </select>
          </div>
        </div>
        <div class="field">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <label>Targets</label>
            <div style="display:flex;gap:8px;">
              <button class="btn-select-all" @click=${this._selectAll}>All</button>
              <button class="btn-select-all" @click=${this._clearAll}>Clear</button>
            </div>
          </div>

          <!-- Mode toggle -->
          <div class="mode-toggle">
            <button
              class=${this._useChecklist ? "active" : ""}
              @click=${() => (this._useChecklist = true)}
            >
              Checklist
            </button>
            <button
              class=${!this._useChecklist ? "active" : ""}
              @click=${() => (this._useChecklist = false)}
            >
              Manual
            </button>
          </div>

          ${this._useChecklist
            ? b `
                <div class="checklist">
                  ${this._availableServices.length === 0
                ? b `<div class="empty-services">Loading services…</div>`
                : this._availableServices.map((svc) => b `
                          <div
                            class="checklist-item"
                            @click=${() => this._toggleService(svc)}
                          >
                            <input
                              type="checkbox"
                              .checked=${this._selectedServices.has(svc)}
                              @click=${(e) => e.stopPropagation()}
                              @change=${() => this._toggleService(svc)}
                            />
                            <span class="device-icon">
                              ${svc.includes("ipad") ? "📱" : "📲"}
                            </span>
                            <span class="device-name">
                              ${svc.replace("notify.mobile_app_", "").replace(/_/g, " ")}
                            </span>
                            <span class="device-id">${svc}</span>
                          </div>
                        `)}
                </div>
                <div class="hint" style="margin-top:4px;">
                  ${this._selectedServices.size} device(s) selected
                </div>
              `
            : b `
                <textarea
                  .value=${this._targets}
                  @input=${(e) => (this._targets = e.target.value)}
                  placeholder="notify.mobile_app_iphone&#10;notify.mobile_app_pixel"
                  rows="4"
                ></textarea>
                <div class="hint">
                  One per line. Leave empty for all devices.
                </div>
              `}
        </div>
        <div class="actions">
          ${this.group?.id && this.group.id !== "all_devices"
            ? b `<button class="btn-delete" @click=${this._delete}>
                Delete
              </button>`
            : ""}
          <button class="btn-cancel" @click=${this.close}>Cancel</button>
          <button class="btn-save" @click=${this._save}>Save Group</button>
        </div>
      </div>
    `;
    }
};
GroupEditorDialog.styles = i$3 `
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
    }
    :host([open]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    .dialog {
      position: relative;
      background: var(--card-background-color, #fff);
      border-radius: 16px;
      padding: 24px;
      width: 90%;
      max-width: 540px;
      max-height: 85vh;
      overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    .dialog h2 {
      margin: 0 0 20px 0;
      font-size: 20px;
      font-weight: 500;
    }
    .field {
      margin-bottom: 16px;
    }
    .field label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 4px;
    }
    .field input,
    .field textarea,
    .field select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-sizing: border-box;
    }
    .field textarea {
      resize: vertical;
      min-height: 60px;
    }
    .field .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #757575);
      margin-top: 4px;
    }
    .icon-preview {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }

    /* Checklist styles */
    .checklist {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 8px;
    }
    .checklist-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.15s;
    }
    .checklist-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .checklist-item input[type="checkbox"] {
      width: auto;
      margin: 0;
      cursor: pointer;
    }
    .checklist-item .device-icon {
      font-size: 18px;
      width: 24px;
      text-align: center;
      flex-shrink: 0;
    }
    .checklist-item .device-name {
      flex: 1;
    }
    .checklist-item .device-id {
      font-size: 11px;
      color: var(--secondary-text-color, #757575);
    }
    .empty-services {
      text-align: center;
      padding: 16px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .mode-toggle {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 6px;
      padding: 2px;
    }
    .mode-toggle button {
      flex: 1;
      padding: 6px 12px;
      border: none;
      border-radius: 5px;
      background: transparent;
      font-size: 12px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .mode-toggle button.active {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    button {
      padding: 10px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-save {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .btn-save:hover {
      filter: brightness(1.1);
    }
    .btn-cancel {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #212121);
    }
    .btn-delete {
      background: #ffebee;
      color: #c62828;
      margin-right: auto;
    }
    .btn-select-all {
      background: none;
      border: none;
      color: var(--primary-color, #03a9f4);
      font-size: 12px;
      cursor: pointer;
      padding: 4px 8px;
      font-weight: 400;
    }
  `;
__decorate([
    n({ type: Object })
], GroupEditorDialog.prototype, "group", void 0);
__decorate([
    n({ type: Boolean, reflect: true })
], GroupEditorDialog.prototype, "open", void 0);
__decorate([
    r()
], GroupEditorDialog.prototype, "_name", void 0);
__decorate([
    r()
], GroupEditorDialog.prototype, "_description", void 0);
__decorate([
    r()
], GroupEditorDialog.prototype, "_icon", void 0);
__decorate([
    r()
], GroupEditorDialog.prototype, "_targets", void 0);
__decorate([
    r()
], GroupEditorDialog.prototype, "_availableServices", void 0);
__decorate([
    r()
], GroupEditorDialog.prototype, "_selectedServices", void 0);
__decorate([
    r()
], GroupEditorDialog.prototype, "_useChecklist", void 0);
GroupEditorDialog = __decorate([
    t("group-editor-dialog")
], GroupEditorDialog);

let NotificationCenterPanel = class NotificationCenterPanel extends i {
    constructor() {
        super(...arguments);
        this._tab = "inbox";
        this._notifications = [];
        this._rules = [];
        this._groups = [];
        this._unreadCount = 0;
        this._loading = true;
        this._error = null;
        // Dialog state
        this._ruleDialogOpen = false;
        this._editingRule = null;
        this._groupDialogOpen = false;
        this._editingGroup = null;
        // Drag state
        this._dragIdx = null;
        this._dropIdx = null;
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => this._loadData(), 100);
    }
    async _callWS(type, extra = {}) {
        const haApp = document.querySelector("home-assistant");
        if (haApp?.hass)
            return haApp.hass.callWS({ type, ...extra });
        const haMain = document.querySelector("home-assistant-main");
        if (haMain?.hass)
            return haMain.hass.callWS({ type, ...extra });
        throw new Error("Cannot access Home Assistant WebSocket");
    }
    async _loadData() {
        this._loading = true;
        this._error = null;
        try {
            const [notifications, rules, groups, count] = await Promise.all([
                this._callWS("notification_center/history"),
                this._callWS("notification_center/get_rules"),
                this._callWS("notification_center/get_groups"),
                this._callWS("notification_center/unread_count"),
            ]);
            this._notifications = notifications || [];
            this._rules = rules || [];
            this._groups = groups || [];
            this._unreadCount = count?.count || 0;
        }
        catch (err) {
            console.error("NC: load error", err);
            this._error = err?.message || String(err);
        }
        finally {
            this._loading = false;
        }
    }
    // ── Rule CRUD ──────────────────────────────────
    _openRuleEditor(rule) {
        this._editingRule = rule || null;
        this._ruleDialogOpen = true;
    }
    async _handleRuleSave(e) {
        const rule = e.detail;
        const existing = this._rules.findIndex((r) => r.id === rule.id);
        let newRules;
        if (existing >= 0) {
            newRules = this._rules.map((r) => (r.id === rule.id ? rule : r));
        }
        else {
            newRules = [...this._rules, rule];
        }
        await this._callWS("notification_center/save_rules", { rules: newRules });
        this._rules = newRules;
        this.requestUpdate();
    }
    async _handleRuleDelete(e) {
        const ruleId = e.detail;
        const newRules = this._rules.filter((r) => r.id !== ruleId);
        if (newRules.length === 0)
            return; // keep at least one
        await this._callWS("notification_center/save_rules", { rules: newRules });
        this._rules = newRules;
        this.requestUpdate();
    }
    async _handleRuleReorder(fromIdx, toIdx) {
        const newRules = [...this._rules];
        const [moved] = newRules.splice(fromIdx, 1);
        newRules.splice(toIdx, 0, moved);
        await this._callWS("notification_center/save_rules", { rules: newRules });
        this._rules = newRules;
        this.requestUpdate();
    }
    // ── Group CRUD ─────────────────────────────────
    _openGroupEditor(group) {
        this._editingGroup = group || null;
        this._groupDialogOpen = true;
    }
    async _handleGroupSave(e) {
        const group = e.detail;
        const existing = this._groups.findIndex((g) => g.id === group.id);
        let newGroups;
        if (existing >= 0) {
            newGroups = this._groups.map((g) => (g.id === group.id ? group : g));
        }
        else {
            newGroups = [...this._groups, group];
        }
        await this._callWS("notification_center/save_groups", { groups: newGroups });
        this._groups = newGroups;
        this.requestUpdate();
    }
    async _handleGroupDelete(e) {
        const groupId = e.detail;
        const newGroups = this._groups.filter((g) => g.id !== groupId);
        await this._callWS("notification_center/save_groups", { groups: newGroups });
        this._groups = newGroups;
        this.requestUpdate();
    }
    // ── Inbox ──────────────────────────────────────
    async _handleToggleRead(n) {
        if (!n.read) {
            await this._callWS("notification_center/mark_read", { notification_id: n.id });
            n.read = true;
            const r = await this._callWS("notification_center/unread_count");
            this._unreadCount = r?.count || 0;
            this.requestUpdate();
        }
    }
    async _handleMarkAllRead() {
        await this._callWS("notification_center/mark_all_read");
        this._notifications.forEach((n) => (n.read = true));
        this._unreadCount = 0;
        this.requestUpdate();
    }
    // ── Render ─────────────────────────────────────
    render() {
        if (this._loading)
            return b `<div class="nc-loading">Loading…</div>`;
        if (this._error)
            return b `
      <div class="nc-empty-state">
        <ha-icon icon="mdi:alert-circle"></ha-icon>
        <h3>Connection Error</h3>
        <p style="font-size:12px;">${this._error}</p>
        <button class="nc-btn primary" @click=${this._loadData}>Retry</button>
      </div>`;
        return b `
      <div class="nc-content">
        <div class="nc-container">
          <div class="nc-tabs">
            <button class="nc-tab ${this._tab === 'inbox' ? 'active' : ''}" @click=${() => this._tab = 'inbox'}>
              <ha-icon icon="mdi:inbox"></ha-icon> Inbox
              ${this._unreadCount > 0 ? b `<span class="nc-badge">${this._unreadCount}</span>` : ''}
            </button>
            <button class="nc-tab ${this._tab === 'rules' ? 'active' : ''}" @click=${() => this._tab = 'rules'}>
              <ha-icon icon="mdi:routes"></ha-icon> Rules
            </button>
            <button class="nc-tab ${this._tab === 'groups' ? 'active' : ''}" @click=${() => this._tab = 'groups'}>
              <ha-icon icon="mdi:account-group"></ha-icon> Groups
            </button>
          </div>
          ${this._tab === 'inbox' ? this._renderInbox() : this._tab === 'rules' ? this._renderRules() : this._renderGroups()}
        </div>
      </div>

      <!-- Dialogs -->
      <rule-editor-dialog
        .open=${this._ruleDialogOpen}
        .rule=${this._editingRule}
        .groups=${this._groups}
        @rule-save=${this._handleRuleSave}
        @rule-delete=${this._handleRuleDelete}
        @dialog-close=${() => (this._ruleDialogOpen = false)}
      ></rule-editor-dialog>

      <group-editor-dialog
        .open=${this._groupDialogOpen}
        .group=${this._editingGroup}
        @group-save=${this._handleGroupSave}
        @group-delete=${this._handleGroupDelete}
        @dialog-close=${() => (this._groupDialogOpen = false)}
      ></group-editor-dialog>
    `;
    }
    _renderInbox() {
        if (!this._notifications.length)
            return b `
      <div class="nc-empty-state">
        <ha-icon icon="mdi:bell-off-outline"></ha-icon>
        <h3>No notifications yet</h3>
        <p>Send via notify.notification_center to see them here.</p>
      </div>`;
        return b `
      <div class="nc-header">
        <h1>Inbox</h1>
        ${this._unreadCount > 0 ? b `<button class="nc-btn" @click=${this._handleMarkAllRead}>Mark all read</button>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${this._notifications.map(n => b `
          <div class="nc-card priority-${n.priority}">
            <div style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;" @click=${() => this._handleToggleRead(n)}>
              <div style="width:10px;height:10px;border-radius:50%;margin-top:4px;flex-shrink:0;background:${n.read ? 'transparent' : 'var(--priority-color,var(--nc-primary))'}"></div>
              <div style="flex:1;min-width:0;">
                <div style="display:flex;justify-content:space-between;gap:8px;">
                  <strong style="font-weight:${n.read ? '400' : '600'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${n.title || 'No title'}</strong>
                  <span class="nc-badge" style="background:var(--priority-bg,#e3f2fd);color:var(--priority-color,var(--nc-primary));font-size:11px;">${n.priority}</span>
                </div>
                <div style="color:var(--nc-text-secondary);font-size:13px;margin-top:4px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${n.message}</div>
                <div style="color:var(--nc-text-secondary);font-size:11px;margin-top:8px;display:flex;gap:12px;">
                  <span>${n.timestamp}</span><span>Rule: ${n.matched_rule}</span>
                </div>
              </div>
            </div>
          </div>`)}
      </div>`;
    }
    _renderRules() {
        return b `
      <div class="nc-header">
        <h1>Notification Rules</h1>
        <button class="nc-btn primary" @click=${() => this._openRuleEditor()}>+ New Rule</button>
      </div>
      <div style="color:var(--nc-text-secondary);font-size:13px;margin-bottom:16px;">
        First match wins — drag to reorder
      </div>
      ${!this._rules.length ? b `<div class="nc-empty-state"><ha-icon icon="mdi:routes"></ha-icon><h3>No rules</h3></div>` :
            b `<div style="display:flex;flex-direction:column;gap:4px;">
          ${this._rules.map((rule, idx) => b `
            <div
              class="nc-card"
              style="cursor:grab;transition:all 0.15s;opacity:${this._dragIdx === idx ? '0.4' : '1'};border-left:${this._dropIdx === idx ? '3px solid var(--nc-primary)' : '3px solid transparent'};${this._dropIdx === idx ? 'margin-top:8px;' : ''}"
              draggable="true"
              @dragstart=${(e) => this._onDragStart(e, idx)}
              @dragover=${(e) => this._onDragOver(e, idx)}
              @dragleave=${() => this._onDragLeave(idx)}
              @drop=${(e) => this._onDrop(e, idx)}
              @dragend=${() => this._onDragEnd()}
              @click=${() => this._openRuleEditor(rule)}
            >
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="cursor:grab;color:var(--nc-text-secondary);font-size:18px;user-select:none;" @click=${(e) => e.stopPropagation()}>⋮⋮</span>
                  <span style="color:var(--nc-text-secondary);font-size:13px;font-weight:600;min-width:24px;">#${idx + 1}</span>
                  <div>
                    <div style="font-weight:500;">${rule.name}</div>
                    <div style="color:var(--nc-text-secondary);font-size:12px;">${rule.description || ''}</div>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  ${rule.enabled ? b `<span style="color:#4caf50;font-size:12px;">Enabled</span>` : b `<span style="color:var(--nc-text-secondary);font-size:12px;">Disabled</span>`}
                  <span style="color:var(--nc-text-secondary);font-size:12px;">→ ${rule.target_group}</span>
                  ${rule.conditions.length > 0 ? b `<span style="color:var(--nc-text-secondary);font-size:11px;">${rule.conditions.length} cond</span>` : b `<span style="color:var(--nc-text-secondary);font-size:11px;font-style:italic;">Always</span>`}
                </div>
              </div>
            </div>`)}
          <div style="height:4px;border-radius:2px;background:${this._dropIdx === this._rules.length ? 'var(--nc-primary)' : 'transparent'};transition:all 0.15s;margin-top:4px;"></div>
        </div>`}
    `;
    }
    // ── Drag & Drop ─────────────────────────────────
    _onDragStart(e, idx) {
        this._dragIdx = idx;
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(idx));
        }
    }
    _onDragOver(e, idx) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
        this._dropIdx = idx;
    }
    _onDragLeave(idx) {
        if (this._dropIdx === idx)
            this._dropIdx = null;
    }
    async _onDrop(e, idx) {
        e.preventDefault();
        const fromIdx = this._dragIdx;
        this._dragIdx = null;
        this._dropIdx = null;
        if (fromIdx === null || fromIdx === idx)
            return;
        await this._handleRuleReorder(fromIdx, idx);
    }
    _onDragEnd() {
        this._dragIdx = null;
        this._dropIdx = null;
    }
    _renderGroups() {
        return b `
      <div class="nc-header">
        <h1>Notification Groups</h1>
        <button class="nc-btn primary" @click=${() => this._openGroupEditor()}>+ New Group</button>
      </div>
      ${!this._groups.length ? b `<div class="nc-empty-state"><ha-icon icon="mdi:account-group-outline"></ha-icon><h3>No groups</h3></div>` :
            b `<div style="display:flex;flex-direction:column;gap:8px;">
          ${this._groups.map(group => b `
            <div class="nc-card" style="cursor:pointer;" @click=${() => this._openGroupEditor(group)}>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <ha-icon icon=${group.icon || 'mdi:bell-ring'}></ha-icon>
                  <div>
                    <div style="font-weight:500;">${group.name}</div>
                    <div style="color:var(--nc-text-secondary);font-size:12px;">${group.description || ''}</div>
                  </div>
                </div>
                <span style="color:var(--nc-text-secondary);font-size:12px;">
                  ${group.targets.length > 0 ? group.targets.length + ' target(s)' : 'All devices'}
                </span>
              </div>
            </div>`)}
        </div>`}
    `;
    }
};
NotificationCenterPanel.styles = [
    sharedStyles,
    i$3 `
      :host {
        display: flex; flex-direction: column; height: 100%;
      }
      .nc-content { flex: 1; overflow-y: auto; }
      .nc-loading {
        display: flex; align-items: center; justify-content: center;
        height: 100%; font-size: 16px; color: var(--secondary-text-color);
      }
    `,
];
__decorate([
    r()
], NotificationCenterPanel.prototype, "_tab", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_notifications", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_rules", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_groups", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_unreadCount", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_loading", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_error", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_ruleDialogOpen", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_editingRule", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_groupDialogOpen", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_editingGroup", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_dragIdx", void 0);
__decorate([
    r()
], NotificationCenterPanel.prototype, "_dropIdx", void 0);
__decorate([
    e("rule-editor-dialog")
], NotificationCenterPanel.prototype, "_ruleDialog", void 0);
__decorate([
    e("group-editor-dialog")
], NotificationCenterPanel.prototype, "_groupDialog", void 0);
NotificationCenterPanel = __decorate([
    t("notification-center-panel")
], NotificationCenterPanel);

export { NotificationCenterPanel };
