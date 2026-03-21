// === state.js — State management, utilities, utilities ===
const S={tab:'introduction',slide:0,agapeHi:false,agapeEq:'session',morgEq:'session',designSec:0,designFocus:false,contOn:true,contPct:10,picks:{},lang:'ko',presPage:0,presZoom:1,presPanX:0,presPanY:0,presSidebarOpen:true,presNotesOpen:false,presNotes:{},preset:null,scopeFocus:'2',introProcIdx:4};
function pickDesign(secKey,imgIdx){
  if(S.picks[secKey]===imgIdx)delete S.picks[secKey]; else S.picks[secKey]=imgIdx;
  render();
}
function setDesignPick(secKey,imgIdx){
  S.picks[secKey]=imgIdx;
  render();
}
function setIntroProcessStep(i){
  const ic=INTRO_CONTENT[S.lang]||INTRO_CONTENT.ko;
  const max=(ic.process&&ic.process.length?ic.process.length:1)-1;
  const n=Math.max(0,Math.min(max,Number(i)||0));
  S.introProcIdx=n;
  render();
}
const expanded={};
function catKey(slide,sec,cat){return slide+'_'+sec+'_'+cat;}
function isCatOpen(k){return expanded[k]!==false;}

function find(id){for(const k in D){const f=D[k].find(i=>i.id===id);if(f)return f;}return null;}
function toggle(id,e){
  if(e)e.stopPropagation();
  const it=find(id);if(!it)return;
  it.on=!it.on;
  if(it.on&&it.alt){it.alt.split(',').forEach(a=>{const x=find(a.trim());if(x)x.on=false;});}
  const sy = window.scrollY;
  const activeId = document.activeElement ? document.activeElement.id : null;
  render();
  window.scrollTo(0, sy);
  if(activeId) {
    const el = document.getElementById(activeId);
    if(el) {
      const len = el.value ? el.value.length : 0;
      el.focus();
      if(el.setSelectionRange) el.setSelectionRange(len, len);
    }
  }
}
function setC(id,v){
  const it=find(id);if(!it)return;it.cv=v;
  updateTotals();
}
function updateTotals(){
  const T=getT();
  const mn=Math.min(...T.map(x=>x.t));
  const mx=Math.max(...T.map(x=>x.t));
  document.querySelectorAll('.dc').forEach((el,i)=>{
    const o=T[i];
    const dps=el.querySelectorAll('.dp');
    if(dps[0])dps[0].textContent=fmt(o.t);
    if(dps[1])dps[1].textContent=fmt(o.tH);
    const chips=el.querySelectorAll('.chip');
    if(chips[0])chips[0].textContent=t('gc')+' '+fmt(o.gc);
    if(chips[1])chips[1].textContent=t('equip')+' '+fmt(o.eq);
    if(chips[2])chips[2].textContent=(S.contOn?S.contPct+'%':'')+' '+fmt(o.cont);
    const lt=el.querySelector('.ltag');
    if(o.t===mn&&o.t>0){if(!lt){const s=document.createElement('span');s.className='ltag';s.textContent=t('lowest');el.appendChild(s);}}
    else{if(lt)lt.remove();}
  });
  document.querySelectorAll('.br').forEach((el,i)=>{
    const t=T[i];
    const gp=mx>0?(t.gc/mx)*100:0, ep=mx>0?(t.eq/mx)*100:0;
    el.querySelector('.bg').style.width=gp+'%';
    el.querySelector('.bg').textContent=fmt(t.gc);
    el.querySelector('.be').style.width=ep+'%';
    el.querySelector('.be').textContent=fmt(t.eq);
    el.querySelector('.bv').textContent=fmt(t.t);
  });
  updateSlideNumbers();
}
function updateSlideNumbers(){
  const T=getT();
  document.querySelectorAll('.gt').forEach((el,i)=>{
    const sp=el.querySelectorAll('span');
    if(sp[1])sp[1].textContent=fmt(T[i].t);
  });
  document.querySelectorAll('.pbadge').forEach((el,i)=>{el.textContent=fmt(T[i].t);});
  document.querySelectorAll('.cont-line').forEach((el,i)=>{
    const sp=el.querySelectorAll('span');
    if(sp[1]&&T[i])sp[1].textContent=fmt(T[i].cont);
  });
  const sections=[
    {arr:D.a_gc,idx:0},{arr:D.a_eq,idx:1},
    {arr:D.b_gc,idx:2},{arr:D.b_eq,idx:3},
    {arr:D.c_gc,idx:4},{arr:S.agapeEq==='ford'?D.c_ef:D.c_es,idx:5},
    {arr:D.d_gc,idx:6},{arr:S.morgEq==='ford'?D.d_ef:D.d_es,idx:7},
  ];
  const secs=document.querySelectorAll('.sec');
  secs.forEach((secEl,si)=>{
    if(!sections[si])return;
    const arr=sections[si].arr;
    const tot=sumA(arr), onN=arr.filter(x=>x.on).length;
    const hdr=secEl.querySelector('.ss');
    if(hdr)hdr.textContent=onN+'/'+arr.length+' = '+fmt(tot);
    const sub=secEl.querySelector('.sub');
    if(sub){const sp=sub.querySelectorAll('span');if(sp[1])sp[1].textContent=fmt(tot);}
  });
}
function iCost(it){if(it.cv&&it.cv!==''&&!isNaN(parseFloat(it.cv)))return parseFloat(it.cv);if(it.lo!==undefined)return S.agapeHi?(it.hi||it.cost):(it.lo||it.cost);return it.cost;}
function sumA(arr){return arr.reduce((s,i)=>s+(i.on?iCost(i):0),0);}
function sumV(arr,v){return arr.reduce((s,i)=>{if(!i.on)return s;if(i.bv&&i.bv!==v)return s;return s+iCost(i);},0);}
function fmt(n){return(n<0?'-$':'$')+Math.abs(Math.round(n)).toLocaleString('en-US');}
function escapeHtml(s){return String(s||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]||ch));}
function goTab(t){S.tab=t;render();}
function goSlide(i){S.slide=i;render();}
function toggleCat(k){expanded[k]=!isCatOpen(k);render();}
function setOn(id,on){const it=find(id);if(it)it.on=on;}
function setScopeFocus(key,doRender=true){
  const k=String(key||'');
  if(!ESTIMATE_CARDS.some(c=>c.key===k))return;
  S.scopeFocus=k;
  if(doRender)render();
}
function resetOptionBToRaw(){
  [...D.b_gc,...D.b_eq].forEach(it=>{
    if(RAW_ON[it.id]!==undefined)it.on=RAW_ON[it.id];
  });
}
function applyPreset(key,doRender=true){
  resetOptionBToRaw();
  // Package presets are mapped to Session scope toggles.
  // Flooring is only toggled through Session Alt #1 ($9,100).
  if(key==='1'){
    setOn('b_range_c',true);setOn('b_range_s',false);
    setOn('b_stock_c',true);setOn('b_stock_s',false);
    setOn('b_gas',true);
    setOn('b_coffee_gc',true);setOn('b_coffee',true);
    setOn('b_floor1',true);setOn('b_floor2',false);
  }else if(key==='2'){
    B_SCOPE.cook.forEach(id=>setOn(id,false));
    B_SCOPE.coffee.forEach(id=>setOn(id,false));
    setOn('b_floor1',true);setOn('b_floor2',false);
  }else if(key==='3'){
    B_SCOPE.cook.forEach(id=>setOn(id,false));
    B_SCOPE.coffee.forEach(id=>setOn(id,false));
    B_SCOPE.floor.forEach(id=>setOn(id,false));
  }
  S.preset=key;
  S.scopeFocus=key;
  S.slide=1;
  if(doRender)render();
}
function resetPreset(){
  resetOptionBToRaw();
  S.preset=null;
  S.slide=1;
  render();
}

