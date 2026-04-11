// === data.js — Translations, constants, and estimate data ===
// ===== TRANSLATIONS =====
const TR={
en:{
  // Header
  hdrTitle:'Korean Presbyterian Church',
  hdrSub:'Kitchen Renovation · Cost Simulator',
  langBtn:'한국어',
  // Splash
  splOrg:'Korean Presbyterian Church · St. Louis',
  splTitle:'Kitchen Renovation',
  splSub:'Kitchen Renovation · Cost Simulator',
  splEnter:'Click anywhere to enter',
  // Tabs
  introduction:'Introduction',design:'Design Considerations',floorplan:'Floor Plan',polycam:'Existing Space',enscape:'Enscape',selections:'Selection',presentation:'Presentation',estimates:'Estimates',meetings:'Meeting Notes',
  // Dashboard
  optA:'Option A',optB:'Option B',optC:'Option C',optD:'Option D',
  lowest:'Lowest',openShelving:'Open Shelving',cabinets:'Cabinets',
  gc:'GC',equip:'Equip',
  // Bars
  visualComp:'Visual Comparison',
  // Contingency
  contingency:'Contingency',off:'OFF',adds:'Adds',toOption:'to Option',
  // Carousel pills
  pillA:'A: KFS',pillB:'B: Pernikoff',pillC:'C: Agape',pillD:'D: Morganco',
  // Slide headers
  slideA:'Option A: KFS + Ford',slideB:'Option B: Pernikoff + Session',
  slideCf:'Option C: Agape + Ford',slideCs:'Option C: Agape + Session',
  slideDf:'Option D: Morganco + Ford',slideDs:'Option D: Morganco + Session',
  // Section headers
  gcKFS:'GC: KFS — Layout 1',gcPern:'GC: Pernikoff (Revised 3/9)',gcAgape:'GC: Agape Architecture',gcMorg:'GC: Morganco Design Build',
  eqFord:'Equipment: Ford Hotel Supply',eqSession:'Supplier: Session + Kitchen Mechanical',
  eqFordShort:'Equipment: Ford',eqSessionShort:'Supplier: Session',
  // Notes
  noteA:'KFS (est. 1924): MEP specialist. Demo, FRP, SS panels (20 LF), hood trim, pot filler waterline, 6 LED, set/connect all equip. <strong>Excludes:</strong> flooring, ceiling, permits, plans.',
  noteAeq:'Ford quote 03/13/2026. <strong>Cabinetry:</strong> Fixture Mill Work — toggle individual items for front counter, wall cab upgrade, quartz upgrade, and coffee counter. <strong>Custom $</strong> = enter your own online price.',
  noteB:'Pernikoff (est. 1914). Base: LED, 7 outlets, water heater, plumbing, demo, tile, SS panel install, door infill, paint ($1,500). Flooring alts excluded. <strong>Excludes:</strong> appliances, faucets, SS panels, plans, permits.',
  noteBeq:'SS panels by Kitchen Mechanical ($4,860). Comstock = base; Southbend = upgrade. Full cabinets include SS tops; bases need separate counter.',
  noteD:'Morganco = Design-Build. Includes design (4 mtg + 3D), QualityBrand cabinetry, Hallmark quartz, FRP + SS, electrical, plumbing, backsplash. <strong>Expires 3/27/2026.</strong> Payment 4×25%.',
  noteDeq:'Morganco includes cabinetry & quartz in GC — equipment is appliances only.',
  noteC:'<strong>Ballpark</strong> — final TBD after trades bid. Flooring excluded. Fire suppression TBD.',
  // Subtotals
  subtotal:'Subtotal',eqSubtotal:'Equipment Subtotal',
  optionTotal:'OPTION',total:'TOTAL',
  // Categories
  catCooking:'Cooking Equipment',catFridge:'Refrigeration & Ice',catSinks:'Sinks & Faucets',
  catShelving:'Wire Shelving',catWallStorage:'Wall Storage',catCountertop:'Countertop',catWalls:'SS Wall Panels',catOther:'Other Items',
  // Wall storage subsections
  wsOpen:'Open Shelving',wsCab:'Wall Cabinets',
  // Agape / Morganco
  eqSupplier:'Equipment Supplier',ford:'Ford',session:'Session',hiLo:'Cost Range',low:'Low',high:'High',ballpark:'Ballpark',
  // Design options
  designTitle:'Design Considerations',designSub:'Choose one option per section. Use the six cards above to jump between design consideration areas.',
  designIntroTitle:'Project Scope Overview',
  designIntroSub:'Click each card to jump directly into that design consideration section.',
  selectionReq:'Selection Required',
  counterColorPick:'Countertop Color Selection',
  counterOptCount:'4 options',
  selected:'selected',viewSelections:'Selections',refOnly:'(Reference Only)',selectThis:'Select this option',selectedLabel:'Selected',clickEnlarge:'Click to enlarge',
  renderings:'Rendering',renderingsPlural:'Renderings',
  // Selections tab
  yourSelections:'Selected Options',selSub:'Summary of your chosen design options across all design consideration sections.',goToDesign:'Design Considerations',
  categoriesSelected:'categories selected',noSelYet:'No selection yet',optionsAvail:'options available',
  noSelMade:'No selections made yet.',visitDesign:'Visit the',tabToStart:'tab to start choosing.',choose:'Choose',remove:'Remove',
  // Floor plan
  floorTitle:'Floor Plan',floorSub:'',
  floorFocus:'Key Change Point',
  floorOpenImage:'Open Rendering',
  rendered:'Rendered',vector:'Vector',reset:'Reset',fullScreen:'Full Screen',floorTip:'',
  // Scans
  lidarTitle:'Existing Space',lidarSub:'Polycam (LiDAR Scan)',
  lidarHelp:'If the viewer does not load in-page, open it directly in Polycam.',
  openPolycam:'Open in Polycam',
  existingPhotosTitle:'Existing Space Pictures',
  existingPhotosSub:'Reference photos of the current kitchen before renovation. Click any photo to enlarge.',
  existingPhotosCount:'photos',
  existingShowMore:'Show more photos',
  existingPhotoLabel:'Existing Photo',
  existingPhotoCap:'Current kitchen condition before renovation',
  enscapeTitle:'Enscape',enscapeSub:'Interactive Enscape walkthrough of the proposed kitchen design. Navigate and review layout, finishes, and equipment placement.',
  enscapeHelp:'Use mouse to look around. Click and drag to move through the space. Scroll to zoom.',
  openChaos:'Open in Chaos Cloud',
  estTitle:'Final Estimate Decision',
  estSub:'Approved path: Option B only (Pernikoff construction + Session supplier).',
  scopeTitle:'6 Work Categories & Inclusion by Package',
  scopeSub:'Category map first, then inclusion matrix for Option 1 / 2 / 3.',
  scopeHint:'Click an Option 1/2/3 card below to update this rendering map.',
  scopeActive:'Active',
  scopeLegendIn:'Included',
  scopeLegendAdj:'Adjustable',
  scopeLegendPhase:'Phased',
  scopeLegendOut:'Excluded',
  presetHint:'Package buttons align Option B to selection timing. In Option 2, kitchen floor tile ($9,100) is ON by default.',
  openDetail:'View Session + Pernikoff Breakdown',
  applyPreset:'Apply to Option B',
  applied:'Applied to Option B',
  resetRaw:'Reset Option B Raw',
  mapLabel:'Selection Mapping',
  sourceTitle:'Session + Pernikoff Line-Item Breakdown (Option B)',
  sourceSub:'Construction (Pernikoff) and supplier/equipment (Session + Kitchen Mechanical) are separated below.',
  presNotes:'Presentation Notes',
  closePresentation:'Close Presentation',
  presNotesHint:'Capture live Q&A by slide (stored in this browser).',
  presNotesExport:'Export',
  presNotesEmpty:'No notes on this slide yet.',
  presNotesAdd:'Add Note',
  presNotesHotkey:'Shift+N to focus note input',
  presDelete:'Delete',
  presSaved:'Saved',
  meetingTitle:'Meeting Notes (Shared)',
  meetingSub:'Use this tab for ongoing notes by company. Notes save to server when API is available, and fall back to local browser storage if not.',
  meetingSyncServer:'Synced to shared server',
  meetingSyncLocal:'Saved locally (server unavailable)',
  meetingSyncLoading:'Connecting to shared server...',
  meetingSaveNow:'Save Now',
  meetingSupplierTitle:'Supplier Team (Session + Kitchen Mechanical)',
  meetingConstructionTitle:'Construction Team (Pernikoff)',
  meetingAgendaTitle:'Kickoff Agenda',
  meetingAgendaHint:'Today focus: schedule, full scope alignment, timeline, and highest lead-time items.',
  meetingAgendaAddPlaceholder:'Add agenda item',
  meetingAgendaAddBtn:'Add Agenda',
  meetingNotesTitle:'Meeting Notes',
  meetingNotesHint:'Capture decisions, blockers, and owner/action items.',
  meetingNoteAddPlaceholder:'Add note from this meeting',
  meetingNoteAddBtn:'Add Note',
  meetingNotesEmpty:'No notes yet. Add your first note.',
  meetingSuggestedTitle:'Additional Items To Cover',
  meetingKickoffTag:'Kickoff meeting',
  // Print
  printBtn:'Print Summary to PDF',
  disc:'Korean Presbyterian Church Kitchen Renovation — Interactive Briefing',
  discDate:'Pre-tax estimates · For planning only',
  // Misc
  of:'of',customTag:'CUSTOM',eqOnly:'Equip Only',optAvailable:'options available',optAvailableSingle:'option available',
  selGoTo:'Go to',selToMake:'to make or change selections.',customLabel:'Custom $',clear:'Clear',zoom:'Zoom',ccw:'CCW',cw:'CW',
},
ko:{
  hdrTitle:'한인장로교회',
  hdrSub:'주방 리노베이션 · 비용 시뮬레이터',
  langBtn:'English',
  splOrg:'한인장로교회 · 세인트루이스',
  splTitle:'주방 리노베이션',
  splSub:'주방 리노베이션 · 비용 시뮬레이터',
  splEnter:'화면을 클릭하세요',
  introduction:'소개',design:'디자인 고려사항',floorplan:'평면도',polycam:'현재 공간',enscape:'3D 투어',selections:'선택',presentation:'프레젠테이션',estimates:'견적',meetings:'회의 메모',
  optA:'옵션 A',optB:'옵션 B',optC:'옵션 C',optD:'옵션 D',
  lowest:'최저가',openShelving:'오픈 선반',cabinets:'캐비닛',
  gc:'시공비',equip:'장비비',
  visualComp:'비교 차트',
  contingency:'예비비',off:'OFF',adds:'추가',toOption:'옵션',
  pillA:'A: KFS',pillB:'B: Pernikoff',pillC:'C: Agape',pillD:'D: Morganco',
  slideA:'옵션 A: KFS + Ford',slideB:'옵션 B: Pernikoff + Session',
  slideCf:'옵션 C: Agape + Ford',slideCs:'옵션 C: Agape + Session',
  slideDf:'옵션 D: Morganco + Ford',slideDs:'옵션 D: Morganco + Session',
  gcKFS:'시공: KFS — 레이아웃 1',gcPern:'시공: Pernikoff (3/9 수정)',gcAgape:'시공: Agape Architecture',gcMorg:'시공: Morganco Design Build',
  eqFord:'장비: Ford Hotel Supply',eqSession:'공급/장비: Session + Kitchen Mechanical',
  eqFordShort:'장비: Ford',eqSessionShort:'공급: Session',
  noteA:'KFS (1924년 설립): MEP 전문업체. 철거, FRP, SS 패널 (20 LF), 후드 트림, 팟 필러 배수관, LED 6개, 장비 설치/연결 포함. <strong>미포함:</strong> 바닥, 천장, 허가, 도면.',
  noteAeq:'Ford 견적 2026/03/13. <strong>캐비닛:</strong> Fixture Mill Work — 프론트 카운터, 벽면 캐비닛 업그레이드, 석영 업그레이드, 커피 카운터 개별 선택 가능. <strong>Custom $</strong> = 직접 가격 입력.',
  noteB:'Pernikoff (1914년 설립). 기본: LED, 콘센트 7개, 온수기, 배관, 철거, 타일, SS 패널 설치, 문 막기, 페인트 ($1,500). 바닥 제외. <strong>미포함:</strong> 가전, 수전, SS 패널, 도면, 허가.',
  noteBeq:'SS 패널: Kitchen Mechanical ($4,860). Comstock = 기본; Southbend = 업그레이드. 풀 캐비닛은 SS 상판 포함; 베이스는 별도 카운터 필요.',
  noteD:'Morganco = 디자인-시공 일괄. 디자인(4회 미팅 + 3D), QualityBrand 캐비닛, Hallmark 석영, FRP + SS, 전기, 배관, 백스플래시 포함. <strong>만료: 2026/03/27.</strong> 지불 4×25%.',
  noteDeq:'Morganco는 캐비닛 & 석영을 시공비에 포함 — 장비는 가전만 해당.',
  noteC:'<strong>개략 견적</strong> — 하도급 입찰 후 최종 확정. 바닥 제외. 소방 시스템 미정.',
  subtotal:'소계',eqSubtotal:'장비 소계',
  optionTotal:'옵션',total:'합계',
  catCooking:'조리 장비',catFridge:'냉장 및 제빙',catSinks:'싱크 및 수전',
  catShelving:'와이어 선반',catWallStorage:'벽면 수납',catCountertop:'카운터탑',catWalls:'SS 벽 패널',catOther:'기타 항목',
  wsOpen:'오픈 선반',wsCab:'벽면 캐비닛',
  eqSupplier:'장비 공급업체',ford:'Ford',session:'Session',hiLo:'비용 범위',low:'하한',high:'상한',ballpark:'개략 견적',
  designTitle:'디자인 고려사항',designSub:'각 섹션에서 하나의 옵션을 선택하세요. 상단 6개 카드로 원하는 고려사항으로 바로 이동할 수 있습니다.',
  designIntroTitle:'프로젝트 내용 소개',
  designIntroSub:'각 카드를 클릭하면 해당 디자인 고려사항 섹션으로 바로 이동합니다.',
  selectionReq:'선택 필요',
  counterColorPick:'카운터탑 색상 선택',
  counterOptCount:'4개 옵션',
  selected:'선택됨',viewSelections:'선택 항목',refOnly:'(참고용)',selectThis:'이 옵션 선택',selectedLabel:'선택됨',clickEnlarge:'클릭하여 확대',
  renderings:'렌더링',renderingsPlural:'렌더링',
  yourSelections:'선택 항목',selSub:'디자인 고려사항 6개 섹션에서 선택한 옵션 요약입니다.',goToDesign:'디자인 고려사항',
  categoriesSelected:'카테고리 선택됨',noSelYet:'아직 선택 없음',optionsAvail:'옵션 가능',
  noSelMade:'아직 선택된 항목이 없습니다.',visitDesign:'다음으로 이동:',tabToStart:'탭에서 선택을 시작하세요.',choose:'선택',remove:'삭제',
  floorTitle:'평면도',floorSub:'',
  floorFocus:'핵심 변경 포인트',
  floorOpenImage:'렌더링 열기',
  rendered:'렌더링',vector:'벡터',reset:'초기화',fullScreen:'전체 화면',floorTip:'',
  lidarTitle:'현재 공간',lidarSub:'Polycam (LiDAR Scan)',
  lidarHelp:'뷰어가 로드되지 않으면 Polycam에서 직접 확인하세요.',
  openPolycam:'Polycam에서 열기',
  existingPhotosTitle:'기존 공간 사진',
  existingPhotosSub:'리노베이션 전 주방 현황 사진입니다. 사진을 클릭하면 확대됩니다.',
  existingPhotosCount:'장',
  existingShowMore:'사진 더 보기',
  existingPhotoLabel:'기존 공간 사진',
  existingPhotoCap:'리노베이션 전 현재 주방 상태',
  enscapeTitle:'3D 투어',enscapeSub:'제안된 주방 디자인의 Enscape 3D 투어입니다. 동선, 마감재, 장비 배치를 확인하세요.',
  enscapeHelp:'마우스로 주변을 둘러보세요. 클릭 & 드래그로 이동. 스크롤로 확대/축소.',
  openChaos:'Chaos Cloud에서 열기',
  estTitle:'최종 견적 결정안',
  estSub:'확정안: 옵션 B만 반영 (Pernikoff 시공 + Session 장비).',
  scopeTitle:'6개 공사 카테고리 및 제안안별 포함 범위',
  scopeSub:'상단 카테고리 맵을 먼저 확인하고, 제1안/제2안/제3안 포함 범위를 비교하세요.',
  scopeHint:'아래 제1안/제2안/제3안 카드를 클릭하면 이 렌더링 맵이 해당 안 기준으로 바뀝니다.',
  scopeActive:'현재 선택',
  scopeLegendIn:'포함',
  scopeLegendAdj:'선택 조정',
  scopeLegendPhase:'단계적',
  scopeLegendOut:'미포함',
  presetHint:'패키지 버튼은 선택 시점 기준으로 옵션 B를 정렬합니다. 제2안에서는 주방 바닥 타일($9,100)이 기본 ON 입니다.',
  openDetail:'Session + Pernikoff 상세 보기',
  applyPreset:'옵션 B에 적용',
  applied:'옵션 B 적용됨',
  resetRaw:'옵션 B 원본 복원',
  mapLabel:'선택 매핑',
  sourceTitle:'Session + Pernikoff 견적 상세 (옵션 B)',
  sourceSub:'시공(Pernikoff)과 장비/공급(Session + Kitchen Mechanical)을 분리해 확인할 수 있습니다.',
  presNotes:'발표 메모',
  closePresentation:'프레젠테이션 닫기',
  presNotesHint:'슬라이드별 질의응답 메모를 기록합니다. (이 브라우저에 저장)',
  presNotesExport:'내보내기',
  presNotesEmpty:'이 슬라이드에 아직 메모가 없습니다.',
  presNotesAdd:'메모 추가',
  presNotesHotkey:'Shift+N 으로 입력창 포커스',
  presDelete:'삭제',
  presSaved:'저장됨',
  meetingTitle:'회의 메모 (공유)',
  meetingSub:'업체별 회의 내용을 이 탭에서 계속 기록하세요. 서버 API가 있으면 서버에 저장되고, 없으면 브라우저에 저장됩니다.',
  meetingSyncServer:'공유 서버에 저장됨',
  meetingSyncLocal:'로컬 저장됨 (서버 연결 불가)',
  meetingSyncLoading:'공유 서버 연결 중...',
  meetingSaveNow:'지금 저장',
  meetingSupplierTitle:'공급사 팀 (Session + Kitchen Mechanical)',
  meetingConstructionTitle:'시공 팀 (Pernikoff)',
  meetingAgendaTitle:'킥오프 아젠다',
  meetingAgendaHint:'오늘 핵심: 일정, 전체 범위 정렬, 타임라인, 리드타임 긴 항목 점검',
  meetingAgendaAddPlaceholder:'아젠다 항목 추가',
  meetingAgendaAddBtn:'아젠다 추가',
  meetingNotesTitle:'회의 메모',
  meetingNotesHint:'의사결정, 이슈, 담당자/액션아이템을 기록하세요.',
  meetingNoteAddPlaceholder:'이번 회의 메모 추가',
  meetingNoteAddBtn:'메모 추가',
  meetingNotesEmpty:'아직 메모가 없습니다. 첫 메모를 추가하세요.',
  meetingSuggestedTitle:'추가로 논의하면 좋은 항목',
  meetingKickoffTag:'킥오프 미팅',
  printBtn:'PDF 요약 인쇄',
  disc:'한인장로교회 주방 리노베이션 — 인터랙티브 브리핑',
  discDate:'세전 견적 · 참고용',
  of:'/',customTag:'직접 입력',eqOnly:'장비만',optAvailable:'옵션 가능',optAvailableSingle:'옵션 가능',
  selGoTo:'이동:',selToMake:'에서 선택하거나 변경하세요.',customLabel:'직접 입력 $',clear:'삭제',zoom:'확대',ccw:'반시계',cw:'시계',
}
};
function t(k){return TR[S.lang][k]||TR.en[k]||k;}
function toggleLang(){
  S.lang=S.lang==='en'?'ko':'en';
  document.getElementById('hdr-title').textContent=t('hdrTitle');
  document.getElementById('hdr-sub').textContent=t('hdrSub');
  document.getElementById('lang-btn').textContent=t('langBtn');
  // Update splash if still visible
  const sp=document.getElementById('splash');
  if(sp&&!sp.classList.contains('out')){
    sp.querySelector('.sp-t1 span').textContent=t('splOrg');
    sp.querySelector('.sp-t2 span').textContent=t('splTitle');
    sp.querySelector('.sp-t3 span').textContent=t('splSub');
    sp.querySelector('.sp-enter span').textContent=t('splEnter');
  }
  render();
}

