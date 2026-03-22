// === panels.js — All panel rendering functions ===
function rI(it){
  const off=!it.on;
  const v=iCost(it);
  const isC=it.cv&&it.cv!==''&&!isNaN(parseFloat(it.cv));
  let ch=it.cost<0?`<span class="neg">${fmt(v)}</span>`:fmt(v);
  if(it.lo!==undefined)ch+=` <span style="font-size:9px;color:var(--g1)">(${fmt(it.lo)}\u2013${fmt(it.hi)})</span>`;
  let ci='';
  if(it.cust){ci=`<div class="cinp"><span>${t('customLabel')}</span><input type="text" inputmode="decimal" id="cinp_${it.id}" placeholder="${fmt(it.cost)}" value="${it.cv||''}" onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" oninput="setC('${it.id}',this.value)" style="${isC?'border-color:var(--black);background:#f5f5f3':''}">${isC?'<span class="clab">'+t('customTag')+'</span><button onclick="event.stopPropagation();find(\''+it.id+'\').cv=\'\';render()" style="border:none;background:rgba(0,0,0,0.06);border-radius:4px;padding:2px 8px;font-size:9px;cursor:pointer;color:var(--g2);margin-left:2px;font-family:var(--font)">\u2715 '+t('clear')+'</button>':''}</div>`;}
  return`<div class="item ${off?'off':''}"><label class="tog" onclick="event.stopPropagation()"><input type="checkbox" ${it.on?'checked':''} onchange="toggle('${it.id}',event)"><span class="tk"></span><span class="tm"></span></label><div class="iinfo"><div class="iname">${escapeHtml(itemName(it))}</div>${it.det?'<div class="idet">'+escapeHtml(it.det)+'</div>':''}${ci}</div><div class="icost ${it.cost<0?'neg':''}">${ch}</div></div>`;
}

function rSecGC(title,arr){
  const tot=sumA(arr), onN=arr.filter(i=>i.on).length;
  let h=`<div class="sec"><div class="shdr"><h3>${title}</h3><span class="ss">${onN}/${arr.length} = ${fmt(tot)}</span></div>`;
  arr.forEach(i=>h+=rI(i));
  h+=`<div class="sub"><span>${t('subtotal')}</span><span>${fmt(tot)}</span></div></div>`;
  return h;
}

function rSecEq(title,arr,slideIdx,secKey){
  const tot=sumA(arr), onN=arr.filter(i=>i.on).length;
  let h=`<div class="sec"><div class="shdr"><h3>${title}</h3><span class="ss">${onN}/${arr.length} = ${fmt(tot)}</span></div>`;
  const catOrder=['cooking','fridge','sinks','shelving','wallstorage','countertop','walls'];
  const assignedIds=new Set();
  const catItems={};
  catOrder.forEach(ck=>{
    const cat=CATS[ck];
    const idSet=cat['ids_'+secKey]||[];
    catItems[ck]=arr.filter(i=>idSet.includes(i.id));
    idSet.forEach(id=>assignedIds.add(id));
  });
  const other=arr.filter(i=>!assignedIds.has(i.id));
  if(other.length) catItems['other']=other;
  const allCats=[...catOrder];
  if(other.length) allCats.push('other');
  allCats.forEach(ck=>{
    const items=catItems[ck];
    if(!items||!items.length)return;
    const cat=ck==='other'?{icon:'\u{1F4CB}',name:t('catOther')}:CATS[ck];
    const ckey=catKey(slideIdx,secKey,ck);
    const open=isCatOpen(ckey);
    const catTot=sumA(items);
    const catOn=items.filter(i=>i.on).length;
    const isSplit=(ck==='wallstorage'||ck==='countertop')&&items.some(i=>i.bv==='low')&&items.some(i=>i.bv==='high');
    h+=`<div class="cat">
      <div class="cat-hdr" onclick="toggleCat('${ckey}')">
        <div class="cat-left">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-name">${t(cat.name)}</span>
          <span class="cat-count">${catOn}/${items.length}</span>
        </div>
        <div class="cat-right">
          <span class="cat-sum">${fmt(catTot)}</span>
          <span class="chevron ${open?'open':''}">&#9656;</span>
        </div>
      </div>
      <div class="cat-body ${open?'open':'closed'}" style="max-height:${open?items.length*160+'px':'0'}">`;
    if(isSplit){
      const lowItems=items.filter(i=>i.bv==='low');
      const highItems=items.filter(i=>i.bv==='high');
      const sharedItems=items.filter(i=>!i.bv);
      h+=`<div class="cat-split">`;
      h+=`<div class="cat-split-col"><div class="cat-split-label">${t('openShelving')}</div>`;
      lowItems.forEach(i=>h+=rI(i));
      h+=`</div>`;
      h+=`<div class="cat-split-col"><div class="cat-split-label">${t('cabinets')}</div>`;
      highItems.forEach(i=>h+=rI(i));
      h+=`</div>`;
      if(sharedItems.length){
        sharedItems.forEach(i=>{h+=`<div class="cat-split-full">${rI(i)}</div>`;});
      }
      h+=`</div>`;
    } else {
      items.forEach(i=>h+=rI(i));
    }
    h+=`</div></div>`;
  });
  h+=`<div class="sub"><span>${t('eqSubtotal')}</span><span>${fmt(tot)}</span></div></div>`;
  return h;
}