function contRate(){return S.contOn?S.contPct/100:0;}
function setContPct(v){
  const n=parseFloat(v);
  if(!isNaN(n)&&n>=0&&n<=100)S.contPct=n;
  updateTotals();
}
function toggleCont(){S.contOn=!S.contOn;render();}
function getT(){
  const agl=sumV(D.a_gc,'low'),ael=sumV(D.a_eq,'low');
  const agh=sumV(D.a_gc,'high'),aeh=sumV(D.a_eq,'high');
  const bgl=sumV(D.b_gc,'low'),bel=sumV(D.b_eq,'low');
  const bgh=sumV(D.b_gc,'high'),beh=sumV(D.b_eq,'high');
  const cEq=S.agapeEq==='ford'?D.c_ef:D.c_es;
  const cgl=sumV(D.c_gc,'low'),cel=sumV(cEq,'low');
  const cgh=sumV(D.c_gc,'high'),ceh=sumV(cEq,'high');
  const dEq=S.morgEq==='ford'?D.d_ef:D.d_es;
  const dgl=sumV(D.d_gc,'low'),del_=sumV(dEq,'low');
  const dgh=sumV(D.d_gc,'high'),deh=sumV(dEq,'high');
  const cr=contRate();
  const acl=Math.round((agl+ael)*cr),ach=Math.round((agh+aeh)*cr);
  const bcl=Math.round((bgl+bel)*cr),bch=Math.round((bgh+beh)*cr);
  const ccl=Math.round((cgl+cel)*cr),cch=Math.round((cgh+ceh)*cr);
  const dcl=Math.round((dgl+del_)*cr),dch=Math.round((dgh+deh)*cr);
  return[
    {k:'A',l:'KFS + Ford',gc:agl,eq:ael,cont:acl,t:agl+ael+acl,gcH:agh,eqH:aeh,contH:ach,tH:agh+aeh+ach,c:'green'},
    {k:'B',l:'Pernikoff + Session',gc:bgl,eq:bel,cont:bcl,t:bgl+bel+bcl,gcH:bgh,eqH:beh,contH:bch,tH:bgh+beh+bch,c:'blue'},
    {k:'C',l:'Agape + '+(S.agapeEq==='ford'?'Ford':'Session'),gc:cgl,eq:cel,cont:ccl,t:cgl+cel+ccl,gcH:cgh,eqH:ceh,contH:cch,tH:cgh+ceh+cch,c:'orange'},
    {k:'D',l:'Morganco + '+(S.morgEq==='ford'?'Ford':'Session'),gc:dgl,eq:del_,cont:dcl,t:dgl+del_+dcl,gcH:dgh,eqH:deh,contH:dch,tH:dgh+deh+dch,c:'red'},
  ];
}
