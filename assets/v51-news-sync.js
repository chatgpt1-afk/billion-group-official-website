(()=>{'use strict';
const file=location.pathname.split('/').pop()||'index.html';
const links={'news-segamat.html':0,'news-utar-scholarship.html':1,'news-malacca.html':2};
const store='billion-news-shared-v51';
function get(){try{return JSON.parse(localStorage.getItem(store)||'{}')}catch{return {}}}
function selectors(){return [...document.querySelectorAll('.journal-content .v46-news-card')]}
function extract(){const saved=JSON.parse(localStorage.getItem('billion-v25:news.html')||'{}');const cards=selectors();const result={};for(const [i,card] of cards.entries()){
const link=card.getAttribute('href');result[link]={};for(const [kind,el] of [['title',card.querySelector('h2')],['detail',card.querySelector('.journal-feature-text p')]]){
if(!el)continue;const key=Object.keys(saved).find(k=>{try{return document.querySelector(k)===el}catch{return false}});
if(key&&saved[key]&&typeof saved[key].text==='string')result[link][kind]=saved[key].text;
}}return result}
function sync(){if(file!=='news.html')return;const prior=get(),next=extract();for(const [k,v] of Object.entries(next)){prior[k]={...(prior[k]||{}),...v}}try{localStorage.setItem(store,JSON.stringify(prior))}catch{}}
function apply(){const info=get()[file];if(!info)return;
const heading=document.querySelector('.journal-article-top h1');
if(heading&&info.title){heading.textContent=info.title;heading.dataset.v50EditorOverride='1'}
const lead=document.querySelector('.journal-article-body p');
if(lead&&info.detail){lead.textContent=info.detail;lead.dataset.v50EditorOverride='1'}
}
function init(){if(file==='news.html'){
// Capture only the user's explicit editor Save, not intermediate editing.
document.getElementById('be-save')?.addEventListener('click',()=>setTimeout(sync,0));
// The editor is initialized only when ?edit=1; sync on normal visits too.
sync();
}else if(file in links){apply();document.addEventListener('billion:language',()=>setTimeout(apply,0));}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();