function rIntroPanel(){
  const ic=INTRO_CONTENT[S.lang]||INTRO_CONTENT.ko;
  const introBodyOneLine=(ic.introMessage||'').replace(/\s*\n+\s*/g,' ').replace(/\s{2,}/g,' ').trim();
  const heroTitleHtml=ic.heroTitle.replace(/\n/g,'<br>');
  const curIdxRaw=ic.process.findIndex(p=>/임시집사회|Session Briefing/i.test((p[0]||'')+' '+(p[1]||'')));
  const curIdx=curIdxRaw>=0?curIdxRaw:Math.min(4,ic.process.length-1);
  if(typeof S.introProcIdx!=='number'||S.introProcIdx<0||S.introProcIdx>=ic.process.length)S.introProcIdx=curIdx;
  const activeIdx=S.introProcIdx;
  const active=ic.process[activeIdx]||ic.process[curIdx];
  let process='';
  ic.process.forEach((p,i)=>{
    const st=i<curIdx?'done':(i===curIdx?'current':'upcoming');
    const isOn=i===activeIdx;
    process+=`<button class="intro-tl-step ${st}${isOn?' active':''}" onclick="setIntroProcessStep(${i})" onmouseenter="setIntroProcessStep(${i})" aria-pressed="${isOn?'true':'false'}">
      <div class="intro-tl-top">
        <span class="intro-tl-index">${i+1}</span>
        ${i===curIdx?`<span class="intro-tl-now">${S.lang==='ko'?'현재 단계':'Current Stage'}</span>`:''}
      </div>
      <span class="intro-tl-title">${p[0]}</span>
    </button>`;
  });
  const activeState=activeIdx<curIdx?(S.lang==='ko'?'완료 단계':'Completed')
    :(activeIdx===curIdx?(S.lang==='ko'?'현재 진행 단계':'Current Phase')
    :(S.lang==='ko'?'예정 단계':'Upcoming'));
  let purpose='';
  ic.purpose.forEach(p=>{
    purpose+=`<article class="intro-purpose-item MetricWidget"><h4>${p[0]}</h4><p>${p[1]}</p></article>`;
  });
  let teamL='',teamR='';
  ic.teamLeft.forEach(r=>{teamL+=`<div class="intro-team-row"><span>${r[0]}</span><span>${r[1]}</span></div>`;});
  ic.teamRight.forEach(r=>{teamR+=`<div class="intro-team-row"><span>${r[0]}</span><span>${r[1]}</span></div>`;});
  return`<div class="intro-wrap PresentationShell immersive-intro">
    <section class="cinematic-panel" style="background-image: url('Final%20Renderings/rendering%20views/view%202.jpg')">
      <div class="cine-overlay"></div>
      <div class="cine-content cine-hero">
        <div class="intro-kicker">${S.lang==='ko'?'세인트루이스 한인장로교회':'Korean Presbyterian Church · St. Louis'}</div>
        <h2 class="intro-title">${heroTitleHtml}</h2>
        <p class="intro-meta">${ic.heroMeta.replace(/\n/g,'<br>')}</p>
      </div>
    </section>

    <section class="cinematic-panel" style="background-image: url('Final%20Renderings/rendering%20views/view%201.jpg')">
      <div class="cine-overlay"></div>
      <div class="cine-content cine-card scroll-reveal">
        <p class="intro-body intro-body-intro">${introBodyOneLine}</p>
      </div>
    </section>

    <section class="cinematic-panel" style="background-image: url('Final%20Renderings/rendering%20views/view%203.jpg')">
      <div class="cine-overlay"></div>
      <div class="cine-content cine-card scroll-reveal">
        <h3>${S.lang==='ko'?'팀 소개':'Team Introduction'}</h3>
        <div class="intro-team-grid">
          <article class="intro-team-col"><h4>${ic.teamLeftTitle}</h4>${teamL}</article>
          <article class="intro-team-col"><h4>${ic.teamRightTitle}</h4>${teamR}</article>
        </div>
      </div>
    </section>

    <section class="cinematic-panel" style="background-image: url('Final%20Renderings/rendering%20views/view%204.jpg')">
      <div class="cine-overlay"></div>
      <div class="cine-content cine-card scroll-reveal">
        <h3>${S.lang==='ko'?'프로세스 소개':'Process Overview'}</h3>
        <div class="intro-timeline">
          <div class="intro-tl-scroll"><div class="intro-tl-steps">${process}</div></div>
          <article class="intro-tl-detail TimelineWidget">
            <div class="intro-tl-detail-head"><span class="intro-tl-detail-chip">${activeState}</span></div>
            <h4>${active[0]}</h4>
            <p>${active[1]}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="cinematic-panel" style="background-image: url('Final%20Renderings/rendering%20views/view%205.jpg')">
      <div class="cine-overlay"></div>
      <div class="cine-content cine-card scroll-reveal">
        <h3>${S.lang==='ko'?'임시집사회 보고 목적':'Session Briefing Purpose'}</h3>
        <div class="intro-purpose-list">${purpose}</div>
      </div>
    </section>
  </div>`;
}