const MEETING_COMPANIES=['supplier','construction'];
const MEETING_DEFAULTS={
  supplier:{
    agenda:[
      'Kickoff schedule and recurring meeting cadence',
      'Full scope confirmation: required vs optional supplier scope',
      'Milestone timeline: submittals, approvals, fabrication, delivery',
      'Highest lead-time items: custom cabinets, quartz/countertop, specialty stainless',
      'Equipment spec lock and alternates (value engineering options)',
      'Delivery windows, site access rules, and staging requirements',
      'Warranty, startup support, and post-install service contacts',
    ],
    suggested:[
      'Shop drawing turnaround SLAs and decision owner',
      'Long-lead purchase release trigger and deposit timing',
      'Damage/replacement protocol for delivered items',
      'Final punch-list response timeline',
    ],
  },
  construction:{
    agenda:[
      'Kickoff schedule with phase gates and target completion date',
      'Full scope walk-through and written exclusions',
      'Milestone timeline: demo, rough-in, inspections, finishes, handoff',
      'Highest lead-time dependencies affecting construction sequence',
      'Permit and inspection path (including required submissions)',
      'Kitchen downtime plan and temporary operation strategy',
      'Change-order process, approval authority, and communication cadence',
    ],
    suggested:[
      'Utility shutoff windows and congregation impact notices',
      'Daily/weekly reporting format with owner and due date',
      'Site safety, dust/noise containment, and cleanup standards',
      'Contingency draw rules and budget variance threshold',
    ],
  },
};

