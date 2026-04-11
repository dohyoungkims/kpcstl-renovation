// === render.js — Main render loop, carousel, print, initialization ===
// ===== MAIN RENDER =====
function render(){
  normalizePicks();
  const T=getT();
  let h='';

  document.body.classList.toggle('is-intro', S.tab === 'introduction');
  document.body.classList.toggle('is-floorplan', S.tab === 'floorplan');
  document.body.classList.toggle('is-presentation', S.tab === 'presentation');

  // Update header tabs
  const tabsEl=document.getElementById('header-tabs');
  if(tabsEl){
    const tabs=[
      {k:'introduction',l:t('introduction')},
      {k:'design',l:S.lang==='ko'?'디자인':'Design'},
      {k:'floorplan',l:t('floorplan')},
      {k:'polycam',l:t('polycam')},
      {k:'enscape',l:t('enscape')},
      {k:'selections',l:t('selections')+(Object.keys(S.picks).length>0?' ('+Object.keys(S.picks).length+'/'+selectableSections().length+')':'')},
      {k:'presentation',l:t('presentation')},
      {k:'estimates',l:t('estimates')},
      {k:'meetings',l:t('meetings')},
    ];
    tabsEl.innerHTML=tabs.map(tb=>`<button role="tab" aria-selected="${S.tab===tb.k?'true':'false'}" class="gtab PillButton ${S.tab===tb.k?'on':''}" onclick="goTab('${tb.k}')"><span>${tb.l}</span></button>`).join('') + `<div class="gtab-slider" id="gtab-slider"></div>`;
    requestAnimationFrame(updateTabSlider);
  }

  if(S.tab==='introduction'){
    h+=rIntroPanel();
  }else if(S.tab==='estimates'){
    const b=T[1]||{k:'B',l:'Pernikoff + Session',gc:0,eq:0,cont:0,t:0};
    h+=rEstimateSummary();
    h+=`<section id="detailed-estimates" data-mode="option-b" class="est-source SectionBoard SurfaceCard"><div class="est-source-head"><h3>${t('sourceTitle')}</h3><p>${t('sourceSub')}</p></div>`;

    // Contingency control
    h+=`<div class="cont-ctrl">
      <label class="tog" onclick="event.stopPropagation()"><input type="checkbox" ${S.contOn?'checked':''} onchange="toggleCont()"><span class="tk"></span><span class="tm"></span></label>
      <span class="cont-label">${t('contingency')}</span>
      <div class="cont-input-wrap">
        <input type="text" inputmode="decimal" class="cont-inp" value="${S.contPct}" onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" oninput="setContPct(this.value)" ${S.contOn?'':'disabled'} style="${S.contOn?'':'opacity:0.35'}">
        <span class="cont-pct">%</span>
      </div>
      <span class="cont-amt" style="${S.contOn?'':'opacity:0.35'}">${S.contOn?t('adds')+' '+fmt(b.cont)+' '+t('toOption')+' B':t('off')}</span>
    </div>`;

    h+=`<div class="ocard"><div class="ohdr blue"><div class="tr"><h2>${t('slideB')}</h2><span class="pbadge blue">${fmt(b.t)}</span></div></div><div class="obody">`;
    h+=rSecGC(t('gcPern'),D.b_gc);
    h+=`<div class="note">${t('noteB')}</div>`;
    h+=rSecEq(t('eqSession'),D.b_eq,1,'b');
    h+=`<div class="note">${t('noteBeq')}</div>`;
    h+=`<div class="sub cont-line" style="${S.contOn?'':'opacity:0.35'}"><span>${t('contingency')} (${S.contOn?S.contPct+'%':t('off')})</span><span>${fmt(b.cont)}</span></div>`;
    h+=`<div class="gt blue"><span>${S.lang==='ko'?'최종 합계 (Option B)':'Final Total (Option B)'}${S.contOn?' (w/ '+S.contPct+'%)':''}</span><span>${fmt(b.t)}</span></div>`;
    h+=`</div></div>`;
    h+=`<button class="print-btn PillButton" onclick="printReport()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>${t('printBtn')}</button>`;
    h+=`<div class="disc">${t('disc')}<br>${t('discDate')}</div>`;
    h+=`</section>`;
  }else if(S.tab==='design'){
    h+=rDesignPanel();
  }else if(S.tab==='floorplan'){
    h+=rFloorPlanPanel();
  }else if(S.tab==='selections'){
    h+=rSelectionsPanel();
  }else if(S.tab==='meetings'){
    h+=rMeetingNotesPanel();
  }

  const appDyn=document.getElementById('app-dynamic');
  const appPoly=document.getElementById('app-polycam');
  const appEns=document.getElementById('app-enscape');
  const appEl=document.getElementById('app');
  const presRoot=document.getElementById('pres-root');

  const headerEl=document.querySelector('.header');
  if(S.tab==='presentation'){
    if(typeof teardownPresViewer==='function')teardownPresViewer();
    delete appEl.dataset.activeOption;
    // Hide header + main app, show presentation in separate root
    if(headerEl)headerEl.style.display='none';
    appEl.style.display='none';
    presRoot.innerHTML=rPresentationPanel();
    presRoot.style.display='block';
    requestAnimationFrame(()=>{initPresViewer();});
  }else{
    if(typeof teardownPresViewer==='function')teardownPresViewer();
    // Normal tabs — restore header + app
    if(headerEl)headerEl.style.display='';
    appEl.style.display='';
    presRoot.innerHTML='';
    presRoot.style.display='none';
    
    appDyn.style.display = (S.tab==='polycam'||S.tab==='enscape') ? 'none' : 'block';
    appPoly.style.display = S.tab==='polycam' ? 'block' : 'none';
    appEns.style.display = S.tab==='enscape' ? 'block' : 'none';
    
    if(S.tab==='polycam' && !appPoly.innerHTML) appPoly.innerHTML = rPolycamPanel();
    if(S.tab==='enscape' && !appEns.innerHTML) appEns.innerHTML = rEnscapePanel();
    if(S.tab!=='polycam' && S.tab!=='enscape') appDyn.innerHTML = h;

    if(S.tab==='estimates'){
      appEl.dataset.activeOption='b';
    }else{
      delete appEl.dataset.activeOption;
    }
    requestAnimationFrame(initExGalleryReveal);
    if(S.tab==='introduction') {
      requestAnimationFrame(initScrollReveal);
    }
    if(S.tab==='estimates'){
      setupSwipe();
      requestAnimationFrame(syncCarouselHeight);
    }
  }
}