function rPolycamPanel(){
  const photos=getExistingSpacePhotos();
  const gallery=photos.map((im,i)=>{
    return`<button class="ex-photo ex-reveal ImageCaptionCard" onclick="openExistingPhoto(${i})" aria-label="${im.title}">
    <img src="${encodeURI(im.preview)}?v=1" alt="${im.title}" loading="lazy" decoding="async" fetchpriority="low" onerror="this.onerror=null;this.src='${encodeURI(im.src)}'">
  </button>`;
  }).join('');
  return`<div class="scan-wrap SectionBoard SurfaceCard">
    <div class="scan-head"><h3>${t('lidarTitle')}</h3><span class="scan-tag">Polycam</span></div>
    <div class="scan-sub">${t('lidarSub')}</div>
    <div class="scan-shell"><iframe src="${POLYCAM_URL}" title="${t('lidarTitle')}" loading="lazy" allowfullscreen allow="xr-spatial-tracking; fullscreen"></iframe></div>
    <div class="scan-actions">
      <span class="scan-help">${t('lidarHelp')}</span>
      <a class="scan-btn PillButton" href="${POLYCAM_URL}" target="_blank" rel="noopener noreferrer">${t('openPolycam')}</a>
    </div>
    <section class="ex-gallery">
      <div class="ex-title">${t('existingPhotosTitle')}</div>
      <div class="ex-grid">${gallery}</div>
    </section>
  </div>`;
}