// Item Korean names map
const IKO={
  a_plumb:'배관 공사',a_elec:'전기 공사 (LED 6개)',a_install:'장비 설치 + SS 벽 패널 + 트림',a_frp:'FRP 설치',
  a_range:'레인지 36" 4버너',a_stockpot:'스톡팟 레인지 x2',a_potfill:'팟 필러',a_fridge:'냉장고 — True T-49-HC 2도어',
  a_shelf1:'와이어 선반 — 48"W (x4) (주방 내부)',a_shelf2:'와이어 선반 — 36"W (x4) (주방 내부)',a_shelf3:'와이어 선반 — 54"W (x8) (입구 복도)',
  a_ice:'제빙기',a_glass:'글라스 필러 스테이션',a_sink:'핸드워시 싱크',
  a_mw_front:'프론트 카운터 캐비닛 (오픈 선반) + Corian',a_mw_front_wallcab:'프론트 카운터: 벽 캐비닛 업그레이드',
  a_mw_front_quartz:'프론트 카운터: 석영 업그레이드',
  a_coffee:'커피 테이블',
  a_wso:'오픈 선반 (카운터 위 4×30"W + 싱크 위 2×72"W, 2×30"W)',a_wsc:'벽 캐비닛 (카운터 위 2×맞춤형 + 싱크 위 맞춤형 132")',
  b_base:'Pernikoff 기본 입찰',b_ceil:'대안 #3: 천장 타일',b_frp:'대안 #5: FRP (타일 대신, 차감)',
  b_pump:'대안 #6: 순환 펌프 + 밸브',b_coffee_gc:'대안 #7: 커피 머신 설치',b_floor1:'대안 #1: 주방 바닥 타일',b_floor2:'대안 #2: 엘리베이터 로비 타일',
  b_ss:'SS 벽 패널 (Kitchen Mechanical)',b_range_c:'레인지 36" — Comstock',b_range_s:'레인지 36" — Southbend (업그레이드)',
  b_stock_c:'스톡팟 x2 — Comstock',b_stock_s:'스톡팟 x2 — Southbend (업그레이드)',
  b_gas:'가스 커넥터 키트 x3',b_pf:'팟 필러',
  b_s1:'와이어 선반 (항목 1)',b_s8:'와이어 선반 — 건조 보관',b_s14:'와이어 선반 — 냉장고 옆',
  b_fridge:'냉장고 — True T-23-HC',b_fridge2:'냉장고 — True T-49-HC 2도어 (업그레이드)',
  b_pr:'프리린스 수전 (3칸 싱크)',b_wf:'벽면 수전 (3칸 싱크)',b_1c:'1칸 싱크 + 수전',
  b_ice:'제빙기 + 필터',b_gf:'글라스 필러',b_ws:'벽면 선반',b_pr2:'팟 랙 (천장 설치)',b_di:'드롭인 싱크 + 수전',
  b_cb2:'베이스 카운터 — 오픈 선반 (1도어, 5서랍)',b_cb1:'베이스 카운터 — 캐비닛 (6도어, 5서랍)',
  b_q2:'석영 카운터탑',b_coffee:'커피 테이블',
  b_wso:'오픈 선반 (카운터 위 4×30"W + 싱크 위 2×72"W, 2×30"W)',b_wsc:'벽 캐비닛 (카운터 위 2×맞춤형 + 싱크 위 맞춤형 132")',
  c_rm:'주방 리모델링 (기본)',c_ti:'벽 타일 (백스플래시)',c_ce:'천장 타일 (PVC)',c_li:'조명 (매입 LED)',
  c_ss_gc:'벽면 클래딩 (SS)',c_pl:'배관',c_fi:'소방 시스템 (TBD)',
  cf_r:'레인지 36" (Southbend)',cf_sp:'스톡팟 x2 (Southbend)',cf_pf:'팟 필러 (Krowne)',cf_fr:'냉장고 (Turbo Air)',
  cf_sh:'와이어 선반 (3세트)',cf_ic:'제빙기 (Scotsman)',cf_gl:'글라스 필러',cf_sk:'드롭인 싱크 + 수전',
  cf_bo:'John Boos 세미커스텀 SS',cf_sv:'Servco 커스텀 SS — 대안',cf_mw:'밀워크 + 커피 — 대안',
  cf_coffee:'커피 테이블',cf_wso:'오픈 선반',cf_wsc:'벽 캐비닛',
  cs_r:'레인지 36" (Comstock)',cs_sp:'스톡팟 x2 (Comstock)',cs_gh:'가스 커넥터 x3',cs_pf:'팟 필러 (Krowne)',
  cs_sh:'와이어 선반 (3세트)',cs_fr:'냉장고 (True T-23-HC)',cs_fc:'싱크 수전 (프리린스 + 벽면)',
  cs_1c:'1칸 싱크 + 수전',cs_ic:'제빙기 (Scotsman)',cs_gl:'글라스 필러',cs_sr:'선반 + 팟 랙',cs_di:'드롭인 싱크 + 수전',
  cs_cf:'커스텀 SS 캐비닛 (SS 상판 포함)',cs_cb:'캐비닛 베이스만 — 대안',cs_qz:'석영 카운터탑 — 옵션',
  cs_coffee:'커피 테이블',cs_wso:'오픈 선반',cs_wsc:'벽 캐비닛',
  d_ba:'Morganco 기본 제안서',d_pf:'팟 필러 (설비 + 배관)',d_sc:'SS 캐비닛으로 업그레이드',d_os:'오픈 선반 (절약)',
  df_r:'레인지 36" (Southbend)',df_sp:'스톡팟 x2 (Southbend)',df_pf:'팟 필러 (Krowne)',df_fr:'냉장고 (Turbo Air)',
  df_sh:'와이어 선반',df_ic:'제빙기 (Scotsman)',df_gl:'글라스 필러',df_sk:'드롭인 싱크 + 수전',
  df_coffee:'커피 테이블',df_wso:'오픈 선반',df_wsc:'벽 캐비닛',
  ds_r:'레인지 36" (Comstock)',ds_sp:'스톡팟 x2 (Comstock)',ds_gh:'가스 커넥터 x3',ds_pf:'팟 필러 (Krowne)',
  ds_sh:'와이어 선반 (3세트)',ds_fr:'냉장고 (True T-23-HC)',ds_fc:'싱크 수전',
  ds_1c:'1칸 싱크 + 수전',ds_ic:'제빙기 (Scotsman)',ds_gl:'글라스 필러',ds_sr:'선반 + 팟 랙',ds_di:'드롭인 싱크 + 수전',
  ds_coffee:'커피 테이블',ds_wso:'오픈 선반',ds_wsc:'벽 캐비닛',
};
function itemName(it){return S.lang==='ko'&&IKO[it.id]?IKO[it.id]:it.name;}