function syncCarouselHeight(){
  const vp=document.querySelector('.cvp');
  const slides=document.querySelectorAll('.csl');
  if(!vp||!slides.length)return;
  const active=slides[S.slide!==null?S.slide:0]||slides[0];
  const h=active.offsetHeight;
  if(h>0)vp.style.height=h+'px';
  active.querySelectorAll('img').forEach(img => {
    if(!img.complete) {
      img.addEventListener('load', () => {
        const newH=active.offsetHeight;
        if(newH>0)vp.style.height=newH+'px';
      }, {once:true});
    }
  });
}

let tx=0;
function setupSwipe(){
  const vp=document.querySelector('.cvp');if(!vp)return;
  vp.ontouchstart=e=>{tx=e.changedTouches[0].screenX;};
  vp.ontouchend=e=>{const d=tx-e.changedTouches[0].screenX;const s=S.slide!==null?S.slide:0;if(Math.abs(d)>50){if(d>0&&s<3)goSlide(s+1);else if(d<0&&s>0)goSlide(s-1);}};
}
document.addEventListener('keydown',e=>{
  if(LB.open)return;
  if(S.tab!=='estimates')return;
  if(document.activeElement&&(document.activeElement.tagName==='INPUT'||document.activeElement.tagName==='TEXTAREA'))return;
  const s=S.slide!==null?S.slide:0;
  if(e.key==='ArrowRight'&&s<3)goSlide(s+1);
  if(e.key==='ArrowLeft'&&s>0)goSlide(s-1);
});
window.addEventListener('resize',()=>{
  requestAnimationFrame(syncCarouselHeight);
});

