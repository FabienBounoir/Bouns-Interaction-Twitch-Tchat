function v(){}const P=t=>t;function z(t){return t()}function T(){return Object.create(null)}function w(t){t.forEach(z)}function B(t){return typeof t=="function"}function yt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let k;function $t(t,e){return k||(k=document.createElement("a")),k.href=e,t===k.href}function U(t){return Object.keys(t).length===0}const F=typeof window!="undefined";let V=F?()=>window.performance.now():()=>Date.now(),A=F?t=>requestAnimationFrame(t):v;const p=new Set;function M(t){p.forEach(e=>{e.c(t)||(p.delete(e),e.f())}),p.size!==0&&A(M)}function W(t){let e;return p.size===0&&A(M),{promise:new Promise(n=>{p.add(e={c:t,f:n})}),abort(){p.delete(e)}}}function X(t,e){t.appendChild(e)}function G(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Y(t){const e=et("style");return Z(G(t),e),e}function Z(t,e){X(t.head||t,e)}function bt(t,e,n){t.insertBefore(e,n||null)}function tt(t){t.parentNode.removeChild(t)}function vt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function et(t){return document.createElement(t)}function nt(t){return document.createTextNode(t)}function wt(){return nt(" ")}function kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function st(t){return Array.from(t.childNodes)}function xt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function rt(t,e,n=!1){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,!1,e),s}const R=new Set;let x=0;function ot(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function it(t,e,n,s,r,l,c,m=0){const u=16.666/s;let o=`{
`;for(let h=0;h<=1;h+=u){const b=e+(n-e)*l(h);o+=h*100+`%{${c(b,1-b)}}
`}const f=o+`100% {${c(n,1-n)}}
}`,i=`__svelte_${ot(f)}_${m}`,a=G(t);R.add(a);const d=a.__svelte_stylesheet||(a.__svelte_stylesheet=Y(t).sheet),_=a.__svelte_rules||(a.__svelte_rules={});_[i]||(_[i]=!0,d.insertRule(`@keyframes ${i} ${f}`,d.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${i} ${s}ms linear ${r}ms 1 both`,x+=1,i}function H(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),r=n.length-s.length;r&&(t.style.animation=s.join(", "),x-=r,x||lt())}function lt(){A(()=>{x||(R.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),R.clear())})}let I;function E(t){I=t}const y=[],J=[],C=[],K=[],ct=Promise.resolve();let N=!1;function ut(){N||(N=!0,ct.then(L))}function S(t){C.push(t)}let O=!1;const q=new Set;function L(){if(!O){O=!0;do{for(let t=0;t<y.length;t+=1){const e=y[t];E(e),at(e.$$)}for(E(null),y.length=0;J.length;)J.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];q.has(e)||(q.add(e),e())}C.length=0}while(y.length);for(;K.length;)K.pop()();N=!1,O=!1,q.clear()}}function at(t){if(t.fragment!==null){t.update(),w(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}let $;function ft(){return $||($=Promise.resolve(),$.then(()=>{$=null})),$}function Q(t,e,n){t.dispatchEvent(rt(`${e?"intro":"outro"}${n}`))}const _t=new Set;function dt(t,e){t&&t.i&&(_t.delete(t),t.i(e))}const ht={duration:0};function Et(t,e,n){let s=e(t,n),r=!1,l,c,m=0;function u(){l&&H(t,l)}function o(){const{delay:i=0,duration:a=300,easing:d=P,tick:_=v,css:g}=s||ht;g&&(l=it(t,0,1,a,i,d,g,m++)),_(0,1);const h=V()+i,b=h+a;c&&c.abort(),r=!0,S(()=>Q(t,!0,"start")),c=W(j=>{if(r){if(j>=b)return _(1,0),Q(t,!0,"end"),u(),r=!1;if(j>=h){const D=d((j-h)/a);_(D,1-D)}}return r})}let f=!1;return{start(){f||(f=!0,H(t),B(s)?(s=s(),ft().then(o)):o())},invalidate(){f=!1},end(){r&&(u(),r=!1)}}}function mt(t,e,n,s){const{fragment:r,on_mount:l,on_destroy:c,after_update:m}=t.$$;r&&r.m(e,n),s||S(()=>{const u=l.map(z).filter(B);c?c.push(...u):w(u),t.$$.on_mount=[]}),m.forEach(S)}function pt(t,e){const n=t.$$;n.fragment!==null&&(w(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function gt(t,e){t.$$.dirty[0]===-1&&(y.push(t),ut(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ct(t,e,n,s,r,l,c,m=[-1]){const u=I;E(t);const o=t.$$={fragment:null,ctx:null,props:l,update:v,not_equal:r,bound:T(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:T(),dirty:m,skip_bound:!1,root:e.target||u.$$.root};c&&c(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(i,a,...d)=>{const _=d.length?d[0]:a;return o.ctx&&r(o.ctx[i],o.ctx[i]=_)&&(!o.skip_bound&&o.bound[i]&&o.bound[i](_),f&&gt(t,i)),a}):[],o.update(),f=!0,w(o.before_update),o.fragment=s?s(o.ctx):!1,e.target){if(e.hydrate){const i=st(e.target);o.fragment&&o.fragment.l(i),i.forEach(tt)}else o.fragment&&o.fragment.c();e.intro&&dt(t.$$.fragment),mt(t,e.target,e.anchor,e.customElement),L()}E(u)}class St{$destroy(){pt(this,1),this.$destroy=v}$on(e,n){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}$set(e){this.$$set&&!U(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function jt(t,{delay:e=0,duration:n=400,easing:s=P}={}){const r=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:s,css:l=>`opacity: ${l*r}`}}export{St as S,wt as a,kt as b,bt as c,X as d,et as e,nt as f,xt as g,S as h,Ct as i,tt as j,$t as k,vt as l,Et as m,v as n,jt as o,yt as s,dt as t};