// Design section Korean translation map
const DKO={
  // Section labels
  flooring_label:'바닥재',countertop_label:'카운터탑',material_label:'카운터 재질',sinkwall_label:'싱크 벽면',
  stove_label:'가스레인지 구역',gymside_label:'체육관 측면',coffee_label:'커피 & 입구',views_label:'전체 뷰',
  // Section descriptions
  flooring_desc:'기존 8″×8″ 오렌지 쿼리 타일 vs. 제안 12″×12″ 그레이 미끄럼 방지 타일.',
  countertop_desc:'체육관 방향 패스스루 카운터. 캐비닛과 선반 조합이 다른 3가지 옵션.',
  material_desc:'패스스루 카운터 표면의 3가지 재질 옵션. 각각 글라스 필러 쪽에서 아이스 머신과 함께 표시.',
  sinkwall_desc:'모든 싱크 벽면 옵션에는 3칸 싱크 + 1칸 싱크, 2도어 냉장고 포함.',
  stove_desc:'모든 가스레인지(밥솥 제외)는 새 상업용 장비로 교체. 가스레인지 왼쪽에 와이어 선반 추가.',
  gymside_desc:'체육관에서 패스스루 창을 통해 주방을 바라본 모습. 캐비닛 도어 유/무 2가지 옵션.',
  coffee_desc:'복도에 새 커피 스테이션 설치 (급수관 + 전기 콘센트). 기존 냉온수기를 주방에서 이전. 입구 옆 9′×2′×7′ 와이어 선반.',
  views_desc:'다양한 각도에서 전체 주방 레이아웃을 보여주는 광각 렌더링.',
  // Image titles — flooring
  flooring_t0:'기존 타일 (8″×8″)',flooring_t1:'새 타일 옵션 (12″×12″)',
  // Image captions — flooring
  flooring_c0:'현재 오렌지 쿼리 타일 바닥. 표준 8″×8″ 포맷.',
  flooring_c1:'제안된 12″×12″ 미끄럼 방지 다크 그레이 타일. 더 큰 포맷, 모던한 상업용 느낌.',
  // Image titles — countertop
  countertop_t0:'옵션 A — 캐비닛 + 정수기 + 제빙기',
  countertop_t1:'옵션 B — 캐비닛만 (정수기 없음)',
  countertop_t2:'옵션 C — 오픈 선반 + 정수기 + 제빙기',
  // Image captions — countertop
  countertop_c0:'벽 캐비닛 포함 전체 캐비닛 라인. 왼쪽 정수기, 오른쪽 제빙기. 패스스루에 석영 카운터.',
  countertop_c1:'벽 캐비닛 포함. 정수기/제빙기 없음. 연속된 카운터 공간 최대화.',
  countertop_c2:'캐비닛 대신 상하 오픈 선반. 왼쪽 정수기, 오른쪽 제빙기. 더 나은 가시성과 접근성.',
  // Image titles — material
  material_t0:'석영 — 어두운 색상',material_t1:'석영 — 밝은 색상 (화이트 마블 룩)',material_t2:'스테인리스 스틸',
  // Image captions — material
  material_c0:'미세한 무늬의 다크 그레이 석영 카운터. 글라스 필러 수전 및 배수구. 얼룩에 강하고 내구성 높음.',
  material_c1:'마블풍 무늬의 밝은 화이트/그레이 석영. 더 밝고 모던한 외관. 동일한 글라스 필러 구성.',
  material_c2:'일체형 불노즈 엣지의 스테인리스 스틸 카운터. 원활한 상업용 주방 룩. 가장 내구성 있고 위생적.',
  // Image titles — sinkwall
  sinkwall_t0:'옵션 A — 벽 캐비닛 + 제빙기',
  sinkwall_t1:'옵션 B — 벽 캐비닛 + 1칸 싱크 + 오픈 선반',
  sinkwall_t2:'옵션 C — 오픈 SS 벽면 선반 + 제빙기',
  // Image captions — sinkwall
  sinkwall_c0:'싱크대 위 SS 벽 캐비닛. 맨 왼쪽 제빙기, 중앙 3칸 싱크, 오른쪽 2도어 냉장고. 맨 오른쪽 와이어 선반.',
  sinkwall_c1:'상부 벽 캐비닛. 왼쪽에 독립형 1칸 싱크(제빙기 대체). 맨 오른쪽 오픈 선반.',
  sinkwall_c2:'벽 캐비닛 대신 벽걸이 SS 오픈 선반. 왼쪽 제빙기. 더 개방적이고 산업적인 느낌.',
  // Image titles — stove
  stove_t0:'가스레인지 벽면 — SS 패널 + 후드 + 새 장비',
  // Image captions — stove
  stove_c0:'전체 SS 벽 패널 및 배기 후드 시스템. 좌→우: 새 와이어 선반, 밥솥/찜기(기존), 더블 스톡팟 버너, 4버너 레인지. 상부 팟 필러.',
  // Image titles — gymside
  gymside_t0:'체육관 측면 — 캐비닛 도어 있음',gymside_t1:'체육관 측면 — 캐비닛 도어 없음 (오픈 프론트)',
  // Image captions — gymside
  gymside_c0:'체육관에서 바라본 패스스루 뷰. 카운터 아래 캐비닛 도어. 개구부 너머 주방 장비, 벽 캐비닛, 후드 보임.',
  gymside_c1:'동일한 패스스루 뷰, 도어 대신 오픈 프론트. 체육관 측에서 수납공간 직접 접근 가능.',
  // Image titles — coffee
  coffee_t0:'커피 스테이션 — 복도',coffee_t1:'입구 선반 — 9′×2′×7′ 와이어 랙',
  // Image captions — coffee
  coffee_c0:'새 복도 커피 카운터. 커피머신, 냉온수기(주방에서 이전), 서랍 베이스 캐비닛, 언더카운터 냉장고. 새 급수관 + 전기.',
  coffee_c1:'입구 왼쪽 새 4단 모바일 와이어 선반 (9′W × 2′D × 7′H). 코너 너머 커피 스테이션 보임. 오른쪽 주방 출입구.',
  // Image titles — views
  views_t0:'뷰 1 — 가스레인지 코너에서',views_t1:'뷰 2 — 패스스루 벽면 따라',
  views_t2:'뷰 3 — 싱크 벽면에서',views_t3:'뷰 4 — 패스스루 방향으로',views_t4:'뷰 5 — 카운터 디테일',
  // Image captions — views
  views_c0:'가스레인지 구역에서 광각. 중앙 SS 작업대. 왼쪽 패스스루 카운터와 체육관측 캐비닛. 오른쪽 싱크 벽면과 냉장고.',
  views_c1:'패스스루 카운터 쪽을 따라 본 모습. 왼쪽 카운터와 캐비닛, 중앙 작업대, 끝에 싱크 벽면과 후드.',
  views_c2:'싱크 벽면에서 가스레인지 구역을 바라본 모습. 왼쪽 냉장고, 위 캐비닛, 와이어 선반, 뒤쪽 스톡팟과 레인지.',
  views_c3:'가스레인지 측에서 패스스루와 체육관 문 방향. 왼쪽 레인지와 스톡팟, 중앙 작업대, 오른쪽 석영 카운터.',
  views_c4:'주방 내부에서 패스스루 카운터 클로즈업. 왼쪽 싱크와 수전, 석영 카운터의 전체 캐비닛 라인, 체육관으로의 유리 패스스루.',
};

const REQUIRED_SELECTION_KEYS=['sink','counter','flooring'];

function dsText(v){
  if(v&&typeof v==='object'&&!Array.isArray(v))return v[S.lang]||v.ko||v.en||'';
  return v||'';
}
function dsLabel(sec){return dsText(sec.label);}
function dsDesc(sec){return dsText(sec.desc);}
function dsTitle(sec,i){return dsText(sec.images[i].title);}
function dsCap(sec,i){return dsText(sec.images[i].cap);}
function selectableImageCount(sec){return sec.images.filter(im=>!im.refOnly).length;}
function isSelectableImage(sec,idx){return !!(sec.images[idx]&&!sec.images[idx].refOnly);}
function normalizePicks(){
  Object.keys(S.picks).forEach(k=>{
    const sec=DESIGN_SECTIONS.find(s=>s.key===k);
    const idx=S.picks[k];
    if(!sec||!sec.images[idx]||sec.images[idx].refOnly)delete S.picks[k];
  });
}