// ===== PRINT REPORT =====
function printReport(){
  const T=getT();
  const b=T[1]||{k:'B',l:'Pernikoff + Session',gc:0,eq:0,cont:0,t:0};
  const now=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  let p='';

  function pItems(arr,secKey){
    let h='';
    const catOrder=['cooking','fridge','sinks','shelving','wallstorage','countertop','walls'];
    const assigned=new Set();
    catOrder.forEach(ck=>{
      const cat=CATS[ck];
      const idSet=cat['ids_'+secKey]||[];
      const items=arr.filter(i=>idSet.includes(i.id)&&i.on);
      idSet.forEach(id=>assigned.add(id));
      if(!items.length)return;
      const catTot=items.reduce((s,i)=>s+iCost(i),0);
      h+=`<div class="p-cat-hdr"><span>${cat.icon} ${cat.name}</span><span>${fmt(catTot)}</span></div>`;
      items.forEach(i=>{
        const v=iCost(i);
        const isC=i.cv&&i.cv!==''&&!isNaN(parseFloat(i.cv));
        h+=`<div class="p-item ${isC?'custom':''}"><div class="p-iname">${i.name}${i.det?' <span class="p-idet">\u2014 '+i.det+'</span>':''}</div><div class="p-icost">${fmt(v)}${isC?' *':''}</div></div>`;
      });
    });
    const other=arr.filter(i=>!assigned.has(i.id)&&i.on);
    if(other.length){
      const oTot=other.reduce((s,i)=>s+iCost(i),0);
      h+=`<div class="p-cat-hdr"><span>Other Items</span><span>${fmt(oTot)}</span></div>`;
      other.forEach(i=>{
        const v=iCost(i);
        const isC=i.cv&&i.cv!==''&&!isNaN(parseFloat(i.cv));
        h+=`<div class="p-item ${isC?'custom':''}"><div class="p-iname">${i.name}${i.det?' <span class="p-idet">\u2014 '+i.det+'</span>':''}</div><div class="p-icost">${fmt(v)}${isC?' *':''}</div></div>`;
      });
    }
    return h;
  }

  function pGCItems(arr){
    let h='';
    arr.filter(i=>i.on).forEach(i=>{
      const v=iCost(i);
      h+=`<div class="p-item"><div class="p-iname">${i.name}${i.det?' <span class="p-idet">\u2014 '+i.det+'</span>':''}</div><div class="p-icost">${fmt(v)}</div></div>`;
    });
    return h;
  }

  p+=`<div class="p-page">
    <div class="p-header">
      <h1>Korean Presbyterian Church \u2014 Kitchen Renovation</h1>
      <p>Approved Estimate Summary (Option B)</p>
      <div class="p-date">Generated ${now} \u00b7 Pre-tax estimates \u00b7 Session + Pernikoff only</div>
    </div>
    <div class="p-summary">
      <h2>Approved Total</h2>
      <div class="p-sum-grid">`;
  p+=`<div class="p-sum-card lowest">
    <div class="p-opt">Option ${b.k}</div>
    <div class="p-name">${b.l}</div>
    <div class="p-price low">${fmt(b.t)}</div>
    <div class="p-bk">GC: ${fmt(b.gc)} | Equip: ${fmt(b.eq)}${S.contOn?' | '+S.contPct+'%: '+fmt(b.cont):''}</div>
  </div>`;
  p+=`</div></div>`;
  p+=`<div class="p-footer">This report reflects the approved Option B path in the interactive cost simulator. All figures are pre-tax estimates. Not a binding contract. * = custom price entered by user.</div>`;
  p+=`</div>`;

  const optData=[
    {t:T[1],c:'blue',gcLabel:'GC: Pernikoff (Revised 3/9)',gcArr:D.b_gc,eqLabel:'Supplier: Session + Kitchen Mechanical',eqArr:D.b_eq,eqKey:'b',notes:'Pernikoff (est. 1914). Base: LED, 7 outlets, water heater, plumbing, demo, tile, SS panel install, infill door, paint ($1,500). Excludes appliances, faucets, SS panels, plans, permits.'},
  ];

  optData.forEach(o=>{
    const gcTot=sumA(o.gcArr);
    const eqTot=sumA(o.eqArr);
    const gcOn=o.gcArr.filter(i=>i.on).length;
    const eqOn=o.eqArr.filter(i=>i.on).length;
    p+=`<div class="p-page">
      <div class="p-header">
        <h1>Option ${o.t.k}: ${o.t.l}</h1>
        <p>Detailed Line Items \u2014 Selected Items Only</p>
        <div class="p-date">${now}</div>
      </div>
      <div class="p-opt-total">Total: ${fmt(o.t.t)} (GC: ${fmt(o.t.gc)} + Equipment: ${fmt(o.t.eq)}${S.contOn?' + '+S.contPct+'% Contingency: '+fmt(o.t.cont):''})</div>`;
    p+=`<div class="p-sec"><h3>${o.gcLabel} \u2014 ${gcOn} items = ${fmt(gcTot)}</h3>`;
    p+=pGCItems(o.gcArr);
    p+=`<div class="p-subtotal"><span>GC Subtotal</span><span>${fmt(gcTot)}</span></div></div>`;
    p+=`<div class="p-sec"><h3>${o.eqLabel} \u2014 ${eqOn} items = ${fmt(eqTot)}</h3>`;
    p+=pItems(o.eqArr,o.eqKey);
    p+=`<div class="p-subtotal"><span>Equipment Subtotal</span><span>${fmt(eqTot)}</span></div></div>`;
    if(S.contOn)p+=`<div class="p-subtotal" style="border-top:1px dashed #999;margin-top:8px;padding-top:6px"><span>Contingency (${S.contPct}%)</span><span>${fmt(o.t.cont)}</span></div>`;
    p+=`<div class="p-grand ${o.c}"><span>OPTION ${o.t.k} TOTAL${S.contOn?' (w/ '+S.contPct+'%)':''}</span><span>${fmt(o.t.t)}</span></div>`;
    p+=`<div class="p-note">${o.notes}</div>`;
    p+=`<div class="p-footer">Korean Presbyterian Church Kitchen Renovation \u2014 ${now} \u2014 Pre-tax estimates \u2014 For planning only. * = custom user-entered price.</div>`;
    p+=`</div>`;
  });

  document.getElementById('print-overlay').innerHTML=p;
  setTimeout(()=>window.print(),200);
}

render();
