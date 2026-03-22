// ===== INIT & SCROLL REVEAL =====
function enterApp() {
  const sp = document.getElementById('splash');
  if(!sp || sp.classList.contains('out')) return;
  sp.classList.add('out');
  setTimeout(() => { sp.style.display = 'none'; }, 2000);
  document.querySelector('.container').classList.add('show');
}
document.addEventListener('DOMContentLoaded', () => {
  // Container shown on user click (enterApp)
});

function updateTabSlider() {
  const tabsEl = document.getElementById('header-tabs');
  const slider = document.getElementById('gtab-slider');
  const activeTab = tabsEl?.querySelector('.gtab.on');
  if (tabsEl && slider && activeTab) {
    slider.style.width = activeTab.offsetWidth + 'px';
    slider.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  }
}
window.addEventListener('resize', () => { requestAnimationFrame(updateTabSlider); });

function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
  
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// Header scroll shadow
window.addEventListener('scroll',()=>{
  document.querySelector('.header').classList.toggle('scrolled',window.scrollY>8);
});

// ===== LIGHTBOX =====
const LB={open:false,imgs:[],idx:0,zoom:1,panX:0,panY:0};
const lbPan={active:false,sx:0,sy:0,ox:0,oy:0,pid:null};
function lbOpen(imgs,idx){
  LB.imgs=imgs;LB.idx=idx||0;LB.zoom=1;LB.panX=0;LB.panY=0;LB.open=true;
  lbUpdate();
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
  initLbPan();
}
function lbClose(){
  LB.open=false;
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow='';
}
function lbUpdate(){
  const im=LB.imgs[LB.idx];if(!im)return;
  const img=document.getElementById('lb-img');
  img.src=encodeURI(im.src);img.alt=im.title||'';
  document.getElementById('lb-title').textContent=(LB.idx+1)+'/'+LB.imgs.length+' \u2014 '+(im.title||'');
  document.getElementById('lb-cap').textContent=im.cap||'';
  lbApply();
}
function lbApply(){
  const img=document.getElementById('lb-img');
  const zl=document.getElementById('lb-zoom');
  if(zl)zl.textContent=Math.round(LB.zoom*100)+'%';
  if(img)img.style.transform=`translate(${LB.panX}px,${LB.panY}px) scale(${LB.zoom})`;
}
function lbZoom(mult){
  LB.zoom=Math.max(0.25,Math.min(6,Math.round(LB.zoom*mult*100)/100));
  lbApply();
}
function lbReset(){LB.zoom=1;LB.panX=0;LB.panY=0;lbApply();}
function lbWheel(e){
  e.preventDefault();
  const d=Math.abs(e.deltaY)>=Math.abs(e.deltaX)?e.deltaY:e.deltaX;
  if(d===0)return;
  const mag=Math.min(0.25,Math.max(0.04,Math.abs(d)/500));
  lbZoom(d<0?1+mag:1-mag);
}
function lbNav(dir){
  LB.idx=(LB.idx+dir+LB.imgs.length)%LB.imgs.length;
  LB.zoom=1;LB.panX=0;LB.panY=0;
  lbUpdate();
}
function initLbPan(){
  const stage=document.getElementById('lb-stage');
  if(!stage||stage.dataset.lbInit==='1')return;
  stage.dataset.lbInit='1';
  stage.onpointerdown=e=>{
    if(e.target.classList.contains('lb-nav')||e.target.classList.contains('lb-btn'))return;
    if(e.button!==0)return;
    lbPan.active=true;lbPan.pid=e.pointerId;
    lbPan.sx=e.clientX;lbPan.sy=e.clientY;
    lbPan.ox=LB.panX;lbPan.oy=LB.panY;
    stage.classList.add('dragging');
    if(stage.setPointerCapture)stage.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  stage.onpointermove=e=>{
    if(!lbPan.active)return;
    LB.panX=lbPan.ox+(e.clientX-lbPan.sx);
    LB.panY=lbPan.oy+(e.clientY-lbPan.sy);
    lbApply();
  };
  const end=()=>{
    if(!lbPan.active)return;
    lbPan.active=false;stage.classList.remove('dragging');
    if(lbPan.pid!==null&&stage.releasePointerCapture){try{stage.releasePointerCapture(lbPan.pid);}catch(_){}}
    lbPan.pid=null;
  };
  stage.onpointerup=end;stage.onpointercancel=end;
}
document.addEventListener('keydown',e=>{
  if(!LB.open)return;
  if(e.key==='Escape')lbClose();
  if(e.key==='ArrowRight')lbNav(1);
  if(e.key==='ArrowLeft')lbNav(-1);
  if(e.key==='+'||e.key==='=')lbZoom(1.25);
  if(e.key==='-')lbZoom(0.8);
});


// ===== PRESENTATION VIEWER =====
const PRES_TOTAL=28;
const PRES_BASE='presentation-r8/slide-';
const PRES_SECTIONS=[
  {label:'표지',labelEn:'Cover',page:0},
  {label:'인트로',labelEn:'Intro',page:1},
  {label:'팀 소개',labelEn:'Team',page:2},
  {label:'프로세스',labelEn:'Process',page:3},
  {label:'보고 목적',labelEn:'Purpose',page:4},
  {label:'프로젝트 범위',labelEn:'Scope',page:5},
  {label:'싱크대',labelEn:'Sink',page:7},
  {label:'카운터/캐비넷',labelEn:'Counter/Cabinet',page:10},
  {label:'가스레인지/오븐',labelEn:'Stove/Oven',page:13},
  {label:'벽면 패널',labelEn:'Wall Panels',page:16},
  {label:'천장 조명 업그레이드',labelEn:'Ceiling Upgrade',page:17},
  {label:'커피 스테이션',labelEn:'Coffee Station',page:20},
  {label:'바닥재',labelEn:'Flooring',page:23},
  {label:'종합 제안',labelEn:'Integrated Proposal',page:26},
  {label:'예산별 시공안',labelEn:'Budget Options',page:27},
];

// Preload next/prev images and decode them off-thread
function presPreload(pg){
  [pg-1,pg+1,pg+2].forEach(i=>{
    if(i>=0&&i<PRES_TOTAL){
      const img=new Image();
      img.src=presSlideUrl(i);
      if(img.decode) img.decode().catch(()=>{});
    }
  });
}

function presSlideUrl(i){
  const n=String(i+1).padStart(2,'0');
  return PRES_BASE+n+'.jpg';
}

function presThumbUrl(i){
  const n=String(i+1).padStart(2,'0');
  return PRES_BASE.replace('slide-','') + 'thumbs/slide-' + n + '.jpg';
}

// Find which section a page belongs to
function presSectionForPage(pg){
  let found=PRES_SECTIONS[0];
  for(const s of PRES_SECTIONS){if(s.page<=pg)found=s;else break;}
  return found;
}

const PRES_NOTES_KEY='kpc_pres_notes_v1';
function presLoadNotes(){
  try{
    const raw=localStorage.getItem(PRES_NOTES_KEY);
    if(!raw)return {};
    const parsed=JSON.parse(raw);
    return parsed&&typeof parsed==='object'?parsed:{};
  }catch(_){return {};}
}
function presSaveNotes(){
  try{localStorage.setItem(PRES_NOTES_KEY,JSON.stringify(S.presNotes||{}));}catch(_){}
}
S.presNotes=presLoadNotes();
function presNotesFor(pg){
  return (S.presNotes&&Array.isArray(S.presNotes[pg]))?S.presNotes[pg]:[];
}
function rPresNotesItems(pg){
  const notes=presNotesFor(pg);
  if(!notes.length)return `<div class="pres-note-empty">${t('presNotesEmpty')}</div>`;
  return notes.map((n,i)=>`<article class="pres-note-item">
    <p>${escapeHtml(n.text)}</p>
    <div class="pres-note-meta"><span>${escapeHtml(n.ts||'')}</span><button class="pres-note-del" onclick="deletePresNote(${pg},${i})">${t('presDelete')}</button></div>
  </article>`).join('');
}
function refreshPresNotesPanel(){
  const body=document.getElementById('pres-notes-body');
  if(body)body.innerHTML=rPresNotesItems(S.presPage);
  const count=document.getElementById('pres-note-count');
  if(count)count.textContent=String(presNotesFor(S.presPage).length);
  const sub=document.getElementById('pres-notes-sub');
  if(sub)sub.textContent=(S.lang==='ko'?'슬라이드 ':'Slide ')+(S.presPage+1)+' · '+t('presSaved')+' '+presNotesFor(S.presPage).length;
}
function togglePresNotes(){
  S.presNotesOpen=!S.presNotesOpen;
  const panel=document.getElementById('pres-notes');
  const backdrop=document.getElementById('pres-notes-backdrop');
  const btn=document.getElementById('pres-notes-toggle');
  if(panel)panel.classList.toggle('open',S.presNotesOpen);
  if(backdrop)backdrop.classList.toggle('open',S.presNotesOpen);
  if(btn)btn.classList.toggle('active',S.presNotesOpen);
}
function focusPresNoteInput(){
  const input=document.getElementById('pres-note-input');
  if(input){input.focus();input.select();}
}
function addPresNote(){
  const input=document.getElementById('pres-note-input');
  if(!input)return;
  const txt=(input.value||'').trim();
  if(!txt)return;
  if(!S.presNotes[S.presPage])S.presNotes[S.presPage]=[];
  S.presNotes[S.presPage].push({text:txt,ts:new Date().toLocaleString()});
  input.value='';
  presSaveNotes();
  refreshPresNotesPanel();
}
function deletePresNote(pg,idx){
  if(!S.presNotes[pg])return;
  S.presNotes[pg].splice(idx,1);
  if(!S.presNotes[pg].length)delete S.presNotes[pg];
  presSaveNotes();
  refreshPresNotesPanel();
}
function exportPresNotes(){
  const pages=Object.keys(S.presNotes||{}).map(n=>parseInt(n,10)).sort((a,b)=>a-b);
  if(!pages.length)return;
  let out=(S.lang==='ko'?'발표 메모':'Presentation Notes')+'\n\n';
  pages.forEach(p=>{
    out+=`${S.lang==='ko'?'슬라이드':'Slide'} ${p+1}\n`;
    (S.presNotes[p]||[]).forEach((n,i)=>{out+=`${i+1}. ${n.text} (${n.ts||''})\n`;});
    out+='\n';
  });
  const blob=new Blob([out],{type:'text/plain;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='presentation-notes.txt';
  a.click();
  URL.revokeObjectURL(a.href);
}

function rPresentationPanel(){
  const pg=S.presPage;
  const sideOpen=S.presSidebarOpen;
  const lang=S.lang;
  const curSec=presSectionForPage(pg);

  // Build TOC
  let toc='<div class="pres-sidebar-header"><p class="pres-sidebar-title">'+(lang==='ko'?'목차':'TABLE OF CONTENTS')+'</p></div>';
  toc+='<ul class="pres-toc">';
  for(let i=0;i<PRES_TOTAL;i++){
    const sec=PRES_SECTIONS.find(s=>s.page===i);
    if(sec) toc+=`<li class="pres-toc-section">${lang==='ko'?sec.label:sec.labelEn}</li>`;
    const secLabel=sec?(lang==='ko'?sec.label:sec.labelEn):'';
    toc+=`<li><button class="${i===pg?'on':''}" onclick="goPresPage(${i})" data-pg="${i}"><span class="pg-num">${i+1}</span><img class="pres-thumb" src="${presThumbUrl(i)}" loading="lazy" decoding="async" alt=""><span class="pres-toc-label">${secLabel}</span></button></li>`;
  }
  toc+='</ul>';

  const prevDis=pg<=0?' disabled':'';
  const nextDis=pg>=PRES_TOTAL-1?' disabled':'';
  const sectionLabel=lang==='ko'?curSec.label:curSec.labelEn;

  return`<div class="pres-wrap controls-visible PresentationShell" id="pres-wrap">
    <div class="pres-sidebar${sideOpen?'':' hidden'}" id="pres-sidebar">${toc}</div>
    <div class="pres-overlay${sideOpen?' show':''}" id="pres-overlay" onclick="togglePresSidebar()"></div>
    <div class="pres-main SectionBoard SurfaceCard${sideOpen?'':' expanded'}" id="pres-main">
      <div class="pres-header">
        <div class="pres-hdr-left">
          <button class="pres-icon-btn CircularNavButton${sideOpen?' active':''}" onclick="togglePresSidebar()" title="Toggle sidebar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/></svg>
          </button>
          <span class="pres-title">${sectionLabel} &mdash; ${pg+1}/${PRES_TOTAL}</span>
        </div>
        <div class="pres-hdr-right">
          <button class="pres-icon-btn CircularNavButton${S.presNotesOpen?' active':''}" id="pres-notes-toggle" onclick="togglePresNotes()" title="${t('presNotes')}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span class="pres-note-count" id="pres-note-count">${presNotesFor(pg).length}</span>
          </button>
          <button class="pres-icon-btn CircularNavButton" onclick="togglePresFullscreen()" title="Fullscreen (F)">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="5 1 1 1 1 5"/><polyline points="11 1 15 1 15 5"/><polyline points="5 15 1 15 1 11"/><polyline points="11 15 15 15 15 11"/></svg>
          </button>
          <button class="pres-icon-btn CircularNavButton danger" onclick="goTab('introduction')" title="${t('closePresentation')}">✕</button>
        </div>
      </div>
      <button class="pres-nav-arrow CircularNavButton pres-nav-prev${prevDis}" onclick="presPrev()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="pres-nav-arrow CircularNavButton pres-nav-next${nextDis}" onclick="presNext()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
      </button>
      <div class="pres-stage" id="pres-stage">
        <div class="pres-stage-inner" id="pres-inner">
          <img id="pres-img" class="pres-transitioning" src="${presSlideUrl(pg)}" decoding="async" alt="Slide ${pg+1}" draggable="false">
        </div>
      </div>
      <div class="pres-controls">
        <button class="pres-btn PillButton${prevDis}" onclick="presFirst()" title="First page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="19 20 9 12 19 4"/><line x1="5" y1="4" x2="5" y2="20"/></svg>
        </button>
        <button class="pres-btn PillButton${prevDis}" onclick="presPrev()" title="Previous (←)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="pres-page-info">${pg+1} / ${PRES_TOTAL}</span>
        <button class="pres-btn PillButton${nextDis}" onclick="presNext()" title="Next (→)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
        <button class="pres-btn PillButton${nextDis}" onclick="presLast()" title="Last page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="5 4 15 12 5 20"/><line x1="19" y1="4" x2="19" y2="20"/></svg>
        </button>
        <div class="pres-divider"></div>
        <button class="pres-btn PillButton" onclick="presZoom(0.8)" title="Zoom out (−)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>
        <span class="pres-zoom-info" id="pres-zoom-label">${Math.round(S.presZoom*100)}%</span>
        <button class="pres-btn PillButton" onclick="presZoom(1.25)" title="Zoom in (+)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </button>
        <button class="pres-btn PillButton" onclick="presResetZoom()" title="Reset zoom (0)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        </button>
      </div>
      <div class="pres-notes-backdrop${S.presNotesOpen?' open':''}" id="pres-notes-backdrop" onclick="togglePresNotes()"></div>
      <aside class="pres-notes${S.presNotesOpen?' open':''}" id="pres-notes">
        <div class="pres-notes-head">
          <div>
            <h4>${t('presNotes')}</h4>
            <div class="pres-notes-sub" id="pres-notes-sub">${S.lang==='ko'?'슬라이드 ':'Slide '}${pg+1} · ${t('presSaved')} ${presNotesFor(pg).length}</div>
          </div>
          <div class="pres-notes-actions">
            <button class="pres-notes-btn PillButton" onclick="exportPresNotes()">${t('presNotesExport')}</button>
            <button class="pres-notes-btn PillButton" onclick="togglePresNotes()">✕</button>
          </div>
        </div>
        <div class="pres-notes-body" id="pres-notes-body">${rPresNotesItems(pg)}</div>
        <div class="pres-notes-form">
          <textarea id="pres-note-input" placeholder="${t('presNotesHint')}"></textarea>
          <div class="pres-notes-form-row">
            <span class="pres-notes-hint">${t('presNotesHotkey')}</span>
            <button class="pres-notes-add PillButton" onclick="addPresNote()">${t('presNotesAdd')}</button>
          </div>
        </div>
      </aside>
    </div>
  </div>`;
}

function presNext(){goPresPage(S.presPage+1);}
function presPrev(){goPresPage(S.presPage-1);}
function presFirst(){goPresPage(0);}
function presLast(){goPresPage(PRES_TOTAL-1);}

function goPresPage(i){
  const newPg=Math.max(0,Math.min(PRES_TOTAL-1,i));
  if(newPg===S.presPage&&document.getElementById('pres-img'))return;
  S.presPage=newPg;
  S.presZoom=1;S.presPanX=0;S.presPanY=0;
  // Fast DOM update — no full re-render
  const img=document.getElementById('pres-img');
  if(img){
    img.src=presSlideUrl(newPg);
  }else{
    // No img yet — need full render
    render();return;
  }
  // Update page info
  const info=document.querySelector('.pres-page-info');
  if(info)info.textContent=(newPg+1)+' / '+PRES_TOTAL;
  // Update section label
  const sec=presSectionForPage(newPg);
  const titleEl=document.querySelector('.pres-title');
  if(titleEl)titleEl.textContent=(S.lang==='ko'?sec.label:sec.labelEn)+' \u2014 '+(newPg+1)+'/'+PRES_TOTAL;
  // Update TOC
  document.querySelectorAll('.pres-toc li button').forEach(btn=>{
    btn.classList.toggle('on',parseInt(btn.dataset.pg)===newPg);
  });
  const sidebar=document.getElementById('pres-sidebar');
  const activeBtn=sidebar?.querySelector('.pres-toc li button.on');
  if(activeBtn&&sidebar)activeBtn.scrollIntoView({block:'nearest',behavior:'smooth'});
  // Arrows
  document.querySelectorAll('.pres-nav-prev').forEach(el=>el.classList.toggle('disabled',newPg<=0));
  document.querySelectorAll('.pres-nav-next').forEach(el=>el.classList.toggle('disabled',newPg>=PRES_TOTAL-1));
  applyPresZoom();
  refreshPresNotesPanel();
  presPreload(newPg);
  // Show controls briefly on page change
  const wrap=document.getElementById('pres-wrap');
  if(wrap){wrap.classList.add('controls-visible');clearTimeout(window._presCtrlTimer);window._presCtrlTimer=setTimeout(()=>wrap.classList.remove('controls-visible'),2000);}
}

function presZoom(factor){
  S.presZoom=Math.max(0.25,Math.min(5,S.presZoom*factor));
  applyPresZoom();
}
function presResetZoom(){
  S.presZoom=1;S.presPanX=0;S.presPanY=0;
  applyPresZoom();
}
function applyPresZoom(){
  const inner=document.getElementById('pres-inner');
  const label=document.getElementById('pres-zoom-label');
  if(inner){
    inner.style.transform=S.presZoom===1&&S.presPanX===0&&S.presPanY===0?'none':`translate(${S.presPanX}px,${S.presPanY}px) scale(${S.presZoom})`;
    const stage=document.getElementById('pres-stage');
    if(stage)stage.style.cursor=S.presZoom>1.05?'grab':'default';
  }
  if(label)label.textContent=Math.round(S.presZoom*100)+'%';
}

function togglePresSidebar(){
  S.presSidebarOpen=!S.presSidebarOpen;
  const sb=document.getElementById('pres-sidebar');
  const main=document.getElementById('pres-main');
  const overlay=document.getElementById('pres-overlay');
  if(sb){
    sb.classList.toggle('hidden',!S.presSidebarOpen);
    sb.classList.toggle('show-mobile',S.presSidebarOpen);
  }
  if(main)main.classList.toggle('expanded',!S.presSidebarOpen);
  if(overlay)overlay.classList.toggle('show',S.presSidebarOpen);
  // Update sidebar toggle button active state
  const toggleBtn=document.querySelector('.pres-hdr-left .pres-icon-btn');
  if(toggleBtn)toggleBtn.classList.toggle('active',S.presSidebarOpen);
}

function togglePresFullscreen(){
  const wrap=document.getElementById('pres-wrap');
  if(!wrap)return;
  if(document.fullscreenElement){
    document.exitFullscreen().catch(()=>{});
  }else{
    (wrap.requestFullscreen||wrap.webkitRequestFullscreen||wrap.msRequestFullscreen).call(wrap).catch(()=>{});
  }
}

const _presPan={active:false,sx:0,sy:0,ox:0,oy:0};
function initPresViewer(){
  const stage=document.getElementById('pres-stage');
  if(!stage)return;
  // Wheel handler
  stage.addEventListener('wheel',(e)=>{
    e.preventDefault();
    if(e.shiftKey&&S.presZoom>1.05){
      S.presPanX-=(e.deltaX||0);
      S.presPanY-=(e.deltaY||0);
      applyPresZoom();
      return;
    }
    const factor=e.deltaY<0?1.1:0.9;
    S.presZoom=Math.max(0.25,Math.min(5,S.presZoom*factor));
    applyPresZoom();
  },{passive:false});
  // Pan with pointer drag
  stage.addEventListener('pointerdown',(e)=>{
    if(S.presZoom<=1.05)return;
    _presPan.active=true;_presPan.sx=e.clientX;_presPan.sy=e.clientY;
    _presPan.ox=S.presPanX;_presPan.oy=S.presPanY;
    stage.classList.add('dragging');
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove',(e)=>{
    if(!_presPan.active)return;
    S.presPanX=_presPan.ox+(e.clientX-_presPan.sx);
    S.presPanY=_presPan.oy+(e.clientY-_presPan.sy);
    applyPresZoom();
  });
  const endPan=(e)=>{
    if(!_presPan.active)return;
    _presPan.active=false;
    stage.classList.remove('dragging');
  };
  stage.addEventListener('pointerup',endPan);
  stage.addEventListener('pointercancel',endPan);
  applyPresZoom();
  presPreload(S.presPage);
  // Auto-hide controls after 3s of no mouse movement
  let hideTimer;
  const wrap=document.getElementById('pres-wrap');
  if(wrap){
    wrap.addEventListener('mousemove',()=>{
      wrap.classList.add('controls-visible');
      clearTimeout(hideTimer);
      hideTimer=setTimeout(()=>wrap.classList.remove('controls-visible'),3000);
    });
  }
}

// Keyboard navigation — single global handler
document.addEventListener('keydown',(e)=>{
  if(S.tab!=='presentation')return;
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
  switch(e.key){
    case 'ArrowRight':case 'ArrowDown':case ' ':case 'PageDown':
      e.preventDefault();goPresPage(S.presPage+1);break;
    case 'ArrowLeft':case 'ArrowUp':case 'PageUp':
      e.preventDefault();goPresPage(S.presPage-1);break;
    case 'Home':e.preventDefault();goPresPage(0);break;
    case 'End':e.preventDefault();goPresPage(PRES_TOTAL-1);break;
    case '+':case '=':e.preventDefault();presZoom(1.25);break;
    case '-':e.preventDefault();presZoom(0.8);break;
    case '0':e.preventDefault();presResetZoom();break;
    case 'f':case 'F':e.preventDefault();togglePresFullscreen();break;
    case 'Escape':
      if(document.fullscreenElement)document.exitFullscreen();
      else goTab('introduction');
      e.preventDefault();break;
    case 's':case 'S':e.preventDefault();togglePresSidebar();break;
    case 'n':case 'N':
      if(e.shiftKey){
        e.preventDefault();
        if(!S.presNotesOpen)togglePresNotes();
        setTimeout(focusPresNoteInput,40);
      }
      break;
    case 'c':case 'C':
      e.preventDefault();togglePresNotes();break;
  }
});

// ===== LASER CURSOR LOGIC =====
document.addEventListener('DOMContentLoaded', () => {
  const laserCursor = document.getElementById('laser-cursor');
  const canvas = document.getElementById('laser-canvas');
  if (!laserCursor || !canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Resize canvas tracking window changes
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Trail state
  let trail = [];
  const trailDuration = 1000; // 1 second in ms
  
  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    laserCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    
    // Add point to trail sequence
    if (S.tab !== 'presentation') {
      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    } else {
      trail = [];
    }

    // Ensure array doesn't grow wildly
    if (trail.length > 200) trail.shift();
  });

  const clickableSelector = 'a, button, input, textarea, select, [onclick], .gtab, .lb-nav, .pres-nav-arrow, .pres-icon-btn, .pres-btn, .pres-toc li button, .pres-note-del, .est-r7-card, .design-jump-card, .design-img-wrap';

  document.addEventListener('mouseover', (e) => {
    if (e.target && e.target.closest) {
      if (e.target.closest(clickableSelector)) {
        laserCursor.classList.add('active');
      } else {
        laserCursor.classList.remove('active');
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      laserCursor.style.display = 'none';
      trail = []; 
    }
  });
  
  document.addEventListener('mouseenter', () => {
    laserCursor.style.display = 'block';
  });

  // Animation loop for trail interpolation
  let isCanvasClear = true;
  function drawTrail() {
    if (S.tab === 'presentation') {
      if (!isCanvasClear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isCanvasClear = true;
      }
      requestAnimationFrame(drawTrail);
      return;
    }
    const now = Date.now();
    
    // Remove old points beyond duration threshold
    trail = trail.filter(p => now - p.time <= trailDuration);
    
    if (trail.length === 0) {
      if (!isCanvasClear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isCanvasClear = true;
      }
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      isCanvasClear = false;
      
      // Connect points with decaying lines based on age
      for (let i = 0; i < trail.length - 1; i++) {
        const p1 = trail[i];
        const p2 = trail[i + 1];
        
        // Age ratio from 0.0 (fresh) to 1.0 (dead)
        const age = (now - p1.time) / trailDuration;
        const opacity = Math.max(0, 1 - age);
        const lineWidth = 4 * (1 - age) + 1; // Dynamic thickness
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        // Apply glow effect using stroke styling
        ctx.strokeStyle = `rgba(255, 42, 42, ${opacity * 0.7})`; 
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }
    
    requestAnimationFrame(drawTrail);
  }
  
  // Start animation loop
  requestAnimationFrame(drawTrail);
});
