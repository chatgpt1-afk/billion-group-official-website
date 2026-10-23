(()=>{'use strict';
const LANGS=['en','ms','zh'];const STORAGE='billion-global-language-v36';
const translations=window.BILLION_TRANSLATIONS_V36||{};
const original=new WeakMap();const lastRendered=new WeakMap();
// Resolve translations back to their English source even when legacy scripts
// or a prior language switch have already replaced the visible node.
const reverse=new Map();
for(const entries of Object.values(translations))for(const [english,localized] of Object.entries(entries)){
 const key=String(localized).trim().replace(/\s+/g,' ');
 if(key&&!reverse.has(key))reverse.set(key,english);
}
const canonical=(s)=>reverse.get(String(s).trim().replace(/\s+/g,' '))||s;
const translateText=(text,lang)=>{const key=canonical(text.trim().replace(/\s+/g,' '));return (translations[lang]||{})[key]||null};
let language='en';let busy=false;
function textNodes(root){const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){if(!n.textContent.trim())return NodeFilter.FILTER_REJECT;const e=n.parentElement;if(!e||e.closest('script,style,noscript,svg,textarea,option,[contenteditable],.v36-tools,[data-no-translate],#billion-editor,#billion-editor-panel'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});const a=[];while(walk.nextNode())a.push(walk.currentNode);return a}
function translate(root=document.body){if(busy||!root)return;busy=true;try{textNodes(root).forEach(n=>{if(!original.has(n)||lastRendered.has(n)&&n.textContent!==lastRendered.get(n))original.set(n,canonical(n.textContent));const raw=original.get(n);const trans=translateText(raw,language);const ws=raw.match(/^\s*/)[0],we=raw.match(/\s*$/)[0];const next=language==='en'||!trans?raw:ws+trans+we;lastRendered.set(n,next);if(n.textContent!==next)n.textContent=next})}finally{busy=false}}

const attrOriginal=new WeakMap();
function translateAttributes(){
 document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{
  if(el.closest('.v36-tools,[data-no-translate],#billion-editor,#billion-editor-panel'))return;
  ['placeholder','title','aria-label'].forEach(attr=>{if(!el.hasAttribute(attr))return;
   let cache=attrOriginal.get(el);if(!cache){cache={};attrOriginal.set(el,cache)}
   if(!(attr in cache))cache[attr]=canonical(el.getAttribute(attr));
   const originalValue=cache[attr];const t=translateText(originalValue,language);
   el.setAttribute(attr,language==='en'||!t?originalValue:t);
  });
 });
}
function setLang(lang){language=LANGS.includes(lang)?lang:'en';try{localStorage.setItem(STORAGE,language)}catch(_){}document.documentElement.lang=language==='zh'?'zh-Hans':language;document.querySelectorAll('[data-v36-lang]').forEach(e=>e.value=language);translate();translateAttributes();document.dispatchEvent(new CustomEvent('billion:v38-language',{detail:{lang:language}}));document.dispatchEvent(new CustomEvent('billion:language',{detail:{lang:language}}))}
function init(){let saved='en';try{saved=localStorage.getItem(STORAGE)||'en'}catch(_){};const tools=document.createElement('div');tools.className='v36-tools';tools.setAttribute('data-no-translate','');tools.innerHTML='<button class="v36-top" aria-label="Back to top" title="Back to top" type="button">↑</button>';const langControl=document.createElement('label');langControl.className='v36-lang';langControl.setAttribute('aria-label','Website language');langControl.innerHTML='<svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/></svg><select data-v36-lang aria-label="Select language"><option value="en">EN</option><option value="ms">BM</option><option value="zh">中文</option></select>';const headerTools=document.querySelector('.head-tools');if(headerTools){headerTools.append(langControl)}else{langControl.classList.add('v36-fallback');tools.prepend(langControl)};document.body.append(tools);
 langControl.querySelector('select').addEventListener('change',e=>setLang(e.target.value));tools.querySelector('button').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 const top=tools.querySelector('.v36-top');const scroll=()=>top.classList.toggle('v36-visible',window.scrollY>240);window.addEventListener('scroll',scroll,{passive:true});scroll();
 // Hide the old decorative EN pill; only one language switcher across the site.
 document.querySelectorAll('.head-tools .lang-pill').forEach(e=>e.style.display='none');
 const oldSelect=document.getElementById('language');if(oldSelect){oldSelect.closest('.language-switch,.language-select')?.setAttribute('hidden','');oldSelect.style.display='none';oldSelect.addEventListener('change',e=>{if(e.isTrusted)setLang(e.target.value)})}
 setLang(saved);
 // Some sections (hero, timeline, editor) update content dynamically; translate newly inserted text.
 const observer=new MutationObserver(records=>{if(busy||language==='en')return;let needed=false;for(const r of records){if(r.target.closest?.('.v36-tools'))continue;if(r.type==='characterData'){if(r.target.textContent===lastRendered.get(r.target))continue;original.set(r.target,canonical(r.target.textContent));needed=true}else if(r.addedNodes.length){needed=true}}if(needed){translate();translateAttributes()}});observer.observe(document.body,{subtree:true,childList:true,characterData:true});
 // When editor panel opens, keep floating tools clear of its sidebar.
 const editorObserver=new MutationObserver(()=>{const p=document.querySelector('.v28-panel.open,.v28-editor-panel.open,.v28-panel.is-open');document.body.classList.toggle('v36-editor-open',!!p)});editorObserver.observe(document.body,{attributes:true,childList:true,subtree:false});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();