function getExistingSpacePhotos(){
  return EXISTING_SPACE_SRCS.map((src,i)=>({
    src,
    preview:EXISTING_SPACE_PREVIEWS[i]||src,
    title:`${t('existingPhotoLabel')} ${i+1}`,
    cap:t('existingPhotoCap')
  }));
}

function openExistingPhoto(idx){
  const i=Math.max(0,Math.min(EXISTING_SPACE_SRCS.length-1,Number(idx)||0));
  lbOpen(getExistingSpacePhotos(),i);
}

let exRevealObserver=null;
function initExGalleryReveal(){
  if(exRevealObserver){exRevealObserver.disconnect();exRevealObserver=null;}
  const items=Array.from(document.querySelectorAll('.ex-photo.ex-reveal'));
  if(!items.length)return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(el=>el.classList.add('in'));
    return;
  }
  exRevealObserver=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        if(exRevealObserver)exRevealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  items.forEach((el,i)=>{
    el.style.setProperty('--d',`${Math.min(i*34,260)}ms`);
    exRevealObserver.observe(el);
  });
}


function rEnscapePanel(){
  return`<div class="scan-wrap SectionBoard SurfaceCard">
    <div class="scan-head"><h3>${t('enscapeTitle')}</h3><span class="scan-tag">Enscape</span></div>
    <div class="scan-sub">${t('enscapeSub')}</div>
    <div class="scan-shell" style="padding-top:56.25%"><iframe src="${ENSCAPE_URL}" title="${t('enscapeTitle')}" loading="lazy" allowfullscreen allow="fullscreen"></iframe></div>
    <div class="scan-actions">
      <span class="scan-help">${t('enscapeHelp')}</span>
      <a class="scan-btn PillButton" href="${ENSCAPE_URL}" target="_blank" rel="noopener noreferrer">${t('openChaos')}</a>
    </div>
  </div>`;
}

