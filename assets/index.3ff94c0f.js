import{S as ze,i as ke,s as ye,e as j,a as m,b as P,c as O,d as S,f as D,g as I,h as p,t as L,j as B,H as Ae,k as R,l as F,n as G,m as ae,o as ie,u as Me,p as ne,q as W,r as Le,v as Ee,w as N,x as H,y as J,z as Te,A as oe,B as Ce}from"./vendor.c213ee20.js";const Ie=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const f of s)if(f.type==="childList")for(const a of f.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const f={};return s.integrity&&(f.integrity=s.integrity),s.referrerpolicy&&(f.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?f.credentials="include":s.crossorigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(s){if(s.ep)return;s.ep=!0;const f=t(s);fetch(s.href,f)}};Ie();var Be="./assets/agacer.377520d4.png",re="./assets/fete.a032e448.png",Re="./assets/hop.bf0300ed.png",ue="./assets/love.b7b36d38.png",Se="./assets/nice.96a89ad7.png",fe="./assets/yo.a10c0bf1.png",De="./assets/ah.3cae7849.png",Fe="./assets/explosion.cd1ed6d6.png",Ne="./assets/insulte.91a7d017.png",Pe="./assets/oups.95649315.png",Q="./assets/logo-bleu-cyan.1e209fae.png",U="./assets/logo-bleu-yellow.a712c152.png",V="./assets/logo-cyan-rouge.dc4a0eac.png",X="./assets/logo-orange.7e2ceba1.png",Y="./assets/logo-vert.df232cbf.png",Z="./assets/logo-purple.1c5c63f6.png",$="./assets/logo-rainbow.e4a4b1ee.png",q="./assets/logo-red.22f7f7f9.png",x="./assets/logo-rose-orange.16d6a97f.png",ee="./assets/logo-violet-cyan.0e3d5285.png",le="./assets/logo-violet.b80c0574.png",te="./assets/logo-white.12249981.png",se="./assets/logo-yellow.356b025e.png",Ge="./assets/bits.43bf2d1d.gif";function ce(u,e,t){const l=u.slice();return l[15]=e[t],l}function pe(u,e,t){const l=u.slice();return l[18]=e[t],l}function me(u){let e,t;return{c(){e=j("img"),m(e,"class","animationAvatar svelte-ulj0lz"),P(e,"left",u[18].x+"%"),P(e,"top",u[18].y+"%"),P(e,"transform","scale("+u[18].r+")"),O(e.src,t=u[18].character)||m(e,"src",t),m(e,"alt"," ")},m(l,s){S(l,e,s)},p(l,s){s&8&&P(e,"left",l[18].x+"%"),s&8&&P(e,"top",l[18].y+"%"),s&8&&P(e,"transform","scale("+l[18].r+")"),s&8&&!O(e.src,t=l[18].character)&&m(e,"src",t)},d(l){l&&D(e)}}}function ge(u){let e,t,l=u[15].username+"",s,f,a,i=u[15].message+"",g;return{c(){e=j("p"),t=j("b"),s=B(l),f=B(":\xA0"),a=new Ae,m(t,"class","svelte-ulj0lz"),a.a=null,m(e,"class","svelte-ulj0lz")},m(d,v){S(d,e,v),p(e,t),p(t,s),p(t,f),a.m(i,e)},p(d,v){u=d,v&4&&l!==(l=u[15].username+"")&&R(s,l),v&4&&i!==(i=u[15].message+"")&&a.p(i)},i(d){g||F(()=>{g=N(e,H,{duration:u[2].length>3?u[2].length>6?u[2].length>=u[4]-1?0:50:100:200}),g.start()})},o:G,d(d){d&&D(e)}}}function de(u){let e,t,l=u[15].name+"",s,f,a,i,g=u[15].message+"",d,v;return{c(){e=j("div"),t=j("div"),s=B(l),f=I(),a=j("div"),i=j("p"),d=B(g),m(t,"class","top ban svelte-ulj0lz"),m(i,"class","svelte-ulj0lz"),m(a,"class","bottom svelte-ulj0lz"),m(e,"class","Embed svelte-ulj0lz")},m(r,_){S(r,e,_),p(e,t),p(t,s),p(e,f),p(e,a),p(a,i),p(i,d)},p(r,_){_&4&&l!==(l=r[15].name+"")&&R(s,l),_&4&&g!==(g=r[15].message+"")&&R(d,g)},i(r){v||F(()=>{v=N(e,H,{duration:200}),v.start()})},o:G,d(r){r&&D(e)}}}function ve(u){let e,t,l=u[15].name+"",s,f,a,i,g=u[15].message+"",d,v;return{c(){e=j("div"),t=j("div"),s=B(l),f=I(),a=j("div"),i=j("p"),d=B(g),m(t,"class","top warning svelte-ulj0lz"),m(i,"class","svelte-ulj0lz"),m(a,"class","bottom svelte-ulj0lz"),m(e,"class","Embed svelte-ulj0lz")},m(r,_){S(r,e,_),p(e,t),p(t,s),p(e,f),p(e,a),p(a,i),p(i,d)},p(r,_){_&4&&l!==(l=r[15].name+"")&&R(s,l),_&4&&g!==(g=r[15].message+"")&&R(d,g)},i(r){v||F(()=>{v=N(e,H,{duration:200}),v.start()})},o:G,d(r){r&&D(e)}}}function _e(u){let e,t,l=u[15].name+"",s,f,a,i,g=u[15].message+"",d,v;return{c(){e=j("div"),t=j("div"),s=B(l),f=I(),a=j("div"),i=j("p"),d=B(g),m(t,"class","top resub svelte-ulj0lz"),m(i,"class","svelte-ulj0lz"),m(a,"class","bottom svelte-ulj0lz"),m(e,"class","Embed svelte-ulj0lz")},m(r,_){S(r,e,_),p(e,t),p(t,s),p(e,f),p(e,a),p(a,i),p(i,d)},p(r,_){_&4&&l!==(l=r[15].name+"")&&R(s,l),_&4&&g!==(g=r[15].message+"")&&R(d,g)},i(r){v||F(()=>{v=N(e,H,{duration:200}),v.start()})},o:G,d(r){r&&D(e)}}}function he(u){let e,t,l=u[15].name+"",s,f,a,i,g=u[15].message+"",d,v;return{c(){e=j("div"),t=j("div"),s=B(l),f=I(),a=j("div"),i=j("p"),d=B(g),m(t,"class","top sub svelte-ulj0lz"),m(i,"class","svelte-ulj0lz"),m(a,"class","bottom svelte-ulj0lz"),m(e,"class","Embed svelte-ulj0lz")},m(r,_){S(r,e,_),p(e,t),p(t,s),p(e,f),p(e,a),p(a,i),p(i,d)},p(r,_){_&4&&l!==(l=r[15].name+"")&&R(s,l),_&4&&g!==(g=r[15].message+"")&&R(d,g)},i(r){v||F(()=>{v=N(e,H,{duration:200}),v.start()})},o:G,d(r){r&&D(e)}}}function be(u){let e,t,l=u[15].name+"",s,f,a,i,g=u[15].message+"",d,v;return{c(){e=j("div"),t=j("div"),s=B(l),f=I(),a=j("div"),i=j("p"),d=B(g),m(t,"class","top cheers svelte-ulj0lz"),m(i,"class","svelte-ulj0lz"),m(a,"class","bottom svelte-ulj0lz"),m(e,"class","Embed svelte-ulj0lz")},m(r,_){S(r,e,_),p(e,t),p(t,s),p(e,f),p(e,a),p(a,i),p(i,d)},p(r,_){_&4&&l!==(l=r[15].name+"")&&R(s,l),_&4&&g!==(g=r[15].message+"")&&R(d,g)},i(r){v||F(()=>{v=N(e,H,{duration:200}),v.start()})},o:G,d(r){r&&D(e)}}}function we(u,e){let t,l,s,f,a,i,g,d,v,r,_,A=e[15].type=="tchat"&&ge(e),b=e[15].type=="ban"&&de(e),w=e[15].type=="warning"&&ve(e),h=e[15].type=="resub"&&_e(e),k=e[15].type=="sub"&&he(e),M=e[15].type=="cheers"&&be(e);return{key:u,first:null,c(){t=j("li"),A&&A.c(),l=I(),b&&b.c(),s=I(),w&&w.c(),f=I(),h&&h.c(),a=I(),k&&k.c(),i=I(),M&&M.c(),g=I(),m(t,"class",d=""+((e[0].rgb==="true"?"rgb":"white")+" "+(e[0].dark==="true"?"dark":"white")+" svelte-ulj0lz")),this.first=t},m(z,o){S(z,t,o),A&&A.m(t,null),p(t,l),b&&b.m(t,null),p(t,s),w&&w.m(t,null),p(t,f),h&&h.m(t,null),p(t,a),k&&k.m(t,null),p(t,i),M&&M.m(t,null),p(t,g),_=!0},p(z,o){e=z,e[15].type=="tchat"?A?(A.p(e,o),o&4&&L(A,1)):(A=ge(e),A.c(),L(A,1),A.m(t,l)):A&&(A.d(1),A=null),e[15].type=="ban"?b?(b.p(e,o),o&4&&L(b,1)):(b=de(e),b.c(),L(b,1),b.m(t,s)):b&&(b.d(1),b=null),e[15].type=="warning"?w?(w.p(e,o),o&4&&L(w,1)):(w=ve(e),w.c(),L(w,1),w.m(t,f)):w&&(w.d(1),w=null),e[15].type=="resub"?h?(h.p(e,o),o&4&&L(h,1)):(h=_e(e),h.c(),L(h,1),h.m(t,a)):h&&(h.d(1),h=null),e[15].type=="sub"?k?(k.p(e,o),o&4&&L(k,1)):(k=he(e),k.c(),L(k,1),k.m(t,i)):k&&(k.d(1),k=null),e[15].type=="cheers"?M?(M.p(e,o),o&4&&L(M,1)):(M=be(e),M.c(),L(M,1),M.m(t,g)):M&&(M.d(1),M=null),(!_||o&1&&d!==(d=""+((e[0].rgb==="true"?"rgb":"white")+" "+(e[0].dark==="true"?"dark":"white")+" svelte-ulj0lz")))&&m(t,"class",d)},i(z){_||(L(A),L(b),L(w),L(h),L(k),L(M),F(()=>{r&&r.end(1),v=N(t,J,{delay:e[2].length?380:0,duration:e[2].length>3?e[2].length>6?(e[2].length>=e[4]-1,100):250:500}),v.start()}),_=!0)},o(z){v&&v.invalidate(),r=ae(t,Te,{}),_=!1},d(z){z&&D(t),A&&A.d(),b&&b.d(),w&&w.d(),h&&h.d(),k&&k.d(),M&&M.d(),z&&r&&r.end()}}}function je(u){let e,t,l,s,f;return{c(){e=j("img"),O(e.src,t=u[1])||m(e,"src",t),m(e,"alt"," "),m(e,"class","svelte-ulj0lz")},m(a,i){S(a,e,i),f=!0},p(a,i){(!f||i&2&&!O(e.src,t=a[1]))&&m(e,"src",t)},i(a){f||(F(()=>{s&&s.end(1),l=N(e,J,{duration:400}),l.start()}),f=!0)},o(a){l&&l.invalidate(),s=ae(e,J,{delay:500,duration:1e3}),f=!1},d(a){a&&D(e),a&&s&&s.end()}}}function He(u){let e,t,l,s,f,a,i=[],g=new Map,d,v,r,_,A,b,w=u[3],h=[];for(let o=0;o<w.length;o+=1)h[o]=me(pe(u,w,o));let k=u[2];const M=o=>o[15]._id;for(let o=0;o<k.length;o+=1){let c=ce(u,k,o),n=M(c);g.set(n,i[o]=we(n,c))}let z=u[2].length&&je(u);return{c(){e=j("main"),t=j("div");for(let o=0;o<h.length;o+=1)h[o].c();l=I(),s=j("div"),f=j("div"),a=j("ul");for(let o=0;o<i.length;o+=1)i[o].c();v=I(),r=j("div"),z&&z.c(),m(a,"class",d=""+(ie(u[0].left==="true"?"alignLeft":"alignRight")+" svelte-ulj0lz")),m(f,"class","textfields svelte-ulj0lz"),m(r,"class",_="avatar "+(u[0].avatar==="true"?"":"none")+" svelte-ulj0lz"),m(s,"class",A="gridApp "+(u[0].left==="true"?"gridLeft":"gridRight")+" svelte-ulj0lz"),m(t,"id","saver"),m(t,"class","svelte-ulj0lz"),m(e,"class","svelte-ulj0lz")},m(o,c){S(o,e,c),p(e,t);for(let n=0;n<h.length;n+=1)h[n].m(t,null);p(t,l),p(t,s),p(s,f),p(f,a);for(let n=0;n<i.length;n+=1)i[n].m(a,null);p(s,v),p(s,r),z&&z.m(r,null),b=!0},p(o,[c]){if(c&8){w=o[3];let n;for(n=0;n<w.length;n+=1){const y=pe(o,w,n);h[n]?h[n].p(y,c):(h[n]=me(y),h[n].c(),h[n].m(t,l))}for(;n<h.length;n+=1)h[n].d(1);h.length=w.length}c&5&&(k=o[2],oe(),i=Me(i,c,M,1,o,k,g,a,Ce,we,null,ce),ne()),(!b||c&1&&d!==(d=""+(ie(o[0].left==="true"?"alignLeft":"alignRight")+" svelte-ulj0lz")))&&m(a,"class",d),o[2].length?z?(z.p(o,c),c&4&&L(z,1)):(z=je(o),z.c(),L(z,1),z.m(r,null)):z&&(oe(),W(z,1,1,()=>{z=null}),ne()),(!b||c&1&&_!==(_="avatar "+(o[0].avatar==="true"?"":"none")+" svelte-ulj0lz"))&&m(r,"class",_),(!b||c&1&&A!==(A="gridApp "+(o[0].left==="true"?"gridLeft":"gridRight")+" svelte-ulj0lz"))&&m(s,"class",A)},i(o){if(!b){for(let c=0;c<k.length;c+=1)L(i[c]);L(z),b=!0}},o(o){for(let c=0;c<i.length;c+=1)W(i[c]);W(z),b=!1},d(o){o&&D(e),Le(h,o);for(let c=0;c<i.length;c+=1)i[c].d();z&&z.d()}}}function Ke(u,e){var t=u.split("");for(var l in e){var s=e[l];for(var f in s){var a=s[f];if(typeof a=="string"){a=a.split("-"),a=[parseInt(a[0]),parseInt(a[1])];var i=a[1]-a[0],g=Array.apply(null,new Array(i+1)).map(function(){return""});t=t.slice(0,a[0]).concat(g).concat(t.slice(a[1]+1,t.length)),console.log('<img class="emote" style="width: 1.5em;"  src="http://static-cdn.jtvnw.net/emoticons/v2/'+l+'/default/dark/3.0" alt="'+l+'">'),t.splice(a[0],1,'<img class="emote" style="width: 1.5em;"  src="http://static-cdn.jtvnw.net/emoticons/v2/'+l+'/default/dark/3.0" alt="'+l+'">')}}}return t.join("")}function Oe(u,e,t){var M,z,o;let l={};l=location.search.split(/[?&]/g).reduce((c,n)=>{if(!n.trim())return c;const[y,T]=n.split("=");return c[y]=T,c},{}),console.log(l);const s=new tmi.Client({options:{debug:!1},connection:{secure:!0,reconnect:!0},channels:((M=l==null?void 0:l.chaine)==null?void 0:M.split(","))||["badbounstv"]});s.connect();let f=((z=l==null?void 0:l.customAvatar)==null?void 0:z.split(","))||[re,Re,ue,Se,fe,De],a=((o=l==null?void 0:l.customAvatar)==null?void 0:o.split(",")[0])||fe,i=[],g,d=Date.now(),v=[],r,_=parseInt(l.maxdelete)||8,A=parseInt(l.timemessage)||1e3;l.message==="true"&&s.on("message",(c,n,y,T)=>{var E,C,K;n["message-type"]!="whisper"&&(console.log((E=l==null?void 0:l.blacklist)==null?void 0:E.split(",")),console.log(n["display-name"].toLowerCase()),console.log((C=l==null?void 0:l.blacklist)==null?void 0:C.split(",").includes(n["display-name"].toLowerCase())),!((K=l==null?void 0:l.blacklist)==null?void 0:K.split(",").includes(n["display-name"].toLowerCase()))&&(i.length!=0&&h(),n.emotes==null?b({message:`${y}`,username:n["display-name"],type:"tchat"},15e3):b({message:`${Ke(y,n.emotes)}`,username:n["display-name"],type:"tchat"},15e3),i.length==0&&setTimeout(()=>{h()},500)))}),l.subscription==="true"&&(s.on("subscription",(c,n,y,T,E)=>{var C;w(ue),l.animsub==="true"&&k(((C=l==null?void 0:l.customSub)==null?void 0:C.split(","))||[Q,U,V,X,Y,Z,$,q,x,ee,le,te,se],100,2e4),b({message:`Merci pour le Sub @${n}`,name:"Sub",type:"sub"},3e4)}),s.on("resub",(c,n,y,T,E,C)=>{var K;w(re),l.animsub==="true"&&k(((K=l==null?void 0:l.customSub)==null?void 0:K.split(","))||[Q,U,V,X,Y,Z,$,q,x,ee,le,te,se],100,2e4),b({message:`Merci pour le resub @${n}`,name:`Resub ${E["msg-param-cumulative-months"]}eme mois`,type:"resub"},3e4)})),s.on("messagedeleted",(c,n,y,T)=>{t(2,i=i.filter(E=>E.message!=y||E.username!=n)),l.deleted==="true"&&(w(Pe),b({message:`Attention \xE0 ton langage @${n}`,name:"Warning",type:"warning"}))}),l.subgift==="true"&&s.on("submysterygift",(c,n,y,T,E)=>{var C;~~E["msg-param-sender-count"],w(Fe),l.animsubgift==="true"&&k(((C=l==null?void 0:l.customSubGif)==null?void 0:C.split(","))||[Q,U,V,X,Y,Z,$,q,x,ee,le,te,se],100,1e4*y),b({message:`Merci @${n} pour ${y>1?`les ${y} sub gift`:"le sub gift"}`,name:"Sub Gift",type:"sub"},1e3*y>6e4?6e4:5e3*y)}),l.cheer==="true"&&s.on("cheer",(c,n,y)=>{var T;l.animcheer==="true"&&k(((T=l==null?void 0:l.customCheers)==null?void 0:T.split(","))||[Ge],100,1e4),b({message:`Merci ${n["display-name"]} pour les ${n.bits} Bits`,name:"Bits",type:"cheers"},n.bits<99?1e3:n.bits<1e3?5e3:n.bits<4999?15e3:n.bits*3.5)}),s.on("clearchat",c=>{t(2,i=[])}),l.ban==="true"&&s.on("ban",(c,n,y,T)=>{w(Ne),b({message:`@${n} a \xE9t\xE9 ban !`,name:"Ban",type:"ban"})}),l.timeout==="true"&&s.on("timeout",(c,n,y,T,E)=>{w(Be),b({message:`@${n} expuls\xE9 pour ${T} secondes`,name:"Time Out",type:"ban"})});const b=(c,n=5e3)=>{c._id=Ee(),t(2,i=[...i,c]),i.filter(y=>y.type=="tchat").length>_&&t(2,i=i.slice(i.length-_)),l.save!="true"&&(console.log(i.length),setTimeout(()=>{t(2,i=i.filter(y=>y._id!==c._id))},n+A))};function w(c){d=Date.now(),(l==null?void 0:l.customAvatar)?h():t(1,a=c)}function h(){Date.now()-d>5e3&&(d=Date.now(),t(1,a=f[Math.floor(Math.random()*f.length)]))}function k(c,n,y){if(clearTimeout(r),r=setTimeout(()=>{cancelAnimationFrame(g),t(3,v=[])},y),v.length!=0)return;t(3,v=new Array(n).fill().map((E,C)=>({character:c[C%c.length],x:Math.random()*100,y:-40-Math.random()*100,r:.1+Math.random()*1})).sort((E,C)=>E.r-C.r));function T(){g=requestAnimationFrame(T),t(3,v=v.map(E=>(E.y+=.3*E.r,E.y>120&&(E.y=-40),E)))}T()}return[l,a,i,v,_]}class We extends ze{constructor(e){super();ke(this,e,Oe,He,ye,{})}}new We({target:document.getElementById("app")});
