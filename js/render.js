// === render.js — Main render loop, carousel, print, initialization ===
// ===== MAIN RENDER =====
function render(){
  normalizePicks();
  const T=getT();
  const mn=Math.min(...T.map(x=>x.t));
  const mx=Math.max(...T.map(x=>x.t));
  let h='';

  // Update header tabs
  const tabsEl=document.getElementById('header-tabs');
  if(tabsEl){
    const tabs=[
      {k:'introduction',l:t('introduction')},
      {k:'design',l:t('design')},
      {k:'floorplan',l:t('floorplan')},
      {k:'polycam',l:t('polycam')},
      {k:'enscape',l:t('enscape')},
      {k:'selections',l:t('selections')+(Object.keys(S.picks).length>0?' ('+Object.keys(S.picks).length+'/'+selectableSections().length+')':'')},
      {k:'presentation',l:t('presentation')},
      {k:'estimates',l:t('estimates')},
    ];
    tabsEl.innerHTML=tabs.map(tb=>`<button class="gtab ${S.tab===tb.k?'on':''}" onclick="goTab('${tb.k}')">${tb.l}</button>`).join('');
  }

  if(S.tab==='introduction'){
    h+=rIntroPanel();
  }else if(S.tab==='estimates'){
    h+=rEstimateSummary();
    h+=`<section id="detailed-estimates" class="est-source"><div class="est-source-head"><h3>${t('sourceTitle')}</h3><p>${t('sourceSub')}</p></div>`;
    h+=`<div class="dash">`;
    T.forEach((o,i)=>{
      const low=o.t===mn&&o.t>0;
      h+=`<div class="dc ${o.c} ${S.slide===i?'on':''}" onclick="goSlide(${i})">
        ${low?'<span class="ltag">'+t('lowest')+'</span>':''}
        <div class="dk"><span class="dot ${o.c}"></span>${t('opt'+o.k)}</div>
        <div class="dn">${o.l}</div>
        <div class="dp-wrap-low"><div class="dp-label">${t('openShelving')}</div><div class="dp">${fmt(o.t)}</div></div>
        <div class="dp-wrap-high"><div class="dp-label">${t('cabinets')}</div><div class="dp">${fmt(o.tH)}</div></div>
        <div class="dd"><span class="chip">${t('gc')} ${fmt(o.gc)}</span><span class="chip">${t('equip')} ${fmt(o.eq)}</span><span class="chip">${S.contOn?S.contPct+'%':''} ${fmt(o.cont)}</span></div>
      </div>`;
    });
    h+=`</div>`;

    h+=`<div class="bars"><h3>${t('visualComp')}</h3>`;
    T.forEach(o=>{
      const gp=mx>0?(o.gc/mx)*100:0, ep=mx>0?(o.eq/mx)*100:0;
      h+=`<div class="br"><div class="bl">${o.k}: ${o.l.split('+')[0].trim()}</div><div class="bt"><div class="bg bb" style="width:${gp}%">${fmt(o.gc)}</div><div class="be bb" style="width:${ep}%">${fmt(o.eq)}</div></div><div class="bv">${fmt(o.t)}</div></div>`;
    });
    h+=`</div>`;

    // Contingency control
    h+=`<div class="cont-ctrl">
      <label class="tog" onclick="event.stopPropagation()"><input type="checkbox" ${S.contOn?'checked':''} onchange="toggleCont()"><span class="tk"></span><span class="tm"></span></label>
      <span class="cont-label">${t('contingency')}</span>
      <div class="cont-input-wrap">
        <input type="text" inputmode="decimal" class="cont-inp" value="${S.contPct}" onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" oninput="setContPct(this.value)" ${S.contOn?'':'disabled'} style="${S.contOn?'':'opacity:0.35'}">
        <span class="cont-pct">%</span>
      </div>
      <span class="cont-amt" style="${S.contOn?'':'opacity:0.35'}">${S.contOn?t('adds')+' '+fmt(T[S.slide].cont)+' '+t('toOption')+' '+T[S.slide].k:t('off')}</span>
    </div>`;

    h+=`<div class="cvp"><div class="ctr" style="transform:translateX(-${S.slide*100}%)">`;

    // SLIDE A
    h+=`<div class="csl"><div class="ocard"><div class="ohdr blue"><div class="tr"><h2>${t('slideA')}</h2><span class="pbadge blue">${fmt(T[0].t)}</span></div></div><div class="obody">`;
    h+=rSecGC(t('gcKFS'),D.a_gc);
    h+=`<div class="note">${t('noteA')}</div>`;
    h+=rSecEq(t('eqFord'),D.a_eq,0,'a');
    h+=`<div class="note">${t('noteAeq')}</div>`;
    h+=`<div class="sub cont-line" style="${S.contOn?'':'opacity:0.35'}"><span>${t('contingency')} (${S.contOn?S.contPct+'%':t('off')})</span><span>${fmt(T[0].cont)}</span></div>`;
    h+=`<div class="gt blue"><span>${t('optionTotal')} A ${t('total')}${S.contOn?' (w/ '+S.contPct+'%)':''}</span><span>${fmt(T[0].t)}</span></div>`;
    h+=`</div></div></div>`;

    // SLIDE B
    h+=`<div class="csl"><div class="ocard"><div class="ohdr green"><div class="tr"><h2>${t('slideB')}</h2><span class="pbadge green">${fmt(T[1].t)}</span></div></div><div class="obody">`;
    h+=rSecGC(t('gcPern'),D.b_gc);
    h+=`<div class="note">${t('noteB')}</div>`;
    h+=rSecEq(t('eqSession'),D.b_eq,1,'b');
    h+=`<div class="note">${t('noteBeq')}</div>`;
    h+=`<div class="sub cont-line" style="${S.contOn?'':'opacity:0.35'}"><span>${t('contingency')} (${S.contOn?S.contPct+'%':t('off')})</span><span>${fmt(T[1].cont)}</span></div>`;
    h+=`<div class="gt green"><span>${t('optionTotal')} B ${t('total')}${S.contOn?' (w/ '+S.contPct+'%)':''}</span><span>${fmt(T[1].t)}</span></div>`;
    h+=`</div></div></div>`;

    // SLIDE C
    h+=`<div class="csl"><div class="ocard"><div class="ohdr orange"><div class="tr"><h2>${S.agapeEq==='ford'?t('slideCf'):t('slideCs')}</h2><span class="pbadge orange">${fmt(T[2].t)}</span></div></div><div class="obody">`;
    h+=`<div class="psel"><button class="po ${!S.agapeHi?'on':''}" onclick="S.agapeHi=false;render()">${t('low')}</button><button class="po ${S.agapeHi?'on':''}" onclick="S.agapeHi=true;render()">${t('high')}</button></div>`;
    h+=rSecGC(t('gcAgape'),D.c_gc);
    h+=`<div class="note">${t('noteC')}</div>`;
    h+=`<div style="margin:10px 0"><div style="font-size:10px;font-weight:600;color:var(--g1);margin-bottom:4px;letter-spacing:1px;text-transform:uppercase">${t('eqSupplier')}</div><div class="psel"><button class="po ${S.agapeEq==='ford'?'on':''}" onclick="S.agapeEq='ford';render()">${t('ford')}</button><button class="po ${S.agapeEq==='session'?'on':''}" onclick="S.agapeEq='session';render()">${t('session')}</button></div></div>`;
    if(S.agapeEq==='ford'){h+=rSecEq(t('eqFordShort'),D.c_ef,2,'cf');}
    else{h+=rSecEq(t('eqSessionShort'),D.c_es,2,'cs');}
    h+=`<div class="sub cont-line" style="${S.contOn?'':'opacity:0.35'}"><span>${t('contingency')} (${S.contOn?S.contPct+'%':t('off')})</span><span>${fmt(T[2].cont)}</span></div>`;
    h+=`<div class="gt orange"><span>${t('optionTotal')} C ${t('total')}${S.contOn?' (w/ '+S.contPct+'%)':''}</span><span>${fmt(T[2].t)}</span></div>`;
    h+=`</div></div></div>`;

    // SLIDE D
    h+=`<div class="csl"><div class="ocard"><div class="ohdr purple"><div class="tr"><h2>${S.morgEq==='ford'?t('slideDf'):t('slideDs')}</h2><span class="pbadge purple">${fmt(T[3].t)}</span></div></div><div class="obody">`;
    h+=rSecGC(t('gcMorg'),D.d_gc);
    h+=`<div class="note">${t('noteD')}</div>`;
    h+=`<div style="margin:10px 0"><div style="font-size:10px;font-weight:600;color:var(--g1);margin-bottom:4px;letter-spacing:1px;text-transform:uppercase">${t('eqSupplier')} (${t('eqOnly')})</div><div class="psel"><button class="po ${S.morgEq==='ford'?'on':''}" onclick="S.morgEq='ford';render()">${t('ford')}</button><button class="po ${S.morgEq==='session'?'on':''}" onclick="S.morgEq='session';render()">${t('session')}</button></div></div>`;
    if(S.morgEq==='ford'){h+=rSecEq(t('eqFordShort'),D.d_ef,3,'df');}
    else{h+=rSecEq(t('eqSessionShort'),D.d_es,3,'ds');}
    h+=`<div class="note">${t('noteDeq')}</div>`;
    h+=`<div class="sub cont-line" style="${S.contOn?'':'opacity:0.35'}"><span>${t('contingency')} (${S.contOn?S.contPct+'%':t('off')})</span><span>${fmt(T[3].cont)}</span></div>`;
    h+=`<div class="gt purple"><span>${t('optionTotal')} D ${t('total')}${S.contOn?' (w/ '+S.contPct+'%)':''}</span><span>${fmt(T[3].t)}</span></div>`;
    h+=`</div></div></div>`;

    h+=`</div></div>`;
    h+=`<button class="print-btn" onclick="printReport()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>${t('printBtn')}</button>`;
    h+=`<div class="disc">${t('disc')}<br>${t('discDate')}</div>`;
    h+=`</section>`;
  }else if(S.tab==='polycam'){
    h+=rPolycamPanel();
  }else if(S.tab==='design'){
    h+=rDesignPanel();
  }else if(S.tab==='floorplan'){
    h+=rFloorPlanPanel();
  }else if(S.tab==='enscape'){
    h+=rEnscapePanel();
  }else if(S.tab==='selections'){
    h+=rSelectionsPanel();
  }

  const appEl=document.getElementById('app');
  const presRoot=document.getElementById('pres-root');

  const headerEl=document.querySelector('.header');
  if(S.tab==='presentation'){
    // Hide header + main app, show presentation in separate root
    if(headerEl)headerEl.style.display='none';
    appEl.style.display='none';
    presRoot.innerHTML=rPresentationPanel();
    presRoot.style.display='block';
    requestAnimationFrame(()=>{initPresViewer();});
  }else{
    // Normal tabs — restore header + app
    if(headerEl)headerEl.style.display='';
    appEl.style.display='';
    presRoot.innerHTML='';
    presRoot.style.display='none';
    appEl.innerHTML=h;
    requestAnimationFrame(initExGalleryReveal);
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
  const active=slides[S.slide]||slides[0];
  const h=active.offsetHeight;
  if(h>0)vp.style.height=h+'px';
}

let tx=0;
function setupSwipe(){
  const vp=document.querySelector('.cvp');if(!vp)return;
  vp.ontouchstart=e=>{tx=e.changedTouches[0].screenX;};
  vp.ontouchend=e=>{const d=tx-e.changedTouches[0].screenX;if(Math.abs(d)>50){if(d>0&&S.slide<3)goSlide(S.slide+1);else if(d<0&&S.slide>0)goSlide(S.slide-1);}};
}
document.addEventListener('keydown',e=>{
  if(LB.open)return;
  if(S.tab!=='estimates')return;
  if(document.activeElement&&(document.activeElement.tagName==='INPUT'||document.activeElement.tagName==='TEXTAREA'))return;
  if(e.key==='ArrowRight'&&S.slide<3)goSlide(S.slide+1);
  if(e.key==='ArrowLeft'&&S.slide>0)goSlide(S.slide-1);
});
window.addEventListener('resize',()=>{
  requestAnimationFrame(syncCarouselHeight);
});

// ===== PRINT REPORT =====
function printReport(){
  const T=getT();
  const mn=Math.min(...T.map(x=>x.t));
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
      <p>Cost Comparison Summary</p>
      <div class="p-date">Generated ${now} \u00b7 Pre-tax estimates \u00b7 Flooring excluded from all options</div>
    </div>
    <div class="p-summary">
      <h2>Total Cost Comparison</h2>
      <div class="p-sum-grid">`;
  T.forEach(t=>{
    const low=t.t===mn&&t.t>0;
    p+=`<div class="p-sum-card ${low?'lowest':''}">
      <div class="p-opt">Option ${t.k}</div>
      <div class="p-name">${t.l}</div>
      <div class="p-price ${low?'low':''}">${fmt(t.t)}</div>
      <div class="p-bk">GC: ${fmt(t.gc)} | Equip: ${fmt(t.eq)}${S.contOn?' | '+S.contPct+'%: '+fmt(t.cont):''}</div>
      ${low?'<div style="font-size:9px;color:#111;font-weight:700;margin-top:2px">\u25B6 LOWEST</div>':''}
    </div>`;
  });
  p+=`</div></div>`;
  p+=`<div class="p-footer">This report reflects the selections made in the interactive cost simulator. All figures are pre-tax estimates. Not a binding contract. Agape = ballpark only. * = custom price entered by user.</div>`;
  p+=`</div>`;

  const optData=[
    {t:T[0],c:'blue',gcLabel:'GC: KFS \u2014 Layout 1',gcArr:D.a_gc,eqLabel:'Equipment: Ford Hotel Supply',eqArr:D.a_eq,eqKey:'a',notes:'KFS (est. 1924): MEP specialist. Includes demo, FRP, SS panels, hood trim, pot filler waterline, 6 LED, equipment set/connect. Excludes flooring, ceiling, permits, plans.'},
    {t:T[1],c:'green',gcLabel:'GC: Pernikoff (Revised 3/9)',gcArr:D.b_gc,eqLabel:'Equipment: Session + Kitchen Mechanical',eqArr:D.b_eq,eqKey:'b',notes:'Pernikoff (est. 1914). Base: LED, 7 outlets, water heater, plumbing, demo, tile, SS panel install, infill door, paint ($1,500). Excludes appliances, faucets, SS panels, plans, permits.'},
    {t:T[2],c:'orange',gcLabel:'GC: Agape Architecture (Ballpark'+(S.agapeHi?' \u2014 High':' \u2014 Low')+')',gcArr:D.c_gc,eqLabel:'Equipment: '+(S.agapeEq==='ford'?'Ford':'Session'),eqArr:S.agapeEq==='ford'?D.c_ef:D.c_es,eqKey:S.agapeEq==='ford'?'cf':'cs',notes:'Agape = Design-Build. BALLPARK ranges \u2014 final TBD. Flooring excluded. Fire suppression TBD.'},
    {t:T[3],c:'purple',gcLabel:'GC: Morganco Design Build',gcArr:D.d_gc,eqLabel:'Equipment: '+(S.morgEq==='ford'?'Ford (Appliances)':'Session (Appliances)'),eqArr:S.morgEq==='ford'?D.d_ef:D.d_es,eqKey:S.morgEq==='ford'?'df':'ds',notes:'Morganco = Design-Build. Includes design (4 meetings + 3D), QualityBrand cabinetry, Hallmark quartz, FRP + SS, electrical, plumbing. Expires 3/27/2026.'},
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
applyPreset('2',false);
render();