// ===== CATEGORY DEFINITIONS =====
const CATS = {
  cooking: {icon:'\u{1F525}', name:'catCooking', ids_a:['a_range','a_stockpot','a_potfill'], ids_b:['b_range_c','b_range_s','b_stock_c','b_stock_s','b_gas','b_pf'], ids_cf:['cf_r','cf_sp','cf_pf'], ids_cs:['cs_r','cs_sp','cs_gh','cs_pf'], ids_df:['df_r','df_sp','df_pf'], ids_ds:['ds_r','ds_sp','ds_gh','ds_pf']},
  fridge: {icon:'\u{2744}\u{FE0F}', name:'catFridge', ids_a:['a_fridge','a_ice'], ids_b:['b_fridge','b_fridge2','b_ice'], ids_cf:['cf_fr','cf_ic'], ids_cs:['cs_fr','cs_ic'], ids_df:['df_fr','df_ic'], ids_ds:['ds_fr','ds_ic']},
  sinks: {icon:'\u{1F6B0}', name:'catSinks', ids_a:['a_sink','a_glass'], ids_b:['b_pr','b_wf','b_1c','b_di','b_gf'], ids_cf:['cf_gl','cf_sk'], ids_cs:['cs_fc','cs_1c','cs_gl','cs_di'], ids_df:['df_gl','df_sk'], ids_ds:['ds_fc','ds_1c','ds_gl','ds_di']},
  shelving: {icon:'\u{1F4E6}', name:'catShelving', ids_a:['a_shelf1','a_shelf2','a_shelf3'], ids_b:['b_s1','b_s8','b_s14'], ids_cf:['cf_sh'], ids_cs:['cs_sh'], ids_df:['df_sh'], ids_ds:['ds_sh']},
  wallstorage: {icon:'\u{1F5C4}\u{FE0F}', name:'catWallStorage', ids_a:['a_wso','a_wsc'], ids_b:['b_wso','b_wsc'], ids_cf:['cf_wso','cf_wsc'], ids_cs:['cs_wso','cs_wsc','cs_sr'], ids_df:['df_wso','df_wsc'], ids_ds:['ds_wso','ds_wsc','ds_sr']},
  countertop: {icon:'\u{1F532}', name:'catCountertop', ids_a:['a_mw_front','a_mw_front_wallcab','a_mw_front_quartz','a_coffee'], ids_b:['b_cb2','b_cb1','b_q2','b_coffee'], ids_cf:['cf_bo','cf_sv','cf_mw','cf_coffee'], ids_cs:['cs_cf','cs_cb','cs_qz','cs_coffee'], ids_df:['df_coffee'], ids_ds:['ds_coffee']},
  walls: {icon:'\u{1F9F1}', name:'catWalls', ids_a:[], ids_b:['b_ss'], ids_cf:[], ids_cs:[], ids_df:[], ids_ds:[]},
};
const POLYCAM_URL='https://poly.cam/capture/5D464C80-8013-46BE-8BD9-74DEEBA6EA82';
const ENSCAPE_URL='https://cloud.chaos.com/collaboration/folder/QtewMDF6NdwauoAEXc9Ai6/present?n=Hmy9A8iFANzkVhrjD7aBjC';
const FLOOR_PLAN_RENDER_SRC='presentation-r8/slide-07.jpg';
const FLOOR_PLAN_VECTOR_SRC='Final Renderings/AXON/FLOOR PLAN.jpg';
const EXISTING_SPACE_FILES=[
  'IMG_0593.JPG',
  'IMG_0597.JPG',
  'IMG_0599.JPG',
  'IMG_0602.JPG',
  'IMG_0603.JPG',
  'IMG_0605.JPG',
  'IMG_0606.JPG',
  'IMG_0607.JPG',
  'IMG_0608.JPG',
  'IMG_4100.JPG',
  'IMG_4101.JPG',
  'IMG_4102.JPG',
  'IMG_4103.JPG',
  'IMG_4104.JPG',
  'IMG_4105.JPG',
  'IMG_4106.JPG',
  'IMG_4107.JPG',
  'IMG_4108.JPG',
  'IMG_4109.JPG',
  'IMG_4110.JPG',
  'IMG_4111.JPG',
  'IMG_4112.JPG',
  'IMG_4113.JPG',
  'IMG_4114.JPG',
  'IMG_4115.JPG'
];
const EXISTING_SPACE_SRCS=EXISTING_SPACE_FILES.map(name=>`Existing Space/${name}`);
const EXISTING_SPACE_PREVIEWS=EXISTING_SPACE_FILES.map(name=>`Existing Space/previews/${name}`);
const INTRO_CONTENT={
  ko:{
    heroTitle:'주방 레노베이션\n임시집사회 보고',
    heroMeta:'일시 / 2026년 3월 22일 19:00 (ZOOM)\n보고 / Task Force(TF) 팀 및 관리 3부 공동 준비',
    introMessage:`한인장로교회의 주방은 오랜 세월 동안 교우들의 친교와 봉사의 중심 공간으로 사용되어 왔습니다. 그러나 시설의 노후화로 인해 위생, 안전, 그리고 효율성에 있어 개선이 시급한 상황입니다.

관리 3부와 주방 리노베이션 TF팀은 지난 두달간 현장 조사, 3D 모델링, 전문 업체 견적 비교, 그리고 디자인 옵션 검토를 진행해 왔습니다.

본 보고는 그간의 과정과 결과를 공유하고, 집사님들의 소중한 의견을 수렴하고자 마련되었습니다.`,
    teamLeftTitle:'TF팀',
    teamRightTitle:'관리 3부',
    teamLeft:[
      ['김태호 집사','리더'],
      ['안성배 집사','맴버'],
      ['조다슬 집사','맴버'],
      ['심다솔 집사','맴버'],
      ['김도영 집사','맴버'],
    ],
    teamRight:[
      ['배성렬 장로','관리부 장로'],
      ['김태호 집사','부장'],
      ['김도영 집사','차장'],
      ['기수경 집사','자문위원'],
      ['문지숙 집사','자문위원'],
      ['윤성아 집사','자문위원'],
    ],
    process:[
      ['현장 조사 및 현황 파악','기존 주방의 문제점과 개선 필요 사항을 파악하기 위해 현장 실측 및 3D 스캔(Polycam)을 진행하였습니다.'],
      ['3D 모델링 및 디자인 개발','실측 데이터를 기반으로 주방 전체를 3D로 모델링하고, 구역별 다양한 디자인 옵션을 개발하였습니다. Enscape 렌더링을 통해 실제와 유사한 시각 자료를 제작하였습니다.'],
      ['견적 비교 및 검토','Ford, Pernikoff, Agape Construction, Morganco 등 전문 업체로부터 견적을 받아 비용을 비교 분석하였습니다.'],
      ['내부 검토 및 최종안 확정','태스크포스팀과 관리3부가 실용성·비용·미관을 종합적으로 검토하여 최종 권장안을 확정하였습니다.'],
      ['임시집사회 보고 및 의견 수렴','현재 단계: 프로젝트 내용을 소개하고, 집사님들의 피드백을 수렴합니다.'],
      ['당회 보고 및 예산 승인','임시집사회의 피드백을 반영한 최종안을 당회에 보고하고, 프로젝트 예산 승인을 요청합니다.'],
      ['시공 업체 계약 및 공사 착공','승인된 예산 범위 내에서 시공 업체와 계약을 체결하고, 주방 사용 제한 기간을 최소화하여 공사를 진행합니다.'],
    ],
    purpose:[
      ['프로젝트 내용 소개','주방 리노베이션의 배경, 범위, 그리고 구역별 디자인 내용을 소개합니다.'],
      ['디자인 옵션 공유 및 피드백 수렴','태스크포스팀이 검토한 디자인 옵션들을 공유하고, 집사님들의 의견과 피드백을 듣고자 합니다.'],
      ['향후 일정 안내','당회 보고, 시공 일정 등 앞으로의 진행 계획을 공유합니다.'],
    ],
    scope:[
      ['싱크대 재배치 및 급수 설비','누수 근본 해결 및 조리 동선 최적화','Final Renderings/sinkwall area/sink wall 1.jpg'],
      ['수납 설비 확충 및 카운터탑(상판) 교체','위생 및 내구성 강화를 위한 재시공 및 효율적 선반 배치','Final Renderings/counter top options/final.jpg'],
      ['스토브 교체 및 벽면 패널(SS/FRP) 설치','고화력 버너 도입 및 청소 용이성 향상','Final Renderings/Stove area/stove area.jpg'],
      ['천장 업그레이드','새로운 조명 및 천장 타일로 밝고 위생적인 환경 조성','Final Renderings/ceiling/1.jpg'],
      ['외부 커피 스테이션 구축','정수기 동선 분리 및 운영 효율화','Final Renderings/Entry way area/Coffee Table 1.jpg'],
      ['바닥 타일 교체','전면적인 바닥 노후화 해결 및 환경 개선','Final Renderings/floor option/floor 1.jpg'],
    ],
  },
  en:{
    heroTitle:'Kitchen Renovation\nSession Briefing',
    heroMeta:'Date / March 22, 2026 19:00 (ZOOM)\nPrepared by / Task Force (TF) Team + Management Dept. 3',
    introMessage:`For many years, the Korean Presbyterian Church kitchen has been a central place for fellowship and service. Due to aging facilities, hygiene, safety, and operational efficiency now require urgent improvement.

Over the past two months, Management Dept. 3 and the Kitchen Renovation TF have conducted site surveys, 3D modeling, professional estimate comparisons, and design option reviews.

This briefing shares the process and findings and is prepared to gather valuable feedback from the deacon session.`,
    teamLeftTitle:'TF Team',
    teamRightTitle:'Management Dept. 3',
    teamLeft:[
      ['Deacon Taeho Kim','Leader'],
      ['Deacon Sungbae Ahn','Member'],
      ['Deacon Dasul Jo','Member'],
      ['Deacon Dasol Shim','Member'],
      ['Deacon Doyoung Kim','Member'],
    ],
    teamRight:[
      ['Elder Sungryul Bae','Dept. Elder'],
      ['Deacon Taeho Kim','Director'],
      ['Deacon Doyoung Kim','Deputy Director'],
      ['Deacon Sugyeong Gi','Advisor'],
      ['Deacon Jisook Moon','Advisor'],
      ['Deacon Seongah Yoon','Advisor'],
    ],
    process:[
      ['Site Survey & Current-State Review','On-site measurement and 3D Polycam scans were conducted to identify existing kitchen issues and required improvements.'],
      ['3D Modeling & Design Development','Based on measured data, we built a full 3D model and developed area-based design options with Enscape visuals.'],
      ['Estimate Comparison & Review','We compared proposals from Ford, Pernikoff, Agape Construction, and Morganco.'],
      ['Internal Review & Final Recommendation','The TF and Management Dept. 3 reviewed practicality, cost, and aesthetics to establish a recommended direction.'],
      ['Session Briefing & Feedback Collection','Current stage: introduce the project and collect feedback from the deacon session.'],
      ['Elders Board Report & Budget Approval','Reflect session feedback, report to elders board, and request project budget approval.'],
      ['Contract & Construction Kickoff','Within the approved budget, execute contractor agreement and minimize kitchen downtime during construction.'],
    ],
    purpose:[
      ['Project Overview','Introduce renovation background, scope, and design content by area.'],
      ['Share Design Options & Collect Feedback','Share TF-reviewed options and gather feedback from session members.'],
      ['Next-Step Schedule','Share the upcoming plan, including elders report and construction timeline.'],
    ],
    scope:[
      ['Sink Relocation & Water Supply','Resolve leakage root cause and optimize kitchen workflow','Final Renderings/sinkwall area/sink wall 1.jpg'],
      ['Storage Expansion & Countertop Replacement','Rebuild with stronger hygiene and efficient shelving layout','Final Renderings/counter top options/final.jpg'],
      ['Stove + SS/FRP Wall Panel Work','Upgrade heat output and improve cleanability','Final Renderings/Stove area/stove area.jpg'],
      ['Ceiling Upgrade','Create a bright and hygienic environment with new lighting and ceiling tiles','Final Renderings/ceiling/1.jpg'],
      ['External Coffee Station','Separate drinking traffic from cooking traffic','Final Renderings/Entry way area/Coffee Table 1.jpg'],
      ['Floor Tile Upgrade','Address long-term floor aging and environment quality','Final Renderings/floor option/floor 1.jpg'],
    ],
  }
};
const ESTIMATE_CARDS=[
  {
    key:'1',
    range:'$80,000 - $88,000',
    rangeEn:'LOW END - HIGH END',
    title:{ko:'제1안 (전체 공사, 최선의 안)',en:'Option 1 (Full Scope, Best Outcome)'},
    desc:{ko:'주방 전체 기능을 완벽히 정상화하며, 중복 공사 없이 한 번에 모든 문제를 해결할 수 있습니다.',en:'Restores full kitchen function and solves all key issues in one coordinated project.'},
    items:{ko:'포함: 1·2·3·4·5·6 전체 항목',en:'Includes: all items 1·2·3·4·5·6'},
    map:{ko:'옵션 B 기준: 1·2·3·4·5·6 전체 반영 (바닥 타일 포함)',en:'Option B mapping: include 1·2·3·4·5·6 (floor tile included).'},
    scope:{'1':'in','2':'in','3':'in','4':'in','5':'in','6':'in'},
  },
  {
    key:'2',
    range:'$65,000 - $73,000',
    rangeEn:'LOW END - HIGH END',
    title:{ko:'제2안 (실용 공사, 장기적 경제 안)',en:'Option 2 (Practical Scope, Long-Term Value)'},
    desc:{ko:'추후 공사가 어려운 기초 설비(바닥 타일 포함)를 완결하고, 선택 항목은 예산 확보 시 추가할 수 있습니다.',en:'Completes foundational infrastructure now (including flooring), while optional scope can be added later when budget allows.'},
    items:{ko:'기준: 1·2·4·6 + 선택 조정(3·5)',en:'Base: 1·2·4·6 + adjustable items (3·5)'},
    map:{ko:'옵션 B 기준: 1·2·4·6 반영, 3·5는 보류',en:'Option B mapping: include 1·2·4·6, keep 3·5 deferred.'},
    scope:{'1':'in','2':'in','3':'adj','4':'in','5':'adj','6':'in'},
  },
  {
    key:'3',
    range:'$56,000 - $64,000',
    rangeEn:'LOW END - HIGH END',
    title:{ko:'제3안 (핵심 공사, 최소 예산 안)',en:'Option 3 (Core Scope, Minimum Budget)'},
    desc:{ko:'기초 설비 중 시급한 항목에 집중하고, 타일은 정기 세척 유지 방식으로 공사비 부담을 최소화합니다.',en:'Focuses on urgent foundational work first and minimizes immediate budget burden with maintenance-based flooring strategy.'},
    items:{ko:'기준: 1·2·4 중심 (3·5·6 단계적)',en:'Focus: 1·2·4 first (3·5·6 phased)'},
    map:{ko:'옵션 B 기준: 1·2·4 반영, 3·5·6 단계적',en:'Option B mapping: include 1·2·4, phase 3·5·6 later.'},
    scope:{'1':'in','2':'in','3':'phase','4':'in','5':'phase','6':'phase'},
  },
];
const SCOPE_CATS=[
  {key:'1',label:{ko:'1. 싱크대 재배치 및 급수 설비',en:'1. Sink Relocation & Water Supply'},img:'Final Renderings/sinkwall area/Final A.jpg'},
  {key:'2',label:{ko:'2. 수납 설비 확충 및 카운터탑교체',en:'2. Counter + Cabinet / Countertop'},img:'Final Renderings/counter top options/final.jpg'},
  {key:'3',label:{ko:'3. 가스레인지 교체 및 벽면 패널 설치',en:'3. Stove Replacement & Wall Panels'},img:'Final Renderings/Stove area/stove area.jpg'},
  {key:'4',label:{ko:'4. 천장 업그레이드',en:'4. Ceiling Upgrade'},img:'Final Renderings/ceiling/1.jpg'},
  {key:'5',label:{ko:'5. 외부 커피 스테이션 구축',en:'5. External Coffee Station'},img:'Final Renderings/Entry way area/Coffee Table 1.jpg'},
  {key:'6',label:{ko:'6. 바닥 타일 교체',en:'6. Floor Tile Replacement'},img:'Final Renderings/floor option/floor 1.jpg'},
];
const DESIGN_SECTIONS=[
  {
    key:'sink',
    label:{ko:'1. 싱크대 재배치 및 급수 설비',en:'1. Sink Relocation & Water Supply'},
    desc:{ko:'노후 누수 문제를 근본 해결하고, 냉장고·제빙기·글라스 필러를 효율적으로 재배치합니다.',en:'Resolves chronic leakage and reconfigures sink-wall equipment for better workflow.'},
    images:[
      {src:'Final Renderings/sinkwall area/Final A.jpg',title:{ko:'옵션 A / 캐비넷 도어',en:'Option A / Cabinet Doors'},cap:{ko:'커스텀 스텐 캐비넷(132” WIDE) - $5,000. 문이 있어 내부 물품이 보이지 않아 미관상 깔끔합니다.',en:'Custom stainless cabinet (132” wide) - $5,000. Enclosed doors hide items for a cleaner visual.'}},
      {src:'Final Renderings/sinkwall area/Final B.jpg',title:{ko:'옵션 B / 캐비넷 도어 + 오픈 쉘빙',en:'Option B / Cabinet + Open Shelving'},cap:{ko:'커스텀 스텐 캐비넷(36”) + 오픈 쉘빙 - $2,300. 비용 효율적이며 수납 활용과 건조대 겸용이 가능합니다.',en:'Custom stainless cabinet (36”) + open shelving - $2,300. More economical and practical for quick access.'}},
    ],
  },
  {
    key:'counter',
    label:{ko:'2. 주방 카운터 + 케비넷 교체',en:'2. Counter + Cabinet Replacement'},
    desc:{ko:'카운터탑 상판 재질/톤을 비교할 수 있도록 1개 기준 렌더링 + 4개 색상 렌더링(100/93/86/79% Black)으로 구성했습니다.',en:'Organized as 1 reference rendering + 4 selectable color renderings (100/93/86/79% Black) for countertop comparison.'},
    images:[
      {src:'Final Renderings/counter top options/final.jpg',title:{ko:'기준 렌더링 (카운터 전체)',en:'Reference Rendering (Overall Counter)'},cap:{ko:'카운터 레이아웃과 상판 비교 기준을 보여주는 기준 렌더링입니다.',en:'Reference view used as the baseline for comparing countertop color options.'},refOnly:true},
      {src:'Final Renderings/Counter Top Material Option/100.jpg',title:{ko:'100% Black',en:'100% Black'},cap:{ko:'Caesarstone 511 Smokestone 톤 기준의 가장 진한 상판 옵션입니다.',en:'Darkest countertop option in the Caesarstone 511 Smokestone tone range.'},swatch:'#151515',cropPos:'53% 58%'},
      {src:'Final Renderings/Counter Top Material Option/93%.jpg',title:{ko:'93% Black',en:'93% Black'},cap:{ko:'100% 대비 약간 밝은 톤으로 깊이감을 유지하면서 채도를 완화한 옵션입니다.',en:'Slightly lighter than 100%, keeping depth while softening overall tone.'},swatch:'#2a2a2a',cropPos:'53% 58%'},
      {src:'Final Renderings/Counter Top Material Option/86.jpg',title:{ko:'86% Black',en:'86% Black'},cap:{ko:'중간 톤의 블랙 옵션으로 주변 마감재와의 밸런스를 맞추기 용이합니다.',en:'Mid-dark black option that balances easily with adjacent finishes.'},swatch:'#404040',cropPos:'53% 58%'},
      {src:'Final Renderings/Counter Top Material Option/79.jpg',title:{ko:'79% Black',en:'79% Black'},cap:{ko:'네 가지 중 가장 밝은 톤으로 공간을 보다 가볍게 보이게 하는 옵션입니다.',en:'Lightest of the four options, creating a brighter visual impression.'},swatch:'#6a6a6a',cropPos:'53% 58%'},
    ],
  },
  {
    key:'stove',
    label:{ko:'3. 가스레인지 교체 및 벽면 패널 설치',en:'3. Stove Replacement & Wall Panels'},
    desc:{ko:'가스레인지/오븐을 교체하고 조리 벽면을 SS, 나머지 벽면을 FRP 마감으로 개선합니다.',en:'Upgrades the stove/oven and applies SS behind cooking zones with FRP on white walls.'},
    images:[
      {src:'Final Renderings/Stove area/stove area.jpg',title:{ko:'가스레인지/오븐 교체안',en:'Stove/Oven Upgrade'},cap:{ko:'스토브 교체로 조리 범위를 확장하고, 대형 조리 대응력을 높입니다.',en:'Upgraded cooking line expands menu range and improves throughput.'},refOnly:true},
      {src:'Final Renderings/Stove area/pot filler.jpg',title:{ko:'팟 필러',en:'Pot Filler'},cap:{ko:'스토브 상단 팟 필러(Pot Filler) 구역 렌더링입니다.',en:'Detailed rendering of the pot filler installation over the stove.'},refOnly:true},
      {src:'Final Renderings/Stove area/SS and FRP Panels.jpg',title:{ko:'SS + FRP 벽면 마감',en:'SS + FRP Wall Finish'},cap:{ko:'위 렌더링 범위 외 흰색 벽면도 FRP로 교체하여 전체 유지관리 품질을 통일합니다.',en:'Beyond the shown zone, white wall areas are replaced with FRP for consistent maintenance quality.'},refOnly:true},
    ],
  },
  {
    key:'ceiling_light',
    label:{ko:'4. 천장 조명 업그레이드',en:'4. Ceiling Light Upgrade'},
    desc:{ko:'주방 조도를 높이기 위해 조명 형태(1A 또는 1B)를 선택해 업그레이드합니다.',en:'Upgrades lighting fixtures to brighten the kitchen.'},
    images:[
      {src:'Final Renderings/ceiling/1.jpg',title:{ko:'옵션 1A) 조명 패널 및 반투명 판 교체',en:'Option 1A) Light Panel & Translucent Board'},cap:{ko:'기존 틀에 반투명 판넬을 교체하여 조도를 높이는 안입니다.<br><br><strong>1A : $1200 Add ($300 each panel) (KFS)</strong>',en:'Replaces the existing panels with translucent boards to improve lighting levels.<br><br><strong>1A : $1200 Add ($300 each panel) (KFS)</strong>'}},
      {src:'Final Renderings/ceiling/2.jpg',title:{ko:'옵션 1B) 캔 조명으로 업그레이드',en:'Option 1B) Can Light Upgrade'},cap:{ko:'깔끔한 캔 조명(다이렉트 조명)으로 변경하여 현대적인 느낌을 줍니다.<br><br><strong>1B : Cost is baked into Pernikoff GC Costs</strong>',en:'Changes to modern can lights for a cleaner, direct lighting aesthetic.<br><br><strong>1B : Cost is baked into Pernikoff GC Costs</strong>'}},
    ],
  },
  {
    key:'ceiling_tile',
    hideJump: true,
    label:{ko:'천장 타일 교체 (추가 선택)',en:'Ceiling Tile Replacement (Optional Add-on)'},
    desc:{ko:'빛바랜 기존 주변 천장 타일도 함께 깔끔하게 교체하는 방안입니다. 단독으로 켰다 끌 수 있습니다.',en:'Replaces the surrounding aged ceiling tiles as an additional upgrade. Can be toggled independently.'},
    images:[
      {src:'Final Renderings/ceiling/1.jpg',title:{ko:'옵션 2) 천장 타일 교체',en:'Option 2) Ceiling Tile Replacement'},cap:{ko:'노후된 주변 천장 타일 전체를 새것으로 교체하는 옵션입니다.<br><br><strong>2 : $3000 Add (Pernikoff)</strong>',en:'Replaces the surrounding aged ceiling tiles as an additional upgrade.<br><br><strong>2 : $3000 Add (Pernikoff)</strong>'},color:'red'},
    ],
  },
  {
    key:'coffee',
    label:{ko:'5. 외부 커피 스테이션 구축',en:'5. External Coffee Station'},
    desc:{ko:'정수기 동선을 주방 외부로 분리하여 조리 공간 간섭을 줄이고, 운영 효율과 안전성을 높입니다.',en:'Moves beverage traffic out of the kitchen to reduce workflow conflict and improve safety.'},
    images:[
      {src:'Final Renderings/Entry way area/Coffee Table 1.jpg',title:{ko:'커피 테이블 + 정수기',en:'Coffee Table + Water Dispenser'},cap:{ko:'복도 측 상시 이용 가능한 음용 스테이션으로 운영 부담을 줄입니다.',en:'Hallway beverage station supports self-service and reduces kitchen workload.'},refOnly:true},
      {src:'Final Renderings/Entry way area/Entry Shelving.jpg',title:{ko:'오픈 쉘빙 (키친 입구 왼쪽 벽)',en:'Open Shelving by Entry'},cap:{ko:'입구측 보관 공간을 확장해 주방 내부 혼잡을 줄입니다.',en:'Adds entry-side storage capacity and helps reduce congestion in kitchen work zones.'},refOnly:true},
    ],
  },
  {
    key:'flooring',
    label:{ko:'6. 바닥 타일 교체',en:'6. Floor Tile Replacement'},
    desc:{ko:'전문가 의견상 현 타일 재사용 가능하나, 장기 유지보수와 시공 연계성을 고려한 교체안도 함께 검토합니다.',en:'Current tile may be reusable after cleaning, but replacement is reviewed for long-term maintenance and construction sequencing.'},
    images:[
      {src:'Final Renderings/floor option/floor 2.jpg',title:{ko:'기존 바닥 (Quarry tile, 8in x 8in)',en:'Existing Floor (8in x 8in)'},cap:{ko:'전문 업체의 정기 고압 세척 관리 전제로 유지하는 방안입니다.',en:'Maintenance-first strategy with periodic professional cleaning.'}},
      {src:'Final Renderings/floor option/floor 1.jpg',title:{ko:'바닥 교체 (Quarry tile - Gray, 12in x 12in)',en:'Replacement Floor (12in x 12in)'},cap:{ko:'전체 공사 시점에 함께 교체하여 장기 재시공 비용 리스크를 줄이는 방안입니다.',en:'Replace during full renovation to avoid costly rework later.'}},
    ],
  },
];

