(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={r:0,g:0,b:0},t={r:1,g:0,b:0},n={r:0,g:1,b:0},r={r:0,g:0,b:1},i={r:1,g:1,b:0},a={r:1,g:0,b:1},o={r:1,g:1,b:1};function s(e,t){return{r:Math.min(1,e.r+t.r),g:Math.min(1,e.g+t.g),b:Math.min(1,e.b+t.b)}}function c(e,t,n=.01){return Math.abs(e.r-t.r)<=n&&Math.abs(e.g-t.g)<=n&&Math.abs(e.b-t.b)<=n}function l(e,t,n){return{r:e.r+(t.r-e.r)*n,g:e.g+(t.g-e.g)*n,b:e.b+(t.b-e.b)*n}}var u={r:1,g:.96,b:.93};function d(e){return l(e,u,.32)}function f(e,t=1){let n=e=>Math.round(e*255);return`rgba(${n(e.r)}, ${n(e.g)}, ${n(e.b)}, ${t})`}var p=1.6;function m(e){return e.floor??0}function h(e){return e.floor??1}function g(e,t){let n=e.polarization===null?.5:Math.cos(t-e.polarization)**2;return{brightness:e.brightness*n,polarization:t}}var _=.34,v=.37,y=.42,b=.32,x=.06,S=.01,C=64,w=24,T=1e-7;function E(e,t,n){let r={x:Math.cos(n.angle),y:Math.sin(n.angle)},i={x:n.x-r.x*_,y:n.y-r.y*_},a=2*_,o=t.x*r.y-t.y*r.x;if(Math.abs(o)<T)return 1/0;let s={x:i.x-e.x,y:i.y-e.y},c=(s.x*r.y-s.y*r.x)/o,l=(s.x*t.y-s.y*t.x)/o;return c>T&&l>=0&&l<=a?c:1/0}function D(e,t,n){let r=(n.x-e.x)*t.x+(n.y-e.y)*t.y;return r<=T?1/0:Math.hypot(e.x+t.x*r-n.x,e.y+t.y*r-n.y)<=.32?r:1/0}function O(e,t,n){let r={x:e.x-n.x,y:e.y-n.y},i=r.x*t.x+r.y*t.y,a=r.x**2+r.y**2-v**2,o=i*i-a;if(o<0)return 1/0;let s=-i-Math.sqrt(o);return s>T?s:1/0}function k(e,t,n){let r=-1/0,i=1/0;for(let a of[`x`,`y`]){let o=n[a]-y,s=n[a]+y;if(Math.abs(t[a])<T){if(e[a]<o||e[a]>s)return 1/0;continue}let c=(o-e[a])/t[a],l=(s-e[a])/t[a];r=Math.max(r,Math.min(c,l)),i=Math.min(i,Math.max(c,l))}return r<=i&&r>T?r:1/0}var A=Math.cos(.02),ee=6;function te(e,t,n){let r=[t.x>0?(n.columns-e.x)/t.x:1/0,t.x<0?-e.x/t.x:1/0,t.y>0?(n.rows-e.y)/t.y:1/0,t.y<0?-e.y/t.y:1/0];return Math.max(0,Math.min(...r))}function j(e,t){let n={x:-Math.sin(t),y:Math.cos(t)},r=e.x*n.x+e.y*n.y;return{x:e.x-2*r*n.x,y:e.y-2*r*n.y}}function ne(e,t){return{r:e.r*t.r,g:e.g*t.g,b:e.b*t.b}}function re(t,n=[]){let r=t.seals??[],i=t.switches??[];return{open:r.map(()=>!1),reached:r.map(()=>e),switchOn:i.map((e,t)=>n[t]??!1),switchReached:i.map(()=>e)}}function ie(e,t,n=re(e)){let r=[],i=[{origin:{x:t.x,y:t.y},direction:{x:Math.cos(t.angle),y:Math.sin(t.angle)},light:{brightness:1,polarization:null},color:t.color,startDistance:0,lastPiece:null,floor:m(t)}];for(;i.length>0&&r.length<w;)r.push(oe(e,i.shift(),i,n));return r}function ae(e,t,n,r,i,a){let o=e=>m(e)===i,s={kind:`edge`,distance:te(t,n,e)};for(let r of(e.blocks??[]).filter(o)){let e=k(t,n,r);e<s.distance&&(s={kind:`block`,distance:e})}(e.seals??[]).forEach((e,i)=>{if(r===`seal${i}`||!o(e))return;let a=k(t,n,e);a<s.distance&&(s={kind:`seal`,distance:a,index:i})}),e.targets.forEach((e,r)=>{if(!o(e))return;let i=O(t,n,e);i<s.distance&&(s={kind:`target`,distance:i,index:r})}),(e.gates??[]).forEach((e,r)=>{if(!o(e)||a.switchOn[e.switch])return;let i=k(t,n,e);i<s.distance&&(s={kind:`gate`,distance:i,index:r})}),(e.switches??[]).forEach((e,r)=>{if(!o(e))return;let i=O(t,n,e);i<s.distance&&(s={kind:`switch`,distance:i,index:r})});let c=[[`mirror`,e.mirrors],[`splitter`,e.splitters??[]],[`obsidian`,e.obsidian??[]]];for(let[e,i]of c)i.forEach((i,a)=>{if(r===`${e}${a}`||!o(i))return;let c=E(t,n,i);c<s.distance&&(s={kind:e,distance:c,index:a})});let l=[[`polarizer`,e.polarizers??[]],[`glass`,e.glass??[]],[`tilted`,e.tilted??[]],[`prism`,e.prisms??[]]];for(let[e,i]of l)i.forEach((i,a)=>{if(r===`${e}${a}`||!o(i))return;let c=D(t,n,i);c<s.distance&&(s={kind:e,distance:c,index:a})});return s}function oe(e,t,n,r){let{origin:i,direction:a,light:o,color:c,lastPiece:l,floor:u}=t,d=[{...i,z:u*p}],f=[],h=[],_=t.startDistance,v=e=>({points:d,brightness:f,colors:h,target:e,startDistance:t.startDistance});for(let t=0;t<=C;t++){let t=ae(e,i,a,l,u,r),y={x:i.x+a.x*t.distance,y:i.y+a.y*t.distance,z:u*p};if(d.push(y),f.push(o.brightness),h.push(c),_+=t.distance,t.kind===`edge`||t.kind===`block`||t.kind===`gate`)return v(-1);if(t.kind===`switch`)return r.switchReached[t.index]=s(r.switchReached[t.index],me(c,o.brightness)),v(-1);if(t.kind===`obsidian`){let n=e.obsidian[t.index];if(a.x*-Math.sin(n.angle)+a.y*Math.cos(n.angle)>=0)return v(-1);a=j(a,n.angle),l=`obsidian${t.index}`,i=y;continue}if(t.kind===`target`)return v(t.index);if(t.kind===`seal`){if(r.reached[t.index]=s(r.reached[t.index],me(c,o.brightness)),!r.open[t.index])return v(-1);l=`seal${t.index}`,i=y;continue}if(t.kind===`mirror`)a=j(a,e.mirrors[t.index].angle);else if(t.kind===`splitter`)o={...o,brightness:o.brightness/2},n.push({origin:y,direction:j(a,e.splitters[t.index].angle),light:o,color:c,startDistance:_,lastPiece:`splitter${t.index}`,floor:u});else if(t.kind===`tilted`){let n=e.tilted[t.index];if(-(a.x*Math.cos(n.angle)+a.y*Math.sin(n.angle))<A)return v(-1);let r=le(e,t.index);if(r===-1)return d.push({...y,z:y.z+ee}),f.push(o.brightness),h.push(c),v(-1);let s=e.tilted[r],g=Math.abs(m(s)-u)*p;u=m(s),d.push({...y,z:u*p}),f.push(o.brightness),h.push(c),_+=g,a={x:Math.cos(s.angle),y:Math.sin(s.angle)},l=`tilted${r}`,i=y;continue}else if(t.kind===`prism`){let r=ce(a,e.prisms[t.index].angle,c);if(r){for(let e of r)n.push({origin:y,direction:e.direction,light:o,color:e.color,startDistance:_,lastPiece:`prism${t.index}`,floor:u});return v(-1)}}else t.kind===`polarizer`?o=g(o,e.polarizers[t.index].angle):c=ne(c,e.glass[t.index].color);l=`${t.kind}${t.index}`,i=y}return v(-1)}var se=[{channel:`r`,bend:0},{channel:`g`,bend:Math.PI/4},{channel:`b`,bend:Math.PI/2}];function ce(t,n,r){let i={x:Math.cos(n),y:Math.sin(n)},a=t.x*i.y-t.y*i.x;return Math.abs(a)<.5?null:se.flatMap(({channel:n,bend:i})=>{if(r[n]<=T)return[];let o=Math.sign(a)*i;return[{direction:{x:t.x*Math.cos(o)-t.y*Math.sin(o),y:t.x*Math.sin(o)+t.y*Math.cos(o)},color:{...e,[n]:r[n]}}]})}function le(e,t){let n=e.tilted??[],r=n[t],i=n.flatMap((e,n)=>n!==t&&Math.abs(e.x-r.x)<.01&&Math.abs(e.y-r.y)<.01?[{i:n,rise:m(e)-m(r)}]:[]),a=i.filter(e=>e.rise>0).sort((e,t)=>e.rise-t.rise),o=i.filter(e=>e.rise<0).sort((e,t)=>t.rise-e.rise);return(a[0]??o[0])?.i??-1}function ue(e,t){return[`r`,`g`,`b`].every(n=>t[n]<=.06||e[n]>=t[n]-.06)}function de(t,n=[]){let r=re(t,n);for(;;){r.reached=r.reached.map(()=>e),r.switchReached=r.switchReached.map(()=>e);let n=t.sources.flatMap(e=>ie(t,e,r)),i=(t.seals??[]).map((e,t)=>!r.open[t]&&ue(r.reached[t],e.color)),a=(t.switches??[]).map((e,t)=>!r.switchOn[t]&&ue(r.switchReached[t],e.color));if(!i.some(Boolean)&&!a.some(Boolean))return{beams:n,sealsOpen:r.open,switchesOn:r.switchOn};r.open=r.open.map((e,t)=>e||i[t]),r.switchOn=r.switchOn.map((e,t)=>e||a[t])}}function fe(e){return e.brightness[e.brightness.length-1]??1}function pe(t){return t.colors[t.colors.length-1]??e}function me(e,t){return{r:e.r*t,g:e.g*t,b:e.b*t}}function he(t,n){return t.filter(e=>e.target===n).reduce((e,t)=>s(e,me(pe(t),fe(t))),e)}function ge(e,t){return c(e,t,S)?`exact`:c(e,t,.06)?`close`:`off`}function _e(e,t){return e.targets.every((e,n)=>ge(he(t,n),e.color)!==`off`)}function ve(e){let t=(e,t)=>t.map(t=>({kind:e,x:t.x,y:t.y,floor:m(t),angle:t.angle,fixed:t.fixed??!1,placed:t.placed??!1}));return[...t(`mirror`,e.mirrors),...t(`polarizer`,e.polarizers??[]),...t(`splitter`,e.splitters??[]),...t(`tilted`,e.tilted??[]),...t(`prism`,e.prisms??[]),...t(`obsidian`,e.obsidian??[])]}function ye(e,t){return Math.abs(e.x-t.x)<.01&&Math.abs(e.y-t.y)<.01&&m(e)===m(t)}function be(e,t){let n=e.mirrors.length,r=e.polarizers?.length??0,i=e.splitters?.length??0,a=e.tilted?.length??0,o=e.prisms?.length??0,s=n+r+i+a;return{...e,mirrors:e.mirrors.map((e,n)=>({...e,angle:t[n]})),polarizers:e.polarizers?.map((e,r)=>({...e,angle:t[n+r]})),splitters:e.splitters?.map((e,i)=>({...e,angle:t[n+r+i]})),tilted:e.tilted?.map((e,a)=>({...e,angle:t[n+r+i+a]})),prisms:e.prisms?.map((e,n)=>({...e,angle:t[s+n]})),obsidian:e.obsidian?.map((e,n)=>({...e,angle:t[s+o+n]}))}}function xe(e,t,n,r=0){let i=-1,a=n;return ve(e).forEach((e,n)=>{let o=Math.hypot(t.x-e.x,t.y-e.y);!e.fixed&&e.floor===r&&o<=a&&(i=n,a=o)}),i}function Se(e,t){return Math.hypot(t.x-e.x,t.y-e.y,(t.z??0)-(e.z??0))}function Ce(e){let t=0;for(let n=1;n<e.length;n++)t+=Se(e[n-1],e[n]);return t}function we(e,t){if(e.length===0)return[];let n=Math.max(0,t);for(let t=1;t<e.length;t++){let r=Se(e[t-1],e[t]);if(n<=r){let i=r===0?0:n/r,a=e[t-1],o=e[t],s={x:a.x+(o.x-a.x)*i,y:a.y+(o.y-a.y)*i};return(a.z!==void 0||o.z!==void 0)&&(s.z=(a.z??0)+((o.z??0)-(a.z??0))*i),[...e.slice(0,t),s]}n-=r}return e}var Te=3,M=7,Ee=18,De=2.5,Oe=.002,N=class{puzzle;instant;pieces;beams;sealsOpen;switchesOn;latchedSwitches=[];beamLengths;tracedPuzzle;tracedAngles;visibleBeams=null;revealed=0;heldPiece=-1;layoutChanged=!1;targetMixes;solvedGlow=0;constructor(t,n=!1){this.puzzle=t,this.instant=n,this.pieces=ve(t).map(e=>({angle:e.angle,goal:e.angle,velocity:0})),this.tracedPuzzle=t,this.tracedAngles=ve(t).map(e=>e.angle);let r=de(t);this.beams=r.beams,this.sealsOpen=r.sealsOpen,this.switchesOn=r.switchesOn,this.beamLengths=this.beams.map(e=>Ce(e.points)),this.targetMixes=t.targets.map(()=>e),n&&this.update(0)}rearrange(e){let t=ve(this.puzzle).map((e,t)=>({piece:e,motion:this.pieces[t]}));this.pieces=ve(e).map(e=>{let n=t.find(({piece:t})=>ye(t,e));return n?n.motion:{angle:e.angle,goal:e.angle,velocity:0}}),this.puzzle=e,this.heldPiece=-1,this.layoutChanged=!0}pieceGoal(e){return this.pieces[e].goal}setPieceGoal(e,t){this.pieces[e].goal=t}holdPiece(e){this.heldPiece=e}update(e){if(this.pieces.forEach((t,n)=>{if(this.instant){t.angle=t.goal,t.velocity=0;return}let r=n===this.heldPiece?Ee:M,i=Math.min(e,.1);for(;i>0;){let e=Math.min(i,1/240),n=r**2*(t.goal-t.angle)-2*r*t.velocity;t.velocity+=n*e,t.angle+=t.velocity*e,i-=e}}),this.layoutChanged||this.pieces.some((e,t)=>Math.abs(e.angle-this.tracedAngles[t])>1e-7)){this.layoutChanged=!1,this.tracedAngles=this.pieces.map(e=>e.angle),this.tracedPuzzle=be(this.puzzle,this.tracedAngles);let e=de(this.tracedPuzzle,this.latchedSwitches);this.beams=e.beams,this.sealsOpen=e.sealsOpen,this.switchesOn=e.switchesOn,this.beamLengths=this.beams.map(e=>Ce(e.points)),this.visibleBeams=null}this.latchRestingSwitches();let t=this.beams.some((e,t)=>this.revealed<e.startDistance+this.beamLengths[t]);this.revealed=this.instant?1/0:this.revealed+Te*e,t&&(this.visibleBeams=null);let n=this.instant?1:1-Math.exp(-e*De);this.targetMixes=this.targetMixes.map((e,t)=>l(e,this.arrivedMix(t),n));let r=+!!this.showsSolved();this.solvedGlow+=(r-this.solvedGlow)*n}latchRestingSwitches(){this.puzzle.gatesStayOpen&&this.piecesAtRest()&&(this.switchesOn.every((e,t)=>!e||this.latchedSwitches[t])||(this.latchedSwitches=[...this.switchesOn],this.layoutChanged=!0))}piecesAtRest(){return this.heldPiece<0&&this.pieces.every(e=>Math.abs(e.goal-e.angle)<Oe&&Math.abs(e.velocity)<Oe*10)}isLit(e){let t=this.beamLengths[this.beams.indexOf(e)];return this.revealed>=e.startDistance+t}arrivedMix(e){return he(this.beams.filter(e=>this.isLit(e)),e)}isSettled(){return this.piecesAtRest()&&this.beams.every(e=>this.isLit(e))}showsSolved(){return this.puzzle.targets.every((e,t)=>ge(this.arrivedMix(t),e.color)!==`off`)}view(){return this.visibleBeams??=this.beams.map(e=>{let t=we(e.points,this.revealed-e.startDistance),n=Math.max(0,t.length-1);return{points:t,brightness:e.brightness.slice(0,n),colors:e.colors.slice(0,n),lit:this.isLit(e)}}),{puzzle:this.tracedPuzzle,beams:this.visibleBeams,pieceMotion:this.pieces.map(e=>Math.min(1,Math.abs(e.goal-e.angle)*2)),targetMixes:this.targetMixes,solvedGlow:this.solvedGlow,sealsOpen:this.sealsOpen,switchesOn:this.switchesOn}}},ke=class{readout=document.createElement(`div`);frames=0;slowest=0;elapsed=0;constructor(){this.readout.className=`frame-stats`,document.body.append(this.readout)}record(e,t){if(this.frames+=1,this.elapsed+=e,this.slowest=Math.max(this.slowest,e),this.elapsed<.5)return;let n=Math.round(this.frames/this.elapsed),r=Math.round(this.slowest*1e3);this.readout.textContent=`${n} fps · slowest ${r} ms · quality ${t.quality} · ${t.drawCalls} draws · ${Math.round(t.triangles/1e3)}k tris`,this.frames=0,this.elapsed=0,this.slowest=0}};function P(e,t){let n=e=>(e?.length??0)>0,r=Object.values(e.inventory??{}).some(e=>(e??0)>0);return[[`crystal`,!0],[`altar`,!0],[`mirror`,n(e.mirrors)],[`splitter`,n(e.splitters)],[`filter`,n(e.polarizers)],[`glass`,n(e.glass)],[`prism`,n(e.prisms)],[`tilted`,n(e.tilted)],[`stacked-decks`,(e.decks??[]).some(e=>(e.floor??1)>1)],[`gloom`,n(e.seals)],[`obsidian`,n(e.obsidian)],[`switch`,n(e.switches)],[`gate-stays-open`,e.gatesStayOpen===!0],[`block`,n(e.blocks)],[`lava`,t],[`carried`,r]].filter(([,e])=>e).map(([e])=>e)}function Ae(e,t,n){return P(e,t).filter(e=>!n.has(e))}var je=`untitled-light-puzzle/guide-read`;function Me(e){try{let t=JSON.parse(e?.getItem(je)??`[]`);if(Array.isArray(t))return new Set(t.filter(e=>typeof e==`string`))}catch{}return new Set}function Ne(e,t){try{e?.setItem(je,JSON.stringify([...t]))}catch{}}var Pe=1.2;function Fe(e,t,n,r,i){let a=Math.min(r,t*n/e*Pe);for(let e=0;e<8&&a<r;e++){let e=i(a);if(e>=n*1.05)break;let t=e>0?n/e*Pe:2;a=Math.min(r,a*t)}return a}var Ie=2.25;function Le(e,t,n){return e.map((r,i)=>{if(!n)return t;let a=Math.min(...e.map((e,t)=>t===i?1/0:Math.hypot(e.x-r.x,e.y-r.y)));return Math.max(t,Math.min(Ie,a/2))})}var Re=[[{x:3.5,y:.5},{x:1.5,y:4.5},{x:3.5,y:4.5},{x:1.5,y:3.5}],[{x:5.5,y:4.5},{x:2.5,y:5.5},{x:4.5,y:4.5},{x:4.5,y:3.5}],[{x:5.5,y:.5},{x:5.5,y:6.5},{x:.5,y:3.5},{x:.5,y:5.5},{x:1.5,y:5.5},{x:.5,y:1.5},{x:5.5,y:1.5},{x:6.5,y:3.5},{x:3.5,y:.5}],[{x:3.5,y:.5},{x:7.5,y:1.5},{x:3.5,y:7.5},{x:6.5,y:1.5},{x:5.5,y:1.5},{x:4.5,y:7.5},{x:4.5,y:6.5},{x:6.5,y:2.5},{x:5.5,y:6.5},{x:6.5,y:6.5},{x:.5,y:1.5},{x:1.5,y:1.5},{x:3.5,y:1.5},{x:3.5,y:2.5},{x:4.5,y:4.5},{x:1.5,y:4.5}],[{x:.5,y:4.5},{x:.5,y:.5},{x:3.5,y:8.5},{x:8.5,y:5.5},{x:8.5,y:4.5},{x:1.5,y:8.5},{x:3.5,y:.5},{x:1.5,y:7.5},{x:8.5,y:7.5},{x:.5,y:5.5},{x:7.5,y:7.5},{x:6.5,y:7.5},{x:1.5,y:5.5},{x:2.5,y:5.5},{x:2.5,y:4.5},{x:2.5,y:3.5},{x:2.5,y:1.5},{x:4.5,y:7.5}],[{x:.5,y:4.5},{x:2.5,y:5.5}],[{x:.5,y:3.5},{x:1.5,y:6.5},{x:1.5,y:5.5},{x:1.5,y:.5},{x:6.5,y:5.5},{x:1.5,y:3.5},{x:1.5,y:2.5},{x:5.5,y:.5},{x:3.5,y:6.5}],[{x:6.5,y:.5},{x:.5,y:.5},{x:6.5,y:1.5},{x:.5,y:5.5},{x:4.5,y:.5},{x:.5,y:3.5},{x:6.5,y:2.5},{x:6.5,y:3.5},{x:6.5,y:4.5},{x:6.5,y:5.5},{x:6.5,y:6.5},{x:5.5,y:5.5},{x:3.5,y:3.5},{x:4.5,y:6.5}],[{x:.5,y:5.5},{x:8.5,y:3.5},{x:3.5,y:8.5},{x:7.5,y:3.5},{x:7.5,y:8.5},{x:7.5,y:7.5},{x:1.5,y:5.5},{x:6.5,y:7.5},{x:5.5,y:7.5},{x:5.5,y:6.5},{x:7.5,y:6.5},{x:8.5,y:1.5},{x:7.5,y:1.5},{x:1.5,y:6.5},{x:5.5,y:.5},{x:7.5,y:5.5},{x:1.5,y:8.5},{x:5.5,y:5.5},{x:5.5,y:3.5},{x:3.5,y:5.5}],[{x:9.5,y:7.5},{x:9.5,y:3.5},{x:.5,y:5.5},{x:4.5,y:9.5},{x:9.5,y:1.5},{x:8.5,y:9.5},{x:8.5,y:1.5},{x:6.5,y:9.5},{x:9.5,y:9.5},{x:.5,y:9.5},{x:9.5,y:.5},{x:9.5,y:5.5},{x:9.5,y:4.5},{x:8.5,y:3.5},{x:4.5,y:4.5},{x:2.5,y:6.5}]];function ze(e){return Re[Math.floor(e/5)]??[]}function Be(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/2**32)}function Ve(e,t,n=[]){let r=e;for(let i=0;i<200;i++){r=We(e,t+i*101,n);let a=He(r);if(a.every(e=>e.length>=4)&&a.every(e=>e.length<8||Ue(e)<=.75))return r}return r}function He(e){let t=new Set((e.voids??[]).map(e=>`${e.x},${e.y}`)),n=new Set,r=[];for(let i=.5;i<e.rows;i++)for(let a=.5;a<e.columns;a++){if(t.has(`${a},${i}`)||n.has(`${a},${i}`))continue;let o=[[a,i]];n.add(`${a},${i}`);for(let r=0;r<o.length;r++){let[i,a]=o[r];for(let[r,s]of[[i+1,a],[i-1,a],[i,a+1],[i,a-1]]){let i=`${r},${s}`;r<0||s<0||r>e.columns||s>e.rows||t.has(i)||n.has(i)||(n.add(i),o.push([r,s]))}}r.push(o)}return r}function Ue(e){let t=e.map(([e])=>e),n=e.map(([,e])=>e),r=(Math.max(...t)-Math.min(...t)+1)*(Math.max(...n)-Math.min(...n)+1);return e.length/r}function We(e,t,n){let r=Be(t),i=(e,t)=>`${e},${t}`,a=new Set((e.voids??[]).map(e=>i(e.x,e.y))),o=(t,n)=>t>0&&n>0&&t<e.columns&&n<e.rows&&!a.has(i(t,n)),s=[...e.sources,...e.targets,...e.mirrors,...e.polarizers??[],...e.glass??[],...e.splitters??[],...e.prisms??[],...e.tilted??[],...e.seals??[],...e.blocks??[],...e.decks??[],...e.obsidian??[],...e.switches??[],...e.gates??[],...n].map(e=>[Math.floor(e.x)+.5,Math.floor(e.y)+.5]),c=new Set;for(let[t,n]of s){let a=r()<.4?.5:1+r()*.5;for(let r=.5;r<e.rows;r++)for(let s=.5;s<e.columns;s++)o(s,r)&&Math.hypot(s-t,r-n)<=a&&c.add(i(s,r));c.add(i(t,n))}let l=[[1,0],[-1,0],[0,1],[0,-1]],u=new Set;for(let[e,t]of s){let n=i(e,t);if(u.size===0||u.has(n)){u.add(n);continue}let a=new Map([[n,null]]),s=[[e,t]],d=null;for(;s.length&&!d;){let[e,t]=s.shift();for(let[n,c]of[...l].sort(()=>r()-.5)){let r=i(e+n,t+c);if(o(e+n,t+c)&&!a.has(r)){if(a.set(r,i(e,t)),u.has(r)){d=r;break}s.push([e+n,t+c])}}}if(!d){u.add(n);continue}for(let e=d;e;e=a.get(e))c.add(e),u.add(e)}let d=[...e.voids??[]];for(let t=.5;t<e.rows;t++)for(let n=.5;n<e.columns;n++)o(n,t)&&!c.has(i(n,t))&&d.push({x:n,y:t});return{...e,voids:d}}var Ge={},Ke=1;function qe(e,t){return t?{...e,x:Je(e.x,t.columns),y:Je(e.y,t.rows)}:e}function Je(e,t){return e+t.reduce((t,n)=>t+(e>n?2:e===n?Ke:0),0)}function Ye(e,t){if(!t||!t.rows.length&&!t.columns.length)return e;let n=e=>qe(e,t),r=e=>e?.map(n),i=e.columns+2*t.columns.length,a=e.rows+2*t.rows.length,o=[],s=new Set(t.rows.flatMap(e=>[-1,Ke].map(n=>Je(e,t.rows)+n))),c=new Set(t.columns.flatMap(e=>[-1,Ke].map(n=>Je(e,t.columns)+n)));for(let e=0;e<a;e++)for(let t=0;t<i;t++)(s.has(e+.5)||c.has(t+.5))&&o.push({x:t+.5,y:e+.5});return{...e,columns:i,rows:a,sources:e.sources.map(n),mirrors:e.mirrors.map(n),polarizers:r(e.polarizers),glass:r(e.glass),splitters:r(e.splitters),tilted:r(e.tilted),prisms:r(e.prisms),seals:r(e.seals),obsidian:r(e.obsidian),switches:r(e.switches),gates:r(e.gates),blocks:r(e.blocks),decks:r(e.decks),targets:e.targets.map(n),voids:[...r(e.voids)??[],...o]}}var F=Math.PI/4,Xe={1:[0,-F,F],2:[-F,-F,0,0],3:[F,2*F,0,0],4:[2*F,-F,0,2*F,0],5:[-F,F,0,0],6:[0],7:[2*F,2*F,-F],8:[0,0,3*F],9:[0,0,-F,0],10:[2*F,-F,2*F,2*F],11:[0,2*F,2*F,0],12:[-F,0,-F,2*F],13:[0,F,-F,2*F,F],14:[0,0,2*F],15:[0,0,2*F,-F,2*F,F,2*F],16:[2*F,-F,2*F,4*F],17:[2*F,2*F,2*F,0,2*F,-2*F],18:[-F,2*F,F,0,2*F],19:[F,2*F,-F,2*F,2*F,4*F,4*F,4*F],20:[F,0,-2*F,-2*F],21:[0,-F,F,F,2*F,F,F,2*F,2*F],22:[0,F,2*F,-2*F,-2*F,4*F,4*F],23:[0,0,F],24:[2*F,F,0,0,0,-2*F],25:[0,0,2*F,2*F,0,2*F,-2*F],26:[0],27:[2*F,0,2*F,0],28:[3*F,F,3*F,0,-2*F],29:[0,2*F,0,-F,2*F],30:[2*F,2*F,2*F,4*F,4*F],31:[0,F],32:[0,0,2*F,2*F,F],33:[0,2*F,2*F,0,2*F],34:[0,0,F,2*F,F,4*F],35:[0,2*F,2*F,0],36:[2*F,2*F,2*F,2*F],37:[3*F,2*F,4*F,0,0],38:[0,0,2*F,2*F,-2*F,0],39:[-F,-F,F,2*F,4*F,0],40:[2*F,0,2*F,0,4*F,-2*F],41:[F,3*F,0,F,0,2*F],42:[2*F,F,2*F,2*F,0,2*F],43:[2*F,0,2*F,4*F,6*F],44:[F,2*F,2*F,-2*F,-2*F,2*F,4*F],45:[0,0,-F,-F,F,3*F,0,2*F],46:[0,F,F,2*F,2*F,6*F],47:[2*F,F,-F,4*F,4*F,0,2*F],48:[0,-F,0,3*F,2*F,2*F,-2*F],49:[0,2*F,2*F,0,0,0],50:[0,F,0,4*F,-2*F,2*F,8*F]},Ze={21:{mirrors:[{x:3.5,y:1.5,angle:0}]},32:{mirrors:[{x:1.5,y:1.5,angle:0}]},34:{mirrors:[{x:2.5,y:5.5,angle:0}]},45:{mirrors:[{x:8.5,y:7.5,angle:Math.PI/2}]},48:{mirrors:[{x:5.5,y:8.5,angle:Math.PI/2}]},8:{sources:[{x:.5,y:3.5,angle:0,color:t}],mirrors:[{x:5.5,y:3.5,angle:Math.PI/4}]},18:{sources:[{x:.5,y:7.5,angle:0,color:r},{x:7.5,y:.5,angle:Math.PI,color:n}]},24:{sources:[{x:5.5,y:.5,angle:Math.PI/2,color:t},{x:.5,y:1.5,angle:0,color:t}]},28:{sources:[{x:3.5,y:.5,angle:Math.PI/2,color:n}],mirrors:[{x:4.5,y:3.5,angle:Math.PI/4}]},29:{mirrors:[{x:1.5,y:1.5,angle:-Math.PI/4}]},37:{mirrors:[{x:7.5,y:5.5,angle:Math.PI/2}]},38:{sources:[{x:5.5,y:.5,angle:Math.PI/2,color:r},{x:7.5,y:7.5,angle:-Math.PI/2,color:r}]},44:{sources:[{x:.5,y:8.5,angle:-Math.PI/2,color:r},{x:8.5,y:.5,angle:Math.PI/2,color:n}]},49:{sources:[{x:3.5,y:9.5,angle:-Math.PI/2,color:r}]},50:{sources:[{x:.5,y:8.5,angle:0,color:r}]}};function Qe(e,t){return t?{...e,sources:[...e.sources,...t.sources??[]],mirrors:[...e.mirrors,...t.mirrors??[]],blocks:[...e.blocks??[],...t.blocks??[]]}:e}var $e={r:0,g:1,b:1},I=0,L=Math.PI/2,R=-Math.PI/2,et=Math.PI,tt=-Math.PI/4,nt=Math.PI/4,z=0,B=Math.PI/2,rt=[{name:`Aim`,hint:`Tap a mirror to turn it, or drag left and right to turn it slowly. Guide the light into the ring.`,puzzle:{columns:5,rows:5,sources:[{x:.5,y:3.5,angle:I,color:t}],mirrors:[{x:2.5,y:3.5,angle:nt}],targets:[{x:2.5,y:1.5,color:t}]}},{name:`Mix`,hint:`Light mixes by adding: every beam you add makes the mix brighter, the opposite of paint, which gets darker. Send both beams in to make yellow.`,puzzle:{columns:5,rows:5,sources:[{x:.5,y:.5,angle:L,color:t},{x:4.5,y:4.5,angle:R,color:n}],mirrors:[{x:.5,y:2.5,angle:tt},{x:4.5,y:2.5,angle:tt}],targets:[{x:2.5,y:2.5,color:i}]}},{name:`Match`,hint:`Match the ring's color exactly. Not every beam belongs.`,puzzle:{columns:5,rows:5,sources:[{x:.5,y:.5,angle:L,color:t},{x:4.5,y:4.5,angle:R,color:r},{x:.5,y:4.5,angle:I,color:n}],mirrors:[{x:.5,y:2.5,angle:tt},{x:4.5,y:2.5,angle:tt},{x:2.5,y:4.5,angle:tt}],targets:[{x:2.5,y:2.5,color:a}]}}],it=[{puzzle:{columns:5,rows:5,sources:[{x:2.5,y:4.5,angle:R,color:t}],mirrors:[{x:2.5,y:2.5,angle:z},{x:4.5,y:2.5,angle:tt},{x:4.5,y:4.5,angle:nt}],blocks:[{x:4.5,y:.5},{x:1.5,y:.5}],targets:[{x:.5,y:4.5,color:t}]}},{puzzle:{columns:5,rows:5,sources:[{x:2.5,y:4.5,angle:R,color:t},{x:4.5,y:4.5,angle:R,color:n}],mirrors:[{x:2.5,y:2.5,angle:tt},{x:.5,y:2.5,angle:tt},{x:.5,y:.5,angle:z},{x:4.5,y:2.5,angle:z}],blocks:[{x:4.5,y:.5}],targets:[{x:2.5,y:.5,color:i}]}},{puzzle:{columns:5,rows:5,sources:[{x:.5,y:4.5,angle:I,color:t},{x:4.5,y:.5,angle:et,color:n}],mirrors:[{x:1.5,y:.5,angle:nt},{x:1.5,y:2.5,angle:B},{x:4.5,y:4.5,angle:z}],polarizers:[{x:2.5,y:4.5,angle:z,fixed:!0}],blocks:[{x:3.5,y:1.5}],targets:[{x:4.5,y:2.5,color:{r:.5,g:1,b:0}}]}},{puzzle:{columns:5,rows:5,sources:[{x:2.5,y:4.5,angle:R,color:t},{x:.5,y:4.5,angle:R,color:n}],mirrors:[{x:.5,y:.5,angle:B},{x:4.5,y:.5,angle:tt},{x:2.5,y:2.5,angle:z}],polarizers:[{x:2.5,y:.5,angle:B},{x:.5,y:2.5,angle:z,fixed:!0}],blocks:[{x:4.5,y:4.5}],targets:[{x:4.5,y:2.5,color:{r:1,g:.5,b:0}}]}},{puzzle:{columns:5,rows:5,sources:[{x:.5,y:4.5,angle:R,color:t},{x:2.5,y:4.5,angle:R,color:n},{x:4.5,y:4.5,angle:R,color:r}],mirrors:[{x:4.5,y:.5,angle:tt},{x:.5,y:2.5,angle:nt},{x:2.5,y:.5,angle:z}],polarizers:[{x:2.5,y:2.5,angle:z,fixed:!0}],blocks:[{x:.5,y:.5}],targets:[{x:4.5,y:2.5,color:{r:.5,g:.5,b:1}}]}},{puzzle:{columns:6,rows:6,sources:[{x:1.5,y:5.5,angle:R,color:t}],mirrors:[{x:1.5,y:3.5,angle:z}],blocks:[{x:5.5,y:2.5},{x:3.5,y:1.5},{x:4.5,y:.5}],targets:[{x:3.5,y:5.5,color:t}],inventory:{mirror:1}},par:2},{puzzle:{columns:6,rows:6,sources:[{x:5.5,y:3.5,angle:et,color:t},{x:.5,y:3.5,angle:I,color:n}],mirrors:[{x:3.5,y:3.5,angle:B},{x:5.5,y:.5,angle:B},{x:3.5,y:5.5,angle:tt}],blocks:[{x:1.5,y:.5},{x:2.5,y:4.5}],targets:[{x:5.5,y:5.5,color:i}],inventory:{mirror:1}},par:4},{puzzle:{columns:6,rows:6,sources:[{x:3.5,y:5.5,angle:R,color:o}],mirrors:[{x:3.5,y:.5,angle:z},{x:5.5,y:.5,angle:z}],glass:[{x:3.5,y:3.5,color:i}],blocks:[{x:4.5,y:2.5},{x:.5,y:1.5}],targets:[{x:5.5,y:5.5,color:i}]}},{puzzle:{columns:6,rows:6,sources:[{x:.5,y:1.5,angle:I,color:o},{x:.5,y:5.5,angle:R,color:t}],mirrors:[{x:.5,y:3.5,angle:z},{x:3.5,y:3.5,angle:z},{x:3.5,y:5.5,angle:tt},{x:5.5,y:1.5,angle:z}],glass:[{x:5.5,y:3.5,color:$e},{x:3.5,y:1.5,color:a}],blocks:[{x:4.5,y:.5}],targets:[{x:5.5,y:5.5,color:a}]}},{puzzle:{columns:6,rows:6,sources:[{x:5.5,y:.5,angle:et,color:o},{x:2.5,y:.5,angle:L,color:n}],mirrors:[{x:.5,y:.5,angle:B},{x:5.5,y:3.5,angle:tt},{x:5.5,y:5.5,angle:B}],polarizers:[{x:3.5,y:5.5,angle:B,fixed:!0}],glass:[{x:.5,y:2.5,color:a}],blocks:[{x:3.5,y:2.5}],targets:[{x:.5,y:4.5,color:a},{x:1.5,y:5.5,color:{r:0,g:.5,b:0}}],inventory:{mirror:1}},par:4},{puzzle:{columns:7,rows:7,sources:[{x:3.5,y:6.5,angle:R,color:t}],mirrors:[{x:3.5,y:1.5,angle:z},{x:6.5,y:1.5,angle:B},{x:1.5,y:3.5,angle:B}],splitters:[{x:3.5,y:3.5,angle:z}],blocks:[{x:6.5,y:6.5},{x:5.5,y:3.5}],targets:[{x:6.5,y:4.5,color:{r:.5,g:0,b:0}},{x:1.5,y:.5,color:{r:.5,g:0,b:0}}]}},{puzzle:{columns:7,rows:7,sources:[{x:4.5,y:.5,angle:L,color:o}],mirrors:[{x:.5,y:4.5,angle:tt},{x:.5,y:.5,angle:z},{x:6.5,y:.5,angle:tt}],glass:[{x:2.5,y:.5,color:i},{x:6.5,y:2.5,color:$e}],splitters:[{x:4.5,y:4.5,angle:z}],blocks:[{x:2.5,y:5.5},{x:.5,y:6.5}],targets:[{x:6.5,y:4.5,color:{r:0,g:.5,b:0}},{x:4.5,y:6.5,color:{r:.5,g:.5,b:.5}}]}},{puzzle:{columns:7,rows:7,sources:[{x:.5,y:6.5,angle:I,color:t},{x:6.5,y:.5,angle:L,color:n},{x:.5,y:4.5,angle:I,color:r}],mirrors:[{x:6.5,y:6.5,angle:z},{x:6.5,y:2.5,angle:nt},{x:6.5,y:4.5,angle:tt},{x:2.5,y:4.5,angle:B}],splitters:[{x:4.5,y:2.5,angle:nt}],blocks:[{x:1.5,y:1.5},{x:3.5,y:5.5}],targets:[{x:4.5,y:4.5,color:{r:1,g:.5,b:0}},{x:2.5,y:2.5,color:{r:0,g:.5,b:1}}]}},{puzzle:{columns:7,rows:7,sources:[{x:.5,y:2.5,angle:I,color:o},{x:4.5,y:.5,angle:L,color:r}],mirrors:[{x:4.5,y:5.5,angle:z},{x:2.5,y:5.5,angle:z},{x:2.5,y:.5,angle:B}],blocks:[{x:.5,y:4.5},{x:5.5,y:3.5}],targets:[{x:6.5,y:2.5,color:{r:.5,g:.5,b:.5}},{x:.5,y:.5,color:{r:0,g:0,b:.5}}],inventory:{splitter:1}},par:4},{puzzle:{columns:7,rows:7,sources:[{x:6.5,y:.5,angle:et,color:t},{x:6.5,y:2.5,angle:et,color:n},{x:6.5,y:4.5,angle:et,color:r}],mirrors:[{x:.5,y:.5,angle:z},{x:2.5,y:4.5,angle:z},{x:.5,y:4.5,angle:B},{x:2.5,y:.5,angle:tt}],polarizers:[{x:.5,y:2.5,angle:B,fixed:!0}],splitters:[{x:2.5,y:2.5,angle:nt},{x:4.5,y:2.5,angle:B}],blocks:[{x:.5,y:6.5},{x:5.5,y:5.5}],targets:[{x:2.5,y:6.5,color:{r:0,g:0,b:.25}},{x:4.5,y:.5,color:{r:1,g:0,b:.25}},{x:4.5,y:6.5,color:{r:0,g:.5,b:0}}]}},{puzzle:{columns:8,rows:8,sources:[{x:.5,y:4.5,angle:I,color:t}],mirrors:[{x:3.5,y:4.5,angle:B},{x:3.5,y:6.5,angle:tt}],tilted:[{x:7.5,y:6.5,angle:L},{x:7.5,y:6.5,floor:1,angle:et}],decks:[{x:7.5,y:5.5},{x:7.5,y:4.5},{x:7.5,y:6.5},{x:7.5,y:3.5}],blocks:[{x:.5,y:.5},{x:2.5,y:.5}],targets:[{x:7.5,y:3.5,floor:1,color:t}]}},{puzzle:{columns:8,rows:8,sources:[{x:4.5,y:.5,floor:1,angle:L,color:n},{x:.5,y:.5,angle:I,color:t}],mirrors:[{x:2.5,y:.5,angle:B},{x:2.5,y:5.5,angle:B},{x:2.5,y:3.5,angle:B},{x:.5,y:5.5,angle:z}],tilted:[{x:4.5,y:3.5,floor:1,angle:L},{x:4.5,y:3.5,angle:R}],decks:[{x:4.5,y:1.5},{x:4.5,y:2.5},{x:4.5,y:3.5},{x:4.5,y:.5}],blocks:[{x:7.5,y:3.5},{x:6.5,y:.5}],targets:[{x:.5,y:3.5,color:i}]}},{puzzle:{columns:8,rows:8,sources:[{x:.5,y:.5,angle:I,color:o}],mirrors:[{x:2.5,y:.5,angle:tt},{x:2.5,y:7.5,angle:B}],glass:[{x:2.5,y:2.5,color:i}],splitters:[{x:2.5,y:5.5,angle:nt}],tilted:[{x:5.5,y:7.5,angle:I},{x:5.5,y:7.5,floor:1,angle:L}],decks:[{x:6.5,y:7.5},{x:5.5,y:7.5},{x:7.5,y:7.5}],blocks:[{x:5.5,y:2.5},{x:.5,y:2.5}],targets:[{x:7.5,y:7.5,floor:1,color:{r:.5,g:.5,b:0}},{x:.5,y:5.5,color:{r:.5,g:.5,b:0}}]}},{puzzle:{columns:8,rows:8,sources:[{x:5.5,y:.5,angle:L,color:t},{x:2.5,y:.5,angle:L,color:r}],mirrors:[{x:5.5,y:7.5,angle:nt},{x:.5,y:5.5,floor:1,angle:B}],polarizers:[{x:5.5,y:2.5,angle:tt},{x:2.5,y:7.5,angle:B,fixed:!0}],tilted:[{x:.5,y:7.5,angle:L},{x:.5,y:7.5,floor:1,angle:et},{x:2.5,y:4.5,angle:et},{x:2.5,y:4.5,floor:1,angle:et}],decks:[{x:.5,y:6.5},{x:1.5,y:5.5},{x:.5,y:5.5},{x:.5,y:7.5},{x:2.5,y:4.5},{x:2.5,y:5.5}],blocks:[{x:6.5,y:5.5},{x:7.5,y:2.5}],targets:[{x:2.5,y:5.5,floor:1,color:{r:.5,g:0,b:1}}]}},{puzzle:{columns:8,rows:8,sources:[{x:1.5,y:.5,angle:L,color:o},{x:5.5,y:7.5,angle:R,color:n}],mirrors:[{x:5.5,y:5.5,angle:nt},{x:5.5,y:3.5,angle:z}],glass:[{x:3.5,y:3.5,color:a}],tilted:[{x:1.5,y:5.5,angle:R},{x:1.5,y:5.5,floor:1,angle:R}],decks:[{x:1.5,y:6.5},{x:1.5,y:5.5},{x:1.5,y:7.5}],blocks:[{x:6.5,y:.5},{x:7.5,y:.5}],targets:[{x:7.5,y:5.5,color:n},{x:1.5,y:7.5,floor:1,color:a}],inventory:{mirror:1}},par:5},{puzzle:{columns:9,rows:9,sources:[{x:.5,y:3.5,angle:I,color:t},{x:7.5,y:.5,angle:L,color:n},{x:.5,y:1.5,angle:I,color:r}],mirrors:[{x:7.5,y:8.5,angle:z},{x:2.5,y:8.5,angle:tt},{x:2.5,y:6.5,angle:nt},{x:4.5,y:6.5,angle:nt},{x:4.5,y:3.5,angle:B},{x:7.5,y:3.5,angle:nt}],polarizers:[{x:4.5,y:8.5,angle:B,fixed:!0},{x:6.5,y:1.5,angle:B,fixed:!0}],blocks:[{x:.5,y:8.5},{x:1.5,y:4.5},{x:.5,y:7.5}],targets:[{x:8.5,y:1.5,color:{r:0,g:0,b:.5}},{x:7.5,y:5.5,color:{r:.5,g:0,b:0}},{x:4.5,y:.5,color:n}]}},{puzzle:{columns:9,rows:9,sources:[{x:.5,y:6.5,angle:I,color:t},{x:8.5,y:8.5,angle:R,color:n},{x:8.5,y:.5,angle:et,color:r}],mirrors:[{x:2.5,y:.5,angle:z},{x:2.5,y:6.5,angle:nt},{x:4.5,y:.5,angle:B}],tilted:[{x:6.5,y:.5,angle:R},{x:6.5,y:.5,floor:1,angle:R},{x:4.5,y:2.5,angle:et},{x:4.5,y:2.5,floor:1,angle:et}],decks:[{x:5.5,y:2.5},{x:6.5,y:1.5},{x:6.5,y:.5},{x:4.5,y:2.5},{x:6.5,y:2.5}],blocks:[{x:.5,y:1.5},{x:4.5,y:4.5},{x:8.5,y:2.5}],targets:[{x:6.5,y:2.5,floor:1,color:a}]}},{puzzle:{columns:9,rows:9,sources:[{x:.5,y:6.5,angle:I,color:o},{x:6.5,y:8.5,angle:R,color:t}],mirrors:[{x:8.5,y:6.5,angle:z},{x:6.5,y:6.5,angle:z}],splitters:[{x:8.5,y:3.5,angle:nt}],blocks:[{x:1.5,y:1.5},{x:5.5,y:5.5},{x:1.5,y:.5}],targets:[{x:6.5,y:.5,color:{r:.5,g:.5,b:.5}},{x:8.5,y:1.5,color:{r:.75,g:.25,b:.25}}],inventory:{splitter:1}},par:4},{puzzle:{columns:9,rows:9,sources:[{x:8.5,y:3.5,angle:et,color:o},{x:.5,y:3.5,angle:I,color:r}],mirrors:[{x:3.5,y:3.5,angle:B},{x:3.5,y:1.5,angle:nt},{x:3.5,y:5.5,angle:z},{x:7.5,y:1.5,angle:z}],glass:[{x:5.5,y:3.5,color:i}],tilted:[{x:5.5,y:5.5,angle:I},{x:5.5,y:5.5,floor:1,angle:R}],decks:[{x:5.5,y:6.5},{x:5.5,y:7.5},{x:5.5,y:5.5},{x:5.5,y:8.5}],blocks:[{x:1.5,y:6.5},{x:1.5,y:.5},{x:3.5,y:7.5}],targets:[{x:5.5,y:8.5,floor:1,color:i},{x:7.5,y:5.5,color:r}]}},{puzzle:{columns:9,rows:9,sources:[{x:7.5,y:.5,angle:L,color:t},{x:8.5,y:2.5,angle:et,color:n},{x:7.5,y:8.5,angle:R,color:r},{x:8.5,y:6.5,angle:et,color:o}],mirrors:[{x:5.5,y:6.5,angle:tt},{x:7.5,y:4.5,angle:z},{x:3.5,y:4.5,angle:B},{x:3.5,y:6.5,angle:B}],glass:[{x:5.5,y:4.5,color:a}],splitters:[{x:5.5,y:2.5,angle:z}],tilted:[{x:2.5,y:2.5,angle:L},{x:2.5,y:2.5,floor:1,angle:R}],decks:[{x:1.5,y:2.5},{x:2.5,y:2.5},{x:.5,y:2.5}],blocks:[{x:4.5,y:.5},{x:1.5,y:.5},{x:.5,y:7.5}],targets:[{x:.5,y:2.5,floor:1,color:{r:0,g:.5,b:0}},{x:5.5,y:8.5,color:r}]}}],at=[{puzzle:{columns:6,rows:6,sources:[{x:5.5,y:2.5,angle:et,color:o}],mirrors:[],prisms:[{x:3.5,y:2.5,angle:R}],blocks:[{x:1.5,y:.5}],targets:[{x:3.5,y:5.5,color:r},{x:.5,y:5.5,color:n},{x:1.5,y:2.5,color:t}]}},{puzzle:{columns:6,rows:6,sources:[{x:.5,y:.5,angle:I,color:o}],mirrors:[{x:2.5,y:.5,angle:B},{x:4.5,y:.5,angle:z},{x:4.5,y:2.5,angle:B}],prisms:[{x:2.5,y:2.5,angle:I}],blocks:[{x:4.5,y:5.5}],targets:[{x:2.5,y:4.5,color:r},{x:.5,y:2.5,color:t}]}},{puzzle:{columns:6,rows:6,sources:[{x:1.5,y:.5,angle:L,color:o}],mirrors:[{x:1.5,y:2.5,angle:B},{x:5.5,y:2.5,angle:nt}],prisms:[{x:3.5,y:2.5,angle:I},{x:3.5,y:4.5,angle:R}],blocks:[{x:5.5,y:.5}],targets:[{x:5.5,y:4.5,color:n},{x:1.5,y:4.5,color:r}]}},{puzzle:{columns:6,rows:6,sources:[{x:4.5,y:.5,angle:L,color:o},{x:.5,y:5.5,angle:I,color:t}],mirrors:[{x:4.5,y:2.5,angle:z},{x:4.5,y:4.5,angle:B},{x:2.5,y:4.5,angle:z}],glass:[{x:2.5,y:.5,color:$e}],prisms:[{x:2.5,y:2.5,angle:L}],blocks:[{x:3.5,y:5.5}],targets:[{x:.5,y:2.5,color:r},{x:.5,y:.5,color:n}]}},{puzzle:{columns:6,rows:6,sources:[{x:.5,y:3.5,angle:I,color:o},{x:5.5,y:1.5,angle:et,color:o}],mirrors:[{x:3.5,y:3.5,angle:B},{x:3.5,y:1.5,angle:B},{x:3.5,y:5.5,angle:B}],prisms:[{x:5.5,y:5.5,angle:et},{x:.5,y:1.5,angle:et}],blocks:[{x:1.5,y:2.5}],targets:[{x:.5,y:5.5,color:r},{x:5.5,y:3.5,color:r}]}},{puzzle:{columns:7,rows:7,sources:[{x:6.5,y:3.5,angle:et,color:t},{x:2.5,y:6.5,angle:R,color:n}],mirrors:[{x:2.5,y:3.5,angle:z},{x:2.5,y:.5,angle:nt}],seals:[{x:4.5,y:3.5,color:t}],blocks:[{x:.5,y:4.5},{x:5.5,y:5.5}],targets:[{x:4.5,y:.5,color:t}]}},{puzzle:{columns:7,rows:7,sources:[{x:2.5,y:6.5,angle:R,color:t},{x:.5,y:1.5,angle:I,color:n},{x:2.5,y:.5,angle:L,color:r}],mirrors:[{x:2.5,y:4.5,angle:z},{x:6.5,y:4.5,angle:z},{x:6.5,y:6.5,angle:B},{x:.5,y:6.5,angle:B}],seals:[{x:4.5,y:6.5,color:r},{x:2.5,y:2.5,color:r}],blocks:[{x:6.5,y:1.5},{x:6.5,y:2.5}],targets:[{x:.5,y:4.5,color:a},{x:4.5,y:1.5,color:n}]}},{puzzle:{columns:7,rows:7,sources:[{x:2.5,y:.5,angle:L,color:t},{x:6.5,y:6.5,angle:R,color:r}],mirrors:[{x:2.5,y:6.5,angle:z},{x:6.5,y:4.5,angle:B},{x:.5,y:4.5,angle:B},{x:.5,y:2.5,angle:z}],splitters:[{x:2.5,y:2.5,angle:B}],seals:[{x:4.5,y:4.5,color:r}],blocks:[{x:3.5,y:1.5},{x:4.5,y:6.5}],targets:[{x:4.5,y:2.5,color:{r:0,g:0,b:.5}},{x:.5,y:6.5,color:{r:.5,g:0,b:0}}]}},{puzzle:{columns:7,rows:7,sources:[{x:4.5,y:6.5,angle:R,color:o},{x:.5,y:5.5,angle:I,color:n}],mirrors:[{x:4.5,y:2.5,angle:tt},{x:.5,y:2.5,angle:z},{x:.5,y:.5,angle:nt},{x:2.5,y:.5,angle:B}],prisms:[{x:4.5,y:.5,angle:et}],seals:[{x:3.5,y:5.5,color:n}],blocks:[{x:6.5,y:6.5},{x:6.5,y:.5}],targets:[{x:5.5,y:5.5,color:n},{x:6.5,y:2.5,color:$e}]}},{puzzle:{columns:7,rows:7,sources:[{x:2.5,y:6.5,angle:R,color:t},{x:6.5,y:4.5,angle:et,color:n},{x:.5,y:6.5,angle:I,color:r}],mirrors:[{x:4.5,y:6.5,angle:z},{x:4.5,y:3.5,angle:B},{x:.5,y:4.5,angle:B},{x:2.5,y:3.5,angle:z}],seals:[{x:3.5,y:4.5,color:n}],blocks:[{x:4.5,y:.5},{x:3.5,y:.5}],targets:[{x:.5,y:1.5,color:n},{x:2.5,y:1.5,color:r}]}},{puzzle:{columns:8,rows:8,sources:[{x:7.5,y:4.5,angle:et,color:t}],mirrors:[{x:4.5,y:4.5,angle:B},{x:4.5,y:7.5,angle:B}],tilted:[{x:2.5,y:7.5,angle:L},{x:2.5,y:7.5,floor:2,angle:L}],decks:[{x:1.5,y:7.5,floor:2},{x:2.5,y:7.5,floor:2},{x:.5,y:7.5,floor:2}],blocks:[{x:7.5,y:1.5},{x:7.5,y:2.5}],targets:[{x:.5,y:7.5,floor:2,color:t}]}},{puzzle:{columns:8,rows:8,sources:[{x:1.5,y:.5,floor:2,angle:L,color:o}],mirrors:[],glass:[{x:7.5,y:3.5,color:$e}],tilted:[{x:1.5,y:7.5,floor:2,angle:L},{x:1.5,y:7.5,floor:1,angle:et},{x:7.5,y:7.5,floor:1,angle:I},{x:7.5,y:7.5,angle:I}],decks:[{x:1.5,y:1.5,floor:2},{x:1.5,y:2.5,floor:2},{x:1.5,y:3.5,floor:2},{x:1.5,y:4.5,floor:2},{x:1.5,y:5.5,floor:2},{x:1.5,y:6.5,floor:2},{x:1.5,y:7.5,floor:2},{x:2.5,y:7.5},{x:3.5,y:7.5},{x:4.5,y:7.5},{x:5.5,y:7.5},{x:6.5,y:7.5},{x:7.5,y:7.5},{x:1.5,y:.5,floor:2},{x:1.5,y:7.5}],blocks:[{x:4.5,y:1.5},{x:4.5,y:3.5}],targets:[{x:7.5,y:1.5,color:$e}]}},{puzzle:{columns:8,rows:8,sources:[{x:5.5,y:7.5,angle:R,color:t},{x:.5,y:7.5,angle:R,color:n}],mirrors:[{x:5.5,y:4.5,angle:z},{x:.5,y:2.5,angle:z},{x:7.5,y:4.5,angle:B},{x:5.5,y:2.5,angle:B}],tilted:[{x:7.5,y:2.5,angle:R},{x:7.5,y:2.5,floor:1,angle:I}],seals:[{x:3.5,y:2.5,color:n}],decks:[{x:7.5,y:1.5},{x:7.5,y:2.5},{x:7.5,y:.5}],blocks:[{x:2.5,y:.5},{x:1.5,y:5.5}],targets:[{x:3.5,y:4.5,color:n},{x:7.5,y:.5,floor:1,color:t}]}},{puzzle:{columns:8,rows:8,sources:[{x:2.5,y:.5,angle:L,color:o},{x:.5,y:1.5,angle:I,color:t}],mirrors:[{x:2.5,y:5.5,angle:tt},{x:2.5,y:3.5,angle:tt},{x:7.5,y:5.5,angle:nt}],prisms:[{x:4.5,y:5.5,angle:I}],tilted:[{x:5.5,y:1.5,angle:L},{x:5.5,y:1.5,floor:1,angle:et}],decks:[{x:5.5,y:2.5},{x:5.5,y:1.5},{x:5.5,y:3.5}],blocks:[{x:1.5,y:2.5},{x:3.5,y:7.5}],targets:[{x:5.5,y:3.5,floor:1,color:t},{x:7.5,y:3.5,color:t}]}},{puzzle:{columns:8,rows:8,sources:[{x:7.5,y:2.5,angle:et,color:t},{x:.5,y:6.5,angle:I,color:n},{x:7.5,y:4.5,angle:et,color:r}],mirrors:[{x:5.5,y:2.5,angle:B},{x:7.5,y:6.5,angle:z},{x:7.5,y:.5,angle:B},{x:5.5,y:.5,angle:z}],tilted:[{x:3.5,y:4.5,angle:et},{x:3.5,y:4.5,floor:2,angle:R}],seals:[{x:5.5,y:6.5,color:t}],decks:[{x:2.5,y:4.5,floor:2},{x:1.5,y:4.5,floor:2},{x:3.5,y:4.5,floor:2},{x:.5,y:4.5,floor:2}],blocks:[{x:4.5,y:7.5},{x:3.5,y:.5}],targets:[{x:.5,y:4.5,floor:2,color:r},{x:3.5,y:6.5,color:i}]}},{puzzle:{columns:9,rows:9,sources:[{x:.5,y:8.5,angle:R,color:o},{x:6.5,y:.5,angle:L,color:t},{x:6.5,y:8.5,angle:R,color:r}],mirrors:[{x:6.5,y:2.5,angle:nt},{x:.5,y:2.5,angle:B},{x:4.5,y:2.5,angle:z},{x:4.5,y:6.5,angle:nt}],splitters:[{x:.5,y:6.5,angle:z}],prisms:[{x:2.5,y:2.5,angle:L}],blocks:[{x:.5,y:.5},{x:8.5,y:.5},{x:6.5,y:4.5}],targets:[{x:4.5,y:.5,color:t},{x:2.5,y:.5,color:{r:0,g:0,b:.25}},{x:6.5,y:6.5,color:r}]}},{puzzle:{columns:9,rows:9,sources:[{x:6.5,y:.5,angle:L,color:t},{x:8.5,y:8.5,angle:et,color:n},{x:.5,y:2.5,angle:I,color:r}],mirrors:[{x:6.5,y:8.5,angle:B},{x:6.5,y:2.5,angle:nt},{x:4.5,y:2.5,angle:B},{x:4.5,y:8.5,angle:B}],tilted:[{x:2.5,y:2.5,angle:I},{x:2.5,y:2.5,floor:1,angle:L}],seals:[{x:4.5,y:6.5,color:t},{x:4.5,y:4.5,color:t}],decks:[{x:2.5,y:1.5},{x:2.5,y:2.5},{x:2.5,y:.5}],blocks:[{x:4.5,y:.5},{x:1.5,y:7.5},{x:6.5,y:4.5}],targets:[{x:6.5,y:6.5,color:t},{x:2.5,y:.5,floor:1,color:r}]}},{puzzle:{columns:9,rows:9,sources:[{x:4.5,y:.5,angle:L,color:o},{x:.5,y:.5,angle:I,color:n}],mirrors:[{x:4.5,y:8.5,angle:B},{x:4.5,y:2.5,angle:z},{x:6.5,y:8.5,angle:B}],prisms:[{x:6.5,y:4.5,angle:et},{x:2.5,y:.5,angle:et}],seals:[{x:6.5,y:2.5,color:t}],blocks:[{x:3.5,y:6.5},{x:1.5,y:1.5},{x:8.5,y:.5}],targets:[{x:8.5,y:2.5,color:n},{x:6.5,y:.5,color:t}]}},{puzzle:{columns:9,rows:9,sources:[{x:4.5,y:8.5,angle:R,color:o},{x:3.5,y:.5,angle:L,color:t}],mirrors:[{x:3.5,y:2.5,angle:nt},{x:4.5,y:6.5,angle:B},{x:.5,y:2.5,angle:B}],glass:[{x:6.5,y:6.5,color:i}],tilted:[{x:8.5,y:6.5,angle:R},{x:8.5,y:6.5,floor:1,angle:R},{x:.5,y:4.5,angle:L},{x:.5,y:4.5,floor:2,angle:et}],decks:[{x:8.5,y:7.5},{x:1.5,y:4.5,floor:2},{x:2.5,y:4.5,floor:2},{x:8.5,y:6.5},{x:.5,y:4.5,floor:2},{x:3.5,y:4.5,floor:2},{x:8.5,y:8.5}],blocks:[{x:6.5,y:2.5},{x:6.5,y:3.5},{x:1.5,y:.5}],targets:[{x:3.5,y:4.5,floor:2,color:t},{x:8.5,y:8.5,floor:1,color:i}]}},{puzzle:{columns:9,rows:9,sources:[{x:2.5,y:8.5,angle:R,color:t},{x:.5,y:4.5,angle:I,color:n},{x:7.5,y:.5,angle:L,color:r},{x:8.5,y:8.5,angle:R,color:o}],mirrors:[{x:2.5,y:3.5,angle:z},{x:4.5,y:4.5,angle:tt},{x:4.5,y:8.5,angle:tt},{x:6.5,y:3.5,angle:tt},{x:6.5,y:8.5,angle:nt}],polarizers:[{x:7.5,y:2.5,angle:z,fixed:!0}],splitters:[{x:7.5,y:4.5,angle:B}],seals:[{x:4.5,y:6.5,color:n},{x:6.5,y:6.5,color:n}],blocks:[{x:2.5,y:.5},{x:5.5,y:2.5},{x:.5,y:2.5}],targets:[{x:2.5,y:6.5,color:i},{x:4.5,y:.5,color:{r:0,g:0,b:.25}},{x:8.5,y:6.5,color:o}]}},{puzzle:{columns:10,rows:10,sources:[{x:3.5,y:.5,angle:L,color:o},{x:8.5,y:.5,angle:L,color:o}],mirrors:[{x:3.5,y:6.5,angle:z},{x:8.5,y:7.5,angle:nt},{x:1.5,y:7.5,angle:nt},{x:6.5,y:7.5,angle:B}],prisms:[{x:3.5,y:3.5,angle:L},{x:8.5,y:2.5,angle:et}],seals:[{x:4.5,y:7.5,color:t}],blocks:[{x:1.5,y:.5},{x:3.5,y:9.5},{x:2.5,y:4.5},{x:9.5,y:6.5}],targets:[{x:6.5,y:3.5,color:r},{x:1.5,y:9.5,color:t},{x:.5,y:6.5,color:t}]}},{puzzle:{columns:10,rows:10,sources:[{x:7.5,y:.5,angle:L,color:t},{x:.5,y:1.5,angle:I,color:n},{x:5.5,y:9.5,angle:R,color:r}],mirrors:[{x:5.5,y:7.5,angle:B},{x:7.5,y:7.5,angle:nt},{x:3.5,y:1.5,angle:tt}],tilted:[{x:7.5,y:2.5,angle:et},{x:7.5,y:2.5,floor:1,angle:et},{x:3.5,y:4.5,angle:I},{x:3.5,y:4.5,floor:2,angle:L}],seals:[{x:7.5,y:5.5,color:r}],decks:[{x:2.5,y:4.5,floor:2},{x:1.5,y:4.5,floor:2},{x:8.5,y:2.5},{x:7.5,y:2.5},{x:3.5,y:4.5,floor:2},{x:9.5,y:2.5},{x:.5,y:4.5,floor:2}],blocks:[{x:3.5,y:6.5},{x:4.5,y:8.5},{x:2.5,y:8.5},{x:8.5,y:4.5}],targets:[{x:9.5,y:2.5,floor:1,color:r},{x:.5,y:4.5,floor:2,color:n}]}},{puzzle:{columns:10,rows:10,sources:[{x:2.5,y:.5,angle:L,color:o},{x:.5,y:3.5,angle:I,color:t},{x:5.5,y:9.5,angle:R,color:n}],mirrors:[{x:2.5,y:3.5,angle:z},{x:2.5,y:5.5,angle:tt},{x:7.5,y:3.5,angle:z}],glass:[{x:2.5,y:9.5,color:$e}],splitters:[{x:4.5,y:3.5,angle:B},{x:2.5,y:7.5,angle:B}],prisms:[{x:7.5,y:1.5,angle:R}],blocks:[{x:7.5,y:7.5},{x:5.5,y:4.5},{x:9.5,y:8.5},{x:6.5,y:8.5}],targets:[{x:4.5,y:1.5,color:{r:.5,g:.5,b:1}},{x:5.5,y:6.5,color:n},{x:4.5,y:7.5,color:{r:.5,g:0,b:0}}]}},{puzzle:{columns:10,rows:10,sources:[{x:9.5,y:2.5,angle:et,color:o},{x:.5,y:7.5,angle:I,color:r},{x:.5,y:3.5,angle:I,color:t}],mirrors:[{x:5.5,y:2.5,angle:z},{x:5.5,y:9.5,angle:B},{x:3.5,y:3.5,angle:B}],prisms:[{x:7.5,y:2.5,angle:I}],tilted:[{x:7.5,y:9.5,angle:I},{x:7.5,y:9.5,floor:1,angle:I}],seals:[{x:7.5,y:5.5,floor:1,color:t}],decks:[{x:7.5,y:8.5},{x:7.5,y:7.5},{x:7.5,y:6.5},{x:7.5,y:9.5},{x:7.5,y:.5},{x:7.5,y:5.5}],blocks:[{x:4.5,y:7.5},{x:1.5,y:5.5},{x:4.5,y:.5},{x:1.5,y:1.5}],targets:[{x:7.5,y:.5,floor:1,color:t},{x:6.5,y:3.5,color:t}]}},{puzzle:{columns:10,rows:10,sources:[{x:2.5,y:.5,angle:L,color:o},{x:.5,y:2.5,angle:I,color:t},{x:.5,y:4.5,angle:I,color:n},{x:.5,y:.5,angle:I,color:r}],mirrors:[{x:6.5,y:4.5,angle:z}],splitters:[{x:4.5,y:2.5,angle:nt}],prisms:[{x:2.5,y:2.5,angle:L}],tilted:[{x:6.5,y:8.5,angle:I},{x:6.5,y:8.5,floor:1,angle:et},{x:4.5,y:.5,angle:R},{x:4.5,y:.5,floor:2,angle:L}],seals:[{x:6.5,y:6.5,color:n}],decks:[{x:5.5,y:.5,floor:2},{x:6.5,y:.5,floor:2},{x:7.5,y:.5,floor:2},{x:7.5,y:8.5},{x:6.5,y:8.5},{x:4.5,y:.5,floor:2},{x:8.5,y:8.5},{x:8.5,y:.5,floor:2}],blocks:[{x:4.5,y:5.5},{x:2.5,y:5.5},{x:7.5,y:2.5},{x:8.5,y:5.5}],targets:[{x:8.5,y:8.5,floor:1,color:n},{x:8.5,y:.5,floor:2,color:{r:.5,g:0,b:0}}]}}];function V(e){let t=e.flatMap((e,t)=>[...e].flatMap((e,n)=>e===`#`?[]:[{x:n+.5,y:t+.5}]));return{columns:e[0].length,rows:e.length,voids:t}}var ot=[{terraced:!0,puzzle:{...V([`....................#...`,`.....#....#.##......###.`,`....###..#####......###.`,`...####.######....##....`,`...###...###....####....`,`...###....#....####.....`,`...............####.....`,`................##....#.`,`..####..............####`,`..#####.......#.....###.`,`..######......###.....#.`,`..######...######.......`,`.#######....#####...##..`,`..####...##..####.####..`,`...##...###.....#.#####.`,`.........##.......####..`,`.......####.........##..`,`........##..............`]),sources:[{x:22.5,y:9.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:9.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:22.5,y:2.5,angle:3*Math.PI/4,color:{r:0,g:1,b:0}},{x:13.5,y:1.5,angle:1*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:22.5,y:14.5,angle:6*Math.PI/4},{x:9.5,y:14.5,angle:8*Math.PI/4},{x:4.5,y:14.5,angle:8*Math.PI/4},{x:4.5,y:2.5,angle:6*Math.PI/4},{x:18.5,y:6.5,angle:4*Math.PI/4},{x:20.5,y:8.5,angle:3*Math.PI/4},{x:14.5,y:10.5,angle:3*Math.PI/4}],blocks:[{x:5.5,y:1.5},{x:22.5,y:7.5}],targets:[{x:9.5,y:2.5,color:{r:1,g:1,b:0}},{x:16.5,y:12.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`....#.##.....#.......##.`,`...#####.....####....##.`,`...######....###...####.`,`...#####.....###...####.`,`.....#..###..##....###..`,`........###..#.......#..`,`......#####.............`,`......#######...........`,`.......#######..........`,`.......######.....##....`,`......######......##.##.`,`..##########......#####.`,`#####..............####.`,`.####..............#....`,`..#.....................`,`........................`,`........................`,`........................`]),sources:[{x:15.5,y:1.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:9.5,y:11.5,angle:0,color:{r:0,g:0,b:1}},{x:22.5,y:11.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:13.5,y:.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:3.5,y:1.5,angle:5*Math.PI/4},{x:3.5,y:13.5,angle:4*Math.PI/4},{x:19.5,y:11.5,angle:2*Math.PI/4},{x:19.5,y:2.5,angle:7*Math.PI/4},{x:13.5,y:2.5,angle:4*Math.PI/4},{x:8.5,y:2.5,angle:5*Math.PI/4},{x:8.5,y:8.5,angle:4*Math.PI/4}],blocks:[{x:1.5,y:13.5},{x:8.5,y:10.5}],targets:[{x:19.5,y:13.5,color:{r:1,g:0,b:1}},{x:13.5,y:8.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.........##.......###...`,`........####.....####...`,`........####....#####...`,`........######..######..`,`.......#######....#####.`,`...#....#####......#.#..`,`#####..######.........#.`,`#####..###.##.......###.`,`####..####.........#####`,`...#...##..........####.`,`.....................##.`,`....#....#.....##.....#.`,`..###...####.######.....`,`.####..#####.#######....`,`..####..##.#..##.###....`,`..####............#.....`,`..####..................`,`...###..................`]),sources:[{x:17.5,y:14.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:9.5,y:7.5,angle:0,color:{r:0,g:1,b:0}},{x:22.5,y:7.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:8.5,y:4.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:8.5,y:14.5,angle:6*Math.PI/4},{x:8.5,y:9.5,angle:6*Math.PI/4},{x:20.5,y:7.5,angle:2*Math.PI/4},{x:20.5,y:2.5,angle:8*Math.PI/4},{x:10.5,y:2.5,angle:6*Math.PI/4},{x:3.5,y:9.5,angle:4*Math.PI/4},{x:3.5,y:12.5,angle:4*Math.PI/4}],blocks:[{x:3.5,y:7.5},{x:19.5,y:14.5}],targets:[{x:20.5,y:9.5,color:{r:1,g:1,b:0}},{x:10.5,y:12.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`..###.....#.#...........`,`..#####...###...........`,`..######..##............`,`...#####..##......###...`,`..#####...##...#######..`,`..#####..###...######...`,`..#####..##.....####....`,`..###....###....####....`,`..###....####...........`,`..##....#####...........`,`..#......#####..###.....`,`.........#####..####....`,`.###.....##.....###.....`,`.####......#....##..##..`,`####.......####..#..####`,`..###.....#####....####.`,`..###......##.#.....###.`,`..#.................##..`]),sources:[{x:5.5,y:6.5,angle:0,color:{r:1,g:0,b:0}},{x:10.5,y:10.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:10.5,y:1.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:12.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:10.5,y:6.5,angle:5*Math.PI/4},{x:10.5,y:3.5,angle:6*Math.PI/4},{x:18.5,y:6.5,angle:5*Math.PI/4},{x:4.5,y:3.5,angle:4*Math.PI/4},{x:4.5,y:13.5,angle:3*Math.PI/4},{x:12.5,y:11.5,angle:5*Math.PI/4},{x:17.5,y:11.5,angle:3*Math.PI/4}],blocks:[{x:12.5,y:8.5},{x:3.5,y:6.5}],targets:[{x:18.5,y:3.5,color:{r:1,g:1,b:0}},{x:17.5,y:13.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`...........##...........`,`#....##..#####..........`,`###.############........`,`####..###.######........`,`.#........##.###...#....`,`..............#..####...`,`.##.##..........#######.`,`######.........#########`,`##########.....########.`,`...##########.########..`,`...#....#####.######....`,`........####............`,`.#........#.............`,`.##.................###.`,`#####.......###....####.`,`.####.......####....##..`,`..###.........#.....#...`,`..##....................`]),sources:[{x:12.5,y:14.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:6.5,y:9.5,angle:0,color:{r:0,g:0,b:1}},{x:21.5,y:15.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:21.5,y:9.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:9.5,angle:4*Math.PI/4},{x:14.5,y:9.5,angle:6*Math.PI/4},{x:12.5,y:3.5,angle:6*Math.PI/4},{x:2.5,y:15.5,angle:6*Math.PI/4},{x:2.5,y:8.5,angle:4*Math.PI/4},{x:14.5,y:14.5,angle:3*Math.PI/4},{x:19.5,y:14.5,angle:6*Math.PI/4}],blocks:[{x:2.5,y:3.5},{x:3.5,y:9.5}],targets:[{x:14.5,y:3.5,color:{r:1,g:0,b:1}},{x:19.5,y:8.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`........##..............`,`........####.........##.`,`.......#####........###.`,`........#####......####.`,`.....#..##.#.......####.`,`....##............######`,`..#####.......##..#####.`,`...#####....########.##.`,`..####......########....`,`..####......#######.....`,`...........######.......`,`......##...###.....##...`,`......####........###...`,`......#####......#####..`,`.....######.......###...`,`......######......####..`,`.......##.#.........##..`,`........................`]),sources:[{x:20.5,y:5.5,angle:3*Math.PI/4,color:{r:1,g:0,b:0}},{x:11.5,y:10.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:11.5,y:1.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:22.5,y:7.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:10.5,y:15.5,angle:6*Math.PI/4},{x:3.5,y:8.5,angle:7*Math.PI/4},{x:11.5,y:3.5,angle:6*Math.PI/4},{x:19.5,y:3.5,angle:4*Math.PI/4},{x:19.5,y:7.5,angle:5*Math.PI/4},{x:19.5,y:14.5,angle:6*Math.PI/4},{x:5.5,y:14.5,angle:8*Math.PI/4}],blocks:[{x:22.5,y:3.5},{x:22.5,y:3.5}],targets:[{x:8.5,y:3.5,color:{r:1,g:1,b:0}},{x:5.5,y:7.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`........................`,`...####.................`,`...####........#........`,`....####...########.....`,`....###.....########....`,`.....###....######.##...`,`.....###....#####..####.`,`..........#........####.`,`.........####......####.`,`.........###......######`,`...##....##....#######..`,`...#####......####.###..`,`.#######...#######.##...`,`#########..######...#...`,`########....#####.#####.`,`.####........###...####.`,`..#................#.#..`,`........................`]),sources:[{x:20.5,y:8.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:14.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:14.5,y:3.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:16.5,y:12.5,angle:5*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:20.5,y:13.5,angle:6*Math.PI/4},{x:14.5,y:13.5,angle:7*Math.PI/4},{x:14.5,y:6.5,angle:6*Math.PI/4},{x:6.5,y:13.5,angle:7*Math.PI/4},{x:19.5,y:6.5,angle:5*Math.PI/4},{x:19.5,y:4.5,angle:8*Math.PI/4},{x:6.5,y:2.5,angle:5*Math.PI/4}],blocks:[{x:18.5,y:14.5},{x:19.5,y:12.5}],targets:[{x:6.5,y:6.5,color:{r:1,g:1,b:0}},{x:4.5,y:4.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`................#.......`,`..............####......`,`.........#....#####.....`,`..####..##.....###......`,`...###.#####.....#......`,`.......####...#....#.##.`,`............###....####.`,`...........####...#####.`,`.####......#####...###..`,`.######......##.....#...`,`##########..............`,`#####..#####............`,`##.....#####.......####.`,`.......######......####.`,`.......#######.....#####`,`......########......####`,`.......######........##.`,`........###..........##.`]),sources:[{x:7.5,y:12.5,angle:7*Math.PI/4,color:{r:1,g:0,b:0}},{x:19.5,y:14.5,angle:5*Math.PI/4,color:{r:0,g:0,b:1}},{x:9.5,y:16.5,angle:0,color:{r:0,g:1,b:0}},{x:8.5,y:3.5,angle:1*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:7.5,angle:7*Math.PI/4},{x:10.5,y:5.5,angle:9*Math.PI/4},{x:16.5,y:3.5,angle:8*Math.PI/4},{x:22.5,y:16.5,angle:6*Math.PI/4},{x:22.5,y:7.5,angle:6*Math.PI/4},{x:4.5,y:11.5,angle:4*Math.PI/4},{x:7.5,y:14.5,angle:6*Math.PI/4}],blocks:[{x:20.5,y:15.5},{x:8.5,y:15.5}],targets:[{x:14.5,y:1.5,color:{r:1,g:0,b:1}},{x:14.5,y:7.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`........................`,`........#.........####..`,`......###........####...`,`......##............#...`,`......###..#............`,`.......#..####...##.....`,`.#####...#####..####....`,`######.....###########..`,`#####..........#######..`,`.####..........######...`,`.###...........#####....`,`..#....##......###......`,`......###....#..........`,`...#..####...####....#..`,`..####.#...######..####.`,`..####.....#####...###..`,`...##........####...##..`,`..###........###........`]),sources:[{x:5.5,y:6.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:13.5,y:17.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:21.5,y:7.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:7.5,y:5.5,angle:3*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:5.5,y:14.5,angle:3*Math.PI/4},{x:13.5,y:14.5,angle:5*Math.PI/4},{x:19.5,y:14.5,angle:6*Math.PI/4},{x:19.5,y:7.5,angle:6*Math.PI/4},{x:19.5,y:2.5,angle:6*Math.PI/4},{x:6.5,y:2.5,angle:4*Math.PI/4},{x:3.5,y:9.5,angle:4*Math.PI/4}],blocks:[{x:3.5,y:14.5},{x:22.5,y:14.5}],targets:[{x:13.5,y:7.5,color:{r:1,g:1,b:0}},{x:6.5,y:12.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`.........#..#...........`,`.........#####...#..##..`,`.........#####...#####..`,`.........#####....####..`,`.####...####.....#####..`,`.####....###.....###....`,`.####....###......##....`,`####....###.......##....`,`.##...#####.............`,`..#...#####.............`,`......######............`,`.....#######............`,`....#######........###..`,`.....##.##..####.#####..`,`.............###..###...`,`.............###...#....`,`..............#.........`,`........................`]),sources:[{x:3.5,y:7.5,angle:0,color:{r:1,g:0,b:0}},{x:9.5,y:9.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:9.5,y:2.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:19.5,y:13.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:9.5,y:7.5,angle:5*Math.PI/4},{x:9.5,y:5.5,angle:6*Math.PI/4},{x:18.5,y:7.5,angle:6*Math.PI/4},{x:4.5,y:5.5,angle:6*Math.PI/4},{x:4.5,y:12.5,angle:3*Math.PI/4},{x:21.5,y:12.5,angle:4*Math.PI/4},{x:13.5,y:13.5,angle:7*Math.PI/4},{x:13.5,y:2.5,angle:6*Math.PI/4}],blocks:[{x:.5,y:7.5},{x:9.5,y:.5}],targets:[{x:18.5,y:5.5,color:{r:1,g:1,b:0}},{x:21.5,y:2.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.........##.............`,`.........#####..........`,`.........#####..........`,`...###...######.........`,`...#####.#####..........`,`....###...###...##......`,`....##.....#...###......`,`..............#####.....`,`......##......#######...`,`......####....#######...`,`......######.######.....`,`####..######.#####......`,`####...###..............`,`.####........###...##...`,`.####......#####..#####.`,`.###.......#####...#####`,`..##.........#.....####.`,`...................#....`]),sources:[{x:1.5,y:15.5,angle:0,color:{r:1,g:0,b:0}},{x:3.5,y:11.5,angle:0,color:{r:0,g:0,b:1}},{x:11.5,y:2.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:9.5,y:9.5,angle:0,color:{r:0,g:0,b:1}}],mirrors:[{x:11.5,y:11.5,angle:6*Math.PI/4},{x:11.5,y:6.5,angle:6*Math.PI/4},{x:4.5,y:6.5,angle:4*Math.PI/4},{x:4.5,y:14.5,angle:3*Math.PI/4},{x:20.5,y:9.5,angle:4*Math.PI/4},{x:20.5,y:14.5,angle:4*Math.PI/4}],obsidian:[{x:11.5,y:15.5,angle:7*Math.PI/4},{x:15.5,y:6.5,angle:7*Math.PI/4}],blocks:[{x:6.5,y:9.5},{x:6.5,y:9.5}],targets:[{x:15.5,y:11.5,color:{r:1,g:0,b:1}},{x:14.5,y:14.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`..............##........`,`....####......####......`,`....###.......###.......`,`.....#........###..####.`,`..............#....####.`,`....................###.`,`##.#.................##.`,`######..###..........#..`,`###########.####........`,`.####.##########...##...`,`...##.#########....####.`,`........#######...######`,`.##.#...###.##...######.`,`.####....#....##..######`,`.####........###...#..##`,`.#####........###.......`,`..###.........##........`,`...#.........####.......`]),sources:[{x:7.5,y:9.5,angle:7*Math.PI/4,color:{r:1,g:0,b:0}},{x:23.5,y:13.5,angle:5*Math.PI/4,color:{r:0,g:1,b:0}},{x:2.5,y:16.5,angle:7*Math.PI/4,color:{r:1,g:0,b:0}},{x:15.5,y:16.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:15.5,y:1.5,angle:7*Math.PI/4},{x:21.5,y:7.5,angle:5*Math.PI/4},{x:19.5,y:9.5,angle:6*Math.PI/4},{x:15.5,y:13.5,angle:6*Math.PI/4},{x:10.5,y:8.5,angle:9*Math.PI/4},{x:5.5,y:3.5,angle:6*Math.PI/4},{x:.5,y:8.5,angle:4*Math.PI/4}],obsidian:[{x:4.5,y:16.5,angle:9*Math.PI/4}],blocks:[{x:6.5,y:10.5},{x:6.5,y:2.5},{x:7.5,y:1.5}],targets:[{x:14.5,y:4.5,color:{r:1,g:1,b:0}},{x:4.5,y:12.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`........................`,`...........##...........`,`..#........#######..#...`,`######.....############.`,`######......#####..#.#..`,`..###...##...###........`,`......######............`,`.....#######.##....##...`,`......######.##...####..`,`..........#######.......`,`.....##......###........`,`..#####......###........`,`.######......###........`,`########........###.....`,`########.####..######...`,`...###...###...#####....`,`....##...###.....####...`,`.........#.........#....`]),sources:[{x:11.5,y:3.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:6.5,y:7.5,angle:0,color:{r:0,g:1,b:0}},{x:13.5,y:9.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:11.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:11.5,y:7.5,angle:4*Math.PI/4},{x:13.5,y:7.5,angle:6*Math.PI/4},{x:11.5,y:14.5,angle:4*Math.PI/4},{x:20.5,y:7.5,angle:4*Math.PI/4},{x:20.5,y:3.5,angle:6*Math.PI/4},{x:16.5,y:14.5,angle:5*Math.PI/4}],obsidian:[{x:13.5,y:2.5,angle:11*Math.PI/4},{x:2.5,y:14.5,angle:9*Math.PI/4}],blocks:[{x:13.5,y:12.5},{x:22.5,y:3.5}],targets:[{x:2.5,y:2.5,color:{r:1,g:1,b:0}},{x:16.5,y:3.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.......##...............`,`.....#.###...#..........`,`....######...####.......`,`....#####....####.#.....`,`....######...###.####...`,`........##...##...#####.`,`..#..............######.`,`..#####...........###...`,`.#######................`,`.#######........####....`,`....#..........####.....`,`...............####.....`,`......##......#####.....`,`....#######..########...`,`...########..#######....`,`....######......##......`,`.....##.##..............`,`.....#..................`]),sources:[{x:4.5,y:13.5,angle:0,color:{r:1,g:0,b:0}},{x:7.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}},{x:13.5,y:1.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:20.5,y:5.5,angle:3*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:13.5,y:4.5,angle:6*Math.PI/4},{x:4.5,y:4.5,angle:5*Math.PI/4},{x:7.5,y:9.5,angle:8*Math.PI/4},{x:18.5,y:4.5,angle:3*Math.PI/4},{x:18.5,y:9.5,angle:4*Math.PI/4},{x:9.5,y:16.5,angle:7*Math.PI/4},{x:1.5,y:8.5,angle:9*Math.PI/4}],obsidian:[{x:13.5,y:13.5,angle:9*Math.PI/4}],blocks:[{x:18.5,y:14.5},{x:18.5,y:14.5}],targets:[{x:4.5,y:9.5,color:{r:1,g:0,b:1}},{x:7.5,y:2.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.............#..........`,`..#.........###.........`,`.###........###.........`,`..##....................`,`..#.......#####.........`,`.........######....##...`,`.#.......######..####...`,`.#####...#####...#####..`,`.######.######..######..`,`.######..#####.....##...`,`.####....####....#......`,`..##......###...##......`,`..........###..###......`,`.....#.#...#..####......`,`....#####......####.....`,`...#####......######....`,`....###.......######....`,`....##...........##.....`]),sources:[{x:7.5,y:13.5,angle:0,color:{r:1,g:0,b:0}},{x:9.5,y:8.5,angle:0,color:{r:0,g:1,b:0}},{x:1.5,y:6.5,angle:0,color:{r:1,g:0,b:0}},{x:21.5,y:8.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:14.5,y:6.5,angle:5*Math.PI/4},{x:19.5,y:8.5,angle:4*Math.PI/4},{x:2.5,y:1.5,angle:5*Math.PI/4},{x:19.5,y:16.5,angle:6*Math.PI/4},{x:6.5,y:16.5,angle:8*Math.PI/4},{x:6.5,y:8.5,angle:6*Math.PI/4}],obsidian:[{x:14.5,y:13.5,angle:5*Math.PI/4},{x:14.5,y:1.5,angle:15*Math.PI/4}],blocks:[{x:5.5,y:13.5},{x:14.5,y:15.5}],targets:[{x:19.5,y:6.5,color:{r:1,g:1,b:0}},{x:2.5,y:8.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`.....................###`,`......#............#####`,`.....####....#.....####.`,`.....####....####.#####.`,`.########...#####..###..`,`.#######......###..###..`,`..######......#.....##..`,`...##.##................`,`...................###..`,`...#...............####.`,`#####...............##..`,`.####................#..`,`.###...##...............`,`.......####....#.....##.`,`.......####.####...####.`,`........###.#####.#####.`,`........#...####..####..`,`..............##....#...`]),sources:[{x:8.5,y:14.5,angle:0,color:{r:1,g:0,b:0}},{x:14.5,y:17.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:2.5,y:4.5,angle:0,color:{r:0,g:1,b:0}},{x:14.5,y:3.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:14.5,y:14.5,angle:5*Math.PI/4},{x:14.5,y:5.5,angle:4*Math.PI/4},{x:21.5,y:4.5,angle:2*Math.PI/4},{x:21.5,y:9.5,angle:5*Math.PI/4},{x:7.5,y:5.5,angle:4*Math.PI/4},{x:7.5,y:12.5,angle:6*Math.PI/4},{x:3.5,y:12.5,angle:7*Math.PI/4}],obsidian:[{x:19.5,y:14.5,angle:9*Math.PI/4}],blocks:[{x:21.5,y:15.5},{x:21.5,y:16.5}],targets:[{x:19.5,y:5.5,color:{r:1,g:1,b:0}},{x:3.5,y:9.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`..#...........#.........`,`#####........##....#....`,`####...#.....###..###...`,`.###...##....###..####..`,`.....######..#..........`,`....######..............`,`.....#####.....##.......`,`.##...#####...#####.....`,`###.......#....####.....`,`.##.........#######.....`,`..#........#########....`,`..............#######...`,`.....##........#..##....`,`...#####..###........##.`,`...####...###......####.`,`...###...####.......####`,`..........###......####.`,`...........#.......###..`]),sources:[{x:.5,y:1.5,angle:1*Math.PI/4,color:{r:1,g:0,b:0}},{x:8.5,y:3.5,angle:3*Math.PI/4,color:{r:0,g:0,b:1}},{x:4.5,y:1.5,angle:1*Math.PI/4,color:{r:0,g:1,b:0}},{x:2.5,y:2.5,angle:0,color:{r:0,g:0,b:1}}],mirrors:[{x:5.5,y:6.5,angle:3*Math.PI/4},{x:2.5,y:9.5,angle:3*Math.PI/4},{x:12.5,y:13.5,angle:5*Math.PI/4},{x:14.5,y:11.5,angle:9*Math.PI/4},{x:10.5,y:7.5,angle:7*Math.PI/4},{x:14.5,y:3.5,angle:6*Math.PI/4},{x:18.5,y:7.5,angle:4*Math.PI/4}],obsidian:[{x:20.5,y:2.5,angle:7*Math.PI/4}],blocks:[{x:10.5,y:15.5},{x:10.5,y:15.5}],targets:[{x:5.5,y:12.5,color:{r:1,g:0,b:1}},{x:20.5,y:17.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`...................##...`,`..................###...`,`.........##.##....####..`,`.........######..#####..`,`.........#######.###....`,`###......######.........`,`######......##..#..#....`,`#########...##..####....`,`.#########.#.....####...`,`..#######.##....######..`,`..#####...###...####....`,`....###..######...##....`,`.....#...#####..........`,`.........####.....#.....`,`.........####...####....`,`.........##.....####....`,`................####....`,`..................#.....`]),sources:[{x:9.5,y:2.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:6.5,y:8.5,angle:0,color:{r:0,g:1,b:0}},{x:18.5,y:1.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:16.5,y:7.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:9.5,y:8.5,angle:4*Math.PI/4},{x:9.5,y:14.5,angle:2*Math.PI/4},{x:18.5,y:14.5,angle:4*Math.PI/4},{x:18.5,y:3.5,angle:4*Math.PI/4},{x:13.5,y:3.5,angle:6*Math.PI/4},{x:13.5,y:11.5,angle:4*Math.PI/4},{x:4.5,y:7.5,angle:6*Math.PI/4}],obsidian:[{x:20.5,y:8.5,angle:7*Math.PI/4}],blocks:[{x:18.5,y:17.5},{x:3.5,y:8.5}],targets:[{x:20.5,y:3.5,color:{r:1,g:1,b:0}},{x:4.5,y:11.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`....#...................`,`....##.............#....`,`...####...........###...`,`...####............###..`,`....###...#####...###...`,`..........#####...##....`,`..........#####.........`,`..........######........`,`...##...########...##...`,`..####..########..###...`,`.####....#####....###...`,`.####......##....####...`,`.#####...##........##...`,`..####...###...##.......`,`..##########.#####......`,`...###.#####..####......`,`....#...####...##.......`,`...........#...###......`]),sources:[{x:4.5,y:13.5,angle:0,color:{r:1,g:0,b:0}},{x:6.5,y:14.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:10.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:10.5,y:5.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:10.5,y:13.5,angle:6*Math.PI/4},{x:10.5,y:9.5,angle:8*Math.PI/4},{x:15.5,y:8.5,angle:6*Math.PI/4},{x:20.5,y:9.5,angle:5*Math.PI/4},{x:20.5,y:2.5,angle:8*Math.PI/4},{x:4.5,y:2.5,angle:6*Math.PI/4}],obsidian:[{x:2.5,y:14.5,angle:9*Math.PI/4},{x:15.5,y:13.5,angle:9*Math.PI/4}],blocks:[{x:20.5,y:11.5},{x:15.5,y:15.5}],targets:[{x:2.5,y:9.5,color:{r:1,g:1,b:0}},{x:4.5,y:8.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`........................`,`..............#.........`,`............###.........`,`....#####..####.........`,`...#######.#####..#####.`,`..########...##..######.`,`..#######.......######..`,`...######........####...`,`...######...###...####..`,`...####....####...###...`,`....#.....######........`,`...##........###........`,`..####..###.........##..`,`..####..###...#.#..####.`,`.#####..####..###...####`,`..##....#####.##....####`,`..........##...#...####.`,`..........#.........##..`]),sources:[{x:8.5,y:15.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:3.5,y:8.5,angle:0,color:{r:0,g:0,b:1}},{x:14.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:14.5,y:3.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:14.5,y:5.5,angle:3*Math.PI/4},{x:14.5,y:8.5,angle:2*Math.PI/4},{x:14.5,y:13.5,angle:3*Math.PI/4},{x:21.5,y:13.5,angle:5*Math.PI/4},{x:5.5,y:13.5,angle:8*Math.PI/4},{x:5.5,y:9.5,angle:4*Math.PI/4},{x:19.5,y:5.5,angle:3*Math.PI/4}],obsidian:[{x:8.5,y:5.5,angle:11*Math.PI/4}],blocks:[{x:5.5,y:3.5},{x:2.5,y:5.5}],targets:[{x:21.5,y:8.5,color:{r:1,g:0,b:1}},{x:19.5,y:9.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.............#..........`,`.............##.....##..`,`.......#....####....####`,`.#.....##...###.....#.#.`,`.###..###...##....##....`,`.###..##...##.....##....`,`.####.....####...####...`,`.####.....####..#####...`,`..#.....#######..#####..`,`........#######...#####.`,`.........####......#.#..`,`.........#####.....##...`,`..#.#....#####....###...`,`..####...#####.....###..`,`.#####...#..##....####..`,`######.####......#####..`,`.##.....###......######.`,`........##.......###.##.`]),sources:[{x:21.5,y:8.5,angle:3*Math.PI/4,color:{r:1,g:0,b:0}},{x:20.5,y:14.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:20.5,y:1.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:11.5,y:13.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:12.5,y:8.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}}],mirrors:[{x:19.5,y:10.5,angle:7*Math.PI/4},{x:17.5,y:8.5,angle:7*Math.PI/4},{x:20.5,y:3.5,angle:4*Math.PI/4},{x:8.5,y:8.5,angle:5*Math.PI/4},{x:8.5,y:17.5,angle:3*Math.PI/4},{x:21.5,y:17.5,angle:5*Math.PI/4}],obsidian:[{x:8.5,y:3.5,angle:9*Math.PI/4},{x:2.5,y:13.5,angle:7*Math.PI/4}],blocks:[{x:13.5,y:12.5},{x:14.5,y:8.5}],switches:[{x:21.5,y:10.5,color:{r:1,g:0,b:0}}],gates:[{x:5.5,y:13.5,switch:0}],targets:[{x:22.5,y:3.5,color:{r:1,g:1,b:0}},{x:2.5,y:8.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`...........##...........`,`.......#...##......###..`,`......###.######..####..`,`....####..#######.####..`,`....####...#####..###...`,`...######...#....#####..`,`...######.........###...`,`......##..........###...`,`...................#....`,`..............##..##....`,`..#.......######..##....`,`#####....######..#####..`,`.###.....######...####..`,`..###...#######...####..`,`........#######.........`,`..........####..........`,`...........##...........`,`...........##...........`]),sources:[{x:6.5,y:2.5,angle:1*Math.PI/4,color:{r:1,g:0,b:0}},{x:21.5,y:13.5,angle:5*Math.PI/4,color:{r:0,g:1,b:0}},{x:3.5,y:6.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:13.5,y:14.5,angle:5*Math.PI/4,color:{r:0,g:0,b:1}},{x:10.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}}],mirrors:[{x:14.5,y:10.5,angle:6*Math.PI/4},{x:18.5,y:6.5,angle:7*Math.PI/4},{x:12.5,y:4.5,angle:9*Math.PI/4},{x:10.5,y:13.5,angle:6*Math.PI/4},{x:6.5,y:7.5,angle:9*Math.PI/4},{x:19.5,y:13.5,angle:5*Math.PI/4},{x:19.5,y:1.5,angle:6*Math.PI/4}],obsidian:[{x:3.5,y:13.5,angle:7*Math.PI/4}],blocks:[{x:21.5,y:1.5},{x:1.5,y:12.5}],switches:[{x:11.5,y:1.5,color:{r:0,g:1,b:0}}],gates:[{x:10.5,y:11.5,switch:0}],targets:[{x:14.5,y:2.5,color:{r:1,g:1,b:0}},{x:10.5,y:3.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`............##..........`,`............#####.......`,`.............####.......`,`....###.##########......`,`..##########.####.......`,`..##########..##...#.###`,`..#########......######.`,`....#######..##########.`,`....###......###.######.`,`.....#.......###...#....`,`...........#####........`,`...........#####.....#..`,`...##........##.....####`,`.#########...#......####`,`#############.......###.`,`.#.##...####........#...`,`.......####.............`,`........................`]),sources:[{x:5.5,y:14.5,angle:0,color:{r:1,g:0,b:0}},{x:9.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}},{x:7.5,y:6.5,angle:7*Math.PI/4,color:{r:0,g:1,b:0}},{x:21.5,y:5.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:14.5,y:2.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:9.5,y:14.5,angle:5*Math.PI/4},{x:13.5,y:.5,angle:5*Math.PI/4},{x:19.5,y:6.5,angle:5*Math.PI/4},{x:14.5,y:5.5,angle:5*Math.PI/4},{x:3.5,y:5.5,angle:4*Math.PI/4},{x:3.5,y:12.5,angle:3*Math.PI/4}],obsidian:[{x:9.5,y:7.5,angle:13*Math.PI/4},{x:21.5,y:14.5,angle:7*Math.PI/4}],blocks:[{x:4.5,y:7.5},{x:3.5,y:14.5}],switches:[{x:23.5,y:12.5,color:{r:0,g:0,b:1}}],gates:[{x:16.5,y:3.5,switch:0}],targets:[{x:21.5,y:7.5,color:{r:1,g:0,b:1}},{x:14.5,y:11.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`..####...##.............`,`..####..###.............`,`######..###.............`,`#####..####.......#.....`,`.####....##......###....`,`.###......#....######...`,`..#....#.......#######..`,`.......##.....########..`,`.##....###...######.....`,`#####..###....####......`,`.###...####...##........`,`.###....#....###........`,`..........######....#...`,`....##....#######...##..`,`..###############.#####.`,`...######....##....###..`,`....####...........###..`,`...................###..`]),sources:[{x:2.5,y:4.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:.5,y:9.5,angle:0,color:{r:0,g:1,b:0}},{x:9.5,y:2.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:10.5,y:4.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:12.5,y:14.5,angle:0,color:{r:0,g:1,b:0}}],mirrors:[{x:2.5,y:9.5,angle:4*Math.PI/4},{x:9.5,y:9.5,angle:3*Math.PI/4},{x:14.5,y:9.5,angle:3*Math.PI/4},{x:14.5,y:13.5,angle:5*Math.PI/4},{x:4.5,y:4.5,angle:4*Math.PI/4},{x:20.5,y:14.5,angle:4*Math.PI/4},{x:20.5,y:6.5,angle:8*Math.PI/4}],obsidian:[{x:2.5,y:14.5,angle:7*Math.PI/4}],blocks:[{x:9.5,y:.5},{x:20.5,y:16.5}],switches:[{x:7.5,y:6.5,color:{r:0,g:1,b:0}}],gates:[{x:4.5,y:9.5,switch:0}],targets:[{x:9.5,y:14.5,color:{r:1,g:1,b:0}},{x:4.5,y:13.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`.............###........`,`.##..........#####......`,`.#####........###...#...`,`..##..........###...##..`,`......#####........##...`,`......#####...#....###..`,`......####....###.......`,`....######....####......`,`....######...######.....`,`......#####..######.....`,`......###.....###.......`,`.......#...........###..`,`...#...............###..`,`.####.............####..`,`.#.#...###.......######.`,`........##...##..#####..`,`........##...###........`,`........#.....#.........`]),sources:[{x:1.5,y:13.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:10.5,y:9.5,angle:0,color:{r:0,g:1,b:0}},{x:15.5,y:.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:13.5,y:1.5,angle:3*Math.PI/4,color:{r:0,g:0,b:1}},{x:17.5,y:9.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}}],mirrors:[{x:15.5,y:2.5,angle:4*Math.PI/4},{x:15.5,y:9.5,angle:6*Math.PI/4},{x:20.5,y:15.5,angle:6*Math.PI/4},{x:6.5,y:8.5,angle:5*Math.PI/4},{x:15.5,y:16.5,angle:5*Math.PI/4},{x:9.5,y:16.5,angle:6*Math.PI/4}],obsidian:[{x:1.5,y:2.5,angle:13*Math.PI/4},{x:20.5,y:2.5,angle:7*Math.PI/4}],blocks:[{x:5.5,y:7.5},{x:5.5,y:7.5}],switches:[{x:9.5,y:7.5,color:{r:1,g:0,b:0}}],gates:[{x:13.5,y:9.5,switch:0}],targets:[{x:15.5,y:7.5,color:{r:1,g:1,b:0}},{x:13.5,y:15.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`................#.......`,`.....#..#....####.......`,`....#######.######......`,`.....######.#####.......`,`.....####......#........`,`........#........##.....`,`...........#.....####...`,`........#####...#####...`,`###.....#####..#######..`,`####....#####..#######..`,`.####...#####....#..#...`,`.####...#######.........`,`.###....#######.........`,`..##.....#####.......#..`,`..........####......##..`,`...........##.......####`,`....................####`,`....................#.#.`]),sources:[{x:17.5,y:2.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:18.5,y:8.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:.5,y:8.5,angle:0,color:{r:0,g:1,b:0}},{x:3.5,y:13.5,angle:0,color:{r:0,g:0,b:1}},{x:12.5,y:15.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}}],mirrors:[{x:4.5,y:10.5,angle:2*Math.PI/4},{x:9.5,y:8.5,angle:4*Math.PI/4},{x:9.5,y:3.5,angle:5*Math.PI/4},{x:12.5,y:3.5,angle:3*Math.PI/4},{x:12.5,y:13.5,angle:4*Math.PI/4},{x:21.5,y:13.5,angle:5*Math.PI/4},{x:21.5,y:9.5,angle:7*Math.PI/4}],obsidian:[{x:4.5,y:2.5,angle:13*Math.PI/4}],blocks:[{x:14.5,y:3.5},{x:21.5,y:16.5}],switches:[{x:2.5,y:9.5,color:{r:1,g:0,b:0}}],gates:[{x:15.5,y:8.5,switch:0}],targets:[{x:9.5,y:10.5,color:{r:1,g:0,b:1}},{x:12.5,y:10.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`....................#...`,`......##..........###...`,`......##.........#####..`,`.....######..##....#....`,`....########.###........`,`....########.###........`,`....#######..####...#.##`,`....######....##...#####`,`...####.......##..######`,`...####...........#####.`,`....##.........#....####`,`........##....###...###.`,`......#######.###...##..`,`..##..#######..##.......`,`..###..######.####......`,`...##..#####............`,`...#....#...............`,`........................`]),sources:[{x:23.5,y:10.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:18.5,y:2.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:15.5,y:14.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:21.5,y:12.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:7.5,y:12.5,angle:0,color:{r:0,g:1,b:0}}],mirrors:[{x:15.5,y:10.5,angle:7*Math.PI/4},{x:4.5,y:10.5,angle:6*Math.PI/4},{x:4.5,y:15.5,angle:4*Math.PI/4},{x:9.5,y:12.5,angle:6*Math.PI/4},{x:9.5,y:7.5,angle:5*Math.PI/4},{x:21.5,y:7.5,angle:4*Math.PI/4}],obsidian:[{x:15.5,y:6.5,angle:13*Math.PI/4},{x:6.5,y:2.5,angle:13*Math.PI/4}],blocks:[{x:22.5,y:6.5},{x:7.5,y:7.5}],switches:[{x:21.5,y:2.5,color:{r:0,g:1,b:0}}],gates:[{x:16.5,y:12.5,switch:0}],targets:[{x:6.5,y:6.5,color:{r:1,g:1,b:0}},{x:9.5,y:15.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`..##....................`,`.###....................`,`.###....#...............`,`###....#####.......###..`,`.##....#####...#..######`,`..#.....###..###...####.`,`....##..###..###....###.`,`...###......#####....##.`,`..####........###.......`,`....##..................`,`.................##.....`,`...#....####....###.....`,`..##....######.####.#...`,`.####..#######.########.`,`..#########.#...######..`,`..###..####.....######..`,`..###...........##.##...`,`...##...................`]),sources:[{x:18.5,y:4.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:2.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:8.5,y:13.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:10.5,y:6.5,angle:0,color:{r:0,g:0,b:1}},{x:15.5,y:4.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}}],mirrors:[{x:8.5,y:11.5,angle:8*Math.PI/4},{x:2.5,y:3.5,angle:4*Math.PI/4},{x:3.5,y:11.5,angle:7*Math.PI/4},{x:3.5,y:8.5,angle:6*Math.PI/4},{x:15.5,y:6.5,angle:3*Math.PI/4},{x:20.5,y:6.5,angle:3*Math.PI/4},{x:20.5,y:16.5,angle:4*Math.PI/4},{x:4.5,y:16.5,angle:6*Math.PI/4}],obsidian:[{x:18.5,y:11.5,angle:7*Math.PI/4}],blocks:[{x:2.5,y:1.5},{x:3.5,y:2.5}],switches:[{x:4.5,y:6.5,color:{r:1,g:0,b:0}}],gates:[{x:13.5,y:6.5,switch:0}],targets:[{x:8.5,y:3.5,color:{r:1,g:1,b:0}},{x:15.5,y:8.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`............###.....#...`,`............####...##...`,`##......##.#####...##...`,`.##....###.###.#..#####.`,`.##..#####..#......###..`,`.......###.........####.`,`.....................##.`,`...........###....##....`,`..####.....###...###....`,`..#####..........####...`,`..#######.......####....`,`...######...##..##......`,`...#####...###.......#..`,`...####....######...###.`,`....###.....####...####.`,`............####...#####`,`...........####...####..`,`..................####..`]),sources:[{x:20.5,y:9.5,angle:3*Math.PI/4,color:{r:1,g:0,b:0}},{x:12.5,y:.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}},{x:12.5,y:12.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:22.5,y:5.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}},{x:15.5,y:1.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:16.5,y:13.5,angle:5*Math.PI/4},{x:7.5,y:4.5,angle:6*Math.PI/4},{x:12.5,y:8.5,angle:4*Math.PI/4},{x:15.5,y:3.5,angle:4*Math.PI/4},{x:22.5,y:15.5,angle:5*Math.PI/4},{x:2.5,y:3.5,angle:5*Math.PI/4},{x:2.5,y:10.5,angle:3*Math.PI/4}],obsidian:[{x:18.5,y:8.5,angle:5*Math.PI/4},{x:18.5,y:3.5,angle:15*Math.PI/4}],blocks:[{x:18.5,y:17.5},{x:13.5,y:16.5}],switches:[{x:17.5,y:10.5,color:{r:0,g:0,b:1}}],gates:[{x:19.5,y:15.5,switch:0}],targets:[{x:3.5,y:8.5,color:{r:1,g:0,b:1}},{x:15.5,y:15.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`........................`,`.......###..............`,`.......#####............`,`......######......#.....`,`......##.........####...`,`..................###...`,`..####..........######..`,`######..........######..`,`#####.....##....###.....`,`..###.....###...........`,`..###.....#######...##..`,`.........#########.###..`,`....#....##############.`,`..####....#######.######`,`...####....###......###.`,`...###.....##......####.`,`...#.#.............####.`,`....................###.`]),sources:[{x:12.5,y:14.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:.5,y:8.5,angle:0,color:{r:0,g:1,b:0}},{x:10.5,y:2.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:18.5,y:8.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:10.5,y:12.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}}],mirrors:[{x:5.5,y:6.5,angle:4*Math.PI/4},{x:16.5,y:8.5,angle:6*Math.PI/4},{x:10.5,y:10.5,angle:6*Math.PI/4},{x:2.5,y:10.5,angle:4*Math.PI/4},{x:16.5,y:13.5,angle:5*Math.PI/4},{x:21.5,y:10.5,angle:5*Math.PI/4},{x:21.5,y:7.5,angle:7*Math.PI/4}],obsidian:[{x:5.5,y:14.5,angle:9*Math.PI/4}],blocks:[{x:23.5,y:13.5},{x:21.5,y:15.5}],switches:[{x:3.5,y:7.5,color:{r:0,g:1,b:0}}],gates:[{x:11.5,y:8.5,switch:0}],targets:[{x:16.5,y:6.5,color:{r:1,g:1,b:0}},{x:2.5,y:13.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`.......##...............`,`......####..............`,`......###...............`,`..##...###..............`,`..##...##.........##....`,`..###............###....`,`#####...####...######...`,`.###....####...#######..`,`.####...###...######....`,`.####..#####..###.......`,`...##....###............`,`.........##.............`,`#.#...#.......####......`,`#####.####...#########..`,`#.#...####....########..`,`......#####.....#####...`,`.......##........####...`,`.......##........####...`]),sources:[{x:15.5,y:14.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:7.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:7.5,y:2.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:4.5,y:9.5,angle:0,color:{r:0,g:0,b:1}},{x:9.5,y:1.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}}],mirrors:[{x:7.5,y:14.5,angle:7*Math.PI/4},{x:7.5,y:4.5,angle:8*Math.PI/4},{x:9.5,y:9.5,angle:3*Math.PI/4},{x:15.5,y:9.5,angle:2*Math.PI/4},{x:15.5,y:12.5,angle:6*Math.PI/4}],obsidian:[{x:2.5,y:14.5,angle:7*Math.PI/4},{x:19.5,y:4.5,angle:3*Math.PI/4},{x:19.5,y:15.5,angle:5*Math.PI/4}],blocks:[{x:1.5,y:9.5},{x:7.5,y:.5}],switches:[{x:.5,y:12.5,color:{r:1,g:0,b:0}}],gates:[{x:9.5,y:11.5,switch:0}],targets:[{x:2.5,y:4.5,color:{r:1,g:1,b:0}},{x:9.5,y:15.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`..###...................`,`.#####........####......`,`.######........###......`,`.####...................`,`.####...##.........###..`,`#####...##....###...###.`,`.#...######...###....#..`,`......#####..####.......`,`.......###....#####.....`,`.##....####....#####....`,`.##.##...##.....####....`,`#######..##......####...`,`#######..........#####..`,`#######.#........#####..`,`.##.....####....######..`,`.......#####.....######.`,`.........###.....######.`,`.........##......######.`]),sources:[{x:5.5,y:1.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:9.5,y:10.5,angle:0,color:{r:0,g:0,b:1}},{x:14.5,y:8.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:1.5,y:6.5,angle:0,color:{r:0,g:0,b:1}},{x:19.5,y:10.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}}],mirrors:[{x:5.5,y:6.5,angle:2*Math.PI/4},{x:14.5,y:6.5,angle:4*Math.PI/4},{x:17.5,y:10.5,angle:6*Math.PI/4},{x:21.5,y:13.5,angle:4*Math.PI/4},{x:5.5,y:13.5,angle:2*Math.PI/4},{x:17.5,y:16.5,angle:6*Math.PI/4},{x:10.5,y:16.5,angle:6*Math.PI/4}],obsidian:[{x:17.5,y:1.5,angle:11*Math.PI/4},{x:21.5,y:6.5,angle:5*Math.PI/4}],blocks:[{x:21.5,y:15.5},{x:21.5,y:15.5}],switches:[{x:10.5,y:7.5,color:{r:0,g:1,b:0}}],gates:[{x:19.5,y:13.5,switch:0}],targets:[{x:14.5,y:1.5,color:{r:1,g:0,b:1}},{x:8.5,y:13.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.......####..........#..`,`.......####..........##.`,`......####.........#####`,`......####......##..###.`,`....#..###...#####..####`,`.####..###..######......`,`#####..##...######......`,`#####..#.#..#######.....`,`..###..####.#######.....`,`..##...##......####.....`,`...............####.....`,`................##......`,`......###............##.`,`.##...####....#...#####.`,`.###..#####.###..######.`,`####...##...#####.#.##..`,`####....#..######.......`,`.#.........##...........`]),sources:[{x:16.5,y:4.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:2.5,y:8.5,angle:0,color:{r:0,g:1,b:0}},{x:8.5,y:16.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:23.5,y:2.5,angle:3*Math.PI/4,color:{r:0,g:0,b:1}},{x:13.5,y:16.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}}],mirrors:[{x:8.5,y:8.5,angle:2*Math.PI/4},{x:8.5,y:14.5,angle:2*Math.PI/4},{x:13.5,y:14.5,angle:5*Math.PI/4},{x:16.5,y:9.5,angle:7*Math.PI/4},{x:19.5,y:14.5,angle:4*Math.PI/4},{x:19.5,y:2.5,angle:7*Math.PI/4}],obsidian:[{x:8.5,y:4.5,angle:9*Math.PI/4},{x:1.5,y:14.5,angle:9*Math.PI/4},{x:1.5,y:5.5,angle:11*Math.PI/4}],blocks:[{x:20.5,y:4.5},{x:23.5,y:4.5}],switches:[{x:6.5,y:2.5,color:{r:1,g:0,b:0}}],gates:[{x:18.5,y:7.5,switch:0}],targets:[{x:13.5,y:8.5,color:{r:1,g:1,b:0}},{x:12.5,y:5.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`................##......`,`................###.....`,`###.............##...#..`,`.####...........##..###.`,`.####...#.......#...####`,`..#....###.......#..###.`,`....#######.....##..###.`,`....#######.....##..##..`,`....########....###.#...`,`.....#######...####.....`,`........#####..#.##.....`,`.........#####..........`,`...#........###.........`,`..##........###...##..#.`,`..###.......##....#####.`,`.####.......##....######`,`..###.......#.......##..`,`..###................#..`]),sources:[{x:6.5,y:6.5,angle:0,color:{r:1,g:0,b:0}},{x:17.5,y:9.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:17.5,y:1.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:12.5,y:15.5,angle:0,color:{r:0,g:0,b:1}},{x:20.5,y:4.5,angle:3*Math.PI/4,color:{r:0,g:1,b:0}}],mirrors:[{x:17.5,y:6.5,angle:6*Math.PI/4},{x:17.5,y:3.5,angle:4*Math.PI/4},{x:4.5,y:17.5,angle:3*Math.PI/4},{x:21.5,y:15.5,angle:4*Math.PI/4},{x:13.5,y:11.5,angle:7*Math.PI/4},{x:10.5,y:8.5,angle:7*Math.PI/4}],obsidian:[{x:22.5,y:6.5,angle:7*Math.PI/4},{x:4.5,y:3.5,angle:9*Math.PI/4}],blocks:[{x:23.5,y:15.5},{x:22.5,y:14.5}],switches:[{x:2.5,y:16.5,color:{r:0,g:1,b:0}}],gates:[{x:4.5,y:8.5,switch:0}],targets:[{x:22.5,y:3.5,color:{r:1,g:1,b:0}},{x:21.5,y:17.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`................#.......`,`####.....##....#####....`,`.###....###..#######....`,`..#......##.#########...`,`..#..........########...`,`........##.....#...#....`,`.......######......##...`,`.......######......#####`,`......#######......#####`,`.###...######.......##..`,`.####...#####...........`,`..#......####...........`,`.........####....#......`,`.........##.....####....`,`....###...####..####....`,`.....###..#####..#.#....`,`....#####.####..........`,`.....##.....#...........`]),sources:[{x:5.5,y:14.5,angle:0,color:{r:1,g:0,b:0}},{x:12.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}},{x:9.5,y:12.5,angle:0,color:{r:0,g:1,b:0}},{x:4.5,y:16.5,angle:7*Math.PI/4,color:{r:0,g:0,b:1}},{x:9.5,y:1.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}}],mirrors:[{x:12.5,y:14.5,angle:6*Math.PI/4},{x:12.5,y:12.5,angle:5*Math.PI/4},{x:9.5,y:3.5,angle:6*Math.PI/4},{x:18.5,y:2.5,angle:6*Math.PI/4},{x:2.5,y:3.5,angle:6*Math.PI/4},{x:2.5,y:9.5,angle:4*Math.PI/4}],obsidian:[{x:17.5,y:14.5,angle:5*Math.PI/4},{x:12.5,y:3.5,angle:13*Math.PI/4},{x:9.5,y:7.5,angle:9*Math.PI/4}],blocks:[{x:2.5,y:11.5},{x:14.5,y:3.5}],switches:[{x:8.5,y:9.5,color:{r:1,g:0,b:0}}],gates:[{x:20.5,y:4.5,switch:0}],targets:[{x:17.5,y:12.5,color:{r:1,g:0,b:1}},{x:23.5,y:7.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`....#....##.............`,`..#####..###.......###..`,`..####...####.....#####.`,`...###..######...######.`,`..........#.......#####.`,`..##...............#####`,`..####..............####`,`..####.....##...........`,`...###....#####..####...`,`..#####...####...####...`,`...###....###....####...`,`...###....###....#####..`,`...##..........########.`,`.....#......#..########.`,`.....###.######.#####...`,`....###########.........`,`....####.####...........`,`....#...................`]),sources:[{x:18.5,y:13.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:10.5,y:8.5,angle:0,color:{r:0,g:1,b:0}},{x:12.5,y:16.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:6.5,y:9.5,angle:0,color:{r:0,g:0,b:1}},{x:3.5,y:11.5,angle:0,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:13.5,angle:7*Math.PI/4},{x:12.5,y:8.5,angle:6*Math.PI/4},{x:5.5,y:13.5,angle:6*Math.PI/4},{x:5.5,y:11.5,angle:6*Math.PI/4},{x:20.5,y:9.5,angle:3*Math.PI/4},{x:5.5,y:2.5,angle:4*Math.PI/4},{x:22.5,y:2.5,angle:3*Math.PI/4}],obsidian:[{x:12.5,y:3.5,angle:13*Math.PI/4},{x:17.5,y:3.5,angle:3*Math.PI/4}],blocks:[{x:4.5,y:9.5},{x:20.5,y:6.5}],switches:[{x:22.5,y:13.5,color:{r:0,g:0,b:1}}],gates:[{x:17.5,y:11.5,switch:0}],targets:[{x:17.5,y:8.5,color:{r:1,g:1,b:0}},{x:20.5,y:11.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`..##...........#........`,`.####...##...###........`,`.###....###..####.......`,`..###.#####....#........`,`...#...####.............`,`............##..####....`,`....#......####..#######`,`...#####....##...#######`,`...#####...####...#####.`,`..########..###....##...`,`..########...#..........`,`..########..............`,`.....##.....#...........`,`........########..#.....`,`........#############...`,`.##......#######.####...`,`.##..........##....##...`,`.#......................`]),sources:[{x:8.5,y:14.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:6.5,y:10.5,angle:1*Math.PI/4,color:{r:0,g:1,b:0}},{x:13.5,y:5.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:2.5,y:9.5,angle:0,color:{r:0,g:0,b:1}},{x:8.5,y:1.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}}],mirrors:[{x:8.5,y:9.5,angle:5*Math.PI/4},{x:13.5,y:9.5,angle:3*Math.PI/4},{x:11.5,y:15.5,angle:5*Math.PI/4},{x:8.5,y:3.5,angle:4*Math.PI/4},{x:3.5,y:3.5,angle:5*Math.PI/4},{x:3.5,y:7.5,angle:3*Math.PI/4}],obsidian:[{x:20.5,y:9.5,angle:3*Math.PI/4},{x:20.5,y:14.5,angle:7*Math.PI/4},{x:15.5,y:3.5,angle:7*Math.PI/4}],blocks:[{x:3.5,y:.5},{x:3.5,y:11.5}],switches:[{x:12.5,y:7.5,color:{r:0,g:1,b:0}}],gates:[{x:17.5,y:14.5,switch:0}],targets:[{x:13.5,y:13.5,color:{r:1,g:1,b:0}},{x:15.5,y:14.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`........................`,`..##........#........#..`,`.#####.....##.......##..`,`.###.....#####.....####.`,`.........######...####..`,`....#.....#####..######.`,`...###....#####..#######`,`...###.......##.########`,`...####........########.`,`..#####....#....###.##..`,`...#####...##...........`,`...##.##...###..........`,`..#....#....#...........`,`.##...#####.....####....`,`####..######.######.....`,`.###.#######.######.....`,`.###.#######....#.......`,`.###...##...............`]),sources:[{x:20.5,y:6.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:14.5,y:4.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}},{x:2.5,y:13.5,angle:0,color:{r:0,g:1,b:0}},{x:21.5,y:1.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:7.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:14.5,y:6.5,angle:5*Math.PI/4},{x:7.5,y:13.5,angle:5*Math.PI/4},{x:7.5,y:11.5,angle:4*Math.PI/4},{x:12.5,y:1.5,angle:6*Math.PI/4},{x:19.5,y:13.5,angle:6*Math.PI/4},{x:19.5,y:3.5,angle:7*Math.PI/4},{x:1.5,y:3.5,angle:6*Math.PI/4}],obsidian:[{x:14.5,y:15.5,angle:9*Math.PI/4},{x:5.5,y:6.5,angle:11*Math.PI/4}],blocks:[{x:23.5,y:6.5},{x:18.5,y:15.5}],switches:[{x:1.5,y:17.5,color:{r:0,g:0,b:1}}],gates:[{x:10.5,y:15.5,switch:0}],targets:[{x:5.5,y:15.5,color:{r:1,g:0,b:1}},{x:12.5,y:11.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`...........##...........`,`....##.....###.....####.`,`....###.....##.....###..`,`....###....####.........`,`...###.....##...........`,`............#...####....`,`..#............######...`,`..###....############...`,`.#############.#........`,`####.#######............`,`.###..######............`,`.##.....####............`,`...........#........###.`,`##.........##..#...####.`,`####.......#######.####.`,`####........############`,`.###.........###.######.`,`.#............##........`]),sources:[{x:12.5,y:.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:10.5,y:8.5,angle:0,color:{r:0,g:1,b:0}},{x:12.5,y:15.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:21.5,y:1.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}},{x:9.5,y:11.5,angle:1*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:8.5,angle:3*Math.PI/4},{x:12.5,y:13.5,angle:4*Math.PI/4},{x:5.5,y:1.5,angle:5*Math.PI/4},{x:15.5,y:17.5,angle:6*Math.PI/4},{x:20.5,y:12.5,angle:9*Math.PI/4}],obsidian:[{x:15.5,y:8.5,angle:5*Math.PI/4},{x:1.5,y:13.5,angle:7*Math.PI/4},{x:1.5,y:8.5,angle:13*Math.PI/4}],blocks:[{x:23.5,y:15.5},{x:1.5,y:15.5}],switches:[{x:11.5,y:3.5,color:{r:0,g:0,b:1}}],gates:[{x:12.5,y:5.5,switch:0}],targets:[{x:15.5,y:13.5,color:{r:1,g:1,b:0}},{x:5.5,y:8.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`....##....##............`,`.#####....###...........`,`..####....###......##...`,`..####....####.....###..`,`..####....#....##.#####.`,`...###.........########.`,`...###.##.##...########.`,`...##.######...######...`,`..#...#######..######...`,`.####.#######..###.##...`,`.###....##..........#...`,`.........#..............`,`.............##.....#...`,`...##........####.####..`,`..####.....#####..#####.`,`...##......######..####.`,`...##........#####.#.##.`,`.............##.........`]),sources:[{x:15.5,y:8.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:19.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:15.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:19.5,y:4.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}},{x:1.5,y:10.5,angle:0,color:{r:1,g:0,b:0}}],mirrors:[{x:15.5,y:13.5,angle:2*Math.PI/4},{x:19.5,y:6.5,angle:4*Math.PI/4},{x:3.5,y:10.5,angle:6*Math.PI/4},{x:8.5,y:6.5,angle:6*Math.PI/4},{x:3.5,y:1.5,angle:4*Math.PI/4},{x:11.5,y:1.5,angle:4*Math.PI/4}],obsidian:[{x:21.5,y:13.5,angle:7*Math.PI/4},{x:3.5,y:13.5,angle:7*Math.PI/4}],blocks:[{x:21.5,y:16.5},{x:15.5,y:4.5}],switches:[{x:11.5,y:7.5,color:{r:1,g:0,b:0}}],gates:[{x:19.5,y:9.5,switch:0}],targets:[{x:21.5,y:6.5,color:{r:1,g:1,b:0}},{x:8.5,y:10.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`..#......##........###..`,`####....#####......###..`,`.###...#######...####...`,`..#....######.....###...`,`........#####......#....`,`.....#..#####...........`,`....##..####.......#.#..`,`...####..#..###....####.`,`...#####....####...##...`,`...####......###........`,`............#####.......`,`.........##..###.....#..`,`...###...###.##....#####`,`..####..###..##....#####`,`.#####.####.......#####.`,`######..####......##....`,`#####...##..............`,`...#....................`]),gatesStayOpen:!0,sources:[{x:4.5,y:13.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:12.5,y:10.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}},{x:22.5,y:7.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:9.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:7.5,angle:4*Math.PI/4},{x:20.5,y:7.5,angle:6*Math.PI/4},{x:9.5,y:14.5,angle:8*Math.PI/4},{x:2.5,y:14.5,angle:8*Math.PI/4},{x:2.5,y:1.5,angle:4*Math.PI/4},{x:9.5,y:1.5,angle:3*Math.PI/4}],obsidian:[{x:4.5,y:7.5,angle:9*Math.PI/4},{x:20.5,y:1.5,angle:11*Math.PI/4},{x:20.5,y:14.5,angle:9*Math.PI/4}],blocks:[{x:.5,y:1.5},{x:22.5,y:14.5}],switches:[{x:4.5,y:16.5,color:{r:0,g:0,b:1}}],gates:[{x:9.5,y:12.5,switch:0}],targets:[{x:12.5,y:1.5,color:{r:1,g:0,b:1}},{x:9.5,y:3.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`...................#....`,`..#..........#....##....`,`.###........##...####...`,`.####......###....###...`,`.###......#####...##....`,`####......####....###...`,`.####........#.....#....`,`.##.............#..##...`,`.............#####..###.`,`.............#####.####.`,`.......####.....#...##..`,`......########..........`,`.....##########.........`,`###..##########....##...`,`####.####.####...####...`,`.###..##..........##....`,`..#.....................`,`........................`]),gatesStayOpen:!0,sources:[{x:2.5,y:5.5,angle:0,color:{r:1,g:0,b:0}},{x:1.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:12.5,y:3.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:22.5,y:8.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:5.5,angle:3*Math.PI/4},{x:1.5,y:2.5,angle:4*Math.PI/4},{x:20.5,y:5.5,angle:4*Math.PI/4},{x:20.5,y:8.5,angle:6*Math.PI/4},{x:17.5,y:8.5,angle:5*Math.PI/4},{x:20.5,y:14.5,angle:6*Math.PI/4}],obsidian:[{x:12.5,y:14.5,angle:7*Math.PI/4},{x:3.5,y:14.5,angle:9*Math.PI/4}],blocks:[{x:.5,y:5.5},{x:15.5,y:8.5}],switches:[{x:17.5,y:2.5,color:{r:1,g:0,b:0}}],gates:[{x:5.5,y:14.5,switch:0}],targets:[{x:3.5,y:2.5,color:{r:1,g:1,b:0}},{x:17.5,y:14.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`...........##......##.#.`,`..........###......#####`,`.#.#.......###.....#####`,`.###.......###.....#####`,`####...##...#.......##..`,`#########..........###..`,`..#..#######...######...`,`.......####....######...`,`......###......#####....`,`##########....######....`,`#####..........######...`,`..###............####...`,`..#.....#........###....`,`....######.......#####..`,`....#######....#...####.`,`....#######..#####..###.`,`....######...#####..###.`,`........#........#...##.`]),gatesStayOpen:!0,sources:[{x:13.5,y:16.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:16.5,y:9.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:21.5,y:5.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:3.5,y:10.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:19.5,y:5.5,angle:5*Math.PI/4},{x:6.5,y:9.5,angle:6*Math.PI/4},{x:6.5,y:14.5,angle:6*Math.PI/4},{x:.5,y:9.5,angle:8*Math.PI/4},{x:3.5,y:5.5,angle:8*Math.PI/4}],obsidian:[{x:13.5,y:3.5,angle:13*Math.PI/4},{x:19.5,y:3.5,angle:5*Math.PI/4},{x:19.5,y:14.5,angle:9*Math.PI/4}],blocks:[{x:18.5,y:9.5},{x:1.5,y:3.5}],switches:[{x:4.5,y:14.5,color:{r:0,g:1,b:0}}],gates:[{x:8.5,y:5.5,switch:0}],targets:[{x:6.5,y:5.5,color:{r:1,g:1,b:0}},{x:.5,y:5.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`...........###..........`,`...........######.......`,`..#........######.......`,`.####.....######...#.##.`,`.####.#...######..######`,`.##...###.######...####.`,`......##..###.......###.`,`.....####.###.........#.`,`......###.....#.........`,`......##.....###.##.....`,`....#........########...`,`...#####.....########...`,`..######......###.##....`,`.#######..#.....#....##.`,`..#####...####......####`,`..##......###........##.`,`..........###........##.`,`..........##............`]),gatesStayOpen:!0,sources:[{x:7.5,y:12.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:10.5,y:3.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}},{x:21.5,y:3.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:10.5,y:17.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:10.5,y:6.5,angle:2*Math.PI/4},{x:10.5,y:15.5,angle:4*Math.PI/4},{x:15.5,y:3.5,angle:5*Math.PI/4},{x:15.5,y:10.5,angle:5*Math.PI/4},{x:4.5,y:10.5,angle:6*Math.PI/4},{x:2.5,y:15.5,angle:7*Math.PI/4},{x:2.5,y:4.5,angle:5*Math.PI/4}],obsidian:[{x:7.5,y:6.5,angle:9*Math.PI/4},{x:22.5,y:6.5,angle:7*Math.PI/4}],blocks:[{x:15.5,y:1.5},{x:15.5,y:12.5}],switches:[{x:13.5,y:3.5,color:{r:0,g:1,b:0}}],gates:[{x:15.5,y:5.5,switch:0}],targets:[{x:22.5,y:15.5,color:{r:1,g:0,b:1}},{x:4.5,y:4.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.##....................#`,`.###...##.........######`,`.###..####..#....#######`,`#####..##..####..######.`,`.##....###..###.....###.`,`.##....##...####........`,`.........#.######.......`,`.#....####...###.###....`,`.###...###...##.####....`,`####..####.....########.`,`.......##......########.`,`.......##.......######..`,`....##...####.....####..`,`..####...###.....######.`,`..####...####....######.`,`.#####....####.......#..`,`....#......##...........`,`........................`]),gatesStayOpen:!0,sources:[{x:14.5,y:4.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:9.5,y:12.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:.5,y:9.5,angle:0,color:{r:1,g:0,b:0}},{x:12.5,y:16.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:2.5,y:9.5,angle:4*Math.PI/4},{x:9.5,y:9.5,angle:5*Math.PI/4},{x:2.5,y:14.5,angle:4*Math.PI/4},{x:12.5,y:14.5,angle:4*Math.PI/4},{x:12.5,y:3.5,angle:5*Math.PI/4},{x:17.5,y:14.5,angle:4*Math.PI/4}],obsidian:[{x:2.5,y:4.5,angle:9*Math.PI/4},{x:20.5,y:9.5,angle:9*Math.PI/4},{x:20.5,y:2.5,angle:13*Math.PI/4}],blocks:[{x:2.5,y:1.5},{x:20.5,y:12.5}],switches:[{x:20.5,y:14.5,color:{r:0,g:1,b:0}}],gates:[{x:9.5,y:6.5,switch:0}],targets:[{x:9.5,y:2.5,color:{r:1,g:1,b:0}},{x:17.5,y:3.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`.......#.............#..`,`......###...........##..`,`.......##..#...##...####`,`.......##.###.####..###.`,`..###.....#########.#.#.`,`..###.....#########.....`,`.#####....#########.....`,`...###....#####...####..`,`.............##....###..`,`...##.............#####.`,`...#####...##.....###...`,`...####....###.....##...`,`..#####....####.........`,`..####.....####......##.`,`...###.....####....####.`,`..###......#####....####`,`...#.......####.....###.`,`............##......###.`]),gatesStayOpen:!0,sources:[{x:20.5,y:3.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:12.5,y:17.5,angle:6*Math.PI/4,color:{r:0,g:1,b:0}},{x:12.5,y:4.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:17.5,y:5.5,angle:4*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:15.5,angle:8*Math.PI/4},{x:12.5,y:7.5,angle:8*Math.PI/4},{x:21.5,y:7.5,angle:4*Math.PI/4},{x:21.5,y:.5,angle:7*Math.PI/4},{x:7.5,y:.5,angle:5*Math.PI/4},{x:4.5,y:5.5,angle:5*Math.PI/4},{x:4.5,y:10.5,angle:4*Math.PI/4}],obsidian:[{x:20.5,y:15.5,angle:9*Math.PI/4},{x:3.5,y:15.5,angle:9*Math.PI/4}],blocks:[{x:2.5,y:5.5},{x:21.5,y:13.5}],switches:[{x:23.5,y:15.5,color:{r:1,g:0,b:0}}],gates:[{x:5.5,y:7.5,switch:0}],targets:[{x:3.5,y:7.5,color:{r:1,g:1,b:0}},{x:7.5,y:10.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`.......#.............#..`,`.....#####....#...#####.`,`......###.....###..#####`,`......###.....####.#####`,`..........##...#......##`,`...##.....###...........`,`..#####...#####...##....`,`.######...#####...####..`,`..#####..######..#####..`,`...#.###.######..#####..`,`.........######...##....`,`.........###......#.....`,`..##..#..###.....##.....`,`..#####...##.....##.....`,`..#####....#.....##.....`,`..######..##.....#......`,`...####...##............`,`...##...................`]),gatesStayOpen:!0,sources:[{x:18.5,y:11.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:10.5,y:8.5,angle:2*Math.PI/4,color:{r:0,g:0,b:1}},{x:3.5,y:13.5,angle:0,color:{r:0,g:1,b:0}},{x:3.5,y:6.5,angle:0,color:{r:0,g:0,b:1}}],mirrors:[{x:10.5,y:13.5,angle:5*Math.PI/4},{x:5.5,y:13.5,angle:4*Math.PI/4},{x:5.5,y:6.5,angle:5*Math.PI/4},{x:18.5,y:1.5,angle:8*Math.PI/4},{x:5.5,y:1.5,angle:5*Math.PI/4}],obsidian:[{x:18.5,y:13.5,angle:9*Math.PI/4},{x:10.5,y:16.5,angle:5*Math.PI/4},{x:18.5,y:6.5,angle:9*Math.PI/4}],blocks:[{x:18.5,y:9.5},{x:21.5,y:1.5}],switches:[{x:10.5,y:5.5,color:{r:0,g:0,b:1}}],gates:[{x:12.5,y:6.5,switch:0}],targets:[{x:5.5,y:16.5,color:{r:1,g:0,b:1}},{x:8.5,y:1.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`...............#........`,`...........######.......`,`..........#######.......`,`....#############...###.`,`....###########..#######`,`.....#####...#....######`,`..#...#...........####..`,`..##..............####..`,`.####..........#.##.....`,`..###....#..#######.....`,`..###...###..######.....`,`.....########.#.....#...`,`.....########.....###...`,`.#.##.#######.....###...`,`#############....####...`,`#####..##.###.....##....`,`.#.........#.......#....`,`........................`]),gatesStayOpen:!0,sources:[{x:12.5,y:11.5,angle:6*Math.PI/4,color:{r:1,g:0,b:0}},{x:18.5,y:9.5,angle:4*Math.PI/4,color:{r:0,g:1,b:0}},{x:12.5,y:1.5,angle:2*Math.PI/4,color:{r:1,g:0,b:0}},{x:9.5,y:11.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:12.5,y:9.5,angle:8*Math.PI/4},{x:9.5,y:9.5,angle:8*Math.PI/4},{x:12.5,y:3.5,angle:8*Math.PI/4},{x:20.5,y:13.5,angle:5*Math.PI/4},{x:3.5,y:9.5,angle:6*Math.PI/4},{x:3.5,y:13.5,angle:2*Math.PI/4}],obsidian:[{x:9.5,y:3.5,angle:11*Math.PI/4},{x:20.5,y:3.5,angle:3*Math.PI/4}],blocks:[{x:9.5,y:14.5},{x:12.5,y:15.5}],switches:[{x:1.5,y:13.5,color:{r:0,g:0,b:1}}],gates:[{x:8.5,y:13.5,switch:0}],targets:[{x:9.5,y:5.5,color:{r:1,g:1,b:0}},{x:6.5,y:13.5,color:{r:1,g:0,b:1}}]}},{terraced:!0,puzzle:{...V([`..#.......#..........#..`,`..##.....###........##..`,`..##.....###.......#####`,`.###......##........####`,`####...#..#...#######.#.`,`####...###....#####.....`,`.......####...#####.....`,`....######...#####......`,`....######...######.....`,`.....###.#.....#####....`,`......#........####..#..`,`..##...........###..####`,`.###....###.........####`,`.#...#######..#.....#...`,`....#######..####.......`,`.....######..####.......`,`......#####...##........`,`..............#.........`]),gatesStayOpen:!0,sources:[{x:20.5,y:2.5,angle:4*Math.PI/4,color:{r:1,g:0,b:0}},{x:10.5,y:.5,angle:2*Math.PI/4,color:{r:0,g:1,b:0}},{x:8.5,y:6.5,angle:0,color:{r:0,g:1,b:0}},{x:16.5,y:15.5,angle:6*Math.PI/4,color:{r:0,g:0,b:1}}],mirrors:[{x:10.5,y:2.5,angle:5*Math.PI/4},{x:10.5,y:6.5,angle:3*Math.PI/4},{x:16.5,y:11.5,angle:5*Math.PI/4},{x:14.5,y:16.5,angle:4*Math.PI/4},{x:22.5,y:11.5,angle:5*Math.PI/4},{x:22.5,y:4.5,angle:6*Math.PI/4}],obsidian:[{x:3.5,y:2.5,angle:11*Math.PI/4},{x:3.5,y:11.5,angle:7*Math.PI/4},{x:10.5,y:16.5,angle:9*Math.PI/4}],blocks:[{x:6.5,y:16.5},{x:8.5,y:16.5}],switches:[{x:22.5,y:2.5,color:{r:1,g:0,b:0}}],gates:[{x:10.5,y:12.5,switch:0}],targets:[{x:16.5,y:6.5,color:{r:1,g:1,b:0}},{x:14.5,y:4.5,color:{r:0,g:1,b:1}}]}},{terraced:!0,puzzle:{...V([`........................`,`..###..............###..`,`.####..##..........####.`,`.#####.######.......##..`,`..#...#######..##...##..`,`......#######..###...#..`,`.......######..###......`,`....##..###....####.....`,`..####..##......###.....`,`######..........##......`,`######..........#..###..`,`#######............####.`,`..##......##.........#..`,`........####............`,`.........#####..###.....`,`.........#####.#####....`,`........#####..#####....`,`........#..#......#.....`]),gatesStayOpen:!0,sources:[{x:16.5,y:6.5,angle:3*Math.PI/4,color:{r:1,g:0,b:0}},{x:3.5,y:9.5,angle:7*Math.PI/4,color:{r:0,g:0,b:1}},{x:9.5,y:3.5,angle:3*Math.PI/4,color:{r:0,g:1,b:0}},{x:7.5,y:2.5,angle:0,color:{r:0,g:0,b:1}}],mirrors:[{x:10.5,y:12.5,angle:5*Math.PI/4},{x:5.5,y:7.5,angle:8*Math.PI/4},{x:7.5,y:5.5,angle:7*Math.PI/4},{x:1.5,y:3.5,angle:9*Math.PI/4},{x:17.5,y:15.5,angle:6*Math.PI/4},{x:21.5,y:11.5,angle:7*Math.PI/4},{x:18.5,y:8.5,angle:7*Math.PI/4}],obsidian:[{x:21.5,y:2.5,angle:3*Math.PI/4}],blocks:[{x:9.5,y:13.5},{x:16.5,y:10.5}],switches:[{x:12.5,y:14.5,color:{r:1,g:0,b:0}}],gates:[{x:19.5,y:2.5,switch:0}],targets:[{x:3.5,y:1.5,color:{r:1,g:0,b:1}},{x:21.5,y:5.5,color:{r:0,g:1,b:1}}]}}],st=[{world:`sky`,name:`Sky`,levels:it},{world:`depths`,name:`Depths`,levels:at},{world:`ember`,name:`Underworld`,levels:ot}],ct=st.flatMap(e=>e.levels).map((e,t)=>lt(e,t));function lt(e,t){return{...e,puzzle:ut(e,t,Ye(dt({...Qe(e.puzzle,Ze[t+1]),voids:[...e.puzzle.voids??[],...e.terraced?[]:ze(t)]},Xe[t+1]),Ge[t+1]))}}function ut(e,t,n){return ft(t)===`ember`&&!e.terraced?Ve(n,e.shapeSeed??t*31+7,(e.carriedSpots??[]).map(e=>qe(e,Ge[t+1]))):n}function dt(e,t){return t?be(e,t):e}function ft(e){let t=0;for(let{world:n,levels:r}of st){if(e<t+r.length)return n;t+=r.length}return st[st.length-1].world}var pt={skyTop:`#3d8bd6`,skyMiddle:`#8cc2ea`,skyHorizon:`#dcecf2`,haze:`#cfe3ee`,sun:`#fff0d4`,skyLight:`#bcdcff`,groundLight:`#7d8f55`,rim:`#fff6e0`,stoneLight:`#dcd3c2`,stone:`#c8bda8`,stoneSide:`#9c8f79`,moss:`#7fae4a`,strata:[`#b88d5f`,`#a37750`,`#c49a6a`,`#8e6545`,`#a57b52`,`#6f4e36`],grassRoot:`#3f7d2c`,grassTip:`#c4dc6a`,grassDry:`#d8cf7a`,leaves:`#5f9e3a`,leavesLight:`#9cc95a`,bark:`#7a5a3e`,petals:[`#fff8e6`,`#ffe066`,`#ffffff`,`#f7c7d9`],flowerCenter:`#ffcf3a`,slate:`#3d4652`,slateLight:`#58636f`,techGlow:`#4ff0e0`,cloudShade:`#c9d9ea`,cloudLight:`#ffffff`,emptyOrb:`#2e3540`,mote:`#fffbe8`,fillStrength:.75,sunStrength:1.05,fogNear:14,fogFar:34},mt=[`sky`,`depths`,`ember`],ht={skyTop:`#0c0916`,skyMiddle:`#1b1430`,skyHorizon:`#46263f`,haze:`#22182f`,sun:`#cfc8ff`,skyLight:`#7a72c0`,groundLight:`#3c2a44`,rim:`#b9bcff`,stoneLight:`#958ea8`,stone:`#7d7591`,stoneSide:`#5a5370`,moss:`#3c6b5c`,strata:[`#534763`,`#43394f`,`#5e516d`,`#3a3146`,`#4f425c`,`#2c2436`],grassRoot:`#1d2a2c`,grassTip:`#62c9ad`,grassDry:`#8a7fd0`,leaves:`#2c4a4a`,leavesLight:`#4fa58e`,bark:`#3a2f36`,petals:[`#9ff5e8`,`#ffe27a`,`#c7a6ff`,`#ffffff`],flowerCenter:`#ffe27a`,slate:`#2a2533`,slateLight:`#3d3648`,techGlow:`#ffc95a`,cloudShade:`#24162c`,cloudLight:`#4a2c4c`,emptyOrb:`#2e3540`,mote:`#ffcf8a`,fillStrength:.95,sunStrength:.85,fogNear:10,fogFar:30},gt={skyTop:`#0d0606`,skyMiddle:`#1e0c0a`,skyHorizon:`#4a1a0e`,haze:`#2a110c`,sun:`#ffd6b0`,skyLight:`#c27a5a`,groundLight:`#ff6a2a`,rim:`#ffb36b`,stoneLight:`#9a8f8c`,stone:`#837876`,stoneSide:`#4e4444`,moss:`#6a5048`,strata:[`#3c3332`,`#2e2727`,`#463b39`,`#251f1f`,`#3a302f`,`#1c1717`],grassRoot:`#2a2220`,grassTip:`#ff9d4a`,grassDry:`#9a7a6a`,leaves:`#3a2a26`,leavesLight:`#a0503a`,bark:`#2a2020`,petals:[`#ffcf6a`,`#ff8a4a`,`#ffe9b0`,`#ffffff`],flowerCenter:`#ffcf6a`,slate:`#2a2222`,slateLight:`#3e3434`,techGlow:`#ff9a4a`,cloudShade:`#2a1210`,cloudLight:`#5a2a1e`,emptyOrb:`#2e3540`,mote:`#ffb060`,fillStrength:.95,sunStrength:.8,fogNear:10,fogFar:32},H={...pt};function _t(e){Object.assign(H,{sky:pt,depths:ht,ember:gt}[e])}var vt=-Math.PI/4;function yt(e,t){let n=Math.floor(t.x),r=Math.floor(t.y);return n<0||r<0||n>=e.columns||r>=e.rows?null:{x:n+.5,y:r+.5}}function bt(e){return[...e.sources,...e.targets,...e.blocks??[],...e.mirrors,...e.polarizers??[],...e.splitters??[],...e.glass??[],...e.tilted??[],...e.prisms??[],...e.seals??[],...e.obsidian??[],...e.switches??[],...e.gates??[]].filter(e=>m(e)===0)}function xt(e,t){return!(e.voids??[]).some(e=>Math.abs(e.x-t.x)<.01&&Math.abs(e.y-t.y)<.01)}function St(e,t){return xt(e,t)&&!bt(e).some(e=>Math.abs(e.x-t.x)<.01&&Math.abs(e.y-t.y)<.01)}function Ct(e,t){return e.inventory?.[t]??0}function wt(e,t,n){if(Ct(e,t)<=0||!St(e,n))return null;let r={x:n.x,y:n.y,angle:vt,placed:!0},i={...e.inventory,[t]:Ct(e,t)-1};return t===`mirror`?{...e,inventory:i,mirrors:[...e.mirrors,r]}:{...e,inventory:i,splitters:[...e.splitters??[],r]}}function Tt(e,t){let n=e=>e.placed===!0&&Math.abs(e.x-t.x)<.01&&Math.abs(e.y-t.y)<.01;return e.mirrors.some(n)?{...e,mirrors:e.mirrors.filter(e=>!n(e)),inventory:{...e.inventory,mirror:Ct(e,`mirror`)+1}}:(e.splitters??[]).some(n)?{...e,splitters:e.splitters.filter(e=>!n(e)),inventory:{...e.inventory,splitter:Ct(e,`splitter`)+1}}:null}var Et={tutorialComplete:!1,levelsSolved:0};function Dt(e,t){return e.tutorialComplete&&t<=e.levelsSolved}function Ot(e){return{...e,tutorialComplete:!0}}function kt(e,t){return{...e,levelsSolved:Math.max(e.levelsSolved,t+1)}}var At=`untitled-light-puzzle/progress`;function jt(e){try{let t=JSON.parse(e?.getItem(At)??`null`);if(typeof t?.tutorialComplete==`boolean`&&Number.isInteger(t?.levelsSolved)&&t.levelsSolved>=0)return{tutorialComplete:t.tutorialComplete,levelsSolved:t.levelsSolved}}catch{}return Et}function Mt(e,t){try{e?.setItem(At,JSON.stringify(t))}catch{}}function Nt(e){return e===`tilted`||e===`prism`||e===`obsidian`}function Pt(e){return e===`obsidian`?Math.PI/4:0}function Ft(e){return Nt(e)?Math.PI/2:Math.PI/4}var It=3*Math.PI/180;function Lt(e,t){let n=Ft(e),r=Pt(e);return Math.round((t-r)/n)*n+r}function Rt(e,t){let n=Lt(e,t);return Nt(e)||Math.abs(t-n)<=It?n:t}function zt(e,t){let n=Ft(e),r=Pt(e);return(Math.floor((t-r)/n+1e-6)+1)*n+r}var Bt=.4*Math.PI/180;function Vt(e,t){return e+t*Bt}var Ht=1e3,Ut=1001,Wt=1002,Gt=1003,Kt=1004,qt=1005,Jt=1006,Yt=1007,Xt=1008,Zt=1009,Qt=1010,$t=1011,en=1012,tn=1013,nn=1014,rn=1015,an=1016,on=1017,sn=1018,cn=1020,ln=35902,un=35899,dn=1021,fn=1022,pn=1023,mn=1026,hn=1027,gn=1028,_n=1029,vn=1030,yn=1031,bn=1033,xn=33776,Sn=33777,Cn=33778,wn=33779,Tn=35840,En=35841,Dn=35842,On=35843,kn=36196,An=37492,jn=37496,Mn=37488,Nn=37489,Pn=37490,Fn=37491,In=37808,Ln=37809,Rn=37810,zn=37811,Bn=37812,Vn=37813,Hn=37814,Un=37815,Wn=37816,Gn=37817,Kn=37818,qn=37819,Jn=37820,Yn=37821,Xn=36492,Zn=36494,Qn=36495,$n=36283,er=36284,tr=36285,nr=36286,rr=2300,ir=2301,ar=2302,or=2303,sr=2400,cr=2401,lr=2402,ur=3200,dr=`srgb`,fr=`srgb-linear`,pr=`linear`,mr=`srgb`,hr=7680,gr=35044,_r=2e3;function vr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function yr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function br(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function xr(){let e=br(`canvas`);return e.style.display=`block`,e}var Sr={};function Cr(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function wr(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function U(...e){e=wr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function W(...e){e=wr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Tr(...e){let t=e.join(` `);t in Sr||(Sr[t]=!0,U(...e))}function Er(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Dr={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Or=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},kr=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Ar=1234567,jr=Math.PI/180,Mr=180/Math.PI;function Nr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(kr[e&255]+kr[e>>8&255]+kr[e>>16&255]+kr[e>>24&255]+`-`+kr[t&255]+kr[t>>8&255]+`-`+kr[t>>16&15|64]+kr[t>>24&255]+`-`+kr[n&63|128]+kr[n>>8&255]+`-`+kr[n>>16&255]+kr[n>>24&255]+kr[r&255]+kr[r>>8&255]+kr[r>>16&255]+kr[r>>24&255]).toLowerCase()}function Pr(e,t,n){return Math.max(t,Math.min(n,e))}function Fr(e,t){return(e%t+t)%t}function Ir(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Lr(e,t,n){return e===t?0:(n-e)/(t-e)}function Rr(e,t,n){return(1-n)*e+n*t}function zr(e,t,n,r){return Rr(e,t,1-Math.exp(-n*r))}function Br(e,t=1){return t-Math.abs(Fr(e,t*2)-t)}function Vr(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Hr(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Ur(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Wr(e,t){return e+Math.random()*(t-e)}function Gr(e){return e*(.5-Math.random())}function Kr(e){e!==void 0&&(Ar=e);let t=Ar+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function qr(e){return e*jr}function Jr(e){return e*Mr}function Yr(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Xr(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Zr(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Qr(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:U(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function $r(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ei(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var ti={DEG2RAD:jr,RAD2DEG:Mr,generateUUID:Nr,clamp:Pr,euclideanModulo:Fr,mapLinear:Ir,inverseLerp:Lr,lerp:Rr,damp:zr,pingpong:Br,smoothstep:Vr,smootherstep:Hr,randInt:Ur,randFloat:Wr,randFloatSpread:Gr,seededRandom:Kr,degToRad:qr,radToDeg:Jr,isPowerOfTwo:Yr,ceilPowerOfTwo:Xr,floorPowerOfTwo:Zr,setQuaternionFromProperEuler:Qr,normalize:ei,denormalize:$r},G=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Pr(this.x,e.x,t.x),this.y=Pr(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Pr(this.x,e,t),this.y=Pr(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Pr(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Pr(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ni=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:U(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pr(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ii.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ii.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Pr(this.x,e.x,t.x),this.y=Pr(this.y,e.y,t.y),this.z=Pr(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Pr(this.x,e,t),this.y=Pr(this.y,e,t),this.z=Pr(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Pr(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ri.copy(this).projectOnVector(e),this.sub(ri)}reflect(e){return this.sub(ri.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Pr(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ri=new K,ii=new ni,q=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Tr(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(ai.makeScale(e,t)),this}rotate(e){return Tr(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(ai.makeRotation(-e)),this}translate(e,t){return Tr(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(ai.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ai=new q,oi=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),si=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ci(){let e={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=ui(e.r),e.g=ui(e.g),e.b=ui(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=di(e.r),e.g=di(e.g),e.b=di(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?pr:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Tr(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Tr(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[fr]:{primaries:t,whitePoint:r,transfer:pr,toXYZ:oi,fromXYZ:si,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:dr},outputColorSpaceConfig:{drawingBufferColorSpace:dr}},[dr]:{primaries:t,whitePoint:r,transfer:mr,toXYZ:oi,fromXYZ:si,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:dr}}}),e}var li=ci();function ui(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function di(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var fi,pi=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{fi===void 0&&(fi=br(`canvas`)),fi.width=e.width,fi.height=e.height;let t=fi.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=fi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=br(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ui(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ui(t[e]/255)*255):t[e]=ui(t[e]);return{data:t,width:e.width,height:e.height}}return U(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},mi=0,hi=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mi++}),this.uuid=Nr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(gi(r[t].image)):e.push(gi(r[t]))}else e=gi(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function gi(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?pi.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(U(`Texture: Unable to serialize Texture.`),{})}var _i=0,vi=new K,yi=class e extends Or{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Ut,i=Ut,a=Jt,o=Xt,s=pn,c=Zt,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_i++}),this.uuid=Nr(),this.name=``,this.source=new hi(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vi).x}get height(){return this.source.getSize(vi).y}get depth(){return this.source.getSize(vi).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){U(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ht:e.x-=Math.floor(e.x);break;case Ut:e.x=e.x<0?0:1;break;case Wt:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Ht:e.y-=Math.floor(e.y);break;case Ut:e.y=e.y<0?0:1;break;case Wt:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};yi.DEFAULT_IMAGE=null,yi.DEFAULT_MAPPING=300,yi.DEFAULT_ANISOTROPY=1;var bi=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Pr(this.x,e.x,t.x),this.y=Pr(this.y,e.y,t.y),this.z=Pr(this.z,e.z,t.z),this.w=Pr(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Pr(this.x,e,t),this.y=Pr(this.y,e,t),this.z=Pr(this.z,e,t),this.w=Pr(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Pr(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},xi=class extends Or{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bi(0,0,e,t),this.scissorTest=!1,this.viewport=new bi(0,0,e,t),this.textures=[];let r=new yi({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new hi(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Si=class extends xi{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ci=class extends yi{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Ut,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},wi=class extends yi{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Ut,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Ti=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ei.setFromMatrixColumn(e,0).length(),i=1/Ei.setFromMatrixColumn(e,1).length(),a=1/Ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Oi,e,ki)}lookAt(e,t,n){let r=this.elements;return Mi.subVectors(e,t),Mi.lengthSq()===0&&(Mi.z=1),Mi.normalize(),Ai.crossVectors(n,Mi),Ai.lengthSq()===0&&(Math.abs(n.z)===1?Mi.x+=1e-4:Mi.z+=1e-4,Mi.normalize(),Ai.crossVectors(n,Mi)),Ai.normalize(),ji.crossVectors(Mi,Ai),r[0]=Ai.x,r[4]=ji.x,r[8]=Mi.x,r[1]=Ai.y,r[5]=ji.y,r[9]=Mi.y,r[2]=Ai.z,r[6]=ji.z,r[10]=Mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],ne=r[7],re=r[11],ie=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*ne,i[8]=a*C+o*D+s*ee+c*re,i[12]=a*w+o*O+s*te+c*ie,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*ne,i[9]=l*C+u*D+d*ee+f*re,i[13]=l*w+u*O+d*te+f*ie,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*ne,i[10]=p*C+m*D+h*ee+g*re,i[14]=p*w+m*O+h*te+g*ie,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*ne,i[11]=_*C+v*D+y*ee+b*re,i[15]=_*w+v*O+y*te+b*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Ei.set(r[0],r[1],r[2]).length(),o=Ei.set(r[4],r[5],r[6]).length(),s=Ei.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Di.copy(this);let c=1/a,l=1/o,u=1/s;return Di.elements[0]*=c,Di.elements[1]*=c,Di.elements[2]*=c,Di.elements[4]*=l,Di.elements[5]*=l,Di.elements[6]*=l,Di.elements[8]*=u,Di.elements[9]*=u,Di.elements[10]*=u,t.setFromRotationMatrix(Di),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=_r,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=_r,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ei=new K,Di=new Ti,Oi=new K(0,0,0),ki=new K(1,1,1),Ai=new K,ji=new K,Mi=new K,Ni=new Ti,Pi=new ni,Fi=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Pr(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Pr(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Pr(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Pr(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Pr(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Pr(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:U(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ni.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ni,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pi.setFromEuler(this),this.setFromQuaternion(Pi,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fi.DEFAULT_ORDER=`XYZ`;var Ii=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Li=0,Ri=new K,zi=new ni,Bi=new Ti,Vi=new K,Hi=new K,Ui=new K,Wi=new ni,Gi=new K(1,0,0),Ki=new K(0,1,0),qi=new K(0,0,1),Ji={type:`added`},Yi={type:`removed`},Xi={type:`childadded`,child:null},Zi={type:`childremoved`,child:null},Qi=class e extends Or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Li++}),this.uuid=Nr(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new Fi,r=new ni,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ti},normalMatrix:{value:new q}}),this.matrix=new Ti,this.matrixWorld=new Ti,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ii,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.multiply(zi),this}rotateOnWorldAxis(e,t){return zi.setFromAxisAngle(e,t),this.quaternion.premultiply(zi),this}rotateX(e){return this.rotateOnAxis(Gi,e)}rotateY(e){return this.rotateOnAxis(Ki,e)}rotateZ(e){return this.rotateOnAxis(qi,e)}translateOnAxis(e,t){return Ri.copy(e).applyQuaternion(this.quaternion),this.position.add(Ri.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gi,e)}translateY(e){return this.translateOnAxis(Ki,e)}translateZ(e){return this.translateOnAxis(qi,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Vi.copy(e):Vi.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(Hi,Vi,this.up):Bi.lookAt(Vi,Hi,this.up),this.quaternion.setFromRotationMatrix(Bi),r&&(Bi.extractRotation(r.matrixWorld),zi.setFromRotationMatrix(Bi),this.quaternion.premultiply(zi.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(W(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ji),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null):W(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yi),Zi.child=e,this.dispatchEvent(Zi),Zi.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ji),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,Ui),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,Wi,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Qi.DEFAULT_UP=new K(0,1,0),Qi.DEFAULT_MATRIX_AUTO_UPDATE=!0,Qi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var J=class extends Qi{constructor(){super(),this.isGroup=!0,this.type=`Group`}},$i={type:`move`},ea=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new J,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new J,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new J,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($i)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new J;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ta={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},na={h:0,s:0,l:0},ra={h:0,s:0,l:0};function ia(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dr){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,li.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=li.workingColorSpace){return this.r=e,this.g=t,this.b=n,li.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=li.workingColorSpace){if(e=Fr(e,1),t=Pr(t,0,1),n=Pr(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=ia(i,r,e+1/3),this.g=ia(i,r,e),this.b=ia(i,r,e-1/3)}return li.colorSpaceToWorking(this,r),this}setStyle(e,t=dr){function n(t){t!==void 0&&parseFloat(t)<1&&U(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:U(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);U(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dr){let n=ta[e.toLowerCase()];return n===void 0?U(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dr){return li.workingToColorSpace(aa.copy(this),e),Math.round(Pr(aa.r*255,0,255))*65536+Math.round(Pr(aa.g*255,0,255))*256+Math.round(Pr(aa.b*255,0,255))}getHexString(e=dr){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=li.workingColorSpace){li.workingToColorSpace(aa.copy(this),t);let n=aa.r,r=aa.g,i=aa.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=li.workingColorSpace){return li.workingToColorSpace(aa.copy(this),t),e.r=aa.r,e.g=aa.g,e.b=aa.b,e}getStyle(e=dr){li.workingToColorSpace(aa.copy(this),e);let t=aa.r,n=aa.g,r=aa.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(na),this.setHSL(na.h+e,na.s+t,na.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(na),e.getHSL(ra);let n=Rr(na.h,ra.h,t),r=Rr(na.s,ra.s,t),i=Rr(na.l,ra.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},aa=new Y;Y.NAMES=ta;var oa=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new Y(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},sa=class extends Qi{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fi,this.environmentIntensity=1,this.environmentRotation=new Fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ca=new K,la=new K,ua=new K,da=new K,fa=new K,pa=new K,ma=new K,ha=new K,ga=new K,_a=new K,va=new bi,ya=new bi,ba=new bi,xa=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ca.subVectors(e,t),r.cross(ca);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){ca.subVectors(r,t),la.subVectors(n,t),ua.subVectors(e,t);let a=ca.dot(ca),o=ca.dot(la),s=ca.dot(ua),c=la.dot(la),l=la.dot(ua),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,da)!==null&&da.x>=0&&da.y>=0&&da.x+da.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,da)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,da.x),s.addScaledVector(a,da.y),s.addScaledVector(o,da.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return va.setScalar(0),ya.setScalar(0),ba.setScalar(0),va.fromBufferAttribute(e,t),ya.fromBufferAttribute(e,n),ba.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(va,i.x),a.addScaledVector(ya,i.y),a.addScaledVector(ba,i.z),a}static isFrontFacing(e,t,n,r){return ca.subVectors(n,t),la.subVectors(e,t),ca.cross(la).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ca.subVectors(this.c,this.b),la.subVectors(this.a,this.b),ca.cross(la).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;fa.subVectors(r,n),pa.subVectors(i,n),ha.subVectors(e,n);let s=fa.dot(ha),c=pa.dot(ha);if(s<=0&&c<=0)return t.copy(n);ga.subVectors(e,r);let l=fa.dot(ga),u=pa.dot(ga);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(fa,a);_a.subVectors(e,i);let f=fa.dot(_a),p=pa.dot(_a);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(pa,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return ma.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(ma,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(fa,a).addScaledVector(pa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Sa=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wa.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wa.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=wa.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,wa):wa.fromBufferAttribute(r,t),wa.applyMatrix4(e.matrixWorld),this.expandByPoint(wa);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Ta.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ta.copy(e.boundingBox)),Ta.applyMatrix4(e.matrixWorld),this.union(Ta)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wa),wa.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ma),Na.subVectors(this.max,Ma),Ea.subVectors(e.a,Ma),Da.subVectors(e.b,Ma),Oa.subVectors(e.c,Ma),ka.subVectors(Da,Ea),Aa.subVectors(Oa,Da),ja.subVectors(Ea,Oa);let t=[0,-ka.z,ka.y,0,-Aa.z,Aa.y,0,-ja.z,ja.y,ka.z,0,-ka.x,Aa.z,0,-Aa.x,ja.z,0,-ja.x,-ka.y,ka.x,0,-Aa.y,Aa.x,0,-ja.y,ja.x,0];return!Ia(t,Ea,Da,Oa,Na)||(t=[1,0,0,0,1,0,0,0,1],!Ia(t,Ea,Da,Oa,Na))?!1:(Pa.crossVectors(ka,Aa),t=[Pa.x,Pa.y,Pa.z],Ia(t,Ea,Da,Oa,Na))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wa).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wa).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ca[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ca[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ca[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ca[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ca[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ca[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ca[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ca[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ca),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ca=[new K,new K,new K,new K,new K,new K,new K,new K],wa=new K,Ta=new Sa,Ea=new K,Da=new K,Oa=new K,ka=new K,Aa=new K,ja=new K,Ma=new K,Na=new K,Pa=new K,Fa=new K;function Ia(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Fa.fromArray(e,a);let o=i.x*Math.abs(Fa.x)+i.y*Math.abs(Fa.y)+i.z*Math.abs(Fa.z),s=t.dot(Fa),c=n.dot(Fa),l=r.dot(Fa);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var La=new K,Ra=new G,za=0,Ba=class extends Or{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:za++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=gr,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ra.fromBufferAttribute(this,t),Ra.applyMatrix3(e),this.setXY(t,Ra.x,Ra.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)La.fromBufferAttribute(this,t),La.applyMatrix3(e),this.setXYZ(t,La.x,La.y,La.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)La.fromBufferAttribute(this,t),La.applyMatrix4(e),this.setXYZ(t,La.x,La.y,La.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)La.fromBufferAttribute(this,t),La.applyNormalMatrix(e),this.setXYZ(t,La.x,La.y,La.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)La.fromBufferAttribute(this,t),La.transformDirection(e),this.setXYZ(t,La.x,La.y,La.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$r(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ei(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$r(t,this.array)),t}setX(e,t){return this.normalized&&(t=ei(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$r(t,this.array)),t}setY(e,t){return this.normalized&&(t=ei(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$r(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ei(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$r(t,this.array)),t}setW(e,t){return this.normalized&&(t=ei(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ei(t,this.array),n=ei(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ei(t,this.array),n=ei(n,this.array),r=ei(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ei(t,this.array),n=ei(n,this.array),r=ei(r,this.array),i=ei(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Va=class extends Ba{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Ha=class extends Ba{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Ua=class extends Ba{constructor(e,t,n){super(new Float32Array(e),t,n)}},Wa=new Sa,Ga=new K,Ka=new K,qa=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Wa.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ga.subVectors(e,this.center);let t=Ga.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ga,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ka.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ga.copy(e.center).add(Ka)),this.expandByPoint(Ga.copy(e.center).sub(Ka))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ja=0,Ya=new Ti,Xa=new Qi,Za=new K,Qa=new Sa,$a=new Sa,eo=new K,to=class e extends Or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ja++}),this.uuid=Nr(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(vr(e)?Ha:Va)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ya.makeRotationFromQuaternion(e),this.applyMatrix4(Ya),this}rotateX(e){return Ya.makeRotationX(e),this.applyMatrix4(Ya),this}rotateY(e){return Ya.makeRotationY(e),this.applyMatrix4(Ya),this}rotateZ(e){return Ya.makeRotationZ(e),this.applyMatrix4(Ya),this}translate(e,t,n){return Ya.makeTranslation(e,t,n),this.applyMatrix4(Ya),this}scale(e,t,n){return Ya.makeScale(e,t,n),this.applyMatrix4(Ya),this}lookAt(e){return Xa.lookAt(e),Xa.updateMatrix(),this.applyMatrix4(Xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Za).negate(),this.translate(Za.x,Za.y,Za.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Ua(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&U(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Qa.setFromBufferAttribute(n),this.morphTargetsRelative?(eo.addVectors(this.boundingBox.min,Qa.min),this.boundingBox.expandByPoint(eo),eo.addVectors(this.boundingBox.max,Qa.max),this.boundingBox.expandByPoint(eo)):(this.boundingBox.expandByPoint(Qa.min),this.boundingBox.expandByPoint(Qa.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&W(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);return}if(e){let n=this.boundingSphere.center;if(Qa.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];$a.setFromBufferAttribute(n),this.morphTargetsRelative?(eo.addVectors(Qa.min,$a.min),Qa.expandByPoint(eo),eo.addVectors(Qa.max,$a.max),Qa.expandByPoint(eo)):(Qa.expandByPoint($a.min),Qa.expandByPoint($a.max))}Qa.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)eo.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(eo));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)eo.fromBufferAttribute(a,t),o&&(Za.fromBufferAttribute(e,t),eo.add(Za)),r=Math.max(r,n.distanceToSquared(eo))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&W(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){W(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Ba(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let c=new K,l=new K,u=new K,d=new G,f=new G,p=new G,m=new K,h=new K;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new K,y=new K,b=new K,x=new K;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Ba(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)eo.fromBufferAttribute(e,t),eo.normalize(),e.setXYZ(t,eo.x,eo.y,eo.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Ba(a,r,i)}if(this.index===null)return U(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},no=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=gr,this.updateRanges=[],this.version=0,this.uuid=Nr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Nr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},ro=new K,io=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ro.fromBufferAttribute(this,t),ro.applyMatrix4(e),this.setXYZ(t,ro.x,ro.y,ro.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ro.fromBufferAttribute(this,t),ro.applyNormalMatrix(e),this.setXYZ(t,ro.x,ro.y,ro.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ro.fromBufferAttribute(this,t),ro.transformDirection(e),this.setXYZ(t,ro.x,ro.y,ro.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=$r(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ei(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ei(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ei(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ei(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ei(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=$r(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=$r(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=$r(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=$r(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ei(t,this.array),n=ei(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ei(t,this.array),n=ei(n,this.array),r=ei(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ei(t,this.array),n=ei(n,this.array),r=ei(r,this.array),i=ei(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Cr(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Ba(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Cr(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ao=new K,oo=new K,so=new q,co=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ao.subVectors(n,t).cross(oo.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ao),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||so.getNormalMatrix(e),r=this.coplanarPoint(ao).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},lo=0,uo=class extends Or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lo++}),this.uuid=Nr(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hr,this.stencilZFail=hr,this.stencilZPass=hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){U(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new co().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},fo=class extends uo{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},po,mo=new K,ho=new K,go=new K,_o=new G,vo=new G,yo=new Ti,bo=new K,xo=new K,So=new K,Co=new G,wo=new G,To=new G,Eo=class extends Qi{constructor(e=new fo){if(super(),this.isSprite=!0,this.type=`Sprite`,po===void 0){po=new to;let e=new no(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);po.setIndex([0,1,2,0,2,3]),po.setAttribute(`position`,new io(e,3,0,!1)),po.setAttribute(`uv`,new io(e,2,3,!1))}this.geometry=po,this.material=e,this.center=new G(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&W(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),ho.setFromMatrixScale(this.matrixWorld),yo.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),go.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ho.multiplyScalar(-go.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Do(bo.set(-.5,-.5,0),go,a,ho,r,i),Do(xo.set(.5,-.5,0),go,a,ho,r,i),Do(So.set(.5,.5,0),go,a,ho,r,i),Co.set(0,0),wo.set(1,0),To.set(1,1);let o=e.ray.intersectTriangle(bo,xo,So,!1,mo);if(o===null&&(Do(xo.set(-.5,.5,0),go,a,ho,r,i),wo.set(0,1),o=e.ray.intersectTriangle(bo,So,xo,!1,mo),o===null))return;let s=e.ray.origin.distanceTo(mo);s<e.near||s>e.far||t.push({distance:s,point:mo.clone(),uv:xa.getInterpolation(mo,bo,xo,So,Co,wo,To,new G),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Do(e,t,n,r,i,a){_o.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?vo.copy(_o):(vo.x=a*_o.x-i*_o.y,vo.y=i*_o.x+a*_o.y),e.copy(t),e.x+=vo.x,e.y+=vo.y,e.applyMatrix4(yo)}var Oo=new K,ko=new K,Ao=new K,jo=new K,Mo=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oo)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Oo.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oo.copy(this.origin).addScaledVector(this.direction,t),Oo.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ko.copy(e).add(t).multiplyScalar(.5),Ao.copy(t).sub(e).normalize(),jo.copy(this.origin).sub(ko);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ao),o=jo.dot(this.direction),s=-jo.dot(Ao),c=jo.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ko).addScaledVector(Ao,d),f}intersectSphere(e,t){if(e.radius<0)return null;Oo.subVectors(e.center,this.origin);let n=Oo.dot(this.direction),r=Oo.dot(Oo)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Oo)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,ee,te,j;if(y>=b&&y>=x?(w=s,D=u,A=p,j=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,ee=_,te=v):(S=l,C=c,T=f,E=d,O=h,k=m,ee=v,te=_)):b>=x?(w=c,D=d,A=m,j=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,ee=v,te=g):(S=s,C=l,T=u,E=f,O=p,k=h,ee=g,te=v)):(w=l,D=f,A=h,j=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,ee=g,te=_):(S=c,C=s,T=d,E=u,O=m,k=p,ee=_,te=g)),w===0)return null;let ne=S/w,re=C/w,ie=1/w,ae=T-ne*D,oe=E-re*D,se=O-ne*A,ce=k-re*A,le=ee-ne*j,ue=te-re*j,de=le*ce-ue*se,fe=ae*ue-oe*le,pe=se*oe-ce*ae;if(r){if(de<0||fe<0||pe<0)return null}else if((de<0||fe<0||pe<0)&&(de>0||fe>0||pe>0))return null;let me=de+fe+pe;if(me===0)return null;let he=ie*(de*D+fe*A+pe*j);return(me>0?he<0:he>0)?null:this.at(he/me,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},No=class extends uo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Po=new Ti,Fo=new Mo,Io=new qa,Lo=new K,Ro=new K,zo=new K,Bo=new K,Vo=new K,Ho=new K,Uo=new K,Wo=new K,X=class extends Qi{constructor(e=new to,t=new No){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ho.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Vo.fromBufferAttribute(s,e),a?Ho.addScaledVector(Vo,r):Ho.addScaledVector(Vo.sub(t),r))}t.add(Ho)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(i),Fo.copy(e.ray).recast(e.near),!(Io.containsPoint(Fo.origin)===!1&&(Fo.intersectSphere(Io,Lo)===null||Fo.origin.distanceToSquared(Lo)>(e.far-e.near)**2))&&(Po.copy(i).invert(),Fo.copy(e.ray).applyMatrix4(Po),(n.boundingBox===null||Fo.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Fo)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ko(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ko(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ko(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ko(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Go(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Wo.copy(s),Wo.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Wo);return l<n.near||l>n.far?null:{distance:l,point:Wo.clone(),object:e}}function Ko(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ro),e.getVertexPosition(c,zo),e.getVertexPosition(l,Bo);let u=Go(e,t,n,r,Ro,zo,Bo,Uo);if(u){let e=new K;xa.getBarycoord(Uo,Ro,zo,Bo,e),i&&(u.uv=xa.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=xa.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=xa.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};xa.getNormal(Ro,zo,Bo,t.normal),u.face=t,u.barycoord=e}return u}var qo=class extends yi{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Gt,l=Gt,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Jo=class extends Ba{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Yo=new Ti,Xo=new Ti,Zo=[],Qo=new Sa,$o=new Ti,es=new X,ts=new qa,ns=class extends X{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,$o)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Sa),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),Qo.copy(e.boundingBox).applyMatrix4(Yo),this.boundingBox.union(Qo)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qa),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),ts.copy(e.boundingSphere).applyMatrix4(Yo),this.boundingSphere.union(ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(es.geometry=this.geometry,es.material=this.material,es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ts.copy(this.boundingSphere),ts.applyMatrix4(n),e.ray.intersectsSphere(ts)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Yo),Xo.multiplyMatrices(n,Yo),es.matrixWorld=Xo,es.raycast(e,Zo);for(let e=0,n=Zo.length;e<n;e++){let n=Zo[e];n.instanceId=i,n.object=this,t.push(n)}Zo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Jo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new qo(new Float32Array(r*this.count),r,this.count,gn,rn));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},rs=new qa,is=new G(.5,.5),as=new K,os=class{constructor(e=new co,t=new co,n=new co,r=new co,i=new co,a=new co){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_r,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){return rs.center.set(0,0,0),rs.radius=.7071067811865476+is.distanceTo(e.center),rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(as.x=r.normal.x>0?e.max.x:e.min.x,as.y=r.normal.y>0?e.max.y:e.min.y,as.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(as)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ss=class extends uo{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},cs=new Ti,ls=new Mo,us=new qa,ds=new K,fs=class extends Qi{constructor(e=new to,t=new ss){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),us.copy(n.boundingSphere),us.applyMatrix4(r),us.radius+=i,e.ray.intersectsSphere(us)===!1)return;cs.copy(r).invert(),ls.copy(e.ray).applyMatrix4(cs);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ds.fromBufferAttribute(l,n),ps(ds,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ds.fromBufferAttribute(l,a),ps(ds,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ps(e,t,n,r,i,a,o){let s=ls.distanceSqToPoint(e);if(s<n){let n=new K;ls.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ms=class extends yi{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},hs=class extends yi{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},gs=class extends yi{constructor(e,t,n=nn,r,i,a,o=Gt,s=Gt,c,l=mn,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new hi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},_s=class extends gs{constructor(e,t=nn,n=301,r,i,a=Gt,o=Gt,s,c=mn){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},vs=class extends yi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ys=class e extends to{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Ua(c,3)),this.setAttribute(`normal`,new Ua(l,3)),this.setAttribute(`uv`,new Ua(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},bs=class e extends to{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new K,l=new G;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Ua(a,3)),this.setAttribute(`normal`,new Ua(o,3)),this.setAttribute(`uv`,new Ua(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},xs=class e extends to{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Ua(u,3)),this.setAttribute(`normal`,new Ua(d,3)),this.setAttribute(`uv`,new Ua(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ss=class e extends xs{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Cs=class e extends to{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Ua(i,3)),this.setAttribute(`normal`,new Ua(i.slice(),3)),this.setAttribute(`uv`,new Ua(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new K,r=new K,i=new K;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new K;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new K;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new K,t=new K,n=new K,r=new K,o=new G,s=new G,c=new G;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ws=class e extends Cs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ts=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){U(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new G:new K);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new K,r=[],i=[],a=[],o=new K,s=new Ti;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new K)}i[0]=new K,a[0]=new K;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(Pr(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(Pr(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Es=class extends Ts{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new G){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ds=class extends Es{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Os(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ks=new K,As=new K,js=new Os,Ms=new Os,Ns=new Os,Ps=class extends Ts{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new K){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(As.subVectors(r[0],r[1]).add(r[0]),c=As);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ks.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ks),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),js.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Ms.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ns.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(js.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Ms.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ns.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(js.calc(s),Ms.calc(s),Ns.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Fs(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Is(e,t){let n=1-e;return n*n*t}function Ls(e,t){return 2*(1-e)*e*t}function Rs(e,t){return e*e*t}function zs(e,t,n,r){return Is(e,t)+Ls(e,n)+Rs(e,r)}function Bs(e,t){let n=1-e;return n*n*n*t}function Vs(e,t){let n=1-e;return 3*n*n*e*t}function Hs(e,t){return 3*(1-e)*e*e*t}function Us(e,t){return e*e*e*t}function Ws(e,t,n,r,i){return Bs(e,t)+Vs(e,n)+Hs(e,r)+Us(e,i)}var Gs=class extends Ts{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ws(e,r.x,i.x,a.x,o.x),Ws(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ks=class extends Ts{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ws(e,r.x,i.x,a.x,o.x),Ws(e,r.y,i.y,a.y,o.y),Ws(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qs=class extends Ts{constructor(e=new G,t=new G){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Js=class extends Ts{constructor(e=new K,t=new K){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ys=class extends Ts{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(zs(e,r.x,i.x,a.x),zs(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xs=class extends Ts{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(zs(e,r.x,i.x,a.x),zs(e,r.y,i.y,a.y),zs(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zs=class extends Ts{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new G){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Fs(o,s.x,c.x,l.x,u.x),Fs(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this}},Qs=Object.freeze({__proto__:null,ArcCurve:Ds,CatmullRomCurve3:Ps,CubicBezierCurve:Gs,CubicBezierCurve3:Ks,EllipseCurve:Es,LineCurve:qs,LineCurve3:Js,QuadraticBezierCurve:Ys,QuadraticBezierCurve3:Xs,SplineCurve:Zs}),$s=class extends Ts{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Qs[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Qs[n.type]().fromJSON(n))}return this}},ec=class extends $s{constructor(e){super(),this.type=`Path`,this.currentPoint=new G,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new qs(this.currentPoint.clone(),new G(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Ys(this.currentPoint.clone(),new G(e,t),new G(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Gs(this.currentPoint.clone(),new G(e,t),new G(n,r),new G(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Zs([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Es(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},tc=class extends ec{constructor(e){super(e),this.uuid=Nr(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ec().fromJSON(n))}return this}};function nc(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=rc(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=uc(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return ac(a,o,n,s,c,l,0),o}function rc(e,t,n,r,i){let a;if(i===Pc(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=jc(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=jc(i/r|0,e[i],e[i+1],a);return a&&Cc(a,a.next)&&(Mc(a),a=a.next),a}function ic(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Cc(n,n.next)||Sc(n.prev,n,n.next)===0)){if(Mc(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function ac(e,t,n,r,i,a,o){if(!e)return;!o&&a&&hc(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?sc(e,r,i,a):oc(e)){t.push(c.i,e.i,l.i),Mc(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=cc(ic(e),t),ac(e,t,n,r,i,a,2)):o===2&&lc(e,t,n,r,i,a):ac(ic(e),t,n,r,i,a,1);break}}}function oc(e){let t=e.prev,n=e,r=e.next;if(Sc(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&bc(i,s,a,c,o,l,m.x,m.y)&&Sc(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function sc(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Sc(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=_c(p,m,t,n,r),v=_c(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&bc(s,u,c,d,l,f,y.x,y.y)&&Sc(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&bc(s,u,c,d,l,f,b.x,b.y)&&Sc(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&bc(s,u,c,d,l,f,y.x,y.y)&&Sc(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&bc(s,u,c,d,l,f,b.x,b.y)&&Sc(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function cc(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Cc(r,i)&&wc(r,n,n.next,i)&&Oc(r,i)&&Oc(i,r)&&(t.push(r.i,n.i,i.i),Mc(n),Mc(n.next),n=e=i),n=n.next}while(n!==e);return ic(n)}function lc(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&xc(o,e)){let s=Ac(o,e);o=ic(o,o.next),s=ic(s,s.next),ac(o,t,n,r,i,a,0),ac(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function uc(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=rc(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(vc(o))}i.sort(dc);for(let e=0;e<i.length;e++)n=fc(i[e],n);return n}function dc(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function fc(e,t){let n=pc(e,t);if(!n)return t;let r=Ac(n,e);return ic(r,r.next),ic(n,n.next)}function pc(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Cc(e,n))return n;do{if(Cc(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&yc(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Oc(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&mc(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function mc(e,t){return Sc(e.prev,e,t.prev)<0&&Sc(t.next,e,e.next)<0}function hc(e,t,n,r){let i=e;do i.z===0&&(i.z=_c(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,gc(i)}function gc(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function _c(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function vc(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function yc(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function bc(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&yc(e,t,n,r,i,a,o,s)}function xc(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Dc(e,t)&&(Oc(e,t)&&Oc(t,e)&&kc(e,t)&&(Sc(e.prev,e,t.prev)||Sc(e,t.prev,t))||Cc(e,t)&&Sc(e.prev,e,e.next)>0&&Sc(t.prev,t,t.next)>0)}function Sc(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Cc(e,t){return e.x===t.x&&e.y===t.y}function wc(e,t,n,r){let i=Ec(Sc(e,t,n)),a=Ec(Sc(e,t,r)),o=Ec(Sc(n,r,e)),s=Ec(Sc(n,r,t));return!!(i!==a&&o!==s||i===0&&Tc(e,n,t)||a===0&&Tc(e,r,t)||o===0&&Tc(n,e,r)||s===0&&Tc(n,t,r))}function Tc(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ec(e){return e>0?1:e<0?-1:0}function Dc(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&wc(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Oc(e,t){return Sc(e.prev,e,e.next)<0?Sc(e,t,e.next)>=0&&Sc(e,e.prev,t)>=0:Sc(e,t,e.prev)<0||Sc(e,e.next,t)<0}function kc(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Ac(e,t){let n=Nc(e.i,e.x,e.y),r=Nc(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function jc(e,t,n,r){let i=Nc(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Mc(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Nc(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Pc(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Fc=class{static triangulate(e,t,n=2){return nc(e,t,n)}},Ic=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Lc(e),Rc(n,e);let a=e.length;t.forEach(Lc);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Rc(n,t[e]);let o=Fc.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Lc(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Rc(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var zc=class e extends to{constructor(e=new tc([new G(.5,.5),new G(-.5,.5),new G(-.5,-.5),new G(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Ua(r,3)),this.setAttribute(`uv`,new Ua(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Bc:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new K,b=new K,x=new K}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Ic.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Ic.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||W(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new G(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new G(r/a,i/a)}let ee=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),ee[e]=A(D[e],D[n],D[r]);let te=[],j,ne=ee.concat();for(let e=0,t=E;e<t;e++){let t=w[e];j=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),j[e]=A(t[e],t[r],t[i]);te.push(j),ne=ne.concat(j)}let re;if(p===0)re=Ic.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],ee[t],a);le(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];j=te[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],j[e],a);le(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}re=Ic.triangulateShape(e,t)}let ie=re.length,ae=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],ne[e],ae):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),le(x.x,x.y,x.z)):le(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],ne[t],ae):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),le(x.x,x.y,x.z)):le(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],ee[e],r);le(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];j=te[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],j[e],r);_?le(i.x,i.y+g[s-1].y,g[s-1].x+n):le(i.x,i.y,c+n)}}}oe(),se();function oe(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<ie;e++){let n=re[e];ue(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<ie;e++){let n=re[e];ue(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<ie;e++){let t=re[e];ue(t[2],t[1],t[0])}for(let e=0;e<ie;e++){let t=re[e];ue(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function se(){let e=r.length/3,t=0;ce(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ce(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ce(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);de(t+r+n,t+i+n,t+i+a,t+r+a)}}}function le(e,t,n){a.push(e),a.push(t),a.push(n)}function ue(e,t,i){fe(e),fe(t),fe(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);pe(o[0]),pe(o[1]),pe(o[2])}function de(e,t,i,a){fe(e),fe(t),fe(a),fe(t),fe(i),fe(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);pe(s[0]),pe(s[1]),pe(s[3]),pe(s[1]),pe(s[2]),pe(s[3])}function fe(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function pe(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Vc(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Qs[i.type]().fromJSON(i)),new e(r,t.options)}},Bc={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new G(a,o),new G(s,c),new G(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new G(o,1-c),new G(l,1-d),new G(f,1-m),new G(h,1-_)]:[new G(s,1-c),new G(u,1-d),new G(p,1-m),new G(g,1-_)]}};function Vc(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Hc=class e extends Cs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Uc=class e extends Cs{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Wc=class e extends to{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Ua(p,3)),this.setAttribute(`normal`,new Ua(m,3)),this.setAttribute(`uv`,new Ua(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Gc=class e extends to{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new K,p=new G;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Ua(s,3)),this.setAttribute(`normal`,new Ua(c,3)),this.setAttribute(`uv`,new Ua(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Kc=class e extends to{constructor(e=new tc([new G(0,.5),new G(-.5,-.5),new G(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new Ua(r,3)),this.setAttribute(`normal`,new Ua(i,3)),this.setAttribute(`uv`,new Ua(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Ic.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Ic.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Ic.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return qc(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function qc(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Jc=class e extends to{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Ua(p,3)),this.setAttribute(`normal`,new Ua(m,3)),this.setAttribute(`uv`,new Ua(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Yc=class e extends to{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new K,f=new K,p=new K;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Ua(c,3)),this.setAttribute(`normal`,new Ua(l,3)),this.setAttribute(`uv`,new Ua(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Xc(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Qc(i))i.isRenderTargetTexture?(U(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Qc(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Zc(e){let t={};for(let n=0;n<e.length;n++){let r=Xc(e[n]);for(let e in r)t[e]=r[e]}return t}function Qc(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function $c(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function el(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:li.workingColorSpace}var tl={clone:Xc,merge:Zc},nl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,il=class extends uo{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nl,this.fragmentShader=rl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xc(e.uniforms),this.uniformsGroups=$c(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new bi().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Ti().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},al=class extends il{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ol=class extends uo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},sl=class extends uo{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:``},this.type=`MeshToonMaterial`,this.color=new Y(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},cl=class extends uo{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ll=class extends uo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=ur,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ul=class extends uo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function dl(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function fl(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var pl=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ml=class extends pl{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sr,endingEnd:sr}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case cr:i=e,o=2*t-n;break;case lr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case cr:a=e,s=2*n-t;break;case lr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},hl=class extends pl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},gl=class extends pl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},_l=class extends pl{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=bl(n,t,g,y,r);i[p]=vl(x,o,_,b,m)}return i}};function vl(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function yl(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function bl(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=vl(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=yl(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var xl=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=dl(t,this.TimeBufferType),this.values=dl(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:dl(e.times,Array),values:dl(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),fl(e.settings)&&(n.settings={inTangents:dl(e.settings.inTangents,Array),outTangents:dl(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new gl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new hl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ml(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new _l(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case rr:t=this.InterpolantFactoryMethodDiscrete;break;case ir:t=this.InterpolantFactoryMethodLinear;break;case ar:t=this.InterpolantFactoryMethodSmooth;break;case or:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return U(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return rr;case this.InterpolantFactoryMethodLinear:return ir;case this.InterpolantFactoryMethodSmooth:return ar;case this.InterpolantFactoryMethodBezier:return or}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;fl(this.settings)&&(Sl(this.settings.inTangents,e),Sl(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(W(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(W(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){W(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){W(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&yr(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){W(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===ar,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,fl(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Sl(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}xl.prototype.ValueTypeName=``,xl.prototype.TimeBufferType=Float32Array,xl.prototype.ValueBufferType=Float32Array,xl.prototype.DefaultInterpolation=ir;var Cl=class extends xl{constructor(e,t,n){super(e,t,n)}};Cl.prototype.ValueTypeName=`bool`,Cl.prototype.ValueBufferType=Array,Cl.prototype.DefaultInterpolation=rr,Cl.prototype.InterpolantFactoryMethodLinear=void 0,Cl.prototype.InterpolantFactoryMethodSmooth=void 0;var wl=class extends xl{constructor(e,t,n,r){super(e,t,n,r)}};wl.prototype.ValueTypeName=`color`;var Tl=class extends xl{constructor(e,t,n,r){super(e,t,n,r)}};Tl.prototype.ValueTypeName=`number`;var El=class extends pl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ni.slerpFlat(i,0,a,c-o,a,c,s);return i}},Dl=class extends xl{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new El(this.times,this.values,this.getValueSize(),e)}};Dl.prototype.ValueTypeName=`quaternion`,Dl.prototype.InterpolantFactoryMethodSmooth=void 0;var Ol=class extends xl{constructor(e,t,n){super(e,t,n)}};Ol.prototype.ValueTypeName=`string`,Ol.prototype.ValueBufferType=Array,Ol.prototype.DefaultInterpolation=rr,Ol.prototype.InterpolantFactoryMethodLinear=void 0,Ol.prototype.InterpolantFactoryMethodSmooth=void 0;var kl=class extends xl{constructor(e,t,n,r){super(e,t,n,r)}};kl.prototype.ValueTypeName=`vector`;var Al=class extends Qi{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},jl=class extends Al{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Qi.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ml=new Ti,Nl=new K,Pl=new K,Fl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.mapType=Zt,this.map=null,this.mapPass=null,this.matrix=new Ti,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new os,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new bi(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Nl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nl),Pl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Pl),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ml.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ml,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ml)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Il=new K,Ll=new ni,Rl=new K,zl=class extends Qi{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Ti,this.projectionMatrix=new Ti,this.projectionMatrixInverse=new Ti,this.coordinateSystem=_r,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Il,Ll,Rl),Rl.x===1&&Rl.y===1&&Rl.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Il,Ll,Rl.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Il,Ll,Rl),Rl.x===1&&Rl.y===1&&Rl.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Il,Ll,Rl.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Bl=new K,Vl=new G,Hl=new G,Ul=class extends zl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Mr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mr*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bl.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bl.x,Bl.y).multiplyScalar(-e/Bl.z),Bl.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bl.x,Bl.y).multiplyScalar(-e/Bl.z)}getViewSize(e,t){return this.getViewBounds(e,Vl,Hl),t.subVectors(Hl,Vl)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(jr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Wl=class extends Fl{constructor(){super(new Ul(90,1,.5,500)),this.isPointLightShadow=!0}},Gl=class extends Al{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Wl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Kl=class extends zl{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ql=class extends Fl{constructor(){super(new Kl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Jl=class extends Al{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Qi.DEFAULT_UP),this.updateMatrix(),this.target=new Qi,this.shadow=new ql}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Yl=-90,Xl=1,Zl=class extends Qi{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ul(Yl,Xl,e,t);r.layers=this.layers,this.add(r);let i=new Ul(Yl,Xl,e,t);i.layers=this.layers,this.add(i);let a=new Ul(Yl,Xl,e,t);a.layers=this.layers,this.add(a);let o=new Ul(Yl,Xl,e,t);o.layers=this.layers,this.add(o);let s=new Ul(Yl,Xl,e,t);s.layers=this.layers,this.add(s);let c=new Ul(Yl,Xl,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ql=class extends Ul{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},$l=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=eu.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function eu(){this._document.hidden===!1&&this.reset()}var tu=`\\[\\]\\.:\\/`,nu=RegExp(`[\\[\\]\\.:\\/]`,`g`),ru=`[^\\[\\]\\.:\\/]`,iu=`[^`+tu.replace(`\\.`,``)+`]`,au=`((?:WC+[\\/:])*)`.replace(`WC`,ru),ou=`(WCOD+)?`.replace(`WCOD`,iu),su=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,ru),cu=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,ru),lu=RegExp(`^`+au+ou+su+cu+`$`),uu=[`material`,`materials`,`bones`,`map`],du=class{constructor(e,t,n){let r=n||fu.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},fu=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(nu,``)}static parseTrackName(e){let t=lu.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);uu.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){U(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){W(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){W(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){W(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){W(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){W(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;W(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fu.Composite=du,fu.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},fu.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},fu.prototype.GetterByBindingType=[fu.prototype._getValue_direct,fu.prototype._getValue_array,fu.prototype._getValue_arrayElement,fu.prototype._getValue_toArray],fu.prototype.SetterByBindingTypeAndVersioning=[[fu.prototype._setValue_direct,fu.prototype._setValue_direct_setNeedsUpdate,fu.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fu.prototype._setValue_array,fu.prototype._setValue_array_setNeedsUpdate,fu.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fu.prototype._setValue_arrayElement,fu.prototype._setValue_arrayElement_setNeedsUpdate,fu.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fu.prototype._setValue_fromArray,fu.prototype._setValue_fromArray_setNeedsUpdate,fu.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pu=new Ti,mu=class{constructor(e,t,n=0,r=1/0){this.ray=new Mo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ii,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):W(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return pu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pu),this}intersectObject(e,t=!0,n=[]){return gu(e,this,n,t),n.sort(hu),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)gu(e[r],this,n,t);return n.sort(hu),n}};function hu(e,t){return e.distance-t.distance}function gu(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)gu(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function _u(e,t,n,r){let i=vu(r);switch(n){case dn:return e*t;case gn:return e*t/i.components*i.byteLength;case _n:return e*t/i.components*i.byteLength;case vn:return e*t*2/i.components*i.byteLength;case yn:return e*t*2/i.components*i.byteLength;case fn:return e*t*3/i.components*i.byteLength;case pn:return e*t*4/i.components*i.byteLength;case bn:return e*t*4/i.components*i.byteLength;case xn:case Sn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Cn:case wn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case En:case On:return Math.max(e,16)*Math.max(t,8)/4;case Tn:case Dn:return Math.max(e,8)*Math.max(t,8)/2;case kn:case An:case Mn:case Nn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case jn:case Pn:case Fn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case In:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ln:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Rn:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case zn:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Bn:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Vn:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Hn:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Un:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Wn:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Gn:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Kn:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case qn:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Jn:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Yn:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Xn:case Zn:case Qn:return Math.ceil(e/4)*Math.ceil(t/4)*16;case $n:case er:return Math.ceil(e/4)*Math.ceil(t/4)*8;case tr:case nr:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function vu(e){switch(e){case Zt:case Qt:return{byteLength:1,components:1};case en:case $t:case an:return{byteLength:2,components:1};case on:case sn:return{byteLength:2,components:4};case nn:case tn:case rn:return{byteLength:4,components:1};case ln:case un:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?U(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function yu(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function bu(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var xu={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},Su={basic:{uniforms:Zc([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:xu.meshbasic_vert,fragmentShader:xu.meshbasic_frag},lambert:{uniforms:Zc([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:xu.meshlambert_vert,fragmentShader:xu.meshlambert_frag},phong:{uniforms:Zc([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:xu.meshphong_vert,fragmentShader:xu.meshphong_frag},standard:{uniforms:Zc([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xu.meshphysical_vert,fragmentShader:xu.meshphysical_frag},toon:{uniforms:Zc([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new Y(0)}}]),vertexShader:xu.meshtoon_vert,fragmentShader:xu.meshtoon_frag},matcap:{uniforms:Zc([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:xu.meshmatcap_vert,fragmentShader:xu.meshmatcap_frag},points:{uniforms:Zc([Z.points,Z.fog]),vertexShader:xu.points_vert,fragmentShader:xu.points_frag},dashed:{uniforms:Zc([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xu.linedashed_vert,fragmentShader:xu.linedashed_frag},depth:{uniforms:Zc([Z.common,Z.displacementmap]),vertexShader:xu.depth_vert,fragmentShader:xu.depth_frag},normal:{uniforms:Zc([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:xu.meshnormal_vert,fragmentShader:xu.meshnormal_frag},sprite:{uniforms:Zc([Z.sprite,Z.fog]),vertexShader:xu.sprite_vert,fragmentShader:xu.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xu.background_vert,fragmentShader:xu.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:xu.backgroundCube_vert,fragmentShader:xu.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xu.cube_vert,fragmentShader:xu.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xu.equirect_vert,fragmentShader:xu.equirect_frag},distance:{uniforms:Zc([Z.common,Z.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xu.distance_vert,fragmentShader:xu.distance_frag},shadow:{uniforms:Zc([Z.lights,Z.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:xu.shadow_vert,fragmentShader:xu.shadow_frag}};Su.physical={uniforms:Zc([Su.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:xu.meshphysical_vert,fragmentShader:xu.meshphysical_frag};var Cu={r:0,b:0,g:0},wu=new Ti,Tu=new q;Tu.set(-1,0,0,0,1,0,0,0,1);function Eu(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new X(new ys(1,1,1),new il({name:`BackgroundCubeMaterial`,uniforms:Xc(Su.backgroundCube.uniforms),vertexShader:Su.backgroundCube.vertexShader,fragmentShader:Su.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(wu.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Tu),l.material.toneMapped=li.getTransfer(i.colorSpace)!==mr,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new X(new Wc(2,2),new il({name:`BackgroundMaterial`,uniforms:Xc(Su.background.uniforms),vertexShader:Su.background.vertexShader,fragmentShader:Su.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=li.getTransfer(i.colorSpace)!==mr,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Cu,el(e)),n.buffers.color.setClear(Cu.r,Cu.g,Cu.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Du(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ou(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ku(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(U(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&U(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Au(e){let t=this,n=null,r=0,i=!1,a=!1,o=new co,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var ju=4,Mu=6,Nu=20,Pu=256,Fu=new Kl,Iu=new Y,Lu=null,Ru=0,zu=0,Bu=!1,Vu=new K,Hu=new K,Uu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Vu}=i;Lu=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lu,Ru,zu),this._renderer.xr.enabled=Bu,e.scissorTest=!1,Ku(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lu=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),zu=this._renderer.getActiveMipmapLevel(),Bu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:an,format:pn,colorSpace:fr,depthBuffer:!1},r=Gu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Wu(r)),this._blurMaterial=Ju(r,e,t),this._ggxMaterial=qu(r,e,t)}return r}_compileMaterial(e){let t=new X(new to,e);this._renderer.compile(t,Fu)}_sceneToCubeUV(e,t,n,r,i){let a=new Ul(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Iu),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new X(new ys,new No({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Iu),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Ku(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yu());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Ku(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Fu)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-ju?n-d+ju:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Ku(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Fu),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Ku(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Fu)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Ku(t,3*l*(r>this._lodMax-ju?r-this._lodMax+ju:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Fu)}};function Wu(e){let t=[],n=[],r=e,i=e-ju+1+Mu;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Hu.set(1,r,n):e===1?Hu.set(-n,1,-r):e===2?Hu.set(-n,r,1):e===3?Hu.set(-1,r,-n):e===4?Hu.set(-n,-1,r):Hu.set(n,r,-1),Hu.toArray(l,(e*6+t)*3)}}let u=new to;u.setAttribute(`position`,new Ba(c,3)),u.setAttribute(`outputDirection`,new Ba(l,3)),n.push(new X(u,null)),r>ju&&r--}return{lodMeshes:n,sizeLods:t}}function Gu(e,t,n){let r=new Si(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Ku(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function qu(e,t,n){return new il({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Pu,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Zu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ju(e,t,n){return new il({name:`SphericalGaussianBlur`,defines:{SAMPLES:Nu,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Zu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Yu(){return new il({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xu(){return new il({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Qu=class extends Si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ms(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ys(5,5,5),i=new il({name:`CubemapFromEquirect`,uniforms:Xc(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new X(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Jt),new Zl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function $u(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Qu(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Uu(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Uu(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function ed(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Tr(`WebGLRenderer: `+e+` extension not supported.`),t}}}function td(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Ha:Va)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function nd(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function rd(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:W(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function id(e,t,n){let r=new WeakMap,i=new bi;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Ci(h,p,m,u);g.type=rn,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ad(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var od={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function sd(e,t,n,r,i,a){let o=new Si(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new to;l.setAttribute(`position`,new Ua([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Ua([0,2,0,0,2,0],2));let u=new al({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new X(l,u),f=new Kl(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Si(t,n,{type:an,depthBuffer:!1,stencilBuffer:!1}),c=new Si(t,n,{type:an,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},li.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=od[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var cd=new yi,ld=new gs(1,1),ud=new Ci,dd=new wi,fd=new ms,pd=[],md=[],hd=new Float32Array(16),gd=new Float32Array(9),_d=new Float32Array(4);function vd(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=pd[i];if(a===void 0&&(a=new Float32Array(i),pd[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function yd(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function bd(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function xd(e,t){let n=md[t];n===void 0&&(n=new Int32Array(t),md[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Sd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Cd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(yd(n,t))return;e.uniform2fv(this.addr,t),bd(n,t)}}function wd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(yd(n,t))return;e.uniform3fv(this.addr,t),bd(n,t)}}function Td(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(yd(n,t))return;e.uniform4fv(this.addr,t),bd(n,t)}}function Ed(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(yd(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),bd(n,t)}else{if(yd(n,r))return;_d.set(r),e.uniformMatrix2fv(this.addr,!1,_d),bd(n,r)}}function Dd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(yd(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),bd(n,t)}else{if(yd(n,r))return;gd.set(r),e.uniformMatrix3fv(this.addr,!1,gd),bd(n,r)}}function Od(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(yd(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),bd(n,t)}else{if(yd(n,r))return;hd.set(r),e.uniformMatrix4fv(this.addr,!1,hd),bd(n,r)}}function kd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ad(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(yd(n,t))return;e.uniform2iv(this.addr,t),bd(n,t)}}function jd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(yd(n,t))return;e.uniform3iv(this.addr,t),bd(n,t)}}function Md(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(yd(n,t))return;e.uniform4iv(this.addr,t),bd(n,t)}}function Nd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Pd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(yd(n,t))return;e.uniform2uiv(this.addr,t),bd(n,t)}}function Fd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(yd(n,t))return;e.uniform3uiv(this.addr,t),bd(n,t)}}function Id(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(yd(n,t))return;e.uniform4uiv(this.addr,t),bd(n,t)}}function Ld(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ld.compareFunction=n.isReversedDepthBuffer()?518:515,a=ld):a=cd,n.setTexture2D(t||a,i)}function Rd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||dd,i)}function zd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||fd,i)}function Bd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ud,i)}function Vd(e){switch(e){case 5126:return Sd;case 35664:return Cd;case 35665:return wd;case 35666:return Td;case 35674:return Ed;case 35675:return Dd;case 35676:return Od;case 5124:case 35670:return kd;case 35667:case 35671:return Ad;case 35668:case 35672:return jd;case 35669:case 35673:return Md;case 5125:return Nd;case 36294:return Pd;case 36295:return Fd;case 36296:return Id;case 35678:case 36198:case 36298:case 36306:case 35682:return Ld;case 35679:case 36299:case 36307:return Rd;case 35680:case 36300:case 36308:case 36293:return zd;case 36289:case 36303:case 36311:case 36292:return Bd}}function Hd(e,t){e.uniform1fv(this.addr,t)}function Ud(e,t){let n=vd(t,this.size,2);e.uniform2fv(this.addr,n)}function Wd(e,t){let n=vd(t,this.size,3);e.uniform3fv(this.addr,n)}function Gd(e,t){let n=vd(t,this.size,4);e.uniform4fv(this.addr,n)}function Kd(e,t){let n=vd(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function qd(e,t){let n=vd(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Jd(e,t){let n=vd(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Yd(e,t){e.uniform1iv(this.addr,t)}function Xd(e,t){e.uniform2iv(this.addr,t)}function Zd(e,t){e.uniform3iv(this.addr,t)}function Qd(e,t){e.uniform4iv(this.addr,t)}function $d(e,t){e.uniform1uiv(this.addr,t)}function ef(e,t){e.uniform2uiv(this.addr,t)}function tf(e,t){e.uniform3uiv(this.addr,t)}function nf(e,t){e.uniform4uiv(this.addr,t)}function rf(e,t,n){let r=this.cache,i=t.length,a=xd(n,i);yd(r,a)||(e.uniform1iv(this.addr,a),bd(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ld:cd;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function af(e,t,n){let r=this.cache,i=t.length,a=xd(n,i);yd(r,a)||(e.uniform1iv(this.addr,a),bd(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||dd,a[e])}function of(e,t,n){let r=this.cache,i=t.length,a=xd(n,i);yd(r,a)||(e.uniform1iv(this.addr,a),bd(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||fd,a[e])}function sf(e,t,n){let r=this.cache,i=t.length,a=xd(n,i);yd(r,a)||(e.uniform1iv(this.addr,a),bd(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ud,a[e])}function cf(e){switch(e){case 5126:return Hd;case 35664:return Ud;case 35665:return Wd;case 35666:return Gd;case 35674:return Kd;case 35675:return qd;case 35676:return Jd;case 5124:case 35670:return Yd;case 35667:case 35671:return Xd;case 35668:case 35672:return Zd;case 35669:case 35673:return Qd;case 5125:return $d;case 36294:return ef;case 36295:return tf;case 36296:return nf;case 35678:case 36198:case 36298:case 36306:case 35682:return rf;case 35679:case 36299:case 36307:return af;case 35680:case 36300:case 36308:case 36293:return of;case 36289:case 36303:case 36311:case 36292:return sf}}var lf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Vd(t.type)}},uf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cf(t.type)}},df=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ff=/(\w+)(\])?(\[|\.)?/g;function pf(e,t){e.seq.push(t),e.map[t.id]=t}function mf(e,t,n){let r=e.name,i=r.length;for(ff.lastIndex=0;;){let a=ff.exec(r),o=ff.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){pf(n,l===void 0?new lf(s,e,t):new uf(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new df(s),pf(n,e)),n=e}}}var hf=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);mf(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function gf(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var _f=37297,vf=0;function yf(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var bf=new q;function xf(e){li._getMatrix(bf,li.workingColorSpace,e);let t=`mat3( ${bf.elements.map(e=>e.toFixed(4))} )`;switch(li.getTransfer(e)){case pr:return[t,`LinearTransferOETF`];case mr:return[t,`sRGBTransferOETF`];default:return U(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Sf(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+yf(e.getShaderSource(t),r)}return i}function Cf(e,t){let n=xf(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var wf={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Tf(e,t){let n=wf[t];return n===void 0?(U(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ef=new K;function Df(){return li.getLuminanceCoefficients(Ef),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ef.x.toFixed(4)}, ${Ef.y.toFixed(4)}, ${Ef.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Of(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(jf).join(`
`)}function kf(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Af(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function jf(e){return e!==``}function Mf(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nf(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Pf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ff(e){return e.replace(Pf,Lf)}var If=new Map;function Lf(e,t){let n=xu[t];if(n===void 0){let e=If.get(t);if(e!==void 0)n=xu[e],U(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Ff(n)}var Rf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zf(e){return e.replace(Rf,Bf)}function Bf(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Vf(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Hf={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Uf(e){return Hf[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Wf={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Gf(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Wf[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Kf={302:`ENVMAP_MODE_REFRACTION`};function qf(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Kf[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Jf={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Yf(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Jf[e.combine]||`ENVMAP_BLENDING_NONE`}function Xf(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Zf(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Uf(n),l=Gf(n),u=qf(n),d=Yf(n),f=Xf(n),p=Of(n),m=kf(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(jf).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(jf).join(`
`),_.length>0&&(_+=`
`)):(g=[Vf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(jf).join(`
`),_=[Vf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:xu.tonemapping_pars_fragment,n.toneMapping===0?``:Tf(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,xu.colorspace_pars_fragment,Cf(`linearToOutputTexel`,n.outputColorSpace),Df(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(jf).join(`
`)),o=Ff(o),o=Mf(o,n),o=Nf(o,n),s=Ff(s),s=Mf(s,n),s=Nf(s,n),o=zf(o),s=zf(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=gf(i,i.VERTEX_SHADER,y),S=gf(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Sf(i,x,`vertex`),n=Sf(i,S,`fragment`);W(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):U(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new hf(i,h),T=Af(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,_f)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=vf++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Qf=0,$f=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ep(e),t.set(e,n)),n}},ep=class{constructor(e){this.id=Qf++,this.code=e,this.usedTimes=0}};function tp(e){return e===1030||e===37490||e===36285}function np(e,t,n,r,i,a){let o=new Ii,s=new $f,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&U(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Su[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,re=!!i.map,ie=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,ce=!!i.bumpMap&&i.wireframe===!1,le=!!i.normalMap,ue=!!i.displacementMap,de=!!i.emissiveMap,fe=!!i.metalnessMap,pe=!!i.roughnessMap,me=i.anisotropy>0,he=i.clearcoat>0,ge=i.dispersion>0,_e=i.retroreflectivity>0,ve=i.iridescence>0,ye=i.sheen>0,be=i.transmission>0,xe=me&&!!i.anisotropyMap,Se=he&&!!i.clearcoatMap,Ce=he&&!!i.clearcoatNormalMap,we=he&&!!i.clearcoatRoughnessMap,Te=ve&&!!i.iridescenceMap,M=ve&&!!i.iridescenceThicknessMap,Ee=ye&&!!i.sheenColorMap,De=ye&&!!i.sheenRoughnessMap,Oe=!!i.specularMap,N=!!i.specularColorMap,ke=!!i.specularIntensityMap,P=be&&!!i.transmissionMap,Ae=be&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,Pe=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:li.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:ie,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:le,displacementMap:ue,emissiveMap:de,normalMapObjectSpace:le&&i.normalMapType===1,normalMapTangentSpace:le&&i.normalMapType===0,packedNormalMap:le&&i.normalMapType===0&&tp(i.normalMap.format),metalnessMap:fe,roughnessMap:pe,anisotropy:me,anisotropyMap:xe,clearcoat:he,clearcoatMap:Se,clearcoatNormalMap:Ce,clearcoatRoughnessMap:we,dispersion:ge,retroreflection:_e,iridescence:ve,iridescenceMap:Te,iridescenceThicknessMap:M,sheen:ye,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:Oe,specularColorMap:N,specularIntensityMap:ke,transmission:be,transmissionMap:P,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:Pe,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:ce&&m(i.bumpMap.channel),normalMapUv:le&&m(i.normalMap.channel),displacementMapUv:ue&&m(i.displacementMap.channel),emissiveMapUv:de&&m(i.emissiveMap.channel),metalnessMapUv:fe&&m(i.metalnessMap.channel),roughnessMapUv:pe&&m(i.roughnessMap.channel),anisotropyMapUv:xe&&m(i.anisotropyMap.channel),clearcoatMapUv:Se&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:M&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&m(i.sheenRoughnessMap.channel),specularMapUv:Oe&&m(i.specularMap.channel),specularColorMapUv:N&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:P&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(le||me),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&le===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&li.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&i.emissiveMap.isVideoTexture===!0&&li.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Su[t];n=tl.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Zf(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function rp(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ip(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ap(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function op(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ip),r.length>1&&r.sort(t||ap),i.length>1&&i.sort(t||ap)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function sp(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new op,e.set(t,[i])):n>=r.length?(i=new op,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function cp(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new K,color:new Y};break;case`SpotLight`:n={position:new K,direction:new K,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function lp(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var up=0;function dp(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function fp(e){let t=new cp,n=lp(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new Ti,o=new Ti;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(dp);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=up++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function pp(e){let t=new fp(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function mp(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new pp(e),t.set(n,[a])):r>=i.length?(a=new pp(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var hp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_p=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],vp=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],yp=new Ti,bp=new K,xp=new K;function Sp(e,t,n){let r=new os,i=new G,a=new G,o=new bi,s=new ll,c=new ul,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new il({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:hp,fragmentShader:gp}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new to;m.setAttribute(`position`,new Ba(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new X(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(U(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){U(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){U(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Si(i.x,i.y,{format:vn,type:an,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new gs(i.x,i.y,rn),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=mn,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Gt,d.map.depthTexture.magFilter=Gt}else l.isPointLight?(d.map=new Qu(i.x),d.map.depthTexture=new _s(i.x,nn)):(d.map=new Si(i.x,i.y),d.map.depthTexture=new gs(i.x,i.y,nn)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=mn,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Jt,d.map.depthTexture.magFilter=Jt):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Gt,d.map.depthTexture.magFilter=Gt);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),bp.setFromMatrixPosition(l.matrixWorld),e.position.copy(bp),xp.copy(e.position),xp.add(_p[t]),e.up.copy(vp[t]),e.lookAt(xp),e.updateMatrixWorld(),n.makeTranslation(-bp.x,-bp.y,-bp.z),yp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(yp,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Si(i.x,i.y,{format:vn,type:an}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Cp(e,t){function n(){let t=!1,n=new bi,r=null,i=new bi(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Dr[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),j=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),j=ne>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new bi().fromArray(oe),le=new bi().fromArray(se);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),fe(e.DEPTH_TEST),o.setFunc(3),xe(!1),Se(1),fe(e.CULL_FACE),ye(0);function fe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function pe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function me(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function he(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ge(t){return h!==t&&(e.useProgram(t),h=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};_e[103]=e.MIN,_e[104]=e.MAX;let ve={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ye(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(pe(e.BLEND),g=!1);return}if(g===!1&&(fe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:W(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:W(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:W(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:W(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(_e[n],_e[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ve[r],ve[i],ve[o],ve[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function be(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),xe(r),t.blending===1&&t.transparent===!1?ye(0):ye(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),we(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function xe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function Se(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Ce(t){t!==k&&(j&&e.lineWidth(t),k=t)}function we(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):pe(e.POLYGON_OFFSET_FILL)}function Te(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function M(t){t===void 0&&(t=e.TEXTURE0+te-1),ie!==t&&(e.activeTexture(t),ie=t)}function Ee(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+te-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function De(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Oe(){try{e.compressedTexImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function N(){try{e.compressedTexImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function P(){try{e.texSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Pe(){try{e.texImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Re(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function ze(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function Be(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ve(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function He(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ie=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:he,useProgram:ge,setBlending:ye,setMaterial:be,setFlipSided:xe,setCullFace:Se,setLineWidth:Ce,setPolygonOffset:we,setScissorTest:Te,activeTexture:M,bindTexture:Ee,unbindTexture:De,compressedTexImage2D:Oe,compressedTexImage3D:N,texImage2D:Pe,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:Be,uniformBlockBinding:Ve,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:ke,texSubImage3D:P,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:Re,viewport:ze,reset:He}}function wp(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):br(`canvas`)}function g(e,t,n){let r=1,i=Oe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),U(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&U(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];U(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||U(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?pr:li.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,U(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function te(){let e=O;return e>=i.maxTextures&&U(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function j(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ne(t,i){let a=r.get(t);if(t.isVideoTexture&&Ee(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)U(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)U(`WebGLRenderer: Texture marked for update but image is incomplete`);else{pe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){pe(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){pe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){me(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let oe={[Ht]:e.REPEAT,[Ut]:e.CLAMP_TO_EDGE,[Wt]:e.MIRRORED_REPEAT},se={[Gt]:e.NEAREST,[Kt]:e.NEAREST_MIPMAP_NEAREST,[qt]:e.NEAREST_MIPMAP_LINEAR,[Jt]:e.LINEAR,[Yt]:e.LINEAR_MIPMAP_NEAREST,[Xt]:e.LINEAR_MIPMAP_LINEAR},ce={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function le(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&U(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,oe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,oe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,oe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,se[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,se[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ce[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ue(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=j(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function de(e,t,n){return Math.floor(Math.floor(e/n)/t)}function fe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=de(n.start,r.width,4),c=de(t.start,r.width,4);n.start<=i+1&&a===c&&de(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function pe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ue(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=li.getPrimaries(li.workingColorSpace),r=o.colorSpace===``?null:li.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=De(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);le(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===hn,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&fe(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=_u(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=_u(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Oe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Oe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function me(t,o,s){if(o.image.length!==6)return;let c=ue(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=li.getPrimaries(li.workingColorSpace),r=o.colorSpace===``?null:li.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=De(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);le(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Oe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function he(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Te(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ge(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;M(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);M(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function _e(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),le(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ne(i.depthTexture,0);let u=l.__webglTexture,d=Te(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ve(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)_e(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?_e(i.__webglFramebuffer[0],t,0):_e(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ge(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ge(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,i){let a=r.get(t);n!==void 0&&he(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ve(t)}function be(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&M(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ge(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),le(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)he(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else he(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),le(c,a),he(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),le(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)he(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else he(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ve(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Se=[],Ce=[];function we(t){if(t.samples>0){if(M(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Se.length=0,Ce.length=0,Se.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Se.push(l),Ce.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ce)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Te(e){return Math.min(i.maxSamples,e.samples)}function M(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ee(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(li.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&U(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):W(`WebGLTextures: Unsupported texture color space:`,n)),t}function Oe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=ne,this.setTexture2DArray=re,this.setTexture3D=ie,this.setTextureCube=ae,this.rebindTextures=ye,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=he,this.useMultisampledRTT=M,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Tp(e,t){function n(n,r=``){let i,a=li.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ep=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Op=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new vs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new il({vertexShader:Ep,fragmentShader:Dp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new X(new Wc(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kp=class extends Or{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Op,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=null,T=new Ul;T.viewport=new bi;let E=new Ul;E.viewport=new bi;let D=[T,E],O=new Ql,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new ea,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new ea,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new ea,b[e]=t),t.getHandSpace()};function ee(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,j);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,j),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?hn:mn,a=_.stencil?cn:nn);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Si(d.textureWidth,d.textureHeight,{format:pn,type:Zt,depthTexture:new gs(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Si(f.framebufferWidth,f.framebufferHeight,{format:pn,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function j(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let ne=new K,re=new K;function ie(e,t,n){ne.setFromMatrixPosition(t.matrixWorld),re.setFromMatrixPosition(n.matrixWorld);let r=ne.distanceTo(re),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ae(O,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?ie(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,O,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Mr*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let se=null;function ce(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Ul,o.layers.enable(n),o.viewport=new bi,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new vs,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let le=new yu;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},Ap=new Ti,jp=new q;jp.set(-1,0,0,0,1,0,0,0,1);function Mp(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,el(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ap.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(jp),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Np(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return W(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?U(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):U(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Pp=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Fp=null;function Ip(){return Fp===null&&(Fp=new qo(Pp,16,16,vn,an),Fp.name=`DFG_LUT`,Fp.minFilter=Jt,Fp.magFilter=Jt,Fp.wrapS=Ut,Fp.wrapT=Ut,Fp.generateMipmaps=!1,Fp.needsUpdate=!0),Fp}var Lp=class{constructor(e={}){let{canvas:t=xr(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Zt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([bn,yn,_n]),g=new Set([Zt,nn,en,cn,on,sn]),_=new Uint32Array(4),v=new Int32Array(4),y=new K,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=dr;let ee=0,te=0,j=null,ne=-1,re=null,ie=new bi,ae=new bi,oe=null,se=new Y(0),ce=0,le=t.width,ue=t.height,de=1,fe=null,pe=null,me=new bi(0,0,le,ue),he=new bi(0,0,le,ue),ge=!1,_e=new os,ve=!1,ye=!1,be=new Ti,xe=new K,Se=new bi,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},we=!1;function Te(){return j===null?de:1}let M=n;function Ee(e,n){return t.getContext(e,n)}let De,Oe,N,ke,P,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,F,!1),t.addEventListener(`webglcontextrestored`,Xe,!1),t.addEventListener(`webglcontextcreationerror`,Ze,!1),M===null){let t=`webgl2`;if(M=Ee(t,e),M===null)throw Ee(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Je()}catch(e){throw t.removeEventListener(`webglcontextlost`,F,!1),t.removeEventListener(`webglcontextrestored`,Xe,!1),t.removeEventListener(`webglcontextcreationerror`,Ze,!1),W(`WebGLRenderer: `+e.message),e}function Je(){De=new ed(M),De.init(),Ge=new Tp(M,De),Oe=new ku(M,De,e,Ge),N=new Cp(M,De),Oe.reversedDepthBuffer&&d&&N.buffers.depth.setReversed(!0),O=M.createFramebuffer(),k=M.createFramebuffer(),A=M.createFramebuffer(),ke=new rd(M),P=new rp,Ae=new wp(M,De,N,P,Oe,Ge,ke),je=new $u(T),Me=new bu(M),Ke=new Du(M,Me),Ne=new td(M,Me,ke,Ke),Pe=new ad(M,Ne,Me,Ke,ke),He=new id(M,Oe,Ae),ze=new Au(P),Fe=new np(T,je,De,Oe,Ke,ze),Ie=new Mp(T,P),Le=new sp,Re=new mp(De),Ve=new Eu(T,je,N,Pe,p,s),Be=new Sp(T,Pe,Oe),qe=new Np(M,ke,Oe,N),Ue=new Ou(M,De,ke),We=new nd(M,De,ke),ke.programs=Fe.programs,T.capabilities=Oe,T.extensions=De,T.properties=P,T.renderLists=Le,T.shadowMap=Be,T.state=N,T.info=ke}m!==1009&&(w=new sd(m,t.width,t.height,o,r,i));let Ye=new kp(T,M);this.xr=Ye,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){let e=De.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=De.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(e){e!==void 0&&(de=e,this.setSize(le,ue,!1))},this.getSize=function(e){return e.set(le,ue)},this.setSize=function(e,n,r=!0){if(Ye.isPresenting){U(`WebGLRenderer: Can't change size while VR device is presenting.`);return}le=e,ue=n,t.width=Math.floor(e*de),t.height=Math.floor(n*de),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(le*de,ue*de).floor()},this.setDrawingBufferSize=function(e,n,r){le=e,ue=n,de=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){W(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){U(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ie)},this.getViewport=function(e){return e.copy(me)},this.setViewport=function(e,t,n,r){e.isVector4?me.set(e.x,e.y,e.z,e.w):me.set(e,t,n,r),N.viewport(ie.copy(me).multiplyScalar(de).round())},this.getScissor=function(e){return e.copy(he)},this.setScissor=function(e,t,n,r){e.isVector4?he.set(e.x,e.y,e.z,e.w):he.set(e,t,n,r),N.scissor(ae.copy(he).multiplyScalar(de).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(e){N.setScissorTest(ge=e)},this.setOpaqueSort=function(e){fe=e},this.setTransparentSort=function(e){pe=e},this.getClearColor=function(e){return e.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(j!==null){let t=j.texture.format;e=h.has(t)}if(e){let e=j.texture.type,t=g.has(e),n=Ve.getClearColor(),r=Ve.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,M.clearBufferuiv(M.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,M.clearBufferiv(M.COLOR,0,v))}else r|=M.COLOR_BUFFER_BIT}t&&(r|=M.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&M.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,F,!1),t.removeEventListener(`webglcontextrestored`,Xe,!1),t.removeEventListener(`webglcontextcreationerror`,Ze,!1),Ve.dispose(),Le.dispose(),Re.dispose(),P.dispose(),je.dispose(),Pe.dispose(),Ke.dispose(),qe.dispose(),Fe.dispose(),Ye.dispose(),Ye.removeEventListener(`sessionstart`,tt),Ye.removeEventListener(`sessionend`,nt),z.stop()};function F(e){e.preventDefault(),Cr(`WebGLRenderer: Context Lost.`),E=!0}function Xe(){Cr(`WebGLRenderer: Context Restored.`),E=!1;let e=ke.autoReset,t=Be.enabled,n=Be.autoUpdate,r=Be.needsUpdate,i=Be.type;Je(),ke.autoReset=e,Be.enabled=t,Be.autoUpdate=n,Be.needsUpdate=r,Be.type=i}function Ze(e){W(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Qe(e){let t=e.target;t.removeEventListener(`dispose`,Qe),$e(t)}function $e(e){I(e),P.remove(e)}function I(e){let t=P.get(e).programs;t!==void 0&&(t.forEach(function(e){Fe.releaseProgram(e)}),e.isShaderMaterial&&Fe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ce);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ut(e,t,n,r,i);N.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ne.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ke.setup(i,r,s,n,c);let h,g=Ue;if(c!==null&&(h=Me.get(c),g=We,g.setIndex(h)),i.isMesh)r.wireframe===!0?(N.setLineWidth(r.wireframeLinewidth*Te()),g.setMode(M.LINES)):g.setMode(M.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),N.setLineWidth(e*Te()),i.isLineSegments?g.setMode(M.LINES):i.isLineLoop?g.setMode(M.LINE_LOOP):g.setMode(M.LINE_STRIP)}else i.isPoints?g.setMode(M.POINTS):i.isSprite&&g.setMode(M.TRIANGLES);if(i.isBatchedMesh){if(De.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Me.get(c).bytesPerElement:1,o=P.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(M,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function L(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),ve===!0&&ze.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ot(e,t,r),e.side=0,e.needsUpdate=!0,ot(e,t,r),e.side=2):ot(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Re.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ye=this.localClippingEnabled,ve=ze.init(this.clippingPlanes,ye),ve===!0&&ze.setGlobalState(this.clippingPlanes,t),D!==null&&Be.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];L(o,n,t,e),r.add(o)}else L(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=P.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}De.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let R=null;function et(e){R&&R(e)}function tt(){z.stop()}function nt(){z.start()}let z=new yu;z.setAnimationLoop(et),typeof self<`u`&&z.setContext(self),this.setAnimationLoop=function(e){R=e,Ye.setAnimationLoop(e),e===null?z.stop():z.start()},Ye.addEventListener(`sessionstart`,tt),Ye.addEventListener(`sessionend`,nt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){W(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ye.enabled===!0&&Ye.isPresenting===!0,r=w!==null&&(j===null||n)&&w.begin(T,j);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(t),t=Ye.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,j),x=Re.get(e,C.length),x.init(t),x.state.textureUnits=Ae.getTextureUnits(),C.push(x),be.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),_e.setFromProjectionMatrix(be,_r,t.reversedDepth),ye=this.localClippingEnabled,ve=ze.init(this.clippingPlanes,ye),b=Le.get(e,S.length),b.init(),S.push(b),Ye.enabled===!0&&Ye.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&B(e,t,-1/0,T.sortObjects)}B(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(fe,pe),we=Ye.enabled===!1||Ye.isPresenting===!1||Ye.hasDepthSensing()===!1,we&&Ve.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ve===!0&&ze.beginShadows();let i=x.state.shadowsArray;if(Be.render(i,e,t),ve===!0&&ze.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];it(n,r,e,a)}we&&Ve.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];rt(b,e,n,n.viewport)}}else r.length>0&&it(n,r,e,t),we&&Ve.render(e),rt(b,e,t)}j!==null&&te===0&&(Ae.updateMultisampleRenderTarget(j),Ae.updateRenderTargetMipmap(j)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ke.resetDefaultState(),ne=-1,re=null,C.pop(),C.length>0?(x=C[C.length-1],Ae.setTextureUnits(x.state.textureUnits),ve===!0&&ze.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function B(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(_e)){r&&Se.setFromMatrixPosition(e.matrixWorld).applyMatrix4(be);let i=Pe.update(e),a=e.material;a.visible&&b.push(e,i,a,n,Se.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(_e))){let i=Pe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Se.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Se.copy(e.boundingSphere.center)),Se.applyMatrix4(e.matrixWorld).applyMatrix4(be)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,Se.z,s,t)}}else a.visible&&b.push(e,i,a,n,Se.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)B(i[e],t,n,r)}function rt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ve===!0&&ze.setGlobalState(T.clippingPlanes,n),r&&N.viewport(ie.copy(r)),i.length>0&&at(i,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function it(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=De.has(`EXT_color_buffer_half_float`)||De.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Si(1,1,{generateMipmaps:!0,type:e?an:Zt,minFilter:Xt,samples:Math.max(4,Oe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:li.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ie;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(se),ce=T.getClearAlpha(),ce<1&&T.setClearColor(16777215,.5),T.clear(),we&&Ve.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ve===!0&&ze.setGlobalState(T.clippingPlanes,r),at(e,n,r),Ae.updateMultisampleRenderTarget(a),Ae.updateRenderTargetMipmap(a),De.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,V(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ae.updateMultisampleRenderTarget(a),Ae.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(se,ce),d!==void 0&&(r.viewport=d),T.toneMapping=u}function at(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&V(o,t,n,s,l,c)}}function V(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ot(e,t,n){t.isScene!==!0&&(t=Ce);let r=P.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Fe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Fe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=je.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Qe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ct(e,s),d}else s.uniforms=Fe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Fe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=ze.uniform),ct(e,s),r.needsLights=ft(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function st(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=hf.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ct(e,t){let n=P.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function lt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function ut(e,t,n,r,i){t.isScene!==!0&&(t=Ce),Ae.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:li.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=je.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=P.get(r),y=x.state.lights;if(ve===!0&&(ye===!0||e!==re)){let t=e===re&&r.id===ne;ze.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==ze.numPlanes||v.numIntersection!==ze.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ot(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(N.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ne&&(ne=r.id,w=!0),v.needsLights){let e=lt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||re!==e){N.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(M,`projectionMatrix`,e.projectionMatrix),O.setValue(M,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(M,xe.setFromMatrixPosition(e.matrixWorld)),Oe.logarithmicDepthBuffer&&O.setValue(M,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(M,`isOrthographic`,e.isOrthographicCamera===!0),re!==e&&(re=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(M,`sunShadowMap`,y.state.sunShadowMap,Ae),y.state.directionalShadowMap.length>0&&O.setValue(M,`directionalShadowMap`,y.state.directionalShadowMap,Ae),y.state.spotShadowMap.length>0&&O.setValue(M,`spotShadowMap`,y.state.spotShadowMap,Ae),y.state.pointShadowMap.length>0&&O.setValue(M,`pointShadowMap`,y.state.pointShadowMap,Ae)),i.isSkinnedMesh){O.setOptional(M,i,`bindMatrix`),O.setOptional(M,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(M,`boneTexture`,e.boneTexture,Ae))}i.isBatchedMesh&&(O.setOptional(M,i,`batchingTexture`),O.setValue(M,`batchingTexture`,i._matricesTexture,Ae),O.setOptional(M,i,`batchingIdTexture`),O.setValue(M,`batchingIdTexture`,i._indirectTexture,Ae),O.setOptional(M,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(M,`batchingColorTexture`,i._colorsTexture,Ae));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&He.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(M,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Ip()),w){if(O.setValue(M,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&dt(k,E),a&&r.fog===!0&&Ie.refreshFogUniforms(k,a),Ie.refreshMaterialUniforms(k,r,de,ue,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}hf.upload(M,st(v),k,Ae)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(hf.upload(M,st(v),k,Ae),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(M,`center`,i.center),O.setValue(M,`modelViewMatrix`,i.modelViewMatrix),O.setValue(M,`normalMatrix`,i.normalMatrix),O.setValue(M,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];qe.update(n,S),qe.bind(n,S)}}return S}function dt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ft(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(e,t,n){let r=P.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),P.get(e.texture).__webglTexture=t,P.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=P.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){j=e,ee=t,te=n;let r=null,i=!1,a=!1;if(e){let o=P.get(e);if(o.__useDefaultFramebuffer!==void 0){N.bindFramebuffer(M.FRAMEBUFFER,o.__webglFramebuffer),ie.copy(e.viewport),ae.copy(e.scissor),oe=e.scissorTest,N.viewport(ie),N.scissor(ae),N.setScissorTest(oe),ne=-1;return}if(o.__webglFramebuffer===void 0)Ae.setupRenderTarget(e);else if(o.__hasExternalTextures)Ae.rebindTextures(e,P.get(e.texture).__webglTexture,P.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&P.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ae.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=P.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ae.useMultisampledRTT(e)===!1?P.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ie.copy(e.viewport),ae.copy(e.scissor),oe=e.scissorTest}else ie.copy(me).multiplyScalar(de).floor(),ae.copy(he).multiplyScalar(de).floor(),oe=ge;if(n!==0&&(r=O),N.bindFramebuffer(M.FRAMEBUFFER,r)&&N.drawBuffers(e,r),N.viewport(ie),N.scissor(ae),N.setScissorTest(oe),i){let r=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=P.get(e.textures[t]);M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,t.__webglTexture,n)}ne=-1};function pt(e){let t=P.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Oe.textureFormatReadable(e.format),t.__typeReadable=Oe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){N.bindFramebuffer(M.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s);let u=pt(o);if(u.__formatReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&M.readPixels(t,n,r,i,Ge.convert(c),Ge.convert(l),a)}finally{let e=j===null?null:P.get(j).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){N.bindFramebuffer(M.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s);let d=pt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,f),M.bufferData(M.PIXEL_PACK_BUFFER,a.byteLength,M.STREAM_READ),M.readPixels(t,n,r,i,Ge.convert(l),Ge.convert(u),0),M.bindBuffer(M.PIXEL_PACK_BUFFER,null);let p=j===null?null:P.get(j).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,p);let m=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await Er(M,m,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,f),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,a),M.bindBuffer(M.PIXEL_PACK_BUFFER,null),M.deleteBuffer(f),M.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ae.setTexture2D(e,0),M.copyTexSubImage2D(M.TEXTURE_2D,n,0,0,o,s,i,a),N.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ge.convert(t.format),_=Ge.convert(t.type),v;t.isData3DTexture?(Ae.setTexture3D(t,0),v=M.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ae.setTexture2DArray(t,0),v=M.TEXTURE_2D_ARRAY):(Ae.setTexture2D(t,0),v=M.TEXTURE_2D),N.activeTexture(M.TEXTURE0),N.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,t.flipY),N.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),N.pixelStorei(M.UNPACK_ALIGNMENT,t.unpackAlignment);let y=N.getParameter(M.UNPACK_ROW_LENGTH),b=N.getParameter(M.UNPACK_IMAGE_HEIGHT),x=N.getParameter(M.UNPACK_SKIP_PIXELS),S=N.getParameter(M.UNPACK_SKIP_ROWS),C=N.getParameter(M.UNPACK_SKIP_IMAGES);N.pixelStorei(M.UNPACK_ROW_LENGTH,h.width),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,h.height),N.pixelStorei(M.UNPACK_SKIP_PIXELS,l),N.pixelStorei(M.UNPACK_SKIP_ROWS,u),N.pixelStorei(M.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=P.get(e),r=P.get(t),h=P.get(n.__renderTarget),g=P.get(r.__renderTarget);N.bindFramebuffer(M.READ_FRAMEBUFFER,h.__webglFramebuffer),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(e).__webglTexture,i,d+n),M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(t).__webglTexture,a,m+n)),M.blitFramebuffer(l,u,o,s,f,p,o,s,M.DEPTH_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||P.has(e)){let n=P.get(e),r=P.get(t);N.bindFramebuffer(M.READ_FRAMEBUFFER,k),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):M.framebufferTexture2D(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,n.__webglTexture,i),T?M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):M.framebufferTexture2D(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,r.__webglTexture,a),i===0?T?M.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):M.copyTexSubImage2D(v,a,f,p,l,u,o,s):M.blitFramebuffer(l,u,o,s,f,p,o,s,M.COLOR_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?M.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h);N.pixelStorei(M.UNPACK_ROW_LENGTH,y),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,b),N.pixelStorei(M.UNPACK_SKIP_PIXELS,x),N.pixelStorei(M.UNPACK_SKIP_ROWS,S),N.pixelStorei(M.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&M.generateMipmap(v),N.unbindTexture()},this.initRenderTarget=function(e){P.get(e).__webglFramebuffer===void 0&&Ae.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ae.setTextureCube(e,0):e.isData3DTexture?Ae.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ae.setTexture2DArray(e,0):Ae.setTexture2D(e,0),N.unbindTexture()},this.resetState=function(){ee=0,te=0,j=null,N.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return _r}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=li._getDrawingBufferColorSpace(e),t.unpackColorSpace=li._getUnpackColorSpace()}},Rp=class extends sa{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new ys;e.deleteAttribute(`uv`);let t=new ol({side:1}),n=new ol,r=new Gl(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new X(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new ns(e,n,6),o=new Qi;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new X(e,zp(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new X(e,zp(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new X(e,zp(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new X(e,zp(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new X(e,zp(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new X(e,zp(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function zp(e){return new cl({color:0,emissive:16777215,emissiveIntensity:e})}var Bp={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Vp=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Hp=new Kl(-1,1,1,-1,0,1),Up=new class extends to{constructor(){super(),this.setAttribute(`position`,new Ua([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Ua([0,2,0,0,2,0],2))}},Wp=class{constructor(e){this._mesh=new X(Up,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Hp)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Gp=class extends Vp{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof il?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=tl.clone(e.uniforms),this.material=new il({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Wp(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Kp=class extends Vp{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},qp=class extends Vp{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Jp=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new G);this._width=n.width,this._height=n.height,t=new Si(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:an}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Gp(Bp),this.copyPass.material.blending=0,this.timer=new $l}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Kp!==void 0&&(r instanceof Kp?n=!0:r instanceof qp&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new G);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Yp={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Xp=class extends Vp{constructor(){super(),this.isOutputPass=!0,this.uniforms=tl.clone(Yp.uniforms),this.material=new al({name:Yp.name,uniforms:this.uniforms,vertexShader:Yp.vertexShader,fragmentShader:Yp.fragmentShader}),this._fsQuad=new Wp(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},li.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Zp=class extends Vp{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Y}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Qp={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Y(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},$p=class e extends Vp{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new G(256,256):new G(e.x,e.y),this.clearColor=new Y(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Si(i,a,{type:an,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Si(i,a,{type:an,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Si(i,a,{type:an,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Qp;this.highPassUniforms=tl.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new il({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new G(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1),new K(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=tl.clone(Bp.uniforms),this.blendMaterial=new il({uniforms:this.copyUniforms,vertexShader:Bp.vertexShader,fragmentShader:Bp.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Y,this._oldClearAlpha=1,this._basic=new No,this._fsQuad=new Wp(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new G(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new il({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new G(.5,.5)},direction:{value:new G(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new il({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};$p.BlurDirectionX=new G(1,0),$p.BlurDirectionY=new G(0,1);function em(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new to,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=tm(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=tm(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function tm(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Ba(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function nm(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}function rm(e){return Math.min(1,Math.max(0,e))}function im(e){return 1-(1-e)**3}function am(e){return e<.5?4*e**3:1-(-2*e+2)**3/2}function om(e,t=1.5){let n=e-1;return 1+(t+1)*n**3+t*n**2}function sm(e,t=1.5){return(t+1)*e**3-t*e**2}function cm(e,t,n){return rm((e-t)/n)}function lm(e,t){let n=document.createElement(`canvas`);n.width=e,n.height=e,t(n.getContext(`2d`));let r=new hs(n);return r.colorSpace=dr,r}function um(){return lm(512,e=>{let t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,H.skyTop),t.addColorStop(.5,H.skyMiddle),t.addColorStop(1,H.skyHorizon),e.fillStyle=t,e.fillRect(0,0,512,512)})}function dm(){return lm(64,e=>{let t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,`rgba(255,255,255,1)`),t.addColorStop(.35,`rgba(255,255,255,0.45)`),t.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=t,e.fillRect(0,0,64,64)})}var fm=null;function pm(){return fm||(fm=new qo(new Uint8Array([110,185,255]),3,1,gn),fm.minFilter=Gt,fm.magFilter=Gt,fm.needsUpdate=!0),fm}var mm={rimColor:{value:new Y(H.rim)},rimStrength:{value:.3}};function hm(){mm.rimColor.value.set(H.rim)}function gm(e){e.onBeforeCompile=e=>{e.uniforms.rimColor=mm.rimColor,e.uniforms.rimStrength=mm.rimStrength,e.fragmentShader=`uniform vec3 rimColor;
uniform float rimStrength;
`+e.fragmentShader.replace(`#include <opaque_fragment>`,`float rim = 1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0);
outgoingLight += rimColor * pow(rim, 3.0) * rimStrength;
#include <opaque_fragment>`)}}function _m(e,t={}){let n=new sl({color:e,gradientMap:pm(),vertexColors:t.painted??!1,emissive:t.emissive??`#000000`,emissiveIntensity:t.emissiveIntensity??1,transparent:t.transparent??!1,opacity:t.opacity??1,side:t.side??0});return gm(n),n}function vm(e,t,n){let r=e.getAttribute(`normal`),i=new Float32Array(r.count*3),a=new Y;for(let e=0;e<r.count;e++){let o=ti.clamp(r.getY(e),0,1);a.copy(n).lerp(t,o*o),a.toArray(i,e*3)}e.setAttribute(`color`,new Ba(i,3))}function ym(e,t,n){e.computeBoundingBox();let r=e.boundingBox.max.y,i=e.getAttribute(`position`),a=new Float32Array(i.count*3);for(let e=0;e<i.count;e++){let o=Math.sin(i.getX(e)*3.1+i.getZ(e)*2.3)*.25,s=Math.floor((r-i.getY(e))/n+o);t[Math.min(t.length-1,Math.max(0,s))].toArray(a,e*3)}e.setAttribute(`color`,new Ba(a,3))}function bm(e,t,n){e.computeBoundingBox();let{min:r,max:i}=e.boundingBox,a=e.getAttribute(`position`),o=new Float32Array(a.count*3),s=new Y;for(let e=0;e<a.count;e++){let c=(a.getY(e)-r.y)/(i.y-r.y||1);s.copy(t).lerp(n,c),s.toArray(o,e*3)}e.setAttribute(`color`,new Ba(o,3))}function xm(e){let t=Math.floor(Math.abs(e))%2147483646||1;return()=>(t=t*16807%2147483647,(t-1)/2147483646)}function Sm(e,t,n,r){let i=Math.sin(e*127.1+t*311.7+n*74.7+r*19.3)*43758.5453;return(i-Math.floor(i))*2-1}function Cm(e){let t=e.toNonIndexed();return t.computeVertexNormals(),e.dispose(),t}function wm(e,t,n,r,i,a=-1){let o=new ys(e,t,n,2,1,2),s=o.getAttribute(`position`),c=new K;for(let o=0;o<s.count;o++){c.fromBufferAttribute(s,o);let l=[c.x,c.y,c.z].map(e=>Math.round(e*1e3)),u=e=>Sm(l[0],l[1],l[2],r+e)*i,d=c.x+u(1)*e,f=c.y+u(2)*t*.6,p=c.z+u(3)*n,m=c.y>0&&Math.abs(Math.abs(c.x)-e/2)<1e-6&&Math.abs(Math.abs(c.z)-n/2)<1e-6,h=+(c.x>0)+(c.z>0?2:0);m&&h===a&&(f-=t*.55,d*=.82,p*=.82),s.setXYZ(o,d,f,p)}return Cm(o)}function Tm(e,t,n){let r=new Ss(e,t,9,7),i=r.getAttribute(`position`),a=new K;for(let e=0;e<i.count;e++){a.fromBufferAttribute(i,e);let t=[a.x,a.y,a.z].map(e=>Math.round(e*1e3)),r=1+Sm(t[0],t[1],t[2],n)*.22;i.setXYZ(e,a.x*r,a.y,a.z*r)}return Cm(r)}function Em(e,t,n,r){let i=xm(t),a=new J,o=.92,s=.2,c=i()<.3?Math.floor(i()*4):-1,l=(i()-.5)*.06,u=(t,i)=>(vm(t,n.clone().offsetHSL(0,0,i),r.clone().offsetHSL(0,0,i)),new X(t,e));if(i()<.28){let e=.035,n=.35+i()*.3,r=i()<.5,d=[n*o-e/2,(1-n)*o-e/2],f=-.92/2;d.forEach((n,d)=>{let p=d===0?c:-1,m=r?wm(n,s,o,t+d*7,.035,p):wm(o,s,n,t+d*7,.035,p),h=u(m,l+(i()-.5)*.04),g=f+n/2;h.position.set(r?g:0,-i()*.025,r?0:g),h.rotation.set((i()-.5)*.05,0,(i()-.5)*.05),a.add(h),f+=n+e})}else a.add(u(wm(o,s,o,t,.03,c),l));return a}function Dm(e,t){e.updateMatrixWorld(!0);let n=e.matrixWorld.clone().invert(),r=[];e.traverse(e=>{if(!(e instanceof X))return;let t=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();t.hasAttribute(`uv`)&&t.deleteAttribute(`uv`),t.applyMatrix4(n.clone().multiply(e.matrixWorld)),r.push(t),e.geometry.dispose()});let i=em(r);return r.forEach(e=>e.dispose()),new X(i,t)}function Om(e,t,n,r,i=1){let a=e.index?e.toNonIndexed():e;if(a.deleteAttribute(`uv`),a.applyMatrix4(new Ti().compose(n,new ni().setFromEuler(r),new K(i,i,i))),a.computeVertexNormals(),t){let e=new Float32Array(a.getAttribute(`position`).count*3);for(let n=0;n<e.length;n+=3)t.toArray(e,n);a.setAttribute(`color`,new Ba(e,3))}return a}function km(e,t){let n=new Y(H.petals[Math.floor(e()*H.petals.length)]),r=[],i=.07+e()*.06,a=new xs(.008,.008,i,4);a.translate(0,i/2,0),r.push(Om(a,new Y(H.grassRoot),t,new Fi));let o=t.clone().setY(t.y+i);for(let e=0;e<5;e++){let t=e/5*Math.PI*2;r.push(Om(new Jc(.03,5,3),n,o.clone().add(new K(Math.cos(t)*.032,0,Math.sin(t)*.032)),new Fi,1))}return r.push(Om(new Jc(.02,5,3),new Y(H.flowerCenter),o,new Fi)),r}function Am(e,t,n){let r=[],i=5+Math.floor(e()*6);for(let a=0;a<i;a++){let o=new Uc(.06*(1-a/i*.5));o.scale(1,1.6,.45);let s=new Y(H.leaves).offsetHSL(0,0,-.1).lerp(new Y(H.leavesLight),e());r.push(Om(o,s,new K(t.x+n.x*.04+Math.sin(a*1.7)*.03,t.y-a*.11,t.z+n.z*.04+Math.cos(a*1.3)*.03),new Fi(e()*.6,e()*Math.PI,e()*.6)))}return r}function jm(){return _m(`#ffffff`,{painted:!0,side:2})}function Mm(e,t,n,r,i){let a=xm(n),o=[],s=[];for(let n=0;n<t;n++)for(let t=0;t<e;t++)if(i(t,n))for(let[e,r]of[[1,0],[-1,0],[0,1],[0,-1]])i(t+e,n+r)||s.push({x:t,y:n,dx:e,dy:r});let c=n=>{let r=s[Math.floor(a()*s.length)],i=a()-.5;return{point:new K(r.x+.5-e/2+r.dx*(.5+n)+(r.dy?i:0),0,r.y+.5-t/2+r.dy*(.5+n)+(r.dx?i:0)),outward:new K(r.dx,0,r.dy)}};for(let e=0;e<18;e++)o.push(...km(a,c(.14).point));for(let e=0;e<7;e++){let{point:e,outward:t}=c(.24);o.push(...Am(a,e.setY(-.03),t))}let l=em(o);o.forEach(e=>e.dispose());let u=new X(l,r);return u.receiveShadow=!0,u}function Nm(e,t){let n=new No({color:t,transparent:!0,opacity:.55,depthWrite:!1,toneMapped:!1}),r=new J,i=new X(new Gc(e*.9,e,48),n);r.add(i);let a=new X(new Gc(e*.62,e*.66,48),n);r.add(a);for(let t=0;t<8;t++){let i=t/8*Math.PI*2,a=new X(new Wc(e*.22,e*.05),n);a.position.set(Math.cos(i)*e*.77,Math.sin(i)*e*.77,0),a.rotation.z=i,r.add(a)}let o=new J;return o.add(Dm(r,n)),o.rotation.x=-Math.PI/2,o.position.y=.035,{rune:o,material:n}}function Pm(e){let t=xm(e),n=[],r=new Y(H.cloudShade),i=new Y(H.cloudLight);for(let e=0;e<26;e++){let e=t()*Math.PI*2,a=6+t()*16,o=new K(Math.cos(e)*a,-13-t()*2,Math.sin(e)*a),s=3+Math.floor(t()*3);for(let e=0;e<s;e++){let e=new Hc(1+t()*1.4,1);e.scale(1.4,.55,1),bm(e,r,i),n.push(Om(e,null,o.clone().add(new K((t()-.5)*2.6,t()*.4,(t()-.5)*2)),new Fi(0,t()*Math.PI,0)))}}let a=em(n);return n.forEach(e=>e.dispose()),new X(a,_m(`#ffffff`,{painted:!0}))}function Fm(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,64,0);n.addColorStop(0,`rgba(255,255,255,0)`),n.addColorStop(.5,`rgba(255,255,255,1)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),t.globalCompositeOperation=`destination-in`;let r=t.createLinearGradient(0,0,0,64);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=r,t.fillRect(0,0,64,64);let i=new hs(e),a=new J,o=[];return[[-3.5,1.4,.035],[-1.2,1.1,.025],[1.6,1.7,.03]].forEach(([e,t,n])=>{let r=new No({map:i,color:H.sun,transparent:!0,opacity:n,depthWrite:!1,blending:2,side:2,toneMapped:!1,fog:!1});o.push(r);let s=new X(new Wc(t,14),r);s.position.set(e,3,-2),s.rotation.z=-.38,a.add(s)}),{shafts:a,materials:o}}function Im(e,t,n){let r=new Hc(e,1),i=r.getAttribute(`position`);for(let e=0;e<i.count;e++){let t=1+Math.sin(e*12.9898+n*78.233)*.08;i.setXYZ(e,i.getX(e)*t,i.getY(e)*t*.85,i.getZ(e)*t)}return bm(r,new Y(H.leaves).offsetHSL(0,0,-.08),new Y(H.leavesLight)),Om(r,null,t,new Fi(0,n,0))}function Lm(e,t){let n=xm(e),r=[],i=new xs(.05,.09,t,6);i.translate(0,t/2,0),r.push(Om(i,new Y(H.bark),new K,new Fi((n()-.5)*.15,0,(n()-.5)*.15)));let a=new K(0,t,0);r.push(Im(.42,a,e));for(let t=0;t<4;t++){let i=t/4*Math.PI*2+n();r.push(Im(.24+n()*.12,a.clone().add(new K(Math.cos(i)*.32,(n()-.3)*.25,Math.sin(i)*.32)),e+t+1))}let o=em(r);r.forEach(e=>e.dispose());let s=new X(o,_m(`#ffffff`,{painted:!0}));return s.castShadow=!0,s}function Rm(e){let t=xm(e),n=[],r=2+Math.floor(t()*2);for(let i=0;i<r;i++)n.push(Im(.13+t()*.07,new K((t()-.5)*.22,.08,(t()-.5)*.22),e+i));let i=em(n);return n.forEach(e=>e.dispose()),new X(i,_m(`#ffffff`,{painted:!0}))}var zm=.3,Bm={value:0};function Vm(){let e=new Wc(.05,zm,1,3),t=e.getAttribute(`position`);for(let e=0;e<t.count;e++){let n=(t.getY(e)+zm/2)/zm;t.setX(e,t.getX(e)*(1-n*.9))}return e.translate(0,zm/2,0),e.computeVertexNormals(),bm(e,new Y(H.grassRoot),new Y(H.grassTip)),e}function Hm(){let e=_m(`#ffffff`,{painted:!0,side:2}),t=e.onBeforeCompile;return e.onBeforeCompile=(n,r)=>{t.call(e,n,r),n.uniforms.windTime=Bm,n.vertexShader=`uniform float windTime;
`+n.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
// Each blade's root position sets its own phase, so gusts roll across the meadow.
vec3 root = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
float bend = transformed.y / ${zm.toFixed(2)};
float gust = sin(windTime * 1.5 + root.x * 1.3 + root.z * 0.8) * 0.07
  + sin(windTime * 0.6 + root.x * 0.35) * 0.05;
transformed.x += gust * bend * bend;
transformed.z += gust * 0.5 * bend * bend;`)},e.customProgramCacheKey=()=>`wind-grass`,e}function Um(e,t,n,r,i){let a=xm(n),o=[],s=.22,c=(n,r)=>({x:Math.floor(n+e/2),y:Math.floor(r+t/2)}),l=(n,r)=>{let a=c(n,r),o=1/0;for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){if(!i(a.x+c,a.y+s))continue;let l=a.x+c-e/2,u=a.y+s-t/2,d=Math.max(l-n,0,n-(l+1)),f=Math.max(u-r,0,r-(u+1));o=Math.min(o,Math.hypot(d,f))}return o};for(let n=0;o.length<1700&&n<4e4;n++){let n=(a()*2-1)*(e/2+s),r=(a()*2-1)*(t/2+s),i=l(n,r);i>0&&i<=s&&o.push(new K(n,0,r))}for(let n=0;n<t;n++)for(let r=0;r<e;r++)if(i(r,n)){for(let[s,c]of[[1,0],[0,1]])if(i(r+s,n+c))for(let i=0;i<6;i++){if(a()>.45)continue;let i=a(),c=(a()-.5)*.06;o.push(new K(s?r+1-e/2+c:r+i-e/2,0,s?n+i-t/2:n+1-t/2+c))}}let u=new ns(Vm(),Hm(),o.length),d=new Ti,f=new ni,p=new K,m=new Y,h=new Y(H.grassDry);return o.forEach((e,t)=>{let n=(l(e.x,e.z)===0?r/zm+.3:.6)+a()*.6;f.setFromEuler(new Fi((a()-.5)*.4,a()*Math.PI,(a()-.5)*.4)),p.set(1+a()*.6,n,1),d.compose(e,f,p),u.setMatrixAt(t,d),m.set(`#ffffff`).lerp(h,a()<.2?.7:a()*.15),u.setColorAt(t,m)}),u.receiveShadow=!0,u}var Wm=.34,Gm=.75,Km=-.22,qm=1.4,Jm=.55,Ym=1.9,Xm=.9,Zm=.8;function Qm(e,t){return .1+e*Math.min(.22,Zm/Math.max(1,t-1))}function $m(e){return Qm(e-1,e)+Xm}var eh=3.5,th=.9,nh=1.4,rh=14,ih=14,ah=ti.degToRad(15),oh=ti.degToRad(52),sh=new K(Math.cos(oh)*Math.sin(ah),Math.sin(oh),Math.cos(oh)*Math.cos(ah)),ch=ti.degToRad(75),lh=new K(Math.cos(oh)*Math.sin(ch),Math.sin(oh),Math.cos(oh)*Math.cos(ch)),uh=Math.atan2(sh.z,sh.x);function dh(e){let t=Math.PI*.9;return uh+t/2+e()*(Math.PI*2-t)}var fh=-.8,ph=1.6,mh=2.2,hh=4.8,gh=-140,_h=440,vh=24,yh=.35,bh=.5,xh=4.5,Sh=3,Ch=`#6e625e`,wh=[`#5a4a44`,`#443632`,`#2e2422`,`#504038`,`#241c1a`,`#3a2e2a`],Th=34,Eh=4,Dh=19,Oh=.94,kh=1.2,Ah=1,jh=`#d9a93a`,Mh=`#2fbfb3`,Nh=`#ff7a2a`,Ph=`#c8ecff`,Fh=`#6fb6ff`,Ih=`#e8d7a6`,Lh=3,Rh=.7,zh=2.2,Bh=14,Vh=600,Hh=.35,Uh=2.4,Wh=2.5,Gh=new K(12,0,-6),Kh=new K(16,0,0),qh=18,Jh=.18,Yh=.34,Xh=2.4,Zh=2.5,Qh=.8,$h=.5,eg=.1,tg=.3,ng=new K(0,1,0),rg=new K(-4,9,5),ig=.14,ag=35e5,og=1.25,sg=1/45,cg=.1,lg=1,ug=H.emptyOrb,dg=(()=>{let e=new Y(ug).getRGB(new Y,dr);return{r:e.r,g:e.g,b:e.b}})();function fg(e){return new Y().setRGB(e.r,e.g,e.b,dr)}function pg(e){return _m(e)}function mg(){return _m(`#ffffff`,{painted:!0})}function hg(){return _m(`#ffffff`,{painted:!0,transparent:!0})}var gg=.1,_g=`#bff6ff`,vg=.55,yg=.5,bg=new K(0,Wm,0);function xg(e){return e.traverse(e=>{e instanceof X&&(e.receiveShadow=!0)}),e}function Sg(e,t){return fg(e).multiplyScalar(t)}function Cg(e){let t=e.r+e.g+e.b;return t<=1.2?1:1-.45*Math.min(1,(t-1.2)/1.6)}function wg(e){return e.traverse(e=>{e instanceof X&&(e.castShadow=!0,e.receiveShadow=!0)}),e}function Q(e,t,n=0,r=0,i=0){let a=new X(e,t);return a.position.set(n,r,i),a}var Tg=.22;function Eg(e){let t=[];for(let n=0;n<e.rows;n++)for(let r=0;r<e.columns;r++)xt(e,{x:r+.5,y:n+.5})&&t.push({x:r+.5-e.columns/2,z:n+.5-e.rows/2});return t}function Dg(e,t,n){let r=[e[Math.floor(n()*e.length)]];for(;r.length<Math.min(t,e.length);){let t=e[0],i=-1;for(let a of e){let e=Math.min(...r.map(e=>Math.hypot(e.x-a.x,e.z-a.z)))*(.75+n()*.5);e>i&&(i=e,t=a)}r.push(t)}return r}function Og(e){return JSON.stringify(e.voids??[])}function kg(e,t){let n=e.filter(e=>e.some(e=>Math.abs(e.x-t.x)+Math.abs(e.z-t.z)===1)),r=[t,...n.flat()];return[...e.filter(e=>!n.includes(e)),r]}function Ag(e,t,n){let r=0;for(let i of e){let e=t-i.x,a=n-i.z,o=Math.hypot(e,a);if(o>2)continue;let s=Math.PI*2/i.sides,c=((Math.atan2(a,e)-i.turn)%s+s)%s-s/2,l=i.radius*Math.cos(s/2)/Math.cos(c);r=Math.max(r,.56+(l-o)*3)}return Math.min(r,1.6)}function jg(e,t){let n=xm(t*3+11);return e.map(e=>({x:e.x+(n()-.5)*.3,z:e.z+(n()-.5)*.3,radius:.78+n()*.3,sides:5+Math.floor(n()*3),turn:n()*Math.PI*2}))}var Mg=new WeakMap;function Ng(e,t){let n=Mg.get(e);if(n)return n;let r=.08,i=e.map(e=>e.x),a=e.map(e=>e.z),o=Math.min(...i)-1.5,s=Math.min(...a)-1.5,c=Math.ceil((Math.max(...i)+1.5-o)/r),l=Math.ceil((Math.max(...a)+1.5-s)/r),u=new Float32Array((c+1)*(l+1)),d=jg(e,t);for(let e=0;e<=l;e++)for(let t=0;t<=c;t++)u[e*(c+1)+t]=Ag(d,o+t*r,s+e*r);let f={step:r,x0:o,z0:s,nx:c,nz:l,field:u};return Mg.set(e,f),f}function Pg(e,t,n){let{step:r,x0:i,z0:a,nx:o,nz:s,field:c}=Ng(e,t),l=(e,t)=>c[t*(o+1)+e]-n,u=new Map,d=(e,t,n,o,s)=>{if(!u.has(e)){let c=l(t,n),d=c/(c-l(o,s));u.set(e,new G(i+(t+(o-t)*d)*r,a+(n+(s-n)*d)*r))}return e},f=new Map,p=(e,t)=>{f.set(e,[...f.get(e)??[],t]),f.set(t,[...f.get(t)??[],e])};for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=[l(t,e),l(t+1,e),l(t+1,e+1),l(t,e+1)].map(e=>e>0),r=[];n[0]!==n[1]&&r.push(d(`h${t},${e}`,t,e,t+1,e)),n[1]!==n[2]&&r.push(d(`v${t+1},${e}`,t+1,e,t+1,e+1)),n[3]!==n[2]&&r.push(d(`h${t},${e+1}`,t,e+1,t+1,e+1)),n[0]!==n[3]&&r.push(d(`v${t},${e}`,t,e,t,e+1)),r.length===2&&p(r[0],r[1]),r.length===4&&(p(r[0],r[1]),p(r[2],r[3]))}let m=[],h=new Set;for(let e of f.keys()){if(h.has(e))continue;let n=[],r=``,i=e;for(;!h.has(i);){h.add(i),n.push(u.get(i));let e=(f.get(i)??[]).find(e=>e!==r&&!h.has(e));if(!e)break;r=i,i=e}n.length>8&&m.push(Fg(n,t))}return m}function Fg(e,t){let n=e=>{let t=e[0],r=e[e.length-1],i=r.clone().sub(t),a=i.length()||1,o=0,s=0;for(let n=1;n<e.length-1;n++){let r=e[n].clone().sub(t),c=Math.abs(i.x*r.y-i.y*r.x)/a;c>o&&(o=c,s=n)}return o<.11?[t,r]:[...n(e.slice(0,s+1)).slice(0,-1),...n(e.slice(s))]},r=Math.floor(e.length/2),i=[...n(e.slice(0,r+1)).slice(0,-1),...n([...e.slice(r),e[0]]).slice(0,-1)],a=xm(t+e.length);return i.map(e=>new G(e.x+(a()-.5)*.14,e.y+(a()-.5)*.14))}function Ig(e,t,n,r,i,a){let o=Pg(e,t,n);if(!o.length)return null;let s=e=>Math.abs(Ic.area(e));o.sort((e,t)=>s(t)-s(e));let c=new zc(new tc(Ic.isClockWise(o[0])?[...o[0]].reverse():o[0]),{depth:r,bevelEnabled:!1});return c.rotateX(Math.PI/2),c.computeVertexNormals(),vm(c,i,a),c}function Lg(e,t,n){let r=new J,i=mg(),a=wh.map(e=>new Y(e)),o=xm(t),s=new J,c=n-fh+.5,l=new Y(Ch);for(let n=0,r=0;n<c;r++){let u=Math.min(c-n,.14+o()*.16),d=.56-n/c*.08-(r>0&&o()<.3?.06:0),f=a[r%a.length],p=Ig(e,t,d,u,r===0?l:f,f.clone().multiplyScalar(.9));p&&s.add(Q(p,i,0,-n,0)),n+=u}r.add(Dm(s,i));let u=Pg(e,t,.56).sort((e,t)=>Math.abs(Ic.area(t))-Math.abs(Ic.area(e)))[0];if(u){let e=new Kc(new tc(u.map(e=>new G(e.x,-e.y))));e.rotateX(-Math.PI/2),r.add(Q(e,zg(),0,.004,0))}let d=Ig(e,t,.4,.08,new Y,new Y);return d&&r.add(Q(d,Xg,0,fh-n+.05,0)),xg(r)}var Rg=null;function zg(){if(Rg)return Rg;let e=document.createElement(`canvas`);e.width=512,e.height=512;let t=e.getContext(`2d`),n=xm(17);t.fillStyle=Ch,t.fillRect(0,0,512,512);let r=e=>{for(let t of[-512,0,512])for(let n of[-512,0,512])e(t,n)};for(let e=0;e<160;e++){let e=n()*512,i=n()*512,a=12+n()*46,o=n()<.55?`58, 48, 46`:`128, 118, 114`,s=.18+n()*.25;r((n,r)=>{let c=t.createRadialGradient(e+n,i+r,0,e+n,i+r,a);c.addColorStop(0,`rgba(${o}, ${s})`),c.addColorStop(1,`rgba(${o}, 0)`),t.fillStyle=c,t.fillRect(e+n-a,i+r-a,a*2,a*2)})}for(let e=0;e<30;e++){let e=n()*512,i=n()*512,a=n()*Math.PI*2,o=[[e,i]];for(let t=0;t<8+n()*14;t++)a+=(n()-.5)*1.1,e+=Math.cos(a)*(6+n()*10),i+=Math.sin(a)*(6+n()*10),o.push([e,i]);let s=2+n()*2.5;r((e,n)=>{for(let[r,i,a]of[[1.2,`rgba(214, 182, 148, 0.35)`,s*.8],[0,`rgba(52, 34, 24, 0.9)`,s]])t.strokeStyle=i,t.lineWidth=a,t.beginPath(),o.forEach(([i,a],o)=>o===0?t.moveTo(i+e+r,a+n+r):t.lineTo(i+e+r,a+n+r)),t.stroke()})}for(let e=0;e<2600;e++)t.fillStyle=n()<.6?`rgba(70, 50, 36, 0.45)`:`rgba(215, 186, 150, 0.4)`,t.fillRect(n()*512,n()*512,1+n()*2,1+n()*2);let i=new hs(e);return i.colorSpace=dr,i.wrapS=Ht,i.wrapT=Ht,i.repeat.set(.33,.33),Rg=_m(`#ffffff`),Rg.map=i,Rg}var Bg=1,Vg=1.4,Hg=.22,Ug=9,Wg=12;function Gg(e,t){return t.every(t=>{let n=Math.abs(e.x-t.x),r=Math.abs(e.z-t.z);return n>.01&&r>.01&&Math.abs(n-r)>.01})}function Kg(e,t,n,r){let i=xm(r*5+3),a=mg(),o=wh.map(e=>new Y(e)),s=new J,c=e.filter(e=>t.every(t=>Math.hypot(t.x-e.x,t.z-e.z)>=1.5)),l=Math.floor(c.length/Ug);for(let e=0;e<l;e++){let t=c[Math.floor(i()*c.length)],n=4+Math.floor(i()*4);for(let c=0;c<n;c++){let n=Hg*(.45+i()*.55),l=Tm(.09+i()*.13,n,r+e*31+c*7);ym(l,o,.16),s.add(Q(l,a,t.x+(i()-.5)*.9,n/2-.03,t.z+(i()-.5)*.9))}}let u=new J,d=e.filter(e=>Gg(e,n)&&t.every(t=>Math.hypot(t.x-e.x,t.z-e.z)>=1.2)),f=d.filter(t=>!e.some(e=>Math.abs(e.x-t.x)<.01&&Math.abs(e.z-(t.z-1))<.01)),p=Math.ceil(e.length/Wg),m=f.length?f:d;m.length&&Dg(m,p,i).forEach((e,t)=>{for(let n of Jg(a,r+t*13))n.position.x+=e.x,n.position.z+=e.z,u.add(n)});let h=new J;return s.children.length&&h.add(Dm(s,a)),u.children.length&&h.add(Dm(u,a)),wg(h)}var qg=[`#b3a49a`,`#9a8a80`,`#c4b6aa`,`#8a7a70`];function Jg(e,t){let n=xm(t),r=qg.map(e=>new Y(e)),i=(n,i,a,o)=>{let s=Tm(a,o,t+Math.round(a*100));return ym(s,r,.2),Q(s,e,n,o/2-.04,i)},a=n()*Math.PI*2;return[i(0,0,.42,1.25+n()*.3),i(Math.cos(a)*.32,Math.sin(a)*.32,.24,.75),i(-Math.sin(a)*.3,Math.cos(a)*.3,.2,.55)]}var Yg=`#a8a8a8`,Xg=new No({color:new Y(`#ff7a2a`).multiplyScalar(1.6),toneMapped:!1});function Zg(e,t){let n=1024,r=document.createElement(`canvas`);r.width=n,r.height=256;let i=r.getContext(`2d`),a=xm(e),o=(e,t)=>{for(let r of[-1024,0,n])e(t+r)},s=()=>128+((a()+a()+a())/3-.5)*256*1.1;if(!t){let e=i.createLinearGradient(0,0,0,256);e.addColorStop(0,`#1a0603`),e.addColorStop(.3,`#5a1606`),e.addColorStop(.5,`#8a2a08`),e.addColorStop(.7,`#5a1606`),e.addColorStop(1,`#1a0603`),i.fillStyle=e,i.fillRect(0,0,n,256)}for(let e=0;e<(t?70:180);e++){let e=a()*n,r=s(),c=30+a()*170,l=1+a()*(t?3:5),u=a()<.2?`255, 190, 90`:`255, 100, 25`,d=(t?.35:.25)+a()*.45;o(e=>{let t=i.createLinearGradient(e-c/2,0,e+c/2,0);t.addColorStop(0,`rgba(${u}, 0)`),t.addColorStop(.5,`rgba(${u}, ${d})`),t.addColorStop(1,`rgba(${u}, 0)`),i.fillStyle=t,i.beginPath(),i.ellipse(e,r,c/2,l,0,0,Math.PI*2),i.fill()},e)}if(!t){i.shadowColor=`rgba(255, 110, 30, 0.6)`,i.shadowBlur=10;for(let e=0;e<40;e++){let e=a()<.5?0:1,t=Math.abs(e*256-a()**1.6*256*.55),r=a()*n,s=8+a()*26,c=4+a()*10,l=20+a()*18;o(e=>{i.fillStyle=`rgba(${l+24}, ${l*.45}, ${l*.25}, 0.7)`,i.beginPath();for(let n=0;n<7;n++){let r=n/7*Math.PI*2,o=.7+a()*.5;i.lineTo(e+Math.cos(r)*s*o,t+Math.sin(r)*c*o)}i.closePath(),i.fill()},r)}}let c=new hs(r);return c.colorSpace=dr,c.wrapS=Ht,c.wrapT=Ut,c}var Qg=null;function $g(){if(Qg)return Qg;let e=document.createElement(`canvas`);e.width=1,e.height=64;let t=e.getContext(`2d`),n=t.createLinearGradient(0,64,0,0);return n.addColorStop(0,`rgba(255, 255, 255, 0.55)`),n.addColorStop(.35,`rgba(255, 255, 255, 0.18)`),n.addColorStop(1,`rgba(255, 255, 255, 0)`),t.fillStyle=n,t.fillRect(0,0,1,64),Qg=new hs(e),Qg.colorSpace=dr,Qg}function e_(e,t){let n=xm(e),r=[{length:70,weight:.5},{length:29,weight:.32},{length:11,weight:.18}].map(e=>({...e,length:e.length*(.8+n()*.4),phase:n()*Math.PI*2}));return e=>t*((r.reduce((t,n)=>t+n.weight*Math.sin(e/n.length*Math.PI*2+n.phase),0)+1)/2*1.2-.2)}function t_(e,t,n){let r=Math.ceil(_h/bh),i=[],a=[],o=[];for(let o=0;o<=r;o++){let r=gh+o*bh;i.push(r,n,e(r),r,n,t(r));let s=(r-gh)/vh;a.push(s,0,s,1)}let s=t(gh)>e(gh);for(let e=0;e<r;e++){let[t,n,r,i]=[2*e,2*e+1,2*e+2,2*e+3];o.push(...s?[t,n,r,n,i,r]:[t,r,n,n,r,i])}let c=new to;return c.setAttribute(`position`,new Ua(i,3)),c.setAttribute(`uv`,new Ua(a,2)),c.setIndex(o),c.computeVertexNormals(),c}var n_=1,r_=.4,i_=[`#a0603f`,`#6a4a34`,`#b08a52`,`#5a4038`,`#94583c`,`#7a6048`].map(e=>new Y(e)),a_=[{warm:new Y(`#a8644a`),dark:new Y(`#5a3226`)},{warm:new Y(`#94733f`),dark:new Y(`#4a3a22`)}],o_=null;function s_(){if(o_)return o_;let e=document.createElement(`canvas`);e.width=256,e.height=256;let t=e.getContext(`2d`),n=xm(73);t.fillStyle=`#d8d0c8`,t.fillRect(0,0,256,256);let r=(e,t,n)=>{for(let r of[-256,0,256])for(let i of[-256,0,256])e(t+r,n+i)};for(let e=0;e<40;e++){let[e,i,a]=[n()*256,n()*256,15+n()*35],o=n()<.5?`255, 245, 235`:`120, 100, 90`;r((e,n)=>{let r=t.createRadialGradient(e,n,0,e,n,a);r.addColorStop(0,`rgba(${o}, 0.4)`),r.addColorStop(1,`rgba(${o}, 0)`),t.fillStyle=r,t.fillRect(e-a,n-a,a*2,a*2)},e,i)}t.strokeStyle=`rgba(55, 40, 34, 0.7)`,t.lineWidth=1.8;for(let e=0;e<22;e++){let[e,i]=[n()*256,n()*256],a=n()*Math.PI*2,o=[[e,i]];for(let t=0;t<6;t++)a+=(n()-.5)*1.2,e+=Math.cos(a)*9,i+=Math.sin(a)*9,o.push([e,i]);r((e,n)=>{t.beginPath(),o.forEach(([r,i],a)=>a===0?t.moveTo(r+e-o[0][0],i+n-o[0][1]):t.lineTo(r+e-o[0][0],i+n-o[0][1])),t.stroke()},o[0][0],o[0][1])}for(let e=0;e<1400;e++){let[e,i]=[n()*256,n()*256],a=n()<.8?1.2+n()*1.8:3.5+n()*4,o=130+n()*125;r((e,n)=>{t.fillStyle=`rgba(45, 34, 28, 0.6)`,t.beginPath(),t.ellipse(e,n+a*.35,a,a*.75,0,0,Math.PI*2),t.fill(),t.fillStyle=`rgb(${o}, ${o*.93}, ${o*.86})`,t.beginPath(),t.ellipse(e,n,a*.85,a*.65,0,0,Math.PI*2),t.fill()},e,i)}return o_=new hs(e),o_.colorSpace=dr,o_.wrapS=Ht,o_.wrapT=Ht,o_}var c_=[`#7a5440`,`#5e5048`,`#8a4c34`,`#8a7464`,`#3e302a`].map(e=>new Y(e)),l_=[`#ffffff`,`#d6ccc4`,`#ece4dc`,`#bcb0a6`].map(e=>new Y(e));function u_(e,t,n){let r=xm(e),i=Array.from({length:n},()=>.8+r()*.35),a=[],o=.55;for(let e=0;e<t;e++){let s=.85/t*(.8+r()*.4),c=(.75+e/t*.25)*(e>0&&r()<.3?1.12:1),l=new xs(c,c,s,n,1);l.rotateY(r()*.4);let u=l.getAttribute(`position`);for(let e=0;e<u.count;e++){let[t,r]=[u.getX(e),u.getZ(e)],a=i[Math.round((Math.atan2(r,t)+Math.PI*2)/(Math.PI*2)*n)%n];u.setX(e,t*a),u.setZ(e,r*a)}l.translate(0,o-s/2,0),l.deleteAttribute(`uv`);let d=l.toNonIndexed();l.dispose(),d.computeVertexNormals();let f=d.getAttribute(`normal`),p=l_[1+e%(l_.length-1)],m=new Float32Array(f.count*3);for(let t=0;t<f.count;t++)(e===0&&f.getY(t)>.9?l_[0]:p).toArray(m,t*3);d.setAttribute(`color`,new Ba(m,3)),a.push(d),o-=s}let s=em(a);return a.forEach(e=>e.dispose()),s}function d_(e,t,n){let r=xm(e),i=new Hc(1,t);i.deleteAttribute(`normal`),i.deleteAttribute(`uv`);let a=nm(i);i.dispose();let o=Array.from({length:5},()=>({toward:new K(r()-.5,r()-.5,r()-.5).normalize(),push:(r()-.45)*.6})),s=a.getAttribute(`position`),c=new K;for(let e=0;e<s.count;e++){c.fromBufferAttribute(s,e);let t=o.reduce((e,t)=>e+t.push*Math.max(0,c.dot(t.toward))**2,1);c.multiplyScalar(t),c.y=Math.max(c.y,-.35)*n,s.setXYZ(e,c.x,c.y,c.z)}return a.computeVertexNormals(),a}function f_(e,t){let n=xm(t+41),r=[],i=0,a=-.65,o=e?8:7;for(let t=0;t<o;t++){let o=t===0?e?1.4:1:e?1.8+n()*.8:1.3+n()*.6;r.push({start:i,end:i+o,height:a}),i+=o,a+=e?.5+n()*.4:2.8+n()*1}return r.push({start:i,end:140,height:a}),r}function p_(e,t,n){let r=xm(t+7),i=e>0,a=f_(i,t),o=(e,n)=>e===0?0:.35*Math.sin(n*.23+e*1.9+t)+.15*Math.sin(n*.61+e*.7),s=(e,t)=>a[e].start+o(e,t),c=(e,t)=>{let n=0;for(;n+1<a.length&&t>=s(n+1,e);)n++;return a[n].height},l=[];a.forEach((e,t)=>{if(t>0){let n=a[t-1].height,i=Math.max(2,Math.round((e.height-n)/r_)),o=e.start-i*.06;for(let a=0;a<i;a++){let s=n+(e.height-n)*a/i,c=n+(e.height-n)*(a+1)/i,u=a>0&&r()<.25?-.08:0;l.push({k:t,back:o+u,height:s,band:a,bumpy:!1}),l.push({k:t,back:o+u,height:c,band:a,bumpy:!1}),o+=.06}}let n=e.end-e.start,i=t===a.length-1?[.5,3,10,30,80]:[.5,n/2,n-.5];l.push({k:t,back:e.start+.05,height:e.height,band:-1,bumpy:!1});for(let r of i)r<n-.3&&l.push({k:t,back:e.start+r,height:e.height,band:-1,bumpy:!0})});let u=a[a.length-1];l.push({k:a.length-1,back:u.end,height:u.height,band:-1,bumpy:!1});let d=[],f=[],p=[],m=Math.ceil(_h/n_),h=(t,r)=>{let i=t.back+o(t.k,r),a=t.bumpy?Math.sin(r*1.3+i*.7)*Math.sin(i*1.7-r*.4)*.12:0;return[r,t.height+a,n(r)+e*i,i]},g=new Y;for(let e=0;e<m;e++){let n=gh+e*n_,a=n+n_;for(let e=0;e<l.length-1;e++){let[o,s]=[l[e],l[e+1]],c=h(o,n),u=h(s,n),m=h(o,a),_=h(s,a),v=(c[3]+u[3])/2;if(o.band>=0)g.copy(i_[(o.band+o.k*2)%i_.length]).multiplyScalar(1-Math.min(.25,v/60));else{let e=Math.sin(n*.35+t)*Math.sin(v*.5-n*.12)+.5*Math.sin(n*.9+v*.8),i=a_[Number(e>.1!=r()<.12)];g.copy(i.warm).lerp(i.dark,Math.min(1,v/14)),o.k>0&&!o.bumpy&&g.multiplyScalar(1.3),s.band===0&&g.multiplyScalar(.55)}g.multiplyScalar(.92+r()*.16);let y=i?[c,u,m,u,_,m]:[c,m,u,u,m,_];for(let[e,t,n,r]of y)d.push(e,t,n),f.push(g.r,g.g,g.b),p.push(e/3,(o.band>=0?t:r)/3)}}let _=new to;_.setAttribute(`position`,new Ua(d,3)),_.setAttribute(`color`,new Ua(f,3)),_.setAttribute(`uv`,new Ua(p,2)),_.computeVertexNormals();let v=new J,y=mg();y.map=s_(),v.add(new X(_,y));let b=mg();return v.add(m_(e,t,n,c,b)),v}function m_(e,t,n,r,i){let a=xm(t+19),o=e>0,s=[];for(let e=gh;e<300;e+=.45+a()*.5)s.push({along:e,back:.25+a()*.4,size:.4+a()**1.5*.9});let c=o?1.2:2.4;for(let e=gh;e<300;e+=c+a()*c*1.3){let t=1.5+a()**1.4*24,n=(o?.9:1.2)*(.7+a()**1.5*1.8)+t*.05,r=o?Math.min(n,.6+t*.3):n,i=1+Math.floor(a()*2);for(let n=0;n<i;n++)s.push({along:e+(a()-.5)*2,back:t+(a()-.5)*2,size:r*(.6+a()*.4)});let c=3+Math.floor(a()*5);for(let n=0;n<c;n++){let n=a()*Math.PI*2,i=r*(.9+a()*1.2);s.push({along:e+Math.cos(n)*i,back:Math.max(.8,t+Math.sin(n)*i),size:r*(.2+a()**1.5*.5)})}}for(let e=gh;e<300;e+=o?.3:.6){let t=.8+a()**1.6*24;a()<t/40||s.push({along:e,back:t,size:.14+a()**2*.3})}let l=(e,t)=>{let n=Tm(e,1.7,t);return n.translate(0,.55,0),ym(n,l_,.3),n},u=(e,t,n)=>{let r=d_(n,e,t);return ym(r,l_,.3),r},d=[u_(t+1,4,7),u_(t+2,3,6),u_(t+3,4,8),u(1,.75,t+4),l(.75,t+5)],f=e=>{let t=new Ss(e,1.7,6,1).toNonIndexed();return t.translate(0,.55,0),t.computeVertexNormals(),ym(t,l_,.3),t},p=[u_(t+6,2,6),u_(t+7,2,5),u_(t+8,3,7),u(0,.6,t+9),f(.6)],m=[u_(t+11,1,6),u_(t+12,1,5),u_(t+13,2,5),u(0,.5,t+14),f(.5)],h=[.24,.23,.23,.15,.15],g=()=>{let e=a(),t=h.findIndex(t=>(e-=t)<0);return t<0?h.length-1:t},_=[...d,...p,...m],v=_.map(()=>[]),y=_.map(()=>[]),b=new ni,x=new Fi,S=new Y(`#2a1d15`);for(let t of s){let i=(t.size>.8?0:t.size>.3?1:2)*h.length+g();x.set((a()-.5)*.3,a()*Math.PI*2,0),b.setFromEuler(x);let o=.85+a()*.4;v[i].push(new Ti().compose(new K(t.along,r(t.along,t.back)+t.size*.1,n(t.along)+e*t.back),b,new K(t.size*o,t.size,t.size/o)));let s=c_[Math.floor(a()*c_.length)];y[i].push(s.clone().lerp(S,Math.min(.35,t.back/40)).multiplyScalar(.9+a()*.2))}let C=new J;return _.forEach((e,t)=>{let n=new ns(e,i,v[t].length);v[t].forEach((e,r)=>{n.setMatrixAt(r,e),n.setColorAt(r,y[t][r])}),n.frustumCulled=!1,C.add(n)}),C}function h_(e,t,n){let r=new J,i=t=>e*n(t);return r.add(p_(e,t,i)),r.add(new X(t_(t=>i(t)-e*.08,t=>i(t)+e*.08,-.77),Xg)),r.add(new X(t_(i,t=>i(t)-e*1.4,-.78),new No({map:$g(),color:`#ff8a3a`,transparent:!0,blending:2,depthWrite:!1,toneMapped:!1}))),r}function g_(e,t,n){return e.some(e=>Math.abs(e.x-t)<.01&&Math.abs(e.z-n)<.01)}function __(e,t){let n=xm(t),r=new J,i=mg(),a=H.strata.map(e=>new Y(e)),o=new J,s=1.44;e.forEach((e,n)=>{let r=wm(s,.4,s,t+n*7,.012,n%4);vm(r,new Y(H.moss),a[0]),o.add(Q(r,i,e.x,-.2,e.z))});let c=t=>[[1,0],[-1,0],[0,1],[0,-1]].filter(([n,r])=>g_(e,t.x+n,t.z+r)).length;e.forEach((e,n)=>{let r=c(e);if(r>=3){let r=wm(1.12,.55,1.12,t+300+n,.03,n%4);ym(r,a.slice(1),.3),o.add(Q(r,i,e.x,-.67,e.z))}if(r===4){let r=wm(.98,.6,.98,t+400+n,.03,(n+1)%4);ym(r,a.slice(2),.3),o.add(Q(r,i,e.x,-1.24,e.z))}});let l=e.filter(e=>c(e)===4),u=Dg(l.length?l:e,Math.max(1,Math.round(e.length/9)),n),d=Math.sqrt(e.length/u.length),f=[];for(let t of e)for(let[n,r]of[[1,0],[-1,0],[0,1],[0,-1]])g_(e,t.x+n,t.z+r)||f.push({x:t.x+n,z:t.z+r});let p=(e,t)=>Math.max(.3,Math.min(...f.map(n=>Math.hypot(n.x-e,n.z-t)))-.5+Tg);for(let[e,r]of u.entries()){let s=Math.min(p(r.x,r.z)+.3,(.6+d*.45)*(.8+n()*.45)),c=s*(2+n()*1.5),l=Tm(s,c,t+e*11);l.rotateX(Math.PI),ym(l,a,.38);let u=Q(l,i,r.x,-1.2-c/2,r.z);u.rotation.y=n()*Math.PI,o.add(u)}return e.forEach((r,s)=>{if(![[1,0],[-1,0],[0,1],[0,-1]].some(([t,n])=>!g_(e,r.x+t,r.z+n))||n()>.35)return;let c=.32+n()*.25,l=c*(1.4+n()*1.6),u=Tm(c,l,t+500+s);u.rotateX(Math.PI),ym(u,a,.38),o.add(Q(u,i,r.x,-.4-l/2,r.z))}),r.add(Dm(o,i)),xg(r)}function v_(e,t){let n=xm(t),r=new J,i=mg(),a=new Y(H.stone),o=new Y(H.stoneSide),s=new J,c=t=>[[1,0],[-1,0],[0,1],[0,-1]].filter(([n,r])=>g_(e,t.x+n,t.z+r)).length;e.forEach((e,n)=>{let r=wm(1.44,.4,1.44,t+n,.02,n%4);vm(r,new Y(H.moss),o),s.add(Q(r,i,e.x,-.2,e.z));let l=c(e);if(l>=3){let r=wm(1.1,.5,1.1,t+100+n,.02,(n+1)%4);vm(r,a,o),s.add(Q(r,i,e.x,-.65,e.z))}if(l===4){let r=wm(1.02,.6,1.02,t+200+n,.02,(n+2)%4);vm(r,a,o),s.add(Q(r,i,e.x,-1.2,e.z))}});let l=H.strata.map(e=>new Y(e)),u=Dg(e,Math.max(1,Math.round(e.length/12)),n);for(let[r,a]of u.entries()){let o=.75+n()*.6+Math.sqrt(e.length)*.08,c=wm(o,22,o,t+7+r,.04,2);ym(c,l,.6),s.add(Q(c,i,a.x,-11.4,a.z))}for(let r=0;r<Math.min(6,e.length);r++){let l=e[Math.floor(n()*e.length)];if(c(l)===4)continue;let u=.3+n()*.35,d=wm(u,u*.8,u,t+20+r,.04,r);vm(d,a,o),s.add(Q(d,i,l.x+(n()-.5)*.6,-.9-n()*.4,l.z+(n()-.5)*.6))}return r.add(Dm(s,i)),xg(r)}function y_(e,t,n){let r=xm(t),i=new tc,a=Array.from({length:13},()=>.72+r()*.45);for(let t=0;t<=13;t++){let n=t/13*Math.PI*2,r=e*a[t%13];t===0?i.moveTo(Math.cos(n)*r,Math.sin(n)*r):i.lineTo(Math.cos(n)*r,Math.sin(n)*r)}let o=new zc(i,{depth:.4,bevelEnabled:!1});o.rotateX(-Math.PI/2),o.translate(0,-.4,0);let s=H.strata.map(e=>new Y(e)),c=mg(),l=new J;vm(o,new Y(n===`sky`?H.moss:H.stone),s[0]),l.add(Q(o,c,0,0,0));let u=e*Math.min(...a)*.85,d=n===`sky`?3:1;for(let e=0;e<d;e++){let i=u*(e===0?1:.45+r()*.25),a=r()*Math.PI*2,o=e===0?0:u-i;if(n===`sky`){let n=i*(1.8+r()*1.2),u=Tm(i,n,t+e*5);u.rotateX(Math.PI),ym(u,s,.38),l.add(Q(u,c,Math.cos(a)*o,-.4-n/2,Math.sin(a)*o))}else{let e=wm(i*1.2,22,i*1.2,t+9,.04,1);ym(e,s,.6),l.add(Q(e,c,0,-11.4,0))}}let f=new J;return f.add(Dm(l,c)),xg(f)}function b_(e){let t=xm(e),n=new J,r=mg(),i=H.strata.map(e=>new Y(e)),a=new J,o=new xs(Dh,Dh,Th,48,14,!0),s=o.getAttribute(`position`);for(let t=0;t<s.count;t++){let n=s.getX(t),r=s.getY(t),i=s.getZ(t),a=Math.atan2(i,n),o=1+.12*Math.sin(a*5+r*.3+e)+.08*Math.sin(a*13-r*.7)+.05*Math.sin(r*1.3+a*3);s.setXYZ(t,n*o,r,i*o)}o.scale(-1,1,1),o.computeVertexNormals(),ym(o,i,2.5),a.add(Q(o,r,0,Eh-Th/2,0));for(let n=0;n<26;n++){let o=dh(t),s=Dh*(.45+t()*.5),c=4+t()*9,l=Tm(.6+t()*1.2,c,e+300+n*11);ym(l,i,.9),a.add(Q(l,r,Math.cos(o)*s,-16+c/2,Math.sin(o)*s))}n.add(Dm(a,r));let c=new J;for(let e=0;e<40;e++){let e=dh(t),n=Dh*(.97+t()*.05),r=new Uc(.15+t()*.25);r.scale(1,2.2,1),r.translate(Math.cos(e)*n,-8+t()*18,Math.sin(e)*n),c.add(new X(r))}let l=new No({color:`#ffd27a`,toneMapped:!1,fog:!1});return n.add(Dm(c,l)),n}function x_(e,t){let n=mg(),r=new J,i=wm(.42,.14,.42,t,.02,0),a=wm(.28,e,.28,t+1,.035,1),o=new Y(H.stoneLight),s=new Y(H.stoneSide);vm(i,o,s),vm(a,o,s),r.add(Q(i,n,0,.07,0));let c=Q(a,n,0,.14+e/2,0);c.rotation.z=(t%5-2)*.03,r.add(c);let l=wm(.28,.5,.28,t+2,.04,2);vm(l,o,s);let u=Q(l,n,.35,.14,.1);return u.rotation.set(.2,t,Math.PI/2),r.add(u),Dm(r,n)}function S_(e,t){let n=Math.max(1e-4,t)*(e.size??1);e.upward?e.object.scale.set(1,n,1):e.object.scale.setScalar(n)}var C_=class{canvas;instant;renderer;scene=new sa;camera=new Ul(32,1,.1,100);safeTop=130;safeBottom=160;zoom=1;pan=new K;framedLook=new K;composer;bloom;mirrorReflections;quality=2;recentFrames=[];width=1;height=1;pixelRatio=0;lastView=null;glowTexture=dm();cylinder=new xs(1,1,1,10,1,!0);sparkles;distantIslands=[];clouds;shaftMaterials=[];world=`sky`;river=null;terraceLifts=new Map;lavaLifts=new Map;diving=null;arrivalDive=0;fill;island=null;departedIsland=null;cameraGoal=new K;lookGoal=new K;cameraLook=new K;cameraPlaced=!1;flight=null;backdrop=new J;sun;pieces=null;leavingPieces=null;removedPieces=[];celebration=null;activeMirror=-1;placement=this.buildPlacementPreview();placementCell=null;placementOpacity=0;time=0;constructor(e,t=!1){this.canvas=e,this.instant=t,this.renderer=new Lp({canvas:e,antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,this.renderer.toneMapping=0,this.renderer.info.autoReset=!1,this.scene.background=um(),this.scene.fog=new oa(H.haze,H.fogNear,H.fogFar);let n=new Uu(this.renderer);this.mirrorReflections=n.fromScene(new Rp,.04).texture,n.dispose(),this.fill=new jl(H.skyLight,H.groundLight,H.fillStrength),this.scene.add(this.fill);let r=new Jl(H.sun,H.sunStrength);this.sun=r,r.position.copy(rg),r.castShadow=!0,r.shadow.mapSize.set(1024,1024),r.shadow.camera.left=-6,r.shadow.camera.right=6,r.shadow.camera.top=6,r.shadow.camera.bottom=-6,r.shadow.radius=4,this.scene.add(r),this.scene.add(r.target);let i=new Si(1,1,{type:an,samples:4});this.composer=new Jp(this.renderer,i),this.composer.addPass(new Zp(this.scene,this.camera)),this.bloom=new $p(new G(1,1),.6,.35,lg),this.composer.addPass(this.bloom),this.composer.addPass(new Xp),this.scene.add(this.backdrop),this.buildBackdrop()}shownWorld(){return this.island?this.world:null}dive(e){this.diving={direction:e===`down`?-1:1,speed:0}}setWorld(e){if(e!==this.world){this.world=e,this.arrivalDive=this.diving?.direction??0,this.clear(),this.diving=null,_t(e),hm(),this.scene.background=um(),this.scene.fog=new oa(H.haze,H.fogNear,H.fogFar),this.fill.color.set(H.skyLight),this.fill.groundColor.set(H.groundLight),this.fill.intensity=H.fillStrength,this.sun.color.set(H.sun),this.sun.intensity=H.sunStrength;for(let e of[...this.backdrop.children])this.disposeObject(e);this.distantIslands=[],this.shaftMaterials=[],this.river&&=(this.disposeObject(this.river.group),null),e===`ember`&&this.buildRiver(),this.buildBackdrop()}}buildBackdrop(){if(this.sparkles=this.makeSparkles(),this.backdrop.add(this.sparkles),this.clouds=Pm(11),this.backdrop.add(this.clouds),this.world===`sky`){let{shafts:e,materials:t}=Fm();this.shaftMaterials=t,this.backdrop.add(e)}if(this.world===`depths`){this.backdrop.add(b_(29));let e=new X(new Wc(60,60),new No({map:this.glowTexture,color:`#c25a52`,transparent:!0,opacity:.18,depthWrite:!1,blending:2,fog:!1}));e.rotation.x=-Math.PI/2,e.position.y=-16,this.backdrop.add(e)}let e=this.world===`ember`?[]:[[-8,-3.5,-7,1.3],[5,-4.5,-11,1.8],[-2.5,-6,-12,1.1],[10,-5,-6,1]];for(let[t,n,r,i]of e){let e=y_(i,t*31+r,this.world);e.position.set(t,n,r),e.userData.baseY=n,this.distantIslands.push(e),this.backdrop.add(e)}}buildRiver(){let e=new J,t=Zg(5,!1),n=Zg(11,!0),r=t_(()=>-1,()=>1,0),i=(t,n,i)=>{let a=new X(r,new No({map:t,toneMapped:!1,...n}));a.position.y=i,a.frustumCulled=!1,e.add(a)};i(t,{color:Yg},fh),i(n,{transparent:!0,blending:2,depthWrite:!1,opacity:.4},-.79);let a=e_(31,xh),o=e_(57,Sh),s=h_(-1,31,a),c=h_(1,57,o);e.add(s,c),this.scene.add(e),this.river={group:e,surface:r,textures:[t,n],far:s,near:c,farCurve:a,nearCurve:o,farGoal:-8,nearGoal:8,shapedFor:``}}frameRiver(e,t,n){let r=this.river;r&&(r.farGoal=t-e.rows/2-hh,r.nearGoal=t+e.rows/2+mh,n&&this.placeRiverBanks(1))}placeRiverBanks(e){let t=this.river;if(!t)return;t.far.position.z+=(t.farGoal-t.far.position.z)*e,t.near.position.z+=(t.nearGoal-t.near.position.z)*e;let n=t.far.position.z,r=t.near.position.z,i=`${n.toFixed(3)},${r.toFixed(3)}`;if(i===t.shapedFor)return;t.shapedFor=i;let a=t.surface.getAttribute(`position`);for(let e=0;e<a.count;e+=2){let i=a.getX(e);a.setZ(e,n-t.farCurve(i)-.3),a.setZ(e+1,r+t.nearCurve(i)+.3)}a.needsUpdate=!0}setTerraces(e){if(this.terraceLifts.clear(),this.lavaLifts.clear(),this.world!==`ember`)return[];let t=Eg(e).reduce(kg,[]),n=this.viewDirection(),r=e=>e.reduce((e,t)=>e+t.x*n.x+t.z*n.z,0)/e.length,i=t.map(r),a=Math.max(...i),o=a-Math.min(...i)||1;return t.forEach(t=>{let n=(a-r(t))/o*ph;for(let r of t)this.terraceLifts.set(`${r.x+e.columns/2},${r.z+e.rows/2}`,n)}),t}liftAt(e,t){if(this.terraceLifts.size===0)return 0;let n=this.terraceLifts.get(`${Math.floor(e)+.5},${Math.floor(t)+.5}`);if(n!==void 0)return n;let r=Math.round(e*4)/4,i=Math.round(t*4)/4,a=`${r},${i}`,o=this.lavaLifts.get(a);if(o!==void 0)return o;let s=new Map;for(let[e,t]of this.terraceLifts){let[n,a]=e.split(`,`).map(Number),o=Math.hypot(Math.max(0,Math.abs(r-n)-.5),Math.max(0,Math.abs(i-a)-.5));o<(s.get(t)??1/0)&&s.set(t,o)}let[c,l]=[...s].sort((e,t)=>e[1]-t[1]),u=l&&c[1]+l[1]||1,d=l?(c[0]*l[1]+l[0]*c[1])/u:c[0];return this.lavaLifts.set(a,d),d}makeSparkles(){let e=new Float32Array(120);for(let t=0;t<40;t++)e[t*3]=(Math.random()-.5)*16,e[t*3+1]=Math.random()*9-4,e[t*3+2]=(Math.random()-.5)*16;let t=new to;return t.setAttribute(`position`,new Ba(e,3)),new fs(t,new ss({size:.09,map:this.glowTexture,color:H.mote,transparent:!0,opacity:.45,depthWrite:!1,blending:2,toneMapped:!1}))}resize(e,t){if(e===0||t===0)return;let n=Math.sqrt(ag/(e*t)),r=Math.min(window.devicePixelRatio,2),i=Math.min(r,Math.max(n,og)),a=this.quality===0?Math.min(i,Math.max(og,r*.75)):i;(e!==this.width||t!==this.height||a!==this.pixelRatio)&&(this.width=e,this.height=t,this.pixelRatio=a,this.renderer.setPixelRatio(a),this.renderer.setSize(e,t,!1),this.composer.setPixelRatio(a),this.composer.setSize(e,t),this.camera.aspect=e/t,this.fitCamera(),this.lastView&&this.render(this.lastView,0))}setSafeArea(e,t){this.safeTop=e,this.safeBottom=t,this.fitCamera()}setZoom(e,t,n){this.zoom=ti.clamp(e,1,5);let r=this.island?Math.max(this.island.columns,this.island.rows)/2:0,i=this.zoom>1?r:0;this.pan.set(ti.clamp(t,-i,i),0,ti.clamp(n,-i,i)),this.fitCamera()}zoomToward(e,t){let n=this.pieces?.puzzle;if(!n)return;let r=this.toWorld(n,e,eg);this.island&&r.add(this.island.group.position);let i=this.viewDirection(),a=r.addScaledVector(i,-r.y/i.y);this.setZoom(t,a.x-this.framedLook.x,a.z-this.framedLook.z)}whenZoomedToward(e,t,n){let r=this.zoomState(),i=this.camera.position.clone();this.zoomToward(e,t),this.camera.position.copy(this.cameraGoal),this.camera.lookAt(this.lookGoal),this.camera.updateMatrixWorld();let a=n();return this.camera.position.copy(i),this.setZoom(r.zoom,r.panX,r.panZ),this.camera.updateMatrixWorld(),a}zoomState(){return{zoom:this.zoom,panX:this.pan.x,panZ:this.pan.z}}fitCamera(){let e=this.island?.columns??5,t=this.island?.rows??5,n=Math.max(0,...(this.pieces?.puzzle.decks??[]).map(h)),r=Math.max(0,...this.terraceLifts.values()),i=n*p+.9+r,a=[];for(let n of[-e/2-.3,e/2+.3])for(let e of[-t/2-.3,t/2+.3])a.push(new K(n,-.25,e),new K(n,i,e));let o=[];if(this.width>this.height&&this.height>=Vh)for(let e of[-1,1])o.push(new K(e*Rh,zh,0).applyAxisAngle(Qi.DEFAULT_UP,ah).add(new K(0,0,-t/2-Lh)));let s=this.viewDirection(),c=this.island?.group.position??new K,l=new K(c.x,0,c.z),u=Math.max(1,this.height),d=1-2*this.safeTop/u,f=-1+2*this.safeBottom/u,m=(d+f)/2,g=Math.max(.2,(d-f)/2)*Oh,_=Oh,v=Math.max(0,2*(this.safeTop-Bh)/u),y=this.camera.clone();y.updateProjectionMatrix();let b=Math.hypot(e,t)*2,x=l.clone();for(let e=0;e<6;e++){y.position.copy(x).addScaledVector(s,b),y.lookAt(x),y.updateMatrixWorld();let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i of a){let a=i.clone().add(l).project(y);e=Math.min(e,a.x),t=Math.max(t,a.x),n=Math.min(n,a.y),r=Math.max(r,a.y)}for(let e of o){let t=e.clone().add(l).project(y);r=Math.max(r,t.y-v)}let i=Math.max((t-e)/2/_,(r-n)/2/g),c=new K().setFromMatrixColumn(y.matrixWorld,0),u=new K().setFromMatrixColumn(y.matrixWorld,1),d=2*b*Math.tan(ti.degToRad(y.fov/2)),f=((n+r)/2-m)/2*d,p=(e+t)/2/2*d*y.aspect;x.addScaledVector(u,f).addScaledVector(c,p),b*=i}this.framedLook.copy(x),x.add(this.pan),this.lookGoal.copy(x),this.cameraGoal.copy(x).addScaledVector(s,b/this.zoom),this.cameraPlaced||=(this.camera.position.copy(this.cameraGoal),this.cameraLook.copy(this.lookGoal),this.backdrop.position.set(this.lookGoal.x,0,this.lookGoal.z),!0);let S=this.scene.fog;S.near=b+2,S.far=b+20,this.camera.far=Math.max(100,b+60),this.camera.lookAt(this.cameraLook),this.camera.updateProjectionMatrix()}showLevel(e){this.zoom=1,this.pan.set(0,0,0);let t=this.island?.columns===e.columns&&this.island?.rows===e.rows&&this.island?.shape===Og(e);this.leavingPieces&&this.disposeObject(this.leavingPieces.group),this.celebration=null,this.leavingPieces=t?this.pieces:null,this.leavingPieces&&(this.leavingPieces.age=0);let n,r=!1,i=!1;if(t||this.setTerraces(e),t&&this.island)this.island.rippleStart=this.island.age+th*.5,n=th;else if(this.island?.terraces.length&&this.world===`ember`){this.departedIsland&&this.disposeObject(this.departedIsland.group),this.pieces&&(this.leavingPieces=this.pieces,this.leavingPieces.age=0),this.departedIsland=this.island;let t=th*.5;this.departedIsland.sinkStart=this.departedIsland.age+t;let r=t+$m(this.departedIsland.terraces.length)-Xm*.4;this.island=this.buildIsland(e,`rise`),this.island.age=-r,this.scene.add(this.island.group);let a=this.island.terraces.length;n=r+Qm(a-1,a)+Xm*.7,i=!0}else if(this.island){this.departedIsland&&this.disposeObject(this.departedIsland.group),this.leavingPieces=null,this.departedIsland=this.island;let t=this.island.group.position.clone().add(this.world===`ember`?Kh:Gh);this.island=this.buildIsland(e,`ready`),this.island.age=11.9,this.island.group.position.set(t.x,0,t.z),this.scene.add(this.island.group),this.flight={age:0,fromPosition:this.camera.position.clone(),fromLook:this.cameraLook.clone(),arc:Wh},n=Uh,r=!0}else if(this.arrivalDive!==0)this.island=this.buildIsland(e,`ready`),this.island.age=11.9,this.scene.add(this.island.group),n=Uh,r=!0;else{this.island=this.buildIsland(e,`rise`),this.scene.add(this.island.group);let t=this.island.terraces.length;n=t?Qm(t-1,t)+Xm*.7:Ym}if(Bg=this.terraceLifts.size?Vg:1,this.pieces=this.buildPieces(e,n),r){for(let e of this.pieces.pops)e.start=-10,S_(e,1);this.pieces.readyAt=n}if(this.island.group.add(this.pieces.group),this.frameRiver(e,this.island.group.position.z,!r&&!t&&!i),this.renderer.compileAsync(this.scene,this.camera),this.fitCamera(),this.arrivalDive!==0){let e=new K(0,-this.arrivalDive*ih,0);this.camera.position.copy(this.cameraGoal).add(e),this.cameraLook.copy(this.lookGoal).add(e),this.flight={age:0,fromPosition:this.camera.position.clone(),fromLook:this.cameraLook.clone(),arc:0},this.arrivalDive=0}}async prepare(e){this.resize(window.innerWidth,window.innerHeight);let t=this.buildIsland(e,`rise`),n=this.buildPieces(e,0);t.group.add(n.group),t.group.position.y=-200,this.scene.add(t.group);let r=this.pieces;this.pieces=n,this.celebrate(e.targets),this.pieces=r,this.celebration=null,await this.renderer.compileAsync(this.scene,this.camera),this.composer.render(),this.disposeObject(t.group)}celebrate(e){let t=this.pieces;if(!t)return;let n=(e,t)=>new No({color:e,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1,fog:!1,side:t}),r=e.map(e=>{let r=d(e.color),i=this.toWorld(t.puzzle,e,Wm),a=new X(new xs(.14,.2,qh,16,1,!0),n(Sg(r,1.15),0)),o=new X(new xs(.26,.34,qh,16,1,!0),n(fg(r),2));for(let e of[a,o])e.geometry.translate(0,qh/2,0),e.position.copy(i),e.scale.y=1e-4,t.group.add(e);return{pillar:a,haze:o}}),i=Math.ceil(70/e.length),a=i*e.length,o=new Float32Array(a*3),s=new Float32Array(a*3),c=new Float32Array(a*3);for(let n=0;n<a;n++){let r=e[Math.floor(n/i)];this.toWorld(t.puzzle,r,Wm).toArray(o,n*3),Sg(d(r.color),2).toArray(c,n*3);let a=Math.random()*Math.PI*2,l=.6+Math.random()*1.4;s[n*3]=Math.cos(a)*l,s[n*3+1]=2.2+Math.random()*2.2,s[n*3+2]=Math.sin(a)*l}let l=new to;l.setAttribute(`position`,new Ba(o,3)),l.setAttribute(`color`,new Ba(c,3));let u=new fs(l,new ss({size:.16,map:this.glowTexture,vertexColors:!0,transparent:!0,depthWrite:!1,blending:2,toneMapped:!1}));t.group.add(u),this.celebration={age:0,origins:e.map(e=>({at:e,color:fg(d(e.color))})),columns:r,sparkles:u,velocities:s}}celebrationHop(e){let t=this.celebration,n=this.island;if(!t||!n)return e.material.emissiveIntensity=0,0;let r=e.object.position.x+n.columns/2,i=e.object.position.z+n.rows/2,a=e=>Math.hypot(r-e.x,i-e.y),o=t.origins.reduce((e,t)=>a(t.at)<a(e.at)?t:e),s=Math.sin(Math.PI*cm(t.age,.15+a(o.at)*.13,.7));return e.material.emissive.copy(o.color),e.material.emissiveIntensity=s*.55,s*.1}animateCelebration(e){let t=this.celebration;if(!t)return;t.age+=e;let n=am(cm(t.age,.1,Xh)),r=im(cm(t.age,.1,.6)),i=cm(t.age,.3,Xh*.6)-cm(t.age,Xh,1.4);for(let{pillar:e,haze:a}of t.columns)e.scale.y=Math.max(1e-4,n),a.scale.y=Math.max(1e-4,n),e.material.opacity=r*(.7+.3*i),a.material.opacity=r*(.08+.15*i);let a=t.sparkles.geometry.getAttribute(`position`),o=Math.min(e,.05);for(let e=0;e<a.count;e++)t.velocities[e*3+1]-=4*o,a.setXYZ(e,a.getX(e)+t.velocities[e*3]*o,a.getY(e)+t.velocities[e*3+1]*o,a.getZ(e)+t.velocities[e*3+2]*o);a.needsUpdate=!0,t.sparkles.material.opacity=1-cm(t.age,.8,1.4)}clear(){for(let e of[this.island,this.departedIsland])e&&this.disposeObject(e.group);this.island=null,this.departedIsland=null,this.flight=null,this.cameraPlaced=!1,this.pieces=null,this.leavingPieces=null,this.celebration=null,this.removedPieces=[]}pieceSize(){return Bg}pagePointOf(e){let t=this.pieces;if(!t||!this.island)return null;let n=this.toWorld(t.puzzle,e,eg).add(this.island.group.position).project(this.camera),r=this.canvas.getBoundingClientRect();return{x:r.left+(n.x+1)/2*r.width,y:r.top+(1-n.y)/2*r.height}}viewDirection(){return(this.world===`ember`&&this.height>this.width?lh:sh).clone().normalize()}introFinished(){return this.instant||this.pieces!==null&&this.pieces.age>=this.pieces.readyAt}setActiveMirror(e){this.activeMirror=e}showPlacement(e,t=`mirror`){let n=this.pieces;if(!e||!n||!this.island){this.placementCell=null;return}let r=this.toWorld(n.puzzle,e,0);this.placement.group.parent!==this.island.group&&(this.island.group.add(this.placement.group),this.placementOpacity=0,this.placement.group.position.copy(r)),this.placementCell||this.placement.group.position.copy(r),this.placement.target.copy(r),this.placement.splitter.visible=t===`splitter`,this.placement.mirror.visible=t===`mirror`,this.placementCell=e}buildPlacementPreview(){let e=e=>new No({color:`#7ff7ea`,transparent:!0,opacity:e,depthWrite:!1,toneMapped:!1}),t=new J,n=new X(new Gc(.4,.46,4,1,Math.PI/4),e(.9)),r=new X(new Wc(.8,.8),e(.22));for(let e of[n,r])e.rotation.x=-Math.PI/2,e.position.y=.035,t.add(e);let i=n=>{let r=new X(new ys(_*2,.42,.05),e(n));return r.position.y=Wm,r.rotation.y=-vt,t.add(r),r},a=i(.5),o=i(.28);return t.visible=!1,{group:t,materials:[n,r,a,o].map(e=>({material:e.material,full:e.material.opacity})),mirror:a,splitter:o,target:new K}}animatePlacement(e){let t=+!!this.placementCell,n=this.instant?1:1-Math.exp(-e*14);this.placementOpacity+=(t-this.placementOpacity)*n,this.placement.group.position.lerp(this.placement.target,n);let r=.85+.15*Math.sin(this.time*4);for(let{material:e,full:t}of this.placement.materials)e.opacity=t*this.placementOpacity*r;this.placement.group.visible=this.placementOpacity>.01}toWorld(e,t,n){return new K(t.x-e.columns/2,n+m(t)*p+(t.z??0)+this.liftAt(t.x,t.y),t.y-e.rows/2)}buildIsland(e,t){let n=new J,r=[],{columns:i,rows:a}=e,o=[],s=[...e.sources,...e.targets,...e.mirrors,...e.obsidian??[],...e.prisms??[],...e.switches??[],...e.gates??[],...e.blocks??[]].map(e=>({x:e.x-i/2,z:e.y-a/2})),c=[...e.sources,...ve(e)].map(e=>({x:e.x-i/2,z:e.y-a/2}));Eg(e).reduce(kg,[]).forEach((e,t)=>{let r=i*7+a+t*101;if(this.world===`ember`){let t=e[0],l=this.liftAt(t.x+i/2,t.z+a/2),u=new J;u.position.y=l;let d=Kg(e,s,c,r);u.add(d);let f=Lg(e,r,l);f.position.y=-.02,u.add(f),n.add(u),o.push({group:u,lift:l});return}let l=this.world===`sky`?__(e,r):v_(e,r);l.position.y=Km,n.add(l)}),o.sort((e,t)=>t.lift-e.lift);let l=(t,n)=>t>=0&&n>=0&&t<i&&n<a&&xt(e,{x:t+.5,y:n+.5}),u=[],d=mg(),f=jm(),p=new Y(H.stoneSide);for(let e=0;e<a;e++)for(let t=0;t<i;t++){if(!l(t,e)||o.length)continue;let s=new Y((t+e)%2==0?H.stoneLight:H.stone),c=d.clone(),f=Em(c,t*97+e*31+5,s,p);f.position.set(t+.5-i/2,-.1,e+.5-a/2),n.add(xg(f)),u.push({object:f,wave:t+e,material:c}),r.push({object:f,start:.9+(t+e)*.07,duration:.6})}let m=this.buildArch(e);if(n.add(m),r.push({object:m,start:1.3,duration:1.1}),!o.length){let e=Um(i,a,i*17+a,.22,l);e.position.y=Km,n.add(e),r.push({object:e,start:1.5,duration:1.4,upward:!0});let t=Mm(i,a,i*13+a,f,l);t.position.y=Km,n.add(t),r.push({object:t,start:1.8,duration:1.2,upward:!0})}let h=xm(i*13+a),g=[];for(let e=0;e<6;e++){let t=Q(new ws(.07+h()*.08),pg(e%2==0?H.stone:H.stoneSide));t.userData.angle=e/6*Math.PI*2+h()*.5,t.userData.radius=Math.max(i,a)/2+.7+h()*.5,t.userData.height=-.4+h()*.9,n.add(t),g.push(t),r.push({object:t,start:1.2+e*.1,duration:.7})}let _=this.world===`sky`?[Lm(7,1.15),Lm(19,.9),Rm(3),Rm(5),Rm(9)]:this.world===`depths`?[x_(1.4,7),x_(.9,19),x_(.55,3)]:[],v=new Set,y=[];for(let e=-1;e<=i;e++)y.push([e,-1],[e,a]);for(let e=0;e<a;e++)y.push([-1,e],[i,e]);for(;y.length;){let[e,t]=y.pop(),n=`${e},${t}`;v.has(n)||e<-1||t<-1||e>i||t>a||l(e,t)||(v.add(n),y.push([e+1,t],[e-1,t],[e,t+1],[e,t-1]))}let b=[];for(let e=0;e<a;e++)for(let t=0;t<i;t++)if(!(!l(t,e)||t+e>(i+a)/2-1))for(let[n,r]of[[-1,0],[0,-1]])v.has(`${t+n},${e+r}`)&&b.push({x:t+.5-i/2+n*.62,z:e+.5-a/2+r*.62});let x=Dg(b,_.length,xm(i*5+a));if(_.slice(0,x.length).map((e,t)=>[e,x[t].x,x[t].z]).forEach(([e,t,i],a)=>{e.position.set(t,Km,i),n.add(e),r.push({object:e,start:1.6+a*.12,duration:.9})}),!this.instant)for(let e of r)S_(e,0);return{columns:i,rows:a,shape:Og(e),group:n,arrival:t,tiles:u,arch:m,rune:m.userData.rune,veil:m.userData.veil,pops:r,age:0,rippleStart:null,sinkStart:null,runeGlow:0,nextRuneColor:null,pebbles:g,terraces:o}}buildPieces(e,t){let n=new J,r=[],i=t,a=(e,t=.7,n=.18)=>{r.push({object:e,start:i,duration:t,size:Bg}),i+=n},o=(e.tilted??[]).flatMap((t,n)=>{let r=le(e,n),i=r===-1?-1:m(e.tilted[r]);return i>m(t)?[{x:t.x,y:t.y,from:m(t),to:i}]:[]}),s=new Set((e.blocks??[]).filter(e=>m(e)===0).map(e=>`${e.x},${e.y}`));(e.decks??[]).forEach((t,r)=>{let i=h(t),c=o.some(e=>Math.abs(e.x-t.x)<.01&&Math.abs(e.y-t.y)<.01&&i>e.from&&i<=e.to),l=new J,u=hg();l.userData.fading=u;let d=(e,n,i,a)=>{let o=wm(e,Jh,n,Math.round(t.x*13+t.y*29+i*7+a*11),.02,r%4);vm(o,new Y(H.moss),new Y(H.stone)),l.add(Q(o,u,i,-.18/2,a))};if(c)for(let e of[-1,1])d(.98,.2,0,e*.39),d(.2,.58,e*.39,0);else d(.98,.98,0,0);l.position.copy(this.toWorld(e,{...t,floor:i},0)),n.add(wg(l)),a(l,.6);let f=(e.decks??[]).filter(e=>e.x===t.x&&e.y===t.y&&h(e)<i).map(h),m=Math.max(0,...f);if(m===0&&s.has(`${t.x},${t.y}`))return;let g=m*p,_=i*p-Jh-g,v=(n,r)=>(e.decks??[]).some(e=>e.x===t.x+n&&e.y===t.y+r&&h(e)===i),y=[[1,0],[-1,0],[0,1],[0,-1]].filter(([e,t])=>v(e,t)).length,b=(Math.round(t.x-.5)+Math.round(t.y-.5))%2==0;if(y>=2&&!b)return;let x=y<=1?[-.34,Yh]:[b?-.34:Yh];for(let r of x){let i=this.buildColumn(_,t.x*7+t.y+r);i.position.copy(this.toWorld(e,{x:t.x+r,y:t.y+r},g)),n.add(wg(i)),a(i,.5,.04)}});let c=[],l=e.sources.map((t,r)=>{let i=new J,{rune:o,material:s}=Nm(.38,new Y(H.stoneLight));c.push(s),i.add(o),i.add(Q(new Yc(.21,.025,6,20),this.techLine(),0,.14,0).rotateX(Math.PI/2)),i.add(Q(new xs(.2,.25,.14,8),pg(H.slate),0,.07,0));let l=d(t.color),u=Q(new Uc(.17),_m(fg(l),{emissive:fg(l),emissiveIntensity:2.4*Cg(t.color)}),0,.38,0);u.scale.y=1.7,i.add(u);let f=new No({map:this.glowTexture,color:fg(l),transparent:!0,opacity:0,depthWrite:!1,blending:2,toneMapped:!1}),p=Q(new Wc(1.6,1.6),f,0,.04,0);return p.rotation.x=-Math.PI/2,i.add(p),i.position.copy(this.toWorld(e,t,0)),n.add(wg(i)),a(i),{group:i,spinner:u,floorGlow:f,phase:r*1.7}}),u=this.turnableBuilders(e).map(({at:t,build:r})=>{let i=r();return i.group.position.copy(this.toWorld(e,t,0)),n.add(i.group),a(i.group),{group:i.group,pivot:i.pivot,controls:i.controls}});for(let t of e.glass??[]){let r=fg(d(t.color)),i=new J;i.add(Q(new xs(.15,.2,.16,10),pg(H.slate),0,.08,0)),i.add(Q(new xs(.03,.03,.18000000000000002,6),pg(H.slate),0,.25,0));let o=Q(new xs(b,b,.3,6),new No({color:Sg(d(t.color),1.1),transparent:!0,opacity:.85,toneMapped:!1}),0,Wm,0);i.add(o);let s=Q(new Yc(b,.03,6,6),pg(H.slate),0,Wm,0);s.rotation.x=Math.PI/2,i.add(s);let c=Q(new Wc(1.4,1.4),new No({map:this.glowTexture,color:r,transparent:!0,opacity:.35,depthWrite:!1,toneMapped:!1}),0,.04,0);c.rotation.x=-Math.PI/2,i.add(c),i.position.copy(this.toWorld(e,t,0)),n.add(wg(i)),a(i)}let f=[],g=[],_=[];for(let t of e.targets){let r=Math.max(t.color.r,t.color.g,t.color.b),i=fg(d({r:t.color.r/Math.max(r,1e-6),g:t.color.g/Math.max(r,1e-6),b:t.color.b/Math.max(r,1e-6)})),o=new J;o.add(Q(new xs(.2,.27,.16000000000000003,8),pg(H.slate),0,.16000000000000003/2,0));let s=new No({color:ug,toneMapped:!1});f.push(s),o.add(Q(new Jc(.17,24,16),s,0,Wm,0));let l=new No({color:i,toneMapped:!1}),u=Q(new Yc(v,.045,8,48,Math.PI*2*r),l,0,Wm,0);if(u.rotation.x=Math.PI/2,o.add(u),r<.99){let e=Q(new Yc(v,.02,6,48),new No({color:i,transparent:!0,opacity:.3,toneMapped:!1}),0,Wm,0);e.rotation.x=Math.PI/2,o.add(e)}for(let e=0;e<4;e++){let t=e*Math.PI/2+Math.PI/4,n=Q(new Ss(.06,.13,3),l,Math.cos(t)*(v+.12),Wm,Math.sin(t)*(v+.12));n.rotation.set(Math.PI/2,0,0),n.rotateOnWorldAxis(new K(0,1,0),-t-Math.PI/2),o.add(n)}o.add(Q(new Yc(.235,.03,6,24),this.techLine(),0,.16000000000000003,0).rotateX(Math.PI/2));let p=Nm(.5,i);c.push(p.material),o.add(p.rune);let m=this.glowSprite(i.clone(),0);m.position.y=Wm,g.push(m),o.add(m),o.position.copy(this.toWorld(e,t,0)),n.add(wg(o)),_.push(o),a(o,.8)}(e.blocks??[]).forEach((t,r)=>{let i=hg(),o=new J;o.userData.fading=i;let s=Math.round(t.x*31+t.y*17);if(this.terraceLifts.size)o.add(...Jg(i,s));else{let e=wm(y*2,Gm,y*2,s,.03,r%4);vm(e,new Y(H.moss),new Y(H.stone)),o.add(Q(e,i,0,Gm/2,0))}o.position.copy(this.toWorld(e,t,0)),n.add(wg(o)),a(o,.7)});let x=(e.seals??[]).map((t,r)=>{let i=fg(d(t.color)),o=new J,s=new J,c=_m(`#3a0d18`,{emissive:`#7a0f24`,emissiveIntensity:.6}),l=(e,t,n)=>Tm(e,t,n).translate(0,t/2,0);for(let e=0;e<5;e++){let t=e/5*Math.PI*2+r,n=Q(l(.14,.5+e%3*.16,r*17+e*5),c,Math.cos(t)*.18,0,Math.sin(t)*.18);n.rotation.set(Math.sin(t)*.25,0,-Math.cos(t)*.25),s.add(n)}s.add(Q(l(.2,.85,r*31),c,0,0,0)),o.add(s);let u=Q(new Yc(.4,.025,6,32),new No({color:Sg(d(t.color),1.3),toneMapped:!1}),0,.04,0);return u.rotation.x=Math.PI/2,o.add(u),o.add(Q(new Jc(.07,12,8),new No({color:i,toneMapped:!1}),0,.95,0)),o.position.copy(this.toWorld(e,t,0)),n.add(wg(o)),a(o,.7),{spikes:s,openness:0}}),S=(e.switches??[]).map(t=>{let r=fg(d(t.color)),i=new J;i.add(Q(new xs(.26,.2,Wm,8),pg(H.slate),0,Wm/2,0)),i.add(Q(new xs(.3,.26,.08,8),pg(H.slateLight),0,Wm,0));let o=Q(new Yc(v,.04,6,8),new No({color:r,toneMapped:!1}),0,Wm,0);o.rotation.x=Math.PI/2,i.add(o);let s=new No({color:Sg(d(t.color),1.6),transparent:!0,opacity:0,toneMapped:!1}),c=Q(new Ss(.14,.42,6),s,0,.5800000000000001,0);return c.scale.setScalar(1e-4),i.add(c),i.position.copy(this.toWorld(e,t,0)),n.add(wg(i)),a(i,.7),{flame:c,glow:s,lit:0}}),C=(e.gates??[]).map((t,r)=>{let i=e.switches?.[t.switch],o=new J,s=hg(),c=wm(y*2,Gm,y*2,Math.round(t.x*41+t.y*13),.03,r%4);vm(c,new Y(H.slateLight),new Y(H.slate)),o.add(Q(c,s,0,Gm/2,0)),i&&o.add(Q(new ys(y*2+.02,.07,y*2+.02),new No({color:Sg(d(i.color),1.3),toneMapped:!1}),0,Gm*.7,0));let l=new J;return l.userData.fading=s,l.add(o),l.position.copy(this.toWorld(e,t,0)),n.add(wg(l)),a(l,.7),{wall:o,switch:t.switch,sunk:0}}),w=new J;n.add(w);let T=[];this.island&&(this.island.nextRuneColor=fg(d(e.targets[0].color)));let E=i-t;if(E>nh)for(let e of r)e.start=t+(e.start-t)*nh/E;if(!this.instant)for(let e of r)S_(e,0);let D=r.reduce((e,t)=>t.start+t.duration>e.start+e.duration?t:e);return{puzzle:e,group:n,runes:c,pops:r,readyAt:D.start+D.duration,crystals:l,turnables:u,targetOrbs:f,targetHalos:g,altars:_,seals:x,switches:S,gates:C,occluders:[],occlusionCheck:0,ghosts:[],beams:T,beamLayer:w,age:0}}buildColumn(e,t){let n=new J,r=hg();n.userData.fading=r;let i=(e,i,a,o)=>{let s=wm(e,i,e,Math.round(t*13+a*7),o,0);vm(s,new Y(H.stoneLight),new Y(H.stoneSide)),n.add(Q(s,r,0,a+i/2,0))},a=.1,o=.08;return i(.3,a,0,.02),i(.19,e-a-o,a,.025),i(.27,o,e-o,.015),n}turnableBuilders(e){return[...e.mirrors.map(e=>({at:e,build:()=>this.buildMirror()})),...(e.polarizers??[]).map(e=>({at:e,build:()=>this.buildPolarizer(e.fixed??!1)})),...(e.splitters??[]).map(e=>({at:e,build:()=>this.buildMirror(`splitter`)})),...(e.tilted??[]).map((t,n)=>{let r=le(e,n),i=r===-1||m(e.tilted[r])>m(t);return{at:t,build:()=>this.buildTiltedMirror(i)}}),...(e.prisms??[]).map(e=>({at:e,build:()=>this.buildPrism()})),...(e.obsidian??[]).map(e=>({at:e,build:()=>this.buildMirror(`obsidian`)}))]}buildPrism(){let e=new J;e.add(Q(new xs(.15,.2,.16,10),pg(H.slate),0,.08,0));let i=new J,a=.5,o=.36,s=Q(new xs(o,o,a,3),_m(`#e8f4ff`,{transparent:!0,opacity:.6,emissive:`#8fd0ff`,emissiveIntensity:.3}),0,Wm,0);s.rotation.y=-Math.PI/2,i.add(s);let c=o*Math.cos(Math.PI/3)+.012;return[t,n,r].forEach((e,t)=>{let n=new No({color:Sg(d(e),1.4),toneMapped:!1});i.add(Q(new ys(.012,a*.85,.1),n,c,Wm,(t-1)*.11)),i.add(Q(new ys(.1,.012,.1),n,c-.06,.5960000000000001,(t-1)*.11))}),e.add(wg(i)),{group:e,pivot:i,controls:this.addTurnControls(e,i)}}buildTiltedMirror(e){let t=new J,n=new J;for(let e of[-1,1])n.add(Q(new ys(.07,.56,.07),pg(H.slate),0,.56/2,e*.33));n.add(Q(new xs(.025,.025,.7,6),pg(H.stoneLight),0,Wm,0).rotateX(Math.PI/2));let r=Q(new ys(.06,.5,.56),_m(`#bcd6e6`,{emissive:`#6f9fbd`,emissiveIntensity:.2}),0,Wm,0);r.rotation.z=e?Math.PI/4:-Math.PI/4,n.add(r);let i=Q(new Ss(.07,.16,3),new No({color:`#ffd56a`,toneMapped:!1}),.36,.04,0);return i.rotation.z=-Math.PI/2,n.add(i),t.add(wg(n)),{group:t,pivot:n,controls:this.addTurnControls(t,n)}}rearrangePieces(e){let t=this.pieces;if(!t)return;let n=ve(t.puzzle).map((e,n)=>({piece:e,parts:t.turnables[n]}));t.turnables=this.turnableBuilders(e).map(({at:r,build:i})=>{let a=n.findIndex(({piece:e})=>ye(e,r));if(a>=0)return n.splice(a,1)[0].parts;let o=i();o.group.position.copy(this.toWorld(e,r,0)),t.group.add(o.group);let s={object:o.group,start:t.age,duration:.5};return S_(s,+!!this.instant),t.pops.push(s),o});for(let{parts:e}of n)t.pops=t.pops.filter(t=>t.object!==e.group),this.removedPieces.push({object:e.group,age:0});t.puzzle=e}animateRemovedPieces(e){this.removedPieces=this.removedPieces.filter(t=>{t.age+=e;let n=this.instant?1:cm(t.age,0,Hh);return t.object.scale.setScalar(Math.max(1e-4,1-sm(n,1.4))),n>=1?(this.disposeObject(t.object),!1):!0})}buildMirror(e=`mirror`){let t=new J;t.add(Q(new xs(.15,.2,.16,10),pg(H.slate),0,.08,0));let n=new J;n.add(Q(new xs(.03,.03,.18,6),pg(H.stoneLight),0,.2,0));let r=this.world===`ember`,i=e===`mirror`?r?Ph:jh:e===`splitter`?Mh:r?Fh:Nh,a=_m(i,{emissive:i,emissiveIntensity:.25});n.add(Q(new ys(_*2+.1,.52,.06),a,0,Wm,-.015));let o=new ol({color:`#f4fbff`,emissive:`#9cc3dc`,emissiveIntensity:.35,metalness:.5,roughness:.12,envMap:this.mirrorReflections,envMapIntensity:.6});n.add(Q(new ys(_*2+.1,.03,.09),a,0,.175,0));let s=.42;return e===`obsidian`?(n.add(Q(new ys(_*2,s,.035),o,0,Wm,.02)),n.add(Q(new ys(_*2,s,.04),new No({color:`#0a0606`}),0,Wm,-.02))):e===`mirror`?n.add(Q(new ys(_*2,s,.07),o,0,Wm,0)):(n.add(Q(new ys(_*2,s/2,.07),o,0,Wm-s/4,0)),n.add(Q(new ys(_*2,s/2,.07),new No({color:`#bff6ff`,transparent:!0,opacity:.35,depthWrite:!1}),0,.445,0))),t.add(wg(n)),{group:t,pivot:n,controls:this.addTurnControls(t,n)}}buildPolarizer(e){let t=new J;t.add(Q(new xs(.15,.2,.16,10),pg(H.slate),0,.08,0)),t.add(Q(new xs(.03,.03,.18000000000000002,6),pg(H.slate),0,.25,0));let n=new J,r=Q(new bs(b,32),new No({color:`#1f2a33`,transparent:!0,opacity:.85,side:2}),0,Wm,0);r.rotation.x=-Math.PI/2,n.add(r);let i=Q(new Yc(b,.04,6,32),_m(Ih,{emissive:Ih,emissiveIntensity:.2}),0,Wm,0);i.rotation.x=Math.PI/2,n.add(i);let a=new No({color:`#f2fbff`,toneMapped:!1}),o=new J;for(let e=-2;e<=2;e++){let t=e*.11,n=2*Math.sqrt(b**2-t**2)-.04;o.add(Q(new ys(n,.02,.05),a,0,0,t))}let s=Dm(o,a);return s.position.y=.35000000000000003,n.add(s),t.add(wg(n)),{group:t,pivot:n,controls:e?null:this.addTurnControls(t,n)}}addTurnControls(e,t){let n=Q(new ys(.32,.025,.025),pg(H.stoneLight),.18+.32/2,eg,0);t.add(n);let r=Q(new Jc(.06,16,12),new No({color:new Y(H.techGlow).multiplyScalar(1.6),toneMapped:!1}),$h,eg,0);t.add(r);let i=this.glowSprite(new Y(H.techGlow),.5);i.scale.setScalar(.32),i.position.copy(r.position),t.add(i);let a=new No({color:H.techGlow,transparent:!0,opacity:tg,depthWrite:!1,toneMapped:!1}),o=new J,s=Math.PI*2/3-.45;for(let e=0;e<3;e++){let t=new J;t.add(new X(new Yc($h,.012,6,24,s),a));let n=Q(new Ss(.035,.09,8),a,$h*Math.cos(s),$h*Math.sin(s),0);n.rotation.z=s,t.add(n),t.rotation.z=e*Math.PI*2/3,o.add(t)}let c=new J;c.rotation.x=-Math.PI/2,c.position.y=eg;let l=Dm(o,a);return c.add(l),e.add(c),{ringSpinner:l,ringMaterial:a,knobGlow:i.material,handle:[n,r,i,c],shown:0}}buildArch(e){let t=new J;t.add(Q(new ys(1.6,.3,.8),pg(H.stoneSide),0,-.15,0));for(let e of[-1,1])t.add(Q(new ys(.22,1.5,.26),pg(H.stoneLight),e*.55,.75,0));t.add(Q(new Yc(.55,.12,8,24,Math.PI),pg(H.stoneLight),0,1.5,0));let n=new ol({color:H.slate,emissive:`#000000`,emissiveIntensity:0,roughness:.4,toneMapped:!1}),r=Q(new xs(.22,.22,.05,32),n,0,1.55,.02);r.rotation.x=Math.PI/2,t.add(r);let i=new No({color:H.techGlow,transparent:!0,opacity:ig,side:2,depthWrite:!1});t.add(Q(new Wc(.88,1.5),i,0,.75,0)),t.userData.rune=n,t.userData.veil=i;let a=y_(1.15,e.columns*3+e.rows,this.world);return a.position.y=-.3,t.add(a),t.position.set(0,0,-e.rows/2-Lh),t.rotation.y=ah,wg(t),t}techLine(){return new No({color:new Y(H.techGlow).multiplyScalar(1.3),toneMapped:!1})}glowSprite(e,t){return new Eo(new fo({map:this.glowTexture,color:e,transparent:!0,opacity:t,depthWrite:!1,blending:2,toneMapped:!1}))}buildBeam(e){let t=e=>new No({transparent:!0,opacity:e,depthWrite:!1,blending:2,toneMapped:!1}),n=this.glowSprite(new Y(`#ffffff`),1);n.scale.setScalar(.55),e.add(n);let r=this.glowSprite(new Y(`#ffffff`),.6).material;return{coreMaterial:t(.95),glowMaterial:t(.4),pulseMaterial:r,cores:[],glows:[],pulses:[],tip:n,drawnPoints:null,world:[],distances:[]}}hideBeam(e){for(let t of[...e.cores,...e.glows,...e.pulses,e.tip])t.visible=!1;e.drawnPoints=null}boardPointAt(e,t,n=0){let r=this.island;if(!r)return null;let i=this.canvas.getBoundingClientRect(),a=new G((e-i.left)/i.width*2-1,-((t-i.top)/i.height)*2+1),o=new mu;o.setFromCamera(a,this.camera);let s=0,c=null;for(let e=0;e<(this.terraceLifts.size?3:1);e++){let e=new co(ng,-(r.group.position.y+eg+n*p+s)),t=o.ray.intersectPlane(e,new K);if(!t)return null;c={x:t.x-r.group.position.x+r.columns/2,y:t.z-r.group.position.z+r.rows/2},s=this.liftAt(c.x,c.y)}return c}render(e,t){this.lastView=e,this.renderer.info.reset(),this.watchFrameRate(t),this.time+=t,this.animateBackdrop(t),this.animateCelebration(t),this.moveCamera(t),this.island&&(this.island.age+=t,this.animateIsland(this.island,e?.solvedGlow??0,t)),this.animateSinkingIsland(t),this.leavingPieces&&this.animatePiecesOut(this.leavingPieces,t),this.animateRemovedPieces(t),this.animatePlacement(t),this.pieces&&(this.pieces.age+=t,this.animatePiecesIn(this.pieces),e&&this.drawView(this.pieces,e,t)),this.quality>=2?this.composer.render():this.renderer.render(this.scene,this.camera)}watchFrameRate(e){if(this.quality===0||e<=0||e>.5||(this.recentFrames.push(e),this.recentFrames.length<120))return;let t=this.recentFrames.filter(e=>e>sg);this.recentFrames=[],!(t.length/120<=cg)&&(--this.quality,this.quality===0&&(this.renderer.shadowMap.enabled=!1,this.scene.traverse(e=>{e instanceof X&&(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>e.needsUpdate=!0)}),this.resize(this.width,this.height)))}stats(){let{calls:e,triangles:t}=this.renderer.info.render;return{quality:this.quality,drawCalls:e,triangles:t}}animateBackdrop(e){if(Bm.value=this.time,this.river){let[t,n]=this.river.textures;t.offset.x=-(this.time*yh/vh)%1,n.offset.x=-(this.time*yh*1.7/vh)%1,this.placeRiverBanks(this.instant?1:1-Math.exp(-e*1.5))}this.clouds.rotation.y=this.time*.006,this.shaftMaterials.forEach((e,t)=>{e.userData.base??=e.opacity,e.opacity=e.userData.base*(.75+.25*Math.sin(this.time*.4+t*2))});let t=this.sparkles.geometry.getAttribute(`position`);for(let n=0;n<t.count;n++){let r=t.getY(n)+e*.12;r>5&&(r=-4),t.setY(n,r)}t.needsUpdate=!0,this.distantIslands.forEach((e,t)=>{let n=this.instant?1:im(cm(this.time,t*.25,2.4));e.position.y=e.userData.baseY-(1-n)*6+Math.sin(this.time*.6+t*2)*.12})}animateSinkingIsland(e){let t=this.departedIsland;t&&t.sinkStart!==null&&(t.age+=e,this.animateIsland(t,0,e),(this.instant||t.age>=t.sinkStart+$m(t.terraces.length))&&(this.disposeObject(t.group),this.departedIsland=null))}animateIsland(e,t,n){let r=this.instant?1/0:e.age;if(e.terraces.length)e.group.position.y=0,e.terraces.forEach((t,n)=>{let i=e.arrival===`rise`?om(cm(r,Qm(n,e.terraces.length),Xm),1.2):1,a=e.sinkStart===null?0:sm(cm(r,e.sinkStart+Qm(e.terraces.length-1-n,e.terraces.length),Xm),1.2);t.group.position.y=t.lift-(1-i+a)*eh});else if(e.arrival===`rise`){let t=om(cm(r,.1,1.9),1.1),n=Math.sin(this.time*.9)*.05*cm(r,2,1.5);e.group.position.y=(1-t)*-7+n,e.group.scale.setScalar(.85+.15*Math.min(1,t))}else e.group.position.y=Math.sin(this.time*.9)*.05;for(let t of e.pops)S_(t,om(cm(r,t.start,t.duration),1.8));for(let t of e.tiles){let n=e.rippleStart===null?0:Math.sin(Math.PI*cm(e.age,e.rippleStart+t.wave*.06,.5));t.object.position.y=-.1+n*.12+this.celebrationHop(t)}e.pebbles.forEach((e,t)=>{let n=e.userData.angle+this.time*.05,r=e.userData.radius;e.position.set(Math.cos(n)*r,e.userData.height+Math.sin(this.time*.8+t)*.06,Math.sin(n)*r),e.rotation.set(this.time*.2+t,this.time*.3,0)});let i=this.instant?1:1-Math.exp(-n*2);e.runeGlow+=(t-e.runeGlow)*i,e.nextRuneColor&&e.runeGlow<.02&&(e.rune.emissive=e.nextRuneColor,e.nextRuneColor=null),e.rune.emissiveIntensity=e.runeGlow*2.2,e.veil.opacity=ig*(1-e.runeGlow)}moveCamera(e){let t=this.flight;if(t&&!this.instant){t.age+=e;let n=am(cm(t.age,0,Uh));this.camera.position.lerpVectors(t.fromPosition,this.cameraGoal,n).add(new K(0,Math.sin(Math.PI*n)*t.arc,0)),this.cameraLook.lerpVectors(t.fromLook,this.lookGoal,n),n>=1&&(this.flight=null,this.departedIsland&&=(this.disposeObject(this.departedIsland.group),null))}else{let t=this.instant?1:1-Math.exp(-e*Zh);this.camera.position.lerp(this.cameraGoal,t),this.cameraLook.lerp(this.lookGoal,t)}if(this.diving){this.diving.speed+=rh*e;let t=this.diving.direction*this.diving.speed*e;for(let e of[this.camera.position,this.cameraLook,this.cameraGoal,this.lookGoal])e.y+=t}this.camera.lookAt(this.cameraLook);let n=this.instant?1:1-Math.exp(-e*Qh);this.backdrop.position.x+=(this.cameraLook.x-this.backdrop.position.x)*n,this.backdrop.position.z+=(this.cameraLook.z-this.backdrop.position.z)*n,this.sun.target.position.set(this.cameraLook.x,0,this.cameraLook.z),this.sun.position.copy(this.sun.target.position).add(rg)}animatePiecesIn(e){let t=this.instant?1/0:e.age;for(let n of e.pops)S_(n,om(cm(t,n.start,n.duration),1.8));e.crystals.forEach(({group:e,spinner:t,floorGlow:n,phase:r})=>{n.opacity=.45*Math.min(1,e.scale.x),t.rotation.y=this.time*.6+r,t.position.y=.38+Math.sin(this.time*1.5+r)*.035})}animatePiecesOut(e,t){e.age+=t,e.beamLayer.visible=!1;let n=th*.4;e.pops.forEach((t,r)=>{S_(t,1-sm(cm(e.age,r/e.pops.length*n,.54),1.4))});for(let t of e.crystals)t.floorGlow.opacity=.45*Math.min(1,t.group.scale.x);e.age>=th&&(this.disposeObject(e.group),this.leavingPieces=null)}revealHiddenPieces(e,t){if(e.occluders.length===0&&(e.group.traverse(t=>{let n=t.userData.fading;n&&e.occluders.push({object:t,material:n,hiding:!1})}),e.occluders.length===0))return;if(e.occlusionCheck-=t,e.occlusionCheck<=0){e.occlusionCheck=.2,e.ghosts.length===0&&this.buildGhosts(e);let t=e.ghosts.map(e=>e.thing).map(e=>e.getWorldPosition(new K).add(bg));for(let n of e.beams)if(n.drawnPoints)for(let r=1;r<n.world.length;r++){let i=n.world[r-1],a=n.world[r],o=Math.ceil(i.distanceTo(a)/yg);for(let n=1;n<=o;n++)t.push(e.beamLayer.localToWorld(new K().lerpVectors(i,a,n/o)))}let n=this.camera.getWorldPosition(new K),r=new mu,i=e.occluders.map(e=>e.object);for(let t of e.occluders)t.hiding=!1;for(let t of e.ghosts)t.hidden=!1;for(let[a,o]of t.entries()){let t=o.clone().sub(n),s=t.length();r.set(n,t.normalize()),r.far=Math.max(0,s-.3);for(let t of r.intersectObjects(i,!0)){let n=t.object;for(;n&&!n.userData.fading;)n=n.parent;let r=e.occluders.find(e=>e.object===n);r&&(r.hiding=!0),r&&a<e.ghosts.length&&(e.ghosts[a].hidden=!0)}}}for(let n of e.ghosts){let e=+!!n.hidden;n.shown+=(e-n.shown)*(this.instant?1:1-Math.exp(-t*6));let r=.85+.15*Math.sin(this.time*3);for(let e of n.outline)e.visible=n.shown>.02,e.material.opacity=vg*n.shown*r}let n=this.instant?1:1-Math.exp(-t*6);for(let{material:t,hiding:r}of e.occluders)t.opacity+=((r?gg:1)-t.opacity)*n,t.depthWrite=t.opacity>.95}buildGhosts(e){let t=[...e.crystals.map(e=>e.group),...e.turnables.map(e=>e.group),...e.altars];for(let n of t){let t=[];n.traverse(e=>{if(!(e instanceof X)||e.userData.ghost||e.material.transparent)return;let n=new X(e.geometry,new No({color:_g,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1}));n.userData.ghost=!0,n.scale.setScalar(1.06),n.renderOrder=999,n.visible=!1,n.raycast=()=>{},t.push(n)});let r=0;n.traverse(e=>{e instanceof X&&!e.userData.ghost&&!e.material.transparent&&r<t.length&&e.add(t[r++])}),e.ghosts.push({thing:n,outline:t,shown:0,hidden:!1})}}drawView(e,t,n){let{puzzle:r}=t;this.revealHiddenPieces(e,n);let i=this.instant?1:1-Math.exp(-n*3);for(e.switches.forEach((e,n)=>{let r=+!!t.switchesOn[n];e.lit+=(r-e.lit)*i,e.flame.scale.set(Math.max(1e-4,e.lit),Math.max(1e-4,e.lit*(1+.12*Math.sin(this.time*9+n))),Math.max(1e-4,e.lit)),e.glow.opacity=e.lit}),e.gates.forEach(e=>{let n=+!!t.switchesOn[e.switch];e.sunk+=(n-e.sunk)*i,e.wall.position.y=-.765*e.sunk,e.wall.visible=e.sunk<.98}),e.seals.forEach((e,n)=>{let r=+!!t.sealsOpen[n];e.openness+=(r-e.openness)*i;let a=1-e.openness;e.spikes.scale.set(.3+.7*a,Math.max(.02,a),.3+.7*a)}),ve(r).forEach((r,i)=>{let a=e.turnables[i];if(a.pivot.rotation.y=-r.angle,a.pivot.position.y=t.pieceMotion[i]*.08,!a.controls)return;let o=+(i===this.activeMirror),s=e.age-e.readyAt,c=this.instant?0:1-cm(s,kh,Ah),l=Math.max(o,t.pieceMotion[i],s>0?c:0),u=a.controls;u.shown+=(l-u.shown)*(this.instant?1:1-Math.exp(-n*10));for(let e of u.handle)e.visible=u.shown>.02;u.ringSpinner.rotation.z=this.time*.35+i,u.ringMaterial.opacity=(tg+.5*o)*u.shown,u.knobGlow.opacity=(.5+.5*o)*u.shown});e.beams.length<t.beams.length;)e.beams.push(this.buildBeam(e.beamLayer));e.beams.forEach((n,r)=>{let i=t.beams[r];i?this.drawBeam(e,n,i):this.hideBeam(n)});let a=t.solvedGlow;t.targetMixes.forEach((t,n)=>{let r=e.targetOrbs[n],i=Math.max(t.r,t.g,t.b);if(i>.001){let e=l(dg,d({r:t.r/i,g:t.g/i,b:t.b/i}),Math.min(1,i));r.color.setRGB(e.r,e.g,e.b,dr).multiplyScalar(1+.8*a)}else r.color.set(ug);let o=e.targetHalos[n];o.material.opacity=.35*a,o.scale.setScalar(1+a*.9)});let o=.5+.1*Math.sin(this.time*1.2);for(let t of e.runes)t.opacity=o+.4*a}drawBeam(e,t,n){n.points!==t.drawnPoints&&this.placeBeam(e,t,n.points,n.brightness,n.colors);let r=.85+.12*Math.sin(this.time*1.3);for(let e of t.cores)e.material.opacity=r;let{world:i,distances:a}=t,o=a[a.length-1]??0;t.tip.visible=!n.lit&&o>.01,t.tip.visible&&t.tip.position.copy(i[i.length-1]);let s=n.lit?a[a.length-1]:0,c=this.time*Jm%qm,l=n.lit?Math.ceil((s-c)/qm):0;for(;t.pulses.length<l;){let n=new Eo(t.pulseMaterial);n.scale.setScalar(.3),t.pulses.push(n),e.beamLayer.add(n)}let u=1;t.pulses.forEach((e,t)=>{if(e.visible=t<l,!e.visible)return;let n=c+t*qm;for(;u<a.length-1&&a[u]<n;)u++;let r=a[u-1],o=a[u]-r||1;e.position.lerpVectors(i[u-1],i[u],(n-r)/o)})}withSteps(e){let t=[],n=[];return e.forEach((r,i)=>{if(i>0){let a=e[i-1],o=Math.ceil(Math.hypot(r.x-a.x,r.y-a.y)/.25);for(let e=1;e<o;e++){let s=e/o,c=a.z??0;t.push({x:a.x+(r.x-a.x)*s,y:a.y+(r.y-a.y)*s,...a.z!==void 0||r.z!==void 0?{z:c+((r.z??0)-c)*s}:{}}),n.push(i-1)}n.push(i-1)}t.push(r)}),{points:t,segmentOf:n}}placeBeam(e,t,n,r,i){if(t.drawnPoints=n,this.terraceLifts.size){let e=this.withSteps(n);n=e.points,r=e.segmentOf.map(e=>r[e]),i=e.segmentOf.map(e=>i[e])}for(;t.world.length<n.length;)t.world.push(new K);t.world.length=n.length,t.distances.length=n.length,n.forEach((n,r)=>{t.world[r].set(n.x-e.puzzle.columns/2,Wm*Bg+(n.z??0)+this.liftAt(n.x,n.y),n.y-e.puzzle.rows/2),t.distances[r]=r===0?0:t.distances[r-1]+t.world[r].distanceTo(t.world[r-1])});let a=Math.max(0,n.length-1),s=d(i[i.length-1]??o);for(t.tip.material.color.copy(Sg(l(s,o,.2),2*Cg(s))),t.pulseMaterial.color.copy(Sg(s,1.8*Cg(s)));t.cores.length<a;){let n=new X(this.cylinder,t.coreMaterial.clone()),r=new X(this.cylinder,t.glowMaterial.clone());t.cores.push(n),t.glows.push(r),e.beamLayer.add(n,r)}t.cores.forEach((e,n)=>{let s=n<a;if(e.visible=s,t.glows[n].visible=s,s){let a=r[n]??1,s=d(i[n]??o),c=Math.sqrt(a);e.material.color.copy(Sg(s,2.2*Cg(i[n]??o))).multiplyScalar(a);let l=t.glows[n].material;l.color.copy(fg(s)),l.opacity=t.glowMaterial.opacity*a*Cg(i[n]??o),T_(e,t.world[n],t.world[n+1],.022*(.5+.5*c)),T_(t.glows[n],t.world[n],t.world[n+1],.085*c),e.visible=e.visible&&a>.001,t.glows[n].visible=e.visible}})}disposeObject(e){e.removeFromParent(),e.traverse(e=>{(e instanceof X||e instanceof Eo)&&(e instanceof X&&e.geometry!==this.cylinder&&e.geometry.dispose(),(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>e.dispose()))})}},w_=new K;function T_(e,t,n,r){let i=w_.subVectors(n,t),a=i.length();e.visible=a>1e-4,e.visible&&(e.position.addVectors(t,n).multiplyScalar(.5),e.scale.set(r*Bg,a,r*Bg),e.quaternion.setFromUnitVectors(ng,i.divideScalar(a)))}var E_=4,D_=.75;function O_(e,t,n){let r=ve(e),i=a=>{let o=r.map((e,t)=>e.angle+(a[t]??0)*Ft(e.kind)),s=r.flatMap((e,t)=>!e.fixed&&a[t]===null?[t]:[]),c=be(e,o),l=de({...c,blocks:[...c.blocks??[],...s.map(e=>({x:r[e].x,y:r[e].y,floor:r[e].floor}))]},t),u=s.filter(e=>l.beams.some(t=>k_(t.points,r[e])));if(u.length===0){n(a.filter((e,t)=>!r[t].fixed),l);return}for(let e=0;e<E_**u.length;e++){let t=[...a];u.forEach((n,r)=>{t[n]=Math.floor(e/E_**r)%E_}),i(t)}};i(r.map(e=>e.fixed?0:null))}function k_(e,t){return e.some((n,r)=>{if(r===0)return!1;let i=e[r-1],a=n.x-i.x,o=n.y-i.y,s=a*a+o*o||1,c=Math.max(0,Math.min(1,((t.x-i.x)*a+(t.y-i.y)*o)/s));return Math.hypot(i.x+c*a-t.x,i.y+c*o-t.y)<=D_})}function A_(e){let t=j_(e),n=[];return O_(e,t,(t,r)=>{_e(e,r.beams)&&n.push(t)}),n}function j_(e){if(!e.gatesStayOpen)return[];let t=(e.switches??[]).map(()=>!1);for(;;){let n=[...t];if(O_(e,t,(e,t)=>{t.switchesOn.forEach((e,t)=>n[t]||=e)}),n.every((e,n)=>e===t[n]))return t;t=n}}function M_(e,t){let n=e.map(e=>e.filter((e,n)=>e!==null&&e>0&&!t.has(n)).length);return n.length===0?null:Math.min(...n)}function N_(e){let t=[];for(let n=0;n<e.rows;n++)for(let r=0;r<e.columns;r++){let i={x:r+.5,y:n+.5};St(e,i)&&t.push(i)}return t}function P_(e,t,n){let r=N_(e),i=[],a=(e,n,o)=>{if(i.push(e),o!==0)for(let i=n;i<r.length;i++)a(wt(e,t,r[i]),i+1,o-1)};return a(e,0,n),i}function F_(e){let t=ve(e).length,n=null;for(let r of P_(e,`mirror`,Ct(e,`mirror`)))for(let e of P_(r,`splitter`,Ct(r,`splitter`))){let r=ve(e),i=new Set(r.flatMap((e,t)=>e.placed?[t]:[])),a=M_(A_(e),i);if(a!==null){let e=a+(r.length-t);n=n===null?e:Math.min(n,e)}}return n}var I_=[[`r`,`red`],[`g`,`green`],[`b`,`blue`]];function L_(e,t){let n=x;if(I_.every(([t])=>e[t]<=n))return`No light is reaching the ring yet.`;if(I_.some(([r])=>t[r]<=n&&e[r]>n))return`Some of the light reaching the ring is a color this mix doesn't need.`;if(I_.some(([r])=>t[r]>n&&e[r]<=n))return`A color this mix needs isn't reaching the ring yet.`;let r=I_.filter(([e])=>t[e]>n).map(([n,r])=>({name:r,difference:e[n]-t[n]}));if(r.every(({difference:e})=>Math.abs(e)<=n))return`This is the right color. Let the light settle.`;if(r.every(({difference:e})=>e>n))return`Every color is there, but the light is too bright.`;if(r.every(({difference:e})=>e<-n))return`Every color is there, but the light is too dim.`;let i=r.reduce((e,t)=>Math.abs(t.difference)>Math.abs(e.difference)?t:e);return i.difference>0?`The right colors are there, but the ${i.name} is too strong.`:`The right colors are there, but the ${i.name} is too weak.`}function R_(e){let t=document.getElementById(e);if(!t)throw Error(`Missing element #${e}`);return t}var z_=R_(`start-screen`),B_=R_(`levels-screen`),V_=R_(`level-worlds`),H_=R_(`levels-locked-note`),U_=R_(`game-screen`),W_=R_(`board-wrap`),G_=R_(`board`),K_=R_(`level-label`),q_=R_(`level-number`),J_=R_(`level-name`),Y_=R_(`target-swatches`),X_=R_(`target-key-label`),Z_=R_(`hint`),Q_=R_(`solved-panel`),$_=R_(`solved-message`),ev=R_(`next-button`),tv=R_(`solved-turns`),nv=R_(`hint-button`),rv=R_(`hints-left`),iv=R_(`hint-message`),av=6e3,ov=R_(`tray`),sv=R_(`world-veil`),cv=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,$=uv();$.prepare(rt[0].puzzle);var lv=new URLSearchParams(location.search).has(`fps`)?new ke:null;function uv(){try{return new C_(G_,cv)}catch(e){throw R_(`graphics-error`).hidden=!1,R_(`play-button`).hidden=!0,e}}var dv=8,fv=44,pv=$h+.2,mv=1/30,hv=.4,gv=450,_v={mirror:`mirror`,splitter:`splitter`},vv=(()=>{try{return window.localStorage}catch{return null}})(),yv=new URLSearchParams(location.search).has(`all`),bv=yv?{tutorialComplete:!0,levelsSolved:ct.length}:jt(vv),xv=Me(vv),Sv=[],Cv={kind:`tutorial`,index:0},wv=rt[0].puzzle,Tv=new N(wv,cv),Ev=null,Dv=null,Ov=null,kv=null,Av=[],jv=!1,Mv=0,Nv=null,Pv=null,Fv=2,Iv,Lv=0,Rv=null,zv=cv?0:500;function Bv(e,t){e.classList.add(`leaving`),window.setTimeout(()=>{e.hidden=!0,e.classList.remove(`leaving`),t.hidden=!1,t===U_?ey():e===U_&&$.clear()},zv)}function Vv(e){e.classList.remove(`fade-in`),e.offsetWidth,e.classList.add(`fade-in`)}var Hv=1100,Uv=!1;function Wv(e){let t=e.kind===`tutorial`?`sky`:ft(e.index),n=$.shownWorld();if(n===null||n===t||cv){Gv(e);return}Uv=!0,Q_.hidden=!0,ov.hidden=!0,sv.classList.add(`shown`),$.dive(mt.indexOf(t)>mt.indexOf(n)?`down`:`up`),window.setTimeout(()=>{Gv(e),sv.classList.remove(`shown`),Uv=!1},Hv)}function Gv(e){Cv=e;let t=e.kind===`tutorial`?rt[e.index]:null;wv=t?t.puzzle:ct[e.index].puzzle,Tv=new N(wv,cv),Ev=null,jv=!1,Lv=0,q_.textContent=t?`Tutorial ${e.index+1} of ${rt.length}`:``,J_.textContent=t?t.name:`Level ${e.index+1}`,Z_.textContent=t?t.hint:``,Mv=0,Nv=null,Dv=null,ly(null),Av=[`mirror`,`splitter`].filter(e=>Ct(wv,e)>0),kv=Av[0]??null,oy(),Fv=2,iy(),iv.hidden=!0,Pv=(t?null:ct[e.index].par)??F_(wv),qv=wv.targets.map(e=>Jv(e.color)),Y_.replaceChildren(...qv.map(e=>e.root)),X_.textContent=wv.targets.length>1?`targets`:`target`,Q_.hidden=!0,Vv(K_),Vv(Z_);let n=t?`sky`:ft(e.index);Dy(Ae(wv,n===`ember`,xv)),U_.dataset.world=n,$.setWorld(n),$.showLevel(wv),ty()}var Kv=[`r`,`g`,`b`],qv=[];function Jv(e){let t=document.createElement(`span`);t.className=`target-card`;let n=document.createElement(`span`);n.className=`target-split`;let r=document.createElement(`span`);r.className=`target-channels`;let i=Kv.map(t=>{let n=document.createElement(`span`);n.className=`target-bar ${t}`;let i=document.createElement(`span`);i.className=`target-fill`;let a=document.createElement(`span`);return a.className=`target-mark`,a.style.left=`${e[t]*100}%`,a.classList.toggle(`none`,e[t]<.01),n.append(i,a),r.append(n),{fill:i,bar:n}});t.append(n,r);let a=Math.max(e.r,e.g,e.b);if(a<.99){let e=document.createElement(`span`);e.className=`target-strength`,e.textContent=Yv(a),t.append(e)}return{root:t,wanted:e,split:n,bars:i,shown:``}}function Yv(e){let t=[[.125,`⅛`],[.25,`¼`],[.5,`½`],[.75,`¾`]].find(([t])=>Math.abs(t-e)<.02);return t?t[1]:`${Math.round(e*100)}%`}function Xv(e){let t=Math.max(e.r,e.g,e.b);return t<.01?e:{r:e.r/t,g:e.g/t,b:e.b/t}}function Zv(e){qv.forEach((t,n)=>{let r=e[n]??{r:0,g:0,b:0},i=Kv.map(e=>r[e].toFixed(2)).join(`,`);if(i===t.shown)return;t.shown=i;let a=Math.max(t.wanted.r,t.wanted.g,t.wanted.b,.01),o={r:Math.min(1,r.r/a),g:Math.min(1,r.g/a),b:Math.min(1,r.b/a)};t.split.style.background=`linear-gradient(90deg, ${f(o)} 0 50%, ${f(Xv(t.wanted))} 50% 100%)`,Kv.forEach((e,n)=>{let{fill:i,bar:a}=t.bars[n];i.style.width=`${Math.min(1,r[e])*100}%`,a.classList.toggle(`on-target`,Math.abs(r[e]-t.wanted[e])<=x)})})}function Qv(){H_.hidden=bv.tutorialComplete;let e=0;V_.replaceChildren(...st.map(({world:t,name:n,levels:r})=>{let i=document.createElement(`section`);i.className=`level-world world-${t}`;let a=document.createElement(`h3`);a.className=`level-world-name`,a.textContent=n;let o=document.createElement(`ol`);return o.className=`level-grid`,o.replaceChildren(...r.map((t,n)=>$v(e+n))),e+=r.length,i.append(a,o),i}))}function $v(e){let t=document.createElement(`button`);t.type=`button`,t.className=`level-tile`,t.textContent=String(e+1);let n=Dt(bv,e);t.disabled=!n,t.classList.toggle(`solved`,e<bv.levelsSolved),t.setAttribute(`aria-label`,n?`Level ${e+1}`:`Level ${e+1}, locked`),t.addEventListener(`click`,()=>{Wv({kind:`level`,index:e}),Bv(B_,U_)});let r=document.createElement(`li`);return r.append(t),r}function ey(){let{width:e,height:t}=W_.getBoundingClientRect();$.resize(e,t),ty()}function ty(){let e=W_.getBoundingClientRect(),t=U_.querySelector(`.game-header`).getBoundingClientRect(),n=[],r=getComputedStyle(Z_).position!==`fixed`;Z_.textContent!==``&&r&&n.push(Z_),ov.hidden||n.push(ov);let i=Math.min(e.bottom-24,...n.map(e=>e.getBoundingClientRect().top));$.setSafeArea(Math.max(0,t.bottom-e.top+6),Math.max(24,e.bottom-i+8))}function ny(){let{kind:e,index:t}=Cv,n=e===`tutorial`&&t===rt.length-1,r=e===`level`&&t===ct.length-1;n?bv=Ot(bv):e===`level`&&(bv=kt(bv,t)),yv||Mt(vv,bv),$_.textContent=n?`Tutorial complete`:r?`All levels complete`:`Solved`,ev.textContent=n?`home`:r?`levels`:`continue`,tv.textContent=dy(Mv,Pv),Q_.hidden=!1,ov.hidden=!0,$.celebrate(wv.targets)}function ry(e){let t=e.targets.findIndex((e,t)=>ge(Tv.arrivedMix(t),e.color)!==`exact`),n=Math.max(0,t),r=L_(Tv.arrivedMix(n),e.targets[n].color);return e.targets.length>1?r.replace(`the ring`,`one ring`):r}function iy(){rv.textContent=String(Fv),nv.disabled=Fv===0,nv.setAttribute(`aria-label`,Fv===0?`No hints left`:`Hint, ${Fv} left`)}function ay(e){let t=ve(wv)[e];(!Nv||!ye(t,Nv))&&(Mv+=1,Nv={x:t.x,y:t.y,floor:t.floor})}function oy(){ov.hidden=Av.length===0,ov.replaceChildren(...Av.map(e=>{let t=Ct(wv,e),n=document.createElement(`button`);return n.type=`button`,n.className=`tray-piece tray-${e}`,n.setAttribute(`aria-pressed`,String(e===kv)),n.setAttribute(`aria-label`,`${_v[e]}, ${t} left`),n.disabled=t===0,n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6" /></svg><span class="tray-count">${t}</span>`,n.addEventListener(`click`,()=>{kv=e,oy()}),n}))}function sy(e){wv=e,Tv.rearrange(e),$.rearrangePieces(e),kv&&Ct(e,kv)===0&&(kv=Av.find(t=>Ct(e,t)>0)??kv),oy()}function cy(e){let t=e&&yt(wv,e);return!jv&&$.introFinished()&&kv!==null&&Ct(wv,kv)>0&&e&&t&&St(wv,t)&&xe(wv,e,pv*$.pieceSize())<0?t:null}function ly(e){$.showPlacement(e,kv??`mirror`)}function uy(e){let t=kv?wt(wv,kv,e):null;t&&(sy(t),ay(xe(t,e,.1)))}function dy(e,t){let n=e=>`${e} ${e===1?`turn`:`turns`}`;return t!==null&&e<=t?`Perfect · ${n(e)}`:t===null?n(e):`${n(e)} · best ${t}`}function fy(e){let t=Rv===null?0:(e-Rv)/1e3;if(Rv=e,!U_.hidden){let e=Math.min(t,mv);Tv.update($.introFinished()?e:0);let n=Tv.view();$.render(n,e),Zv(n.targetMixes),lv?.record(t,$.stats());let r=!jv&&!Ev&&Tv.isSettled()&&Tv.showsSolved();Lv=r?Lv+t:0,r&&Lv>=hv&&(jv=!0,ny())}requestAnimationFrame(fy)}function py(e){return $.boardPointAt(e.clientX,e.clientY)}function my(e){let t=-1,n=1/0,r=ve(wv),i=hy(r),a=new Set(r.map(e=>e.floor));for(let o of a){let a=$.boardPointAt(e.clientX,e.clientY,o);a&&r.forEach((r,s)=>{if(r.fixed||r.floor!==o||Math.hypot(a.x-r.x,a.y-r.y)>i[s])return;let c=$.pagePointOf(r),l=c?Math.hypot(e.clientX-c.x,e.clientY-c.y):1/0;l<=n&&(t=s,n=l)})}return t}function hy(e){return Le(e,pv*$.pieceSize(),Av.length===0)}function gy(e){if(Ov&&e.pointerId===Ov.pointerId){let t=Math.hypot(e.clientX-Ov.x,e.clientY-Ov.y);e.type===`pointerup`&&t<=dv&&$.setZoom(1,0,0),Ov=null;return}if(Dv&&e.pointerId===Dv.pointerId){e.type===`pointerup`&&Dv.cell&&uy(Dv.cell),Dv=null,ly(null);return}if(!Ev||e.pointerId!==Ev.pointerId)return;window.clearTimeout(Ev.pickUpTimer);let t=ve(wv)[Ev.index].kind;!Ev.dragging&&e.type===`pointerup`?(Tv.setPieceGoal(Ev.index,zt(t,Ev.startGoal)),ay(Ev.index)):Ev.dragging&&Tv.setPieceGoal(Ev.index,Rt(t,Tv.pieceGoal(Ev.index))),Ev=null,Tv.holdPiece(-1),$.setActiveMirror(-1)}var _y=new Map,vy=null;function yy(){let[e,t]=[..._y.values()];return{distance:Math.max(1,Math.hypot(e.x-t.x,e.y-t.y)),midX:(e.x+t.x)/2,midY:(e.y+t.y)/2}}function by(){let{zoom:e}=$.zoomState();return(Math.max(wv.columns,wv.rows)+1)/Math.max(1,G_.clientWidth)/e}G_.addEventListener(`pointerdown`,e=>{_y.set(e.pointerId,{x:e.clientX,y:e.clientY}),!(_y.size<2)&&(e.stopImmediatePropagation(),Ev&&(window.clearTimeout(Ev.pickUpTimer),Tv.setPieceGoal(Ev.index,Ev.startGoal),Ev=null,Tv.holdPiece(-1),$.setActiveMirror(-1)),Dv=null,Ov=null,ly(null),G_.setPointerCapture(e.pointerId),vy={...yy(),...$.zoomState()})},{capture:!0}),G_.addEventListener(`pointermove`,e=>{if(!_y.has(e.pointerId)||(_y.set(e.pointerId,{x:e.clientX,y:e.clientY}),!vy||_y.size<2))return;e.stopImmediatePropagation();let t=yy(),n=vy.zoom*(t.distance/vy.distance),r=by();$.setZoom(n,vy.panX-(t.midX-vy.midX)*r,vy.panZ-(t.midY-vy.midY)*r*1.3)},{capture:!0});for(let e of[`pointerup`,`pointercancel`])G_.addEventListener(e,e=>{_y.delete(e.pointerId),vy&&(e.stopImmediatePropagation(),_y.size<2&&(vy=null))},{capture:!0});G_.addEventListener(`wheel`,e=>{e.preventDefault();let{zoom:t,panX:n,panZ:r}=$.zoomState();$.setZoom(t*Math.exp(-e.deltaY*.002),n,r)},{passive:!1});function xy(e){let t=ve(wv),n=t[e],r=$.pagePointOf(n);if(!r)return 0;let i=hy(t)[e],a=Math.min(...t.map((t,n)=>{let i=n===e?null:$.pagePointOf(t);return i?Math.hypot(i.x-r.x,i.y-r.y):1/0})),o=Array.from({length:8},(e,t)=>$.pagePointOf({...n,x:n.x+i*Math.cos(t*Math.PI/4),y:n.y+i*Math.sin(t*Math.PI/4)}));return Math.min(a,2*Math.min(...o.map(e=>e?Math.hypot(e.x-r.x,e.y-r.y):0)))}function Sy(e){let t=xy(e),{zoom:n}=$.zoomState();if(t===0||t>=fv)return 0;let r=ve(wv)[e],i=Fe(t,n,fv,5,t=>$.whenZoomedToward(r,t,()=>xy(e)));return i>n*1.1?i:0}G_.addEventListener(`pointerdown`,e=>{let t=py(e);if(jv||Ev||Uv||!$.introFinished())return;let n=t?my(e):-1;if(n<0){let n=t?cy(t):null;n?(G_.setPointerCapture(e.pointerId),Dv={pointerId:e.pointerId,cell:n},ly(n)):$.zoomState().zoom>1&&(Ov={pointerId:e.pointerId,x:e.clientX,y:e.clientY});return}let r=e.pointerType===`mouse`?0:Sy(n);if(r){$.zoomToward(ve(wv)[n],r);return}G_.setPointerCapture(e.pointerId);let i=ve(wv)[n];Ev={pointerId:e.pointerId,index:n,startX:e.clientX,startY:e.clientY,startGoal:Tv.pieceGoal(n),dragging:!1,pickUpTimer:i.placed?window.setTimeout(()=>{let e=Tt(wv,i);e&&Ev&&!Ev.dragging&&(Ev=null,$.setActiveMirror(-1),sy(e))},gv):void 0},$.setActiveMirror(n)}),G_.addEventListener(`pointermove`,e=>{let t=py(e);if(Dv&&e.pointerId===Dv.pointerId){Dv.cell=cy(t),ly(Dv.cell);return}if(!t)return;if(!Ev){let n=!jv&&$.introFinished()?my(e):-1;$.setActiveMirror(n);let r=e.pointerType===`mouse`?cy(t):null;ly(r),G_.style.cursor=n>=0?`grab`:r?`copy`:`default`;return}if(e.pointerId!==Ev.pointerId)return;let n=Math.hypot(e.clientX-Ev.startX,e.clientY-Ev.startY);!Ev.dragging&&n>dv&&(Ev.dragging=!0,window.clearTimeout(Ev.pickUpTimer),ay(Ev.index),Tv.holdPiece(Ev.index),G_.style.cursor=`grabbing`),Ev.dragging&&Tv.setPieceGoal(Ev.index,Vt(Ev.startGoal,e.clientX-Ev.startX))}),G_.addEventListener(`pointerup`,gy),G_.addEventListener(`pointercancel`,gy),G_.addEventListener(`pointerleave`,()=>{Ev||$.setActiveMirror(-1),Dv||ly(null)});var Cy=R_(`guide`),wy=R_(`guide-button`),Ty=[...Cy.querySelectorAll(`[data-topics]`)];function Ey(){Cy.hidden=!0}wy.addEventListener(`click`,()=>{Cy.hidden=!1,Ty.find(e=>e.classList.contains(`new`))?.scrollIntoView({block:`center`});for(let e of Sv)xv.add(e);Ne(vv,xv),wy.classList.remove(`has-new`)}),R_(`guide-close`).addEventListener(`click`,Ey);function Dy(e){Sv=e,wy.classList.toggle(`has-new`,e.length>0);for(let t of Ty){let n=(t.dataset.topics??``).split(` `);t.classList.toggle(`new`,n.some(t=>e.includes(t)))}}Cy.addEventListener(`click`,e=>{e.target===Cy&&Ey()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&Ey()}),nv.addEventListener(`click`,()=>{Fv!==0&&!jv&&$.introFinished()&&(--Fv,iy(),iv.textContent=ry(wv),iv.hidden=!1,window.clearTimeout(Iv),Iv=window.setTimeout(()=>iv.hidden=!0,av))}),R_(`play-button`).addEventListener(`click`,()=>{Wv({kind:`tutorial`,index:0}),Bv(z_,U_)}),R_(`levels-button`).addEventListener(`click`,()=>{Qv(),Bv(z_,B_)}),R_(`levels-back-button`).addEventListener(`click`,()=>Bv(B_,z_)),R_(`back-button`).addEventListener(`click`,()=>{Cv.kind===`level`?(Qv(),Bv(U_,B_)):Bv(U_,z_)}),ev.addEventListener(`click`,()=>{let{kind:e,index:t}=Cv;e===`tutorial`&&t<rt.length-1?Wv({kind:e,index:t+1}):e===`tutorial`?Bv(U_,z_):t<ct.length-1?Wv({kind:e,index:t+1}):(Qv(),Bv(U_,B_))}),new ResizeObserver(ey).observe(W_),requestAnimationFrame(fy);