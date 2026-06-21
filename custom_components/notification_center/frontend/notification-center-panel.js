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
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

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

// ─── Fetch Functions ──────────────────────────────
const fetchHistory = async (hass, includeDismissed = false) => {
    return hass.callWS({
        type: "notification_center/history",
        include_dismissed: includeDismissed,
    });
};
const markRead = async (hass, notificationId) => {
    const result = await hass.callWS({
        type: "notification_center/mark_read",
        notification_id: notificationId,
    });
    return result.success;
};
const markAllRead = async (hass) => {
    const result = await hass.callWS({
        type: "notification_center/mark_all_read",
    });
    return result.count;
};
const fetchRules = async (hass) => {
    return hass.callWS({ type: "notification_center/get_rules" });
};
const fetchGroups = async (hass) => {
    return hass.callWS({ type: "notification_center/get_groups" });
};
const getUnreadCount = async (hass) => {
    const result = await hass.callWS({
        type: "notification_center/unread_count",
    });
    return result.count;
};

var websocket = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fetchGroups: fetchGroups,
    fetchHistory: fetchHistory,
    fetchRules: fetchRules,
    getUnreadCount: getUnreadCount,
    markAllRead: markAllRead,
    markRead: markRead
});

let NotificationCenterPanel = class NotificationCenterPanel extends i {
    constructor() {
        super(...arguments);
        this._tab = "inbox";
        this._notifications = [];
        this._rules = [];
        this._groups = [];
        this._unreadCount = 0;
        this._loading = true;
    }
    connectedCallback() {
        super.connectedCallback();
        this._loadData();
    }
    async _loadData() {
        this._loading = true;
        try {
            const [notifications, rules, groups, count] = await Promise.all([
                fetchHistory(this.hass),
                fetchRules(this.hass),
                fetchGroups(this.hass),
                getUnreadCount(this.hass),
            ]);
            this._notifications = notifications;
            this._rules = rules;
            this._groups = groups;
            this._unreadCount = count;
        }
        catch (err) {
            console.error("Notification Center: failed to load data", err);
        }
        finally {
            this._loading = false;
        }
    }
    _switchTab(tab) {
        this._tab = tab;
    }
    render() {
        if (this._loading) {
            return b `<div class="nc-empty-state pulse">Loading…</div>`;
        }
        return b `
      <div class="nc-content">
        <div class="nc-container">
          <!-- Tabs -->
          <div class="nc-tabs">
            <button
              class="nc-tab ${this._tab === "inbox" ? "active" : ""}"
              @click=${() => this._switchTab("inbox")}
            >
              <ha-icon icon="mdi:inbox"></ha-icon>
              Inbox
              ${this._unreadCount > 0
            ? b `<span class="nc-badge">${this._unreadCount}</span>`
            : ""}
            </button>
            <button
              class="nc-tab ${this._tab === "rules" ? "active" : ""}"
              @click=${() => this._switchTab("rules")}
            >
              <ha-icon icon="mdi:routes"></ha-icon>
              Rules
            </button>
            <button
              class="nc-tab ${this._tab === "groups" ? "active" : ""}"
              @click=${() => this._switchTab("groups")}
            >
              <ha-icon icon="mdi:account-group"></ha-icon>
              Groups
            </button>
          </div>

          <!-- Tab content -->
          ${this._renderTab()}
        </div>
      </div>
    `;
    }
    _renderTab() {
        switch (this._tab) {
            case "inbox":
                return this._renderInbox();
            case "rules":
                return this._renderRules();
            case "groups":
                return this._renderGroups();
        }
    }
    // ─── Inbox ──────────────────────────────────────
    _renderInbox() {
        if (this._notifications.length === 0) {
            return b `
        <div class="nc-empty-state">
          <ha-icon icon="mdi:bell-off-outline"></ha-icon>
          <h3>No notifications yet</h3>
          <p>Notifications sent through the Notification Center will appear here.</p>
        </div>
      `;
        }
        return b `
      <div class="nc-header">
        <h1>Inbox</h1>
        ${this._unreadCount > 0
            ? b `<button class="nc-btn" @click=${this._handleMarkAllRead}>
              Mark all read
            </button>`
            : ""}
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        ${this._notifications.map((n) => b `
            <div class="nc-card priority-${n.priority}">
              <div
                style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;"
                @click=${() => this._handleToggleRead(n)}
              >
                <!-- Unread dot -->
                <div
                  style="width:10px;height:10px;border-radius:50%;margin-top:4px;flex-shrink:0;"
                  style="background:${n.read ? "transparent" : "var(--priority-color, var(--nc-primary))"}"
                ></div>

                <div style="flex:1;min-width:0;">
                  <div
                    style="display:flex;justify-content:space-between;align-items:center;gap:8px;"
                  >
                    <strong
                      style="font-weight:${n.read ? "400" : "600"};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
                    >
                      ${n.title || "No title"}
                    </strong>
                    <span
                      class="nc-badge"
                      style="background:var(--priority-bg,#e3f2fd);color:var(--priority-color,var(--nc-primary));font-size:11px;"
                    >
                      ${n.priority}
                    </span>
                  </div>
                  <div
                    style="color:var(--nc-text-secondary);font-size:13px;margin-top:4px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;"
                  >
                    ${n.message}
                  </div>
                  <div
                    style="color:var(--nc-text-secondary);font-size:11px;margin-top:8px;display:flex;gap:12px;"
                  >
                    <span>${n.timestamp}</span>
                    <span>Rule: ${n.matched_rule}</span>
                  </div>
                </div>
              </div>
            </div>
          `)}
      </div>
    `;
    }
    async _handleToggleRead(n) {
        if (!n.read) {
            const { markRead, getUnreadCount } = await Promise.resolve().then(function () { return websocket; });
            await markRead(this.hass, n.id);
            n.read = true;
            this._unreadCount = await getUnreadCount(this.hass);
            this.requestUpdate();
        }
    }
    async _handleMarkAllRead() {
        await markAllRead(this.hass);
        this._notifications.forEach((n) => (n.read = true));
        this._unreadCount = 0;
        this.requestUpdate();
    }
    // ─── Rules ──────────────────────────────────────
    _renderRules() {
        return b `
      <div class="nc-header">
        <h1>Notification Rules</h1>
        <span style="color:var(--nc-text-secondary);font-size:13px;">
          First match wins — rules are evaluated in order
        </span>
      </div>

      ${this._rules.length === 0
            ? b `<div class="nc-empty-state">
            <ha-icon icon="mdi:routes"></ha-icon>
            <h3>No rules configured</h3>
          </div>`
            : b `
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${this._rules.map((rule, idx) => b `
                  <div class="nc-card">
                    <div
                      style="display:flex;align-items:center;justify-content:space-between;"
                    >
                      <div style="display:flex;align-items:center;gap:12px;">
                        <span
                          style="color:var(--nc-text-secondary);font-size:13px;font-weight:600;min-width:24px;"
                        >
                          #${idx + 1}
                        </span>
                        <div>
                          <div style="font-weight:500;">${rule.name}</div>
                          <div
                            style="color:var(--nc-text-secondary);font-size:12px;"
                          >
                            ${rule.description || ""}
                          </div>
                        </div>
                      </div>
                      <div
                        style="display:flex;align-items:center;gap:8px;"
                      >
                        ${rule.enabled
                ? b `<span
                              style="color:#4caf50;font-size:12px;"
                              >Enabled</span
                            >`
                : b `<span
                              style="color:var(--nc-text-secondary);font-size:12px;"
                              >Disabled</span
                            >`}
                        <span style="color:var(--nc-text-secondary);font-size:12px;">
                          → ${rule.target_group}
                        </span>
                      </div>
                    </div>
                    ${rule.conditions.length > 0
                ? b `
                          <div
                            style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap;"
                          >
                            ${rule.conditions.map((c) => b `
                                <span
                                  style="background:var(--nc-bg-secondary);padding:2px 8px;border-radius:4px;font-size:11px;color:var(--nc-text-secondary);"
                                >
                                  ${this._conditionLabel(c)}
                                </span>
                              `)}
                          </div>
                        `
                : b `
                          <div
                            style="margin-top:8px;font-size:11px;color:var(--nc-text-secondary);font-style:italic;"
                          >
                            Always matches
                          </div>
                        `}
                  </div>
                `)}
            </div>
          `}
    `;
    }
    _conditionLabel(c) {
        switch (c.type) {
            case "priority":
                return `Priority: ${c.values?.join(", ") || "any"}`;
            case "time_range":
                return `Time: ${c.after || "00:00"} – ${c.before || "23:59"}`;
            case "presence":
                return `Presence: ${c.entity_id} = ${c.state || "home"}`;
            case "keyword":
                return `Keyword: "${c.value}"`;
            default:
                return c.type;
        }
    }
    // ─── Groups ─────────────────────────────────────
    _renderGroups() {
        return b `
      <div class="nc-header">
        <h1>Notification Groups</h1>
      </div>

      ${this._groups.length === 0
            ? b `<div class="nc-empty-state">
            <ha-icon icon="mdi:account-group-outline"></ha-icon>
            <h3>No groups configured</h3>
          </div>`
            : b `
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${this._groups.map((group) => b `
                  <div class="nc-card">
                    <div
                      style="display:flex;align-items:center;justify-content:space-between;"
                    >
                      <div style="display:flex;align-items:center;gap:12px;">
                        <ha-icon
                          icon=${group.icon || "mdi:bell-ring"}
                        ></ha-icon>
                        <div>
                          <div style="font-weight:500;">${group.name}</div>
                          <div
                            style="color:var(--nc-text-secondary);font-size:12px;"
                          >
                            ${group.description || ""}
                          </div>
                        </div>
                      </div>
                      <span style="color:var(--nc-text-secondary);font-size:12px;">
                        ${group.targets.length > 0
                ? `${group.targets.length} target(s)`
                : "All devices"}
                      </span>
                    </div>
                    ${group.targets.length > 0
                ? b `
                          <div
                            style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap;"
                          >
                            ${group.targets.map((t) => b `
                                <span
                                  style="background:var(--nc-bg-secondary);padding:2px 8px;border-radius:4px;font-size:11px;color:var(--nc-text-secondary);"
                                >
                                  ${t}
                                </span>
                              `)}
                          </div>
                        `
                : ""}
                  </div>
                `)}
            </div>
          `}
    `;
    }
};
NotificationCenterPanel.styles = [
    sharedStyles,
    i$3 `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .nc-toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        border-bottom: 1px solid var(--nc-border);
        background: var(--nc-bg);
      }

      .nc-toolbar h1 {
        flex: 1;
        font-size: 24px;
        font-weight: 500;
        margin: 0;
      }

      .nc-content {
        flex: 1;
        overflow-y: auto;
      }
    `,
];
__decorate([
    n({ attribute: false })
], NotificationCenterPanel.prototype, "hass", void 0);
__decorate([
    n({ type: Object })
], NotificationCenterPanel.prototype, "narrow", void 0);
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
NotificationCenterPanel = __decorate([
    t("notification-center-panel")
], NotificationCenterPanel);

export { NotificationCenterPanel };
