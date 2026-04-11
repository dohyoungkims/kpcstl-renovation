#!/usr/bin/env node
const http=require('http');
const fs=require('fs');
const path=require('path');

const ROOT=__dirname;
const PORT=Number(process.env.PORT||process.argv[2]||4180);
const DATA_DIR=path.join(ROOT,'data');
const NOTES_FILE=path.join(DATA_DIR,'meeting-notes.json');

const DEFAULT_NOTES={
  supplier:{
    agenda:[
      {id:'supplier_ag_1',text:'Kickoff schedule and recurring meeting cadence',done:false},
      {id:'supplier_ag_2',text:'Full scope confirmation: required vs optional supplier scope',done:false},
      {id:'supplier_ag_3',text:'Milestone timeline: submittals, approvals, fabrication, delivery',done:false},
      {id:'supplier_ag_4',text:'Highest lead-time items: custom cabinets, quartz/countertop, specialty stainless',done:false},
      {id:'supplier_ag_5',text:'Equipment spec lock and alternates (value engineering options)',done:false},
      {id:'supplier_ag_6',text:'Delivery windows, site access rules, and staging requirements',done:false},
      {id:'supplier_ag_7',text:'Warranty, startup support, and post-install service contacts',done:false},
    ],
    suggested:[
      'Shop drawing turnaround SLAs and decision owner',
      'Long-lead purchase release trigger and deposit timing',
      'Damage/replacement protocol for delivered items',
      'Final punch-list response timeline',
    ],
    notes:[],
  },
  construction:{
    agenda:[
      {id:'construction_ag_1',text:'Kickoff schedule with phase gates and target completion date',done:false},
      {id:'construction_ag_2',text:'Full scope walk-through and written exclusions',done:false},
      {id:'construction_ag_3',text:'Milestone timeline: demo, rough-in, inspections, finishes, handoff',done:false},
      {id:'construction_ag_4',text:'Highest lead-time dependencies affecting construction sequence',done:false},
      {id:'construction_ag_5',text:'Permit and inspection path (including required submissions)',done:false},
      {id:'construction_ag_6',text:'Kitchen downtime plan and temporary operation strategy',done:false},
      {id:'construction_ag_7',text:'Change-order process, approval authority, and communication cadence',done:false},
    ],
    suggested:[
      'Utility shutoff windows and congregation impact notices',
      'Daily/weekly reporting format with owner and due date',
      'Site safety, dust/noise containment, and cleanup standards',
      'Contingency draw rules and budget variance threshold',
    ],
    notes:[],
  },
  updatedAt:'',
};

const MIME={
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.gif':'image/gif',
  '.svg':'image/svg+xml',
  '.webp':'image/webp',
  '.pdf':'application/pdf',
  '.txt':'text/plain; charset=utf-8',
  '.ico':'image/x-icon',
};

function ensureDataFile(){
  if(!fs.existsSync(DATA_DIR))fs.mkdirSync(DATA_DIR,{recursive:true});
  if(!fs.existsSync(NOTES_FILE))fs.writeFileSync(NOTES_FILE,JSON.stringify(DEFAULT_NOTES,null,2));
}

function normalizePayload(raw){
  const src=(raw&&typeof raw==='object')?raw:{};
  const out=JSON.parse(JSON.stringify(DEFAULT_NOTES));
  ['supplier','construction'].forEach(team=>{
    const inTeam=(src[team]&&typeof src[team]==='object')?src[team]:{};
    if(Array.isArray(inTeam.agenda)&&inTeam.agenda.length){
      out[team].agenda=inTeam.agenda.map((it,idx)=>{
        if(typeof it==='string')return {id:`${team}_ag_custom_${idx+1}`,text:it,done:false};
        return {
          id:String(it&&it.id?it.id:`${team}_ag_custom_${idx+1}`),
          text:String(it&&it.text?it.text:'').trim(),
          done:!!(it&&it.done),
        };
      }).filter(it=>it.text);
    }
    if(Array.isArray(inTeam.suggested)&&inTeam.suggested.length){
      out[team].suggested=inTeam.suggested.map(x=>String(x||'').trim()).filter(Boolean);
    }
    if(Array.isArray(inTeam.notes)&&inTeam.notes.length){
      out[team].notes=inTeam.notes.map((it,idx)=>{
        if(typeof it==='string')return {id:`${team}_note_${idx+1}`,text:it,ts:''};
        return {
          id:String(it&&it.id?it.id:`${team}_note_${idx+1}`),
          text:String(it&&it.text?it.text:'').trim(),
          ts:String(it&&it.ts?it.ts:''),
        };
      }).filter(it=>it.text);
    }
  });
  out.updatedAt=String(src.updatedAt||new Date().toISOString());
  return out;
}

