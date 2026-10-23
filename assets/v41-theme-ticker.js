(()=>{'use strict';
const THEME_KEY='billion-theme-v41';
const lines={
 en:['FRESH CHOICES','GREAT VALUE','TRUSTED BY FAMILIES','QUALITY EVERY DAY'],
 ms:['PILIHAN SEGAR','HARGA BERBALOI','DIPERCAYAI KELUARGA','KUALITI SETIAP HARI'],
 zh:['新鲜好选择','超值好价格','家庭都信赖','天天好品质']
};
const storageLang=()=>{try{return localStorage.getItem('billion-global-language-v36')||'en'}catch(_){return 'en'}};
function updateTicker(lang){updateInnerTicker(lang);const values=lines[lang]||lines.en;document.querySelectorAll('.values-marquee .values-track > span').forEach(span=>{
 const nodes=Array.from(span.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE);
 // Keep the decorative stars, the four translated messages and animation intact.
 for(let i=0;i<Math.min(nodes.length,4);i++)nodes[i].textContent=' '+values[i]+' ';
});}
function updateInnerTicker(lang){
 const values=lines[lang]||lines.en;
 document.querySelectorAll('.inner-marquee-track').forEach(track=>{
  const separator='   ';
  const pattern=['✳ '+values[0],'✦ '+values[1],'✳ '+values[2],'✦ '+values[3]].join('   ');
  track.textContent=(pattern+separator).repeat(5);
 });
}
function setTheme(value){const theme=value==='dark'?'dark':'light';document.documentElement.dataset.billionTheme=theme;
 const button=document.querySelector('.v41-theme-toggle');if(button){button.setAttribute('aria-pressed',String(theme==='dark'));button.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');button.title=theme==='dark'?'Light mode':'Dark mode';button.innerHTML=theme==='dark'?'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6m-5 3h4M9 14c-1.8-1.1-3-2.8-3-5a6 6 0 1 1 12 0c0 2.2-1.2 3.9-3 5-.7.6-1 1.3-1 2H10c0-.7-.3-1.4-1-2Z"/></svg>';}
 try{localStorage.setItem(THEME_KEY,theme)}catch(_){}
}
function init(){const header=document.querySelector('.head-tools');if(header&&!header.querySelector('.v41-theme-toggle')){
 const b=document.createElement('button');b.type='button';b.className='v41-theme-toggle';b.setAttribute('data-no-translate','');
 b.addEventListener('click',()=>setTheme(document.documentElement.dataset.billionTheme==='dark'?'light':'dark'));
 const lang=header.querySelector('.v36-lang');if(lang)lang.insertAdjacentElement('afterend',b);else header.append(b);
 }
 let saved='light';try{saved=localStorage.getItem(THEME_KEY)||'light'}catch(_){}setTheme(saved);updateTicker(storageLang());
 document.addEventListener('billion:language',e=>updateTicker(e.detail?.lang||storageLang()));
 document.addEventListener('billion:v38-language',e=>updateTicker(e.detail?.lang||storageLang()));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();