// ===== DATA =====
const D = {
  a_gc:[
    {id:'a_plumb',name:'Plumbing',det:'Pot filler waterline, dish wall, wall opening/patching',cost:9660,on:true},
    {id:'a_elec',name:'Electrical (6 LED fixtures)',det:'New LED lay-in fixtures ($300/ea) + connections',cost:2900,on:true},
    {id:'a_install',name:'Equip Install + SS Wall Panel + Trim',det:'20GA SS ~20 LF, hood trim, disconnect/reconnect equip',cost:10280,on:true},
    {id:'a_frp',name:'FRP Furnish & Install',det:'Entire kitchen except SS panel areas',cost:3000,on:true},
  ],
  a_eq:[
    {id:'a_range',name:'Range, 36" 4-Burner',det:'Southbend 4367D, 205K BTU, gas connector + casters',cost:5725,on:true,cust:true,cv:''},
    {id:'a_stockpot',name:'Stock Pot Range x2',det:'Southbend SPR-1J, 120K BTU ea',cost:3250,on:true,cust:true,cv:''},
    {id:'a_potfill',name:'Pot Filler',det:'Krowne 20-101L, wall mount, 72" SS hose',cost:305,on:true},
    {id:'a_fridge',name:'Refrigerator \u2014 True T-49-HC 2-Door',det:'2-section, 49 cu ft, SS, Energy Star',cost:5500,on:true,cust:true,cv:''},
    {id:'a_shelf1',name:'Wire Shelving \u2014 48"W (x4) (inside kitchen)',det:'Centaur C2448C, mobile',cost:292,on:true},
    {id:'a_shelf2',name:'Wire Shelving \u2014 36"W (x4) (inside kitchen)',det:'Centaur C2436C, mobile',cost:260,on:true},
    {id:'a_shelf3',name:'Wire Shelving \u2014 54"W (x8) (entry hallway)',det:'Centaur C2454C, stationary',cost:488,on:true},
    {id:'a_ice',name:'Ice Maker with Bin',det:'Scotsman CU3030SAX-1, cube, 329 lb/24hr, w/filter',cost:4238,on:false},
    {id:'a_glass',name:'Glass Filler Station',det:'T&S B-1230-12, w/filtration',cost:715,on:true},
    {id:'a_sink',name:'Hand-Wash Sink',det:'John Boos PB-DISINK101410',cost:328,on:true},
    {id:'a_wso',name:'Open Shelving \u2014 Above Counter 4\u00d730"W + Above Sink 2\u00d772"W, 2\u00d730"W',det:'Wall-mounted SS shelving, $125 ea (30"W), $252 ea (72"W)',cost:1254,on:true,bv:'low'},
    {id:'a_wsc',name:'Wall Cabinets \u2014 Above Counter 2\u00d7Custom + Above Sink 132" Custom',det:'Custom-built enclosed wall cabinets, $1,200 ea (counter) + $5,200 (sink)',cost:7600,on:true,bv:'high'},
    {id:'a_mw_front',name:'Fixture Millwork \u2014 Front Counter (open shelving) + Corian',det:'Plam base cabs w/drawers + open shelving, solid surface top, shop drawings + install',cost:18618,on:true},
    {id:'a_mw_front_wallcab',name:'Fixture Millwork \u2014 Front Counter: Wall Cab Upgrade',det:'Add wall cabinets in lieu of shelves in kitchen',cost:1100,on:true,bv:'high'},
    {id:'a_mw_front_quartz',name:'Fixture Millwork \u2014 Front Counter: Quartz Upgrade',det:'Quartz top in lieu of Corian solid surface at pass-thru',cost:4945,on:true},
    {id:'a_coffee',name:'Coffee Table',det:'Custom coffee table for hallway station',cost:1500,on:true,cust:true,cv:''},
  ],
  b_gc:[
    {id:'b_base',name:'Pernikoff Base Bid',det:'LED, 7 outlets, water heater, plumbing, demo, tile backsplash, SS panel install, infill door, paint ($1,500)',cost:27814,on:true},
    {id:'b_ceil',name:'Alt #3: Ceiling Tiles',det:'Vinyl rock, 17x22',cost:3000,on:false},
    {id:'b_frp',name:'Alt #5: FRP Instead of Tile (DEDUCT)',cost:-800,on:true},
    {id:'b_pump',name:'Alt #6: Circulation Pump + Valves',det:'Hot water recirculation',cost:3837,on:false},
    {id:'b_coffee_gc',name:'Alt #7: Coffee Machine Install',det:'Water, drain, electrical in hallway',cost:2800,on:false},
    {id:'b_floor1',name:'Alt #1: Kitchen Quarry Tile Floor',det:'Remove existing tile floor/base, install new 8x8 slip-resistant quarry tile + base',cost:9100,on:true},
    {id:'b_floor2',name:'Alt #2: Elevator Lobby Quarry Tile',det:'Remove existing tile floor/base, install new 8x8 slip-resistant quarry tile (approx. 9x8)',cost:3139,on:false},
  ],
  b_eq:[
    {id:'b_ss',name:'SS Wall Panels (Kitchen Mechanical)',det:'Stainless cladding behind hoods/cooking',cost:4860,on:true},
    {id:'b_range_c',name:'Range 36" \u2014 Comstock',det:'4 burners + std oven',cost:4415,on:true,alt:'b_range_s',cust:true,cv:''},
    {id:'b_range_s',name:'Range 36" \u2014 Southbend 4367D (UPGRADE)',det:'205K BTU',cost:5806,on:false,alt:'b_range_c',cust:true,cv:''},
    {id:'b_stock_c',name:'Stock Pot x2 \u2014 Comstock CCSP-1',cost:1643,on:true,alt:'b_stock_s',cust:true,cv:''},
    {id:'b_stock_s',name:'Stock Pot x2 \u2014 Southbend SPR-1J (UPGRADE)',cost:3195,on:false,alt:'b_stock_c',cust:true,cv:''},
    {id:'b_gas',name:'Gas Connector Kits x3',det:'T&S HG-4D-48K',cost:540,on:true},
    {id:'b_pf',name:'Pot Filler',det:'Krowne 16-181L',cost:215,on:true},
    {id:'b_s1',name:'Wire Shelving (Item 1)',det:'Metro, mobile',cost:782,on:true},
    {id:'b_s8',name:'Wire Shelving \u2014 Dry Storage',cost:380,on:true},
    {id:'b_s14',name:'Wire Shelving \u2014 Near Fridge',cost:308,on:true},
    {id:'b_fridge',name:'Refrigerator \u2014 True T-23-HC',det:'1-door, 23 cu ft',cost:4017,on:false,alt:'b_fridge2',cust:true,cv:''},
    {id:'b_fridge2',name:'Refrigerator \u2014 True T-49-HC 2-Door (UPGRADE)',det:'2-section, 49 cu ft',cost:5343,on:true,alt:'b_fridge',cust:true,cv:''},
    {id:'b_pr',name:'Pre-Rinse Faucet (3-comp sink)',det:'T&S B-0133',cost:482,on:true},
    {id:'b_wf',name:'Wall/Splash Faucet (3-comp sink)',det:'T&S B-0231',cost:163,on:true},
    {id:'b_1c',name:'1-Compartment Sink + Faucet',det:'Advance Tabco',cost:877,on:false},
    {id:'b_ice',name:'Ice Maker + Filter',det:'Scotsman UC2724',cost:3474,on:false},
    {id:'b_gf',name:'Glass Filler',det:'T&S B-0712',cost:125,on:true},
    {id:'b_di',name:'Drop-In Sink + Faucet',det:'Advance Tabco DI-1-10',cost:317,on:true},
    {id:'b_wso',name:'Open Shelving \u2014 Above Counter 4\u00d730"W + Above Sink 2\u00d772"W, 2\u00d730"W',det:'Wall-mounted SS shelving, $125 ea (30"W), $252 ea (72"W)',cost:1254,on:false,bv:'low'},
    {id:'b_wsc',name:'Wall Cabinets \u2014 Above Counter 2\u00d7Custom + Above Sink 132" Custom',det:'Custom-built enclosed wall cabinets, $1,200 ea (counter) + $5,200 (sink)',cost:7600,on:true,bv:'high'},
    {id:'b_cb2',name:'Base Counter \u2014 Open Shelving (1 Door, 5 Drawers)',det:'Session fabrication, open shelving config',cost:11593,on:true,bv:'low'},
    {id:'b_cb1',name:'Base Counter \u2014 Cabinets (6 Doors, 5 Drawers)',det:'Session fabrication, full cabinet config',cost:14212,on:true,bv:'high'},
    {id:'b_q2',name:'Quartz Countertop',det:'For cabinet base (by others)',cost:4775,on:true},
    {id:'b_coffee',name:'Coffee Table',det:'Custom coffee table for hallway station',cost:1500,on:true,cust:true,cv:''},
  ],
  c_gc:[
    {id:'c_rm',name:'Kitchen Remodel (base)',det:'Demo, install, permits, paint, GC overhead',cost:40000,on:true,lo:35000,hi:45000},
    {id:'c_ti',name:'Wall Tile (backsplash)',cost:3250,on:true,lo:2500,hi:4000},
    {id:'c_ce',name:'Ceiling Tiles (PVC/wipeable)',cost:3500,on:true,lo:3000,hi:4000},
    {id:'c_li',name:'Lighting (recessed LED)',cost:6500,on:true,lo:6000,hi:7000},
    {id:'c_ss',name:'Wall Cladding (SS)',det:'Behind cooking area',cost:12000,on:true,lo:10000,hi:14000},
    {id:'c_pl',name:'Plumbing',det:'Relocate sinks, pot filler, filtration',cost:21750,on:true,lo:19500,hi:24000},
    {id:'c_fi',name:'Fire Suppression (TBD)',cost:0,on:false},
  ],
  c_ef:[
    {id:'cf_r',name:'Range 36" (Southbend)',cost:5725,on:true,cust:true,cv:''},
    {id:'cf_sp',name:'Stock Pot x2 (Southbend)',cost:3250,on:true,cust:true,cv:''},
    {id:'cf_pf',name:'Pot Filler (Krowne)',cost:305,on:true},
    {id:'cf_fr',name:'Refrigerator (Turbo Air)',cost:4124,on:true,cust:true,cv:''},
    {id:'cf_sh',name:'Wire Shelving (3 sets)',cost:1040,on:true},
    {id:'cf_ic',name:'Ice Maker (Scotsman)',cost:4238,on:false},
    {id:'cf_gl',name:'Glass Filler Station',cost:715,on:true},
    {id:'cf_sk',name:'Drop-In Sink + Faucet',cost:328,on:true},
    {id:'cf_bo',name:'John Boos Semi-Custom SS',det:'Wall cabs + work table + dish cab',cost:15050,on:true},
    {id:'cf_sv',name:'Servco Custom SS \u2014 ALT',cost:44594,on:false},
    {id:'cf_mw',name:'Millwork + Coffee \u2014 ALT',cost:24656,on:false},
    {id:'cf_wso',name:'Open Shelving \u2014 Wall Mounted',det:'4\u00d730"W above counter + 2\u00d772"W, 2\u00d730"W above sink',cost:1254,on:true,bv:'low'},
    {id:'cf_wsc',name:'Wall Cabinets \u2014 Custom Built',det:'2\u00d7custom above counter + 132" custom above sink',cost:7600,on:true,bv:'high'},
    {id:'cf_coffee',name:'Coffee Table',det:'Custom coffee table for hallway station',cost:1500,on:true,cust:true,cv:''},
  ],
  c_es:[
    {id:'cs_r',name:'Range 36" (Comstock)',cost:4415,on:true,cust:true,cv:''},
    {id:'cs_sp',name:'Stock Pot x2 (Comstock)',cost:1643,on:true,cust:true,cv:''},
    {id:'cs_gh',name:'Gas Connector x3',cost:540,on:true},
    {id:'cs_pf',name:'Pot Filler (Krowne)',cost:215,on:true},
    {id:'cs_sh',name:'Wire Shelving (3 sets)',cost:1470,on:true},
    {id:'cs_fr',name:'Refrigerator (True T-23-HC)',cost:4017,on:true,cust:true,cv:''},
    {id:'cs_fc',name:'Sink Faucets (pre-rinse + wall)',cost:645,on:true},
    {id:'cs_1c',name:'1-Comp Sink + Faucet',cost:877,on:false},
    {id:'cs_ic',name:'Ice Maker (Scotsman)',cost:3474,on:false},
    {id:'cs_gl',name:'Glass Filler',cost:125,on:true},
    {id:'cs_sr',name:'Shelving + Pot Rack',cost:2179,on:true},
    {id:'cs_di',name:'Drop-In Sink + Faucet',cost:317,on:true},
    {id:'cs_cf',name:'Custom SS Cabinets (w/SS tops)',cost:30848,on:false,alt:'cs_cb'},
    {id:'cs_cb',name:'Cabinet Bases Only \u2014 ALT',cost:25805,on:false,alt:'cs_cf'},
    {id:'cs_qz',name:'Quartz Countertops \u2014 OPT',cost:11274,on:false},
    {id:'cs_wso',name:'Open Shelving \u2014 Wall Mounted',det:'4\u00d730"W above counter + 2\u00d772"W, 2\u00d730"W above sink',cost:1254,on:true,bv:'low'},
    {id:'cs_wsc',name:'Wall Cabinets \u2014 Custom Built',det:'2\u00d7custom above counter + 132" custom above sink',cost:7600,on:true,bv:'high'},
    {id:'cs_coffee',name:'Coffee Table',det:'Custom coffee table for hallway station',cost:1500,on:true,cust:true,cv:''},
  ],
  d_gc:[
    {id:'d_ba',name:'Morganco Base Proposal',det:'Design (4 mtg + 3D), demo, electrical, plumbing, FRP + SS, QualityBrand cabinetry, Hallmark quartz, backsplash, hardware',cost:68914,on:true},
    {id:'d_pf',name:'Pot Filler (fixture + plumbing)',cost:1600,on:true},
    {id:'d_sc',name:'Upgrade to SS Cabinetry',cost:3300,on:true,bv:'high'},
    {id:'d_os',name:'Open Shelving (SAVINGS)',det:'Save ~$2K-$3K vs closed',cost:-2500,on:false,bv:'low'},
  ],
  d_ef:[
    {id:'df_r',name:'Range 36" (Southbend)',cost:5725,on:true,cust:true,cv:''},
    {id:'df_sp',name:'Stock Pot x2 (Southbend)',cost:3250,on:true,cust:true,cv:''},
    {id:'df_pf',name:'Pot Filler (Krowne)',cost:305,on:true},
    {id:'df_fr',name:'Refrigerator (Turbo Air)',cost:4124,on:true,cust:true,cv:''},
    {id:'df_sh',name:'Wire Shelving',cost:1040,on:true},
    {id:'df_ic',name:'Ice Maker (Scotsman)',cost:4238,on:false},
    {id:'df_gl',name:'Glass Filler',cost:715,on:true},
    {id:'df_sk',name:'Drop-In Sink + Faucet',cost:328,on:true},
    {id:'df_wso',name:'Open Shelving \u2014 Wall Mounted',det:'4\u00d730"W above counter + 2\u00d772"W, 2\u00d730"W above sink',cost:1254,on:true,bv:'low'},
    {id:'df_wsc',name:'Wall Cabinets \u2014 Custom Built',det:'2\u00d7custom above counter + 132" custom above sink',cost:7600,on:true,bv:'high'},
    {id:'df_coffee',name:'Coffee Table',det:'Custom coffee table for hallway station',cost:1500,on:true,cust:true,cv:''},
  ],
  d_es:[
    {id:'ds_r',name:'Range 36" (Comstock)',cost:4415,on:true,cust:true,cv:''},
    {id:'ds_sp',name:'Stock Pot x2 (Comstock)',cost:1643,on:true,cust:true,cv:''},
    {id:'ds_gh',name:'Gas Connector x3',cost:540,on:true},
    {id:'ds_pf',name:'Pot Filler (Krowne)',cost:215,on:true},
    {id:'ds_sh',name:'Wire Shelving (3 sets)',cost:1470,on:true},
    {id:'ds_fr',name:'Refrigerator (True T-23-HC)',cost:4017,on:true,cust:true,cv:''},
    {id:'ds_fc',name:'Sink Faucets',cost:645,on:true},
    {id:'ds_1c',name:'1-Comp Sink + Faucet',cost:877,on:true},
    {id:'ds_ic',name:'Ice Maker (Scotsman)',cost:3474,on:false},
    {id:'ds_gl',name:'Glass Filler',cost:125,on:true},
    {id:'ds_sr',name:'Shelving + Pot Rack',cost:2179,on:false},
    {id:'ds_di',name:'Drop-In Sink + Faucet',cost:317,on:true},
    {id:'ds_wso',name:'Open Shelving \u2014 Wall Mounted',det:'4\u00d730"W above counter + 2\u00d772"W, 2\u00d730"W above sink',cost:1254,on:true,bv:'low'},
    {id:'ds_wsc',name:'Wall Cabinets \u2014 Custom Built',det:'2\u00d7custom above counter + 132" custom above sink',cost:7600,on:true,bv:'high'},
    {id:'ds_coffee',name:'Coffee Table',det:'Custom coffee table for hallway station',cost:1500,on:true,cust:true,cv:''},
  ],
};
const RAW_ON={};
Object.keys(D).forEach(k=>{D[k].forEach(i=>{RAW_ON[i.id]=i.on;});});
const B_SCOPE={
  cook:['b_range_c','b_range_s','b_stock_c','b_stock_s','b_gas'],
  coffee:['b_coffee_gc','b_coffee'],
  floor:['b_floor1','b_floor2'],
};