function readNotes(){
  ensureDataFile();
  try{
    const raw=JSON.parse(fs.readFileSync(NOTES_FILE,'utf8'));
    return normalizePayload(raw);
  }catch(_){
    return normalizePayload(DEFAULT_NOTES);
  }
}

function writeNotes(payload){
  ensureDataFile();
  const data=normalizePayload(payload);
  const tmp=`${NOTES_FILE}.tmp`;
  fs.writeFileSync(tmp,JSON.stringify(data,null,2));
  fs.renameSync(tmp,NOTES_FILE);
  return data;
}

function sendJson(res,status,obj){
  const body=JSON.stringify(obj);
  res.writeHead(status,{
    'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers':'Content-Type',
    'Cache-Control':'no-store',
  });
  res.end(body);
}

function serveStatic(req,res){
  let reqPath='/';
  try{
    reqPath=decodeURIComponent(new URL(req.url,`http://${req.headers.host||'localhost'}`).pathname||'/');
  }catch(_){}
  if(reqPath==='/Deploy')reqPath='/';
  if(reqPath.startsWith('/Deploy/'))reqPath=reqPath.slice('/Deploy'.length);
  if(reqPath==='/')reqPath='/index.html';
  const safePath=path.normalize(path.join(ROOT,reqPath));
  if(!safePath.startsWith(ROOT)){
    res.writeHead(403,{'Content-Type':'text/plain; charset=utf-8'});
    res.end('Forbidden');
    return;
  }
  let filePath=safePath;
  if(fs.existsSync(filePath)&&fs.statSync(filePath).isDirectory()){
    filePath=path.join(filePath,'index.html');
  }
  if(!fs.existsSync(filePath)){
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});
    res.end('Not Found');
    return;
  }
  const ext=path.extname(filePath).toLowerCase();
  const type=MIME[ext]||'application/octet-stream';
  res.writeHead(200,{'Content-Type':type});
  fs.createReadStream(filePath).pipe(res);
}

const server=http.createServer((req,res)=>{
  let pathname='/';
  try{
    pathname=new URL(req.url,`http://${req.headers.host||'localhost'}`).pathname;
  }catch(_){}
  if(pathname==='/api/meeting-notes'||pathname==='/Deploy/api/meeting-notes'){
    if(req.method==='OPTIONS'){
      sendJson(res,200,{ok:true});
      return;
    }
    if(req.method==='GET'){
      const data=readNotes();
      sendJson(res,200,{ok:true,data});
      return;
    }
    if(req.method==='POST'){
      let body='';
      req.on('data',chunk=>{
        body+=chunk;
        if(body.length>1024*1024){
          req.destroy();
        }
      });
      req.on('end',()=>{
        try{
          const parsed=body?JSON.parse(body):{};
          const data=writeNotes(parsed);
          sendJson(res,200,{ok:true,data});
        }catch(e){
          sendJson(res,400,{ok:false,error:'Invalid JSON payload'});
        }
      });
      return;
    }
    sendJson(res,405,{ok:false,error:'Method Not Allowed'});
    return;
  }
  serveStatic(req,res);
});

server.listen(PORT,()=>{
  console.log(`KPC app server running on http://127.0.0.1:${PORT}`);
  console.log('Shared meeting notes endpoint: /api/meeting-notes');
});
