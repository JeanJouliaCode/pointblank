import{_ as T}from"../chunks/preload-helper.a4192956.js";import{s as L,c as q,n as A,b as B,d as C,u as G,g as N,e as R,f as X,o as Y,h as F}from"../chunks/scheduler.426c9b2b.js";import{S as H,i as O,g as b,s as E,h as w,j as x,c as I,f as y,k as _,a as D,x as v,r as J,u as K,v as Q,y as U,d as V,t as k,z as Z,w as ee}from"../chunks/index.ddb984f3.js";import{c as z,a as te}from"../chunks/stores.c8f9a458.js";function M(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}const se=!0,de=Object.freeze(Object.defineProperty({__proto__:null,prerender:se},Symbol.toStringTag,{value:"Module"}));function ne(s){let t,e,l,c,o,u;return{c(){t=b("div"),e=b("img"),c=E(),o=b("div"),this.h()},l(i){t=w(i,"DIV",{style:!0,class:!0});var a=x(t);e=w(a,"IMG",{src:!0,alt:!0,class:!0}),c=I(a),o=w(a,"DIV",{class:!0}),x(o).forEach(y),a.forEach(y),this.h()},h(){q(e.src,l="hit.png")||_(e,"src",l),_(e,"alt","hit"),_(e,"class","svelte-16cjzpa"),_(o,"class","hitAnimation svelte-16cjzpa"),_(t,"style",u=`left: ${s[0]}px; top: ${s[1]}px;`),_(t,"class","svelte-16cjzpa")},m(i,a){D(i,t,a),v(t,e),s[3](e),v(t,c),v(t,o)},p(i,[a]){a&3&&u!==(u=`left: ${i[0]}px; top: ${i[1]}px;`)&&_(t,"style",u)},i:A,o:A,d(i){i&&y(t),s[3](null)}}}function le(s,t,e){let{x:l}=t,{y:c}=t,o;function u(i){B[i?"unshift":"push"](()=>{o=i,e(2,o)})}return s.$$set=i=>{"x"in i&&e(0,l=i.x),"y"in i&&e(1,c=i.y)},s.$$.update=()=>{s.$$.dirty&7&&l!==void 0&&c!==void 0&&o&&(o.classList.add("hitAnimation"),setTimeout(()=>{o.classList.remove("hitAnimation")},200))},[l,c,o,u]}class ie extends H{constructor(t){super(),O(this,t,le,ne,L,{x:0,y:1})}}function P(s,t,e){const l=s.slice();return l[8]=t[e],l}function W(s){let t,e;return{c(){t=b("div"),this.h()},l(l){t=w(l,"DIV",{class:!0,style:!0}),x(t).forEach(y),this.h()},h(){_(t,"class","hitbox svelte-8x287j"),_(t,"style",e=`width: ${s[8].width}px;height: ${s[8].height}px;left:${s[8].x}px;top:${s[8].y}px`)},m(l,c){D(l,t,c)},p(l,c){c&4&&e!==(e=`width: ${l[8].width}px;height: ${l[8].height}px;left:${l[8].x}px;top:${l[8].y}px`)&&_(t,"style",e)},d(l){l&&y(t)}}}function oe(s){let t,e,l,c,o,u,i,a,g,$,h=M(s[2]),r=[];for(let n=0;n<h.length;n+=1)r[n]=W(P(s,h,n));u=new ie({props:{x:s[0],y:s[1]}});const j=s[7].default,m=C(j,s,s[6],null);return{c(){t=b("main"),e=b("div"),l=b("div"),c=E();for(let n=0;n<r.length;n+=1)r[n].c();o=E(),J(u.$$.fragment),i=E(),m&&m.c(),this.h()},l(n){t=w(n,"MAIN",{class:!0});var p=x(t);e=w(p,"DIV",{class:!0,id:!0});var f=x(e);l=w(f,"DIV",{class:!0}),x(l).forEach(y),c=I(f);for(let d=0;d<r.length;d+=1)r[d].l(f);o=I(f),K(u.$$.fragment,f),i=I(f),m&&m.l(f),f.forEach(y),p.forEach(y),this.h()},h(){_(l,"class","click-screen svelte-8x287j"),_(e,"class","center svelte-8x287j"),_(e,"id","center"),_(t,"class","svelte-8x287j")},m(n,p){D(n,t,p),v(t,e),v(e,l),v(e,c);for(let f=0;f<r.length;f+=1)r[f]&&r[f].m(e,null);v(e,o),Q(u,e,null),v(e,i),m&&m.m(e,null),a=!0,g||($=U(l,"mousedown",s[3]),g=!0)},p(n,[p]){if(p&4){h=M(n[2]);let d;for(d=0;d<h.length;d+=1){const S=P(n,h,d);r[d]?r[d].p(S,p):(r[d]=W(S),r[d].c(),r[d].m(e,o))}for(;d<r.length;d+=1)r[d].d(1);r.length=h.length}const f={};p&1&&(f.x=n[0]),p&2&&(f.y=n[1]),u.$set(f),m&&m.p&&(!a||p&64)&&G(m,j,n,n[6],a?R(j,n[6],p,null):N(n[6]),null)},i(n){a||(V(u.$$.fragment,n),V(m,n),a=!0)},o(n){k(u.$$.fragment,n),k(m,n),a=!1},d(n){n&&y(t),Z(r,n),ee(u),m&&m.d(n),g=!1,$()}}}function ae(s){var i;const t=(i=document.getElementById("center"))==null?void 0:i.clientWidth,e=window.innerWidth*.1,l=window.innerHeight,c=t+e,o=s.x*c-e/2,u=-s.y*c+l/2;return{x:o,y:u}}function ce(s,t,e){let l;X(s,te,h=>e(2,l=h));let{$$slots:c={},$$scope:o}=t;const u=!0,i="always";let a=-20,g=-20;Y(async()=>{const{Peer:h}=await T(()=>import("../chunks/bundler.b1225d78.js"),[],import.meta.url);var r=new h("jjeeaann2013");r.on("open",j=>{console.log("My peer ID is: "+j),r.on("connection",m=>{m.on("data",n=>{const p=ae(n);p&&(e(0,a=p.x),e(1,g=p.y),z(a,g))})})})});function $(h){console.log("click",h),e(0,a=h.offsetX),e(1,g=h.offsetY),z(a,g)}return F(()=>{console.log("destroyed")}),s.$$set=h=>{"$$scope"in h&&e(6,o=h.$$scope)},[a,g,l,$,u,i,o,c]}class me extends H{constructor(t){super(),O(this,t,ce,oe,L,{prerender:4,trailingSlash:5})}get prerender(){return this.$$.ctx[4]}get trailingSlash(){return this.$$.ctx[5]}}export{me as component,de as universal};