function goDesignSec(i,fromIntro){
  const idx=Math.max(0,Math.min(DESIGN_SECTIONS.length-1,Number(i)||0));
  S.designSec=idx;
  S.designFocus=!!fromIntro;
  render();
  if(fromIntro){
    requestAnimationFrame(()=>{
      const el=document.getElementById('design-active-section');
      if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>{if(el)el.classList.remove('ds-focus');S.designFocus=false;},750);
    });
  }
}
function selectableSections(){return DESIGN_SECTIONS.filter(sec=>selectableImageCount(sec)>0);}
function rDesignPanel(){
  const sec=DESIGN_SECTIONS[S.designSec];
  const selectable=selectableSections();
  const jumpCards = DESIGN_SECTIONS.map((s, i) => {
    if(s.hideJump)return'';
    const img=s.key==='counter'?'Final Renderings/Counter Top Material Option/93%.jpg':s.images[0].src;
    const pickIdx=S.picks[s.key];
    const isOn=pickIdx!==undefined&&!s.images[pickIdx].refOnly;
    const required=s.images.some(im=>!im.refOnly)&&!isOn;
    return`<button class="ds-jump-card DecisionCard ImageCaptionCard${isOn?' on':''}" onclick="goDesignSec(${i},true)" aria-pressed="${isOn?'true':'false'}">
      <img src="${encodeURI(img)}" alt="${dsLabel(s)}" loading="lazy">
      ${required?`<span class="ds-req">${t('selectionReq')}</span>`:''}
      <div class="ds-jump-text"><h5>${dsLabel(s)}</h5></div>
    </button>`;
  }).join('');
  // Section content — select buttons only for selectable sections
  const secIdx=S.designSec;
  const canSelect=true;
  let sectionBody='';
  if(sec.key==='counter'){
    const colorIdxs=sec.images.map((im,i)=>!im.refOnly?i:null).filter(i=>i!==null);
    const defaultIdx=colorIdxs.includes(2)?2:(colorIdxs[0]||0);
    const activeIdx=isSelectableImage(sec,S.picks[sec.key])?S.picks[sec.key]:null;
    const displayIdx = activeIdx !== null ? activeIdx : defaultIdx;
    const activeIm=sec.images[displayIdx];
    const colorCards=colorIdxs.map(i=>{
      const im=sec.images[i];
      const isOn=activeIdx===i;
      const btn=`<button class="ds-select-btn PillButton" onclick="setDesignPick('${sec.key}',${i})"><span class="ds-check"><svg viewBox="0 0 10 10" fill="none" stroke="${isOn?'var(--black)':'currentColor'}" stroke-width="1.5"><path d="M2 5.5l2 2 4-4"/></svg></span>${isOn?t('selectedLabel'):t('selectThis')}</button>`;
      return`<article class="counter-color-card DecisionCard ${isOn?'on':''}">
        <div class="counter-color-img" onclick="setDesignPick('${sec.key}',${i})"><img src="${encodeURI(im.src)}" alt="${dsTitle(sec,i)}" loading="lazy" style="--crop:${im.cropPos||'53% 58%'}"><span class="counter-color-name">${dsTitle(sec,i)}</span></div>
        <div class="counter-color-actions">${btn}</div>
      </article>`;
    }).join('');
    sectionBody=`<div class="counter-layout">
      <div class="counter-top-grid">
        <article class="counter-top-card ImageCaptionCard">
          <div class="counter-top-img" onclick="lbOpen(DESIGN_SECTIONS[${secIdx}].images,0)"><img src="${encodeURI(sec.images[0].src)}" alt="${dsTitle(sec,0)}" loading="lazy"></div>
          <div class="counter-top-body"><h4 class="counter-top-title">${dsTitle(sec,0)}</h4><p class="counter-top-desc">${dsCap(sec,0)}</p><span class="ds-ref-tag">${t('refOnly')}</span></div>
        </article>
        <article class="counter-top-card ImageCaptionCard">
          <div class="counter-top-img" onclick="lbOpen(DESIGN_SECTIONS[${secIdx}].images,${displayIdx})"><img src="${encodeURI(activeIm.src)}" alt="${dsTitle(sec,displayIdx)}" loading="lazy"></div>
          <div class="counter-top-body"><h4 class="counter-top-title">${dsTitle(sec,displayIdx)}</h4><p class="counter-top-desc">${dsCap(sec,displayIdx)}</p></div>
        </article>
      </div>
      <section class="counter-color-wrap">
        <div class="counter-color-head"><h4>${t('counterColorPick')}</h4><p>${t('counterOptCount')}</p></div>
        <div class="counter-color-grid">${colorCards}</div>
      </section>
    </div>`;
  }else{
    const imgs=sec.images.map((im,i)=>{
      const selectableImg=isSelectableImage(sec,i);
      const isSel=selectableImg&&S.picks[sec.key]===i;
      let selBtn='';
      if(!selectableImg){
        selBtn=`<span class="ds-ref-tag">${t('refOnly')}</span>`;
      }else if(canSelect){
        const btn=im.refOnly?'':`<button class="ds-select-btn PillButton" onclick="setDesignPick('${sec.key}',${i})"><span class="ds-check"><svg viewBox="0 0 10 10" fill="none" stroke="${isSel?'var(--black)':'currentColor'}" stroke-width="1.5"><path d="M2 5.5l2 2 4-4"/></svg></span>${isSel?t('selectedLabel'):t('selectThis')}</button>`;
        selBtn = btn; // Assign the generated button to selBtn
      }
      return`<div class="ds-card ImageCaptionCard DecisionCard${isSel?' selected':''} ${im.color?im.color:''}">
      <div class="ds-img-wrap" onclick="${im.refOnly?`lbOpen(DESIGN_SECTIONS[${secIdx}].images,${i})`:`setDesignPick('${sec.key}',${i})`}" style="cursor:pointer"><img src="${encodeURI(im.src)}" alt="${dsTitle(sec,i)}" loading="lazy"><div class="ds-img-hint">${t('clickEnlarge')}</div></div>
      <div class="ds-caption">
        <h4 class="ds-img-title">${dsTitle(sec,i)}</h4>
        <p class="ds-img-desc">${dsCap(sec,i)}</p>
        ${selBtn}
      </div>
    </div>`;
    }).join('');
    let extraImgs = '';
    if (sec.key === 'ceiling_light') {
      const tileSecIdx = DESIGN_SECTIONS.findIndex(s=>s.key==='ceiling_tile');
      const tileSec = DESIGN_SECTIONS[tileSecIdx];
      extraImgs = tileSec.images.map((im,i)=>{
        const isSel = S.picks[tileSec.key] === i;
        const btn = `<button class="ds-select-btn PillButton" onclick="setDesignPick('${tileSec.key}',${i})"><span class="ds-check"><svg viewBox="0 0 10 10" fill="none" stroke="${isSel?'var(--black)':'currentColor'}" stroke-width="1.5"><path d="M2 5.5l2 2 4-4"/></svg></span>${isSel?t('selectedLabel'):t('selectThis')}</button>`;
        return `<div class="ds-card ImageCaptionCard DecisionCard${isSel?' selected':''} ${im.color?im.color:''}">
          <div class="ds-img-wrap" onclick="setDesignPick('${tileSec.key}',${i})" style="cursor:pointer"><img src="${encodeURI(im.src)}" alt="${dsTitle(tileSec,i)}" loading="lazy"><div class="ds-img-hint">${t('clickEnlarge')}</div></div>
          <div class="ds-caption">
            <h4 class="ds-img-title">${dsTitle(tileSec,i)}</h4>
            <p class="ds-img-desc">${dsCap(tileSec,i)}</p>
            ${btn}
          </div>
        </div>`;
      }).join('');
    }
    sectionBody=`<div class="ds-gallery">${imgs}${extraImgs}</div>`;
  }
  const pickCount=Object.keys(S.picks).length;
  const selectableCount=selectable.length;
  return`<div class="design-wrap SectionBoard SurfaceCard">
    <div class="design-head"><div><h3>${t('designTitle')}</h3><p class="design-sub">${t('designSub')}${pickCount>0?' <strong>'+pickCount+' '+t('of')+' '+selectableCount+' '+t('selected')+'</strong> — '+t('visitDesign')+' <a href="#" onclick="goTab(\'selections\');return false" style="color:var(--black);text-decoration:underline">'+t('viewSelections')+'</a> '+t('tabToStart'):''}</p></div><span class="r3-pill">${sec.images.length} ${t(sec.images.length>1?'renderingsPlural':'renderings')}</span></div>
    <section class="ds-intro">
      <h4>${t('designIntroTitle')}</h4>
      <p>${t('designIntroSub')}</p>
      <div class="ds-jump-grid">${jumpCards}</div>
    </section>
    <div class="ds-sec-head${S.designFocus?' ds-focus':''}" id="design-active-section">
      <h3 class="ds-sec-title">${dsLabel(sec)}</h3>
      <p class="ds-sec-desc">${dsDesc(sec)}</p>
    </div>
    ${sectionBody}
  </div>`;
}

function rSelectionsPanel(){
  const picks=S.picks;
  const selectable=selectableSections();
  const total=selectable.length;
  const chosen=selectable.filter(s=>picks[s.key]!==undefined).length;
  let rows='';
  selectable.forEach(sec=>{
    const si=DESIGN_SECTIONS.indexOf(sec);
    if(picks[sec.key]!==undefined&&isSelectableImage(sec,picks[sec.key])){
      const pickIdx=picks[sec.key];
      rows+=`<div class="sel-row DecisionCard">
        <img src="${encodeURI(sec.images[pickIdx].src)}" alt="${dsTitle(sec,pickIdx)}" onclick="lbOpen(DESIGN_SECTIONS[${si}].images,${pickIdx})" title="${t('clickEnlarge')}">
        <div class="sel-row-info">
          <div class="sel-row-cat">${dsLabel(sec)}</div>
          <div class="sel-row-title">${dsTitle(sec,pickIdx)}</div>
          <div class="sel-row-desc">${dsCap(sec,pickIdx)}</div>
        </div>
        <button class="sel-row-clear PillButton" onclick="pickDesign('${sec.key}',${pickIdx})">${t('remove')}</button>
      </div>`;
    }
  });
  // Show unselected categories
  let missing='';
  selectable.forEach(sec=>{
    const si=DESIGN_SECTIONS.indexOf(sec);
    if(picks[sec.key]===undefined){
      missing+=`<div class="sel-row DecisionCard" style="opacity:0.45;border-style:dashed">
        <div style="width:180px;height:120px;background:var(--g6);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:20px;opacity:0.3">?</span></div>
        <div class="sel-row-info">
          <div class="sel-row-cat">${dsLabel(sec)}</div>
          <div class="sel-row-title" style="color:var(--g2)">${t('noSelYet')}</div>
          <div class="sel-row-desc">${selectableImageCount(sec)} ${t(selectableImageCount(sec)>1?'optAvailable':'optAvailableSingle')}</div>
        </div>
        <button class="sel-row-clear PillButton" onclick="S.designSec=${si};goTab('design')" style="border-color:var(--black);color:var(--black)">${t('choose')}</button>
      </div>`;
    }
  });
  return`<div class="sel-wrap SectionBoard SurfaceCard">
    <div class="sel-head"><h3>${t('yourSelections')}</h3><p>${t('selSub')} ${t('selGoTo')} <a href="#" onclick="goTab('design');return false" style="color:var(--black);text-decoration:underline">${t('goToDesign')}</a> ${t('selToMake')}</p></div>
    <div class="sel-count">${chosen} ${t('of')} ${total} ${t('categoriesSelected')}</div>
    <div class="sel-grid">${chosen>0?rows:''}${missing}</div>
    ${chosen===0?'<div class="sel-empty"><div class="sel-empty-icon">\u2610</div>'+t('noSelMade')+'<br>'+t('visitDesign')+' <a href="#" onclick="goTab(\'design\');return false" style="color:var(--black)">'+t('goToDesign')+'</a> '+t('tabToStart')+'</div>':''}
  </div>`;
}

function rFloorPlanPanel(){
  const floorSrc=FLOOR_PLAN_RENDER_SRC;
  const floorSub=t('floorSub');
  const floorTip=t('floorTip');
  return`<div class="floor-wrap SectionBoard SurfaceCard">
    <div class="floor-head"><div><h3>${t('floorTitle')}</h3>${floorSub?`<p class="floor-sub">${floorSub}</p>`:''}</div><span class="scan-tag">${t('rendered')}</span></div>
    <div class="floor-static"><img src="${encodeURI(floorSrc)}" alt="${t('floorTitle')}" loading="lazy"></div>
    ${floorTip?`<div class="floor-help">${floorTip}</div>`:''}
  </div>`;
}



function trObj(v){
  if(v&&typeof v==='object')return v[S.lang]||v.ko||v.en||'';
  return v||'';
}
function scopeStateClass(st){return st==='in'||st==='adj'||st==='phase'?st:'out';}
function scopeStateLabel(st){
  if(st==='in')return t('scopeLegendIn');
  if(st==='adj')return t('scopeLegendAdj');
  if(st==='phase')return t('scopeLegendPhase');
  return t('scopeLegendOut');
}
function rScopeBadges(card){
  return SCOPE_CATS.map(cat=>{
    const st=(card.scope&&card.scope[cat.key])||'out';
    return `<span class="est-scope-dot ${scopeStateClass(st)}">${cat.key} · ${scopeStateLabel(st)}</span>`;
  }).join('');
}
function rScopeOverview(){
  const focusKey=S.scopeFocus||'2';
  const focusCard=ESTIMATE_CARDS.find(c=>c.key===focusKey)||ESTIMATE_CARDS[1];
  const catCards=SCOPE_CATS.map(cat=>{
    const lbl=trObj(cat.label);
    const st=(focusCard.scope&&focusCard.scope[cat.key])||'out';
    return `<article class="est-scope-cat ImageCaptionCard ${scopeStateClass(st)}">
      <span class="est-scope-state est-scope-dot ${scopeStateClass(st)}">${scopeStateLabel(st)}</span>
      <img src="${encodeURI(cat.img)}" alt="${lbl}" loading="lazy">
      <div class="est-scope-cap"><strong>${cat.key}</strong>${lbl.replace(/^\d+\.\s*/,'')}</div>
    </article>`;
  }).join('');
  const matrixRows=SCOPE_CATS.map(cat=>{
    const c1=ESTIMATE_CARDS[0],c2=ESTIMATE_CARDS[1],c3=ESTIMATE_CARDS[2];
    const s1=(c1.scope&&c1.scope[cat.key])||'out';
    const s2=(c2.scope&&c2.scope[cat.key])||'out';
    const s3=(c3.scope&&c3.scope[cat.key])||'out';
    return `<tr>
      <td>${trObj(cat.label)}</td>
      <td class="${focusKey==='1'?'focus-col':''}"><span class="est-scope-dot ${scopeStateClass(s1)}">${scopeStateLabel(s1)}</span></td>
      <td class="${focusKey==='2'?'focus-col':''}"><span class="est-scope-dot ${scopeStateClass(s2)}">${scopeStateLabel(s2)}</span></td>
      <td class="${focusKey==='3'?'focus-col':''}"><span class="est-scope-dot ${scopeStateClass(s3)}">${scopeStateLabel(s3)}</span></td>
    </tr>`;
  }).join('');
  return `<section class="est-scope SectionBoard SurfaceCard">
    <div class="est-scope-head">
      <div><h3>${t('scopeTitle')}</h3><p class="est-scope-sub">${t('scopeSub')}<br>${t('scopeHint')}</p></div>
    </div>
    <div class="est-scope-cats">${catCards}</div>
    <div class="est-scope-matrix">
      <table>
        <thead><tr><th>${S.lang==='ko'?'카테고리':'Category'}</th><th class="${focusKey==='1'?'focus-col':''}">${S.lang==='ko'?'제1안':'Option 1'}</th><th class="${focusKey==='2'?'focus-col':''}">${S.lang==='ko'?'제2안':'Option 2'}</th><th class="${focusKey==='3'?'focus-col':''}">${S.lang==='ko'?'제3안':'Option 3'}</th></tr></thead>
        <tbody>${matrixRows}</tbody>
      </table>
    </div>
  </section>`;
}
function scrollEstimateDetails(){
  const el=document.getElementById('detailed-estimates');
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}
function rEstimateSummary(){
  let cards='';
  ESTIMATE_CARDS.forEach(c=>{
    const on=S.preset===c.key;
    const focus=S.scopeFocus===c.key;
    cards+=`<article class="est-card DecisionCard BudgetWidget ${on?'on':''} ${focus?'focus':''}" onclick="applyPreset('${c.key}')">
      <h4>${trObj(c.title)}</h4>
      <p>${trObj(c.desc)}</p>
      <p class="est-list">${trObj(c.items)}</p>
      <div class="est-scope-badges">${rScopeBadges(c)}</div>
      <div class="est-range">${c.range}<small>${c.rangeEn}</small></div>
      <div class="est-card-actions">
        <button class="est-preset-btn PillButton ${on?'on':''}" onclick="event.stopPropagation();applyPreset('${c.key}')">${on?t('applied'):t('applyPreset')}</button>
      </div>
    </article>`;
  });
  return`${rScopeOverview()}<section class="est SectionBoard SurfaceCard">
    <h3>${t('estTitle')}</h3>
    <p class="est-sub">${t('estSub')}</p>
    <p class="est-hint">${t('presetHint')}</p>
    <div class="est-grid">${cards}</div>
    <div class="est-actions">
      <button class="est-btn ghost PillButton" onclick="resetPreset()">${t('resetRaw')}</button>
      <button class="est-btn PillButton" onclick="scrollEstimateDetails()">${t('openDetail')}</button>
    </div>
  </section>`;
}
