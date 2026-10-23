(()=>{'use strict';
function init(){
 const input=document.getElementById('v47-news-query'), clear=document.getElementById('v47-news-clear'), count=document.getElementById('v47-news-count'), empty=document.getElementById('v47-news-empty');
 if(!input||!count)return;
 const cards=Array.from(document.querySelectorAll('.journal-content .v46-news-card'));
 const normalize=s=>(s||'').normalize('NFKD').toLocaleLowerCase().replace(/\s+/g,' ').trim();
 function update(){
  const q=normalize(input.value);let shown=0;
  for(const card of cards){const match=!q||normalize(card.textContent).includes(q);card.hidden=!match;if(match)shown++;}
  const lang=(()=>{try{return localStorage.getItem('billion-global-language-v36')||'en'}catch(_){return 'en'}})();count.textContent=String(shown).padStart(2,'0')+' '+(lang==='zh'?'篇报道':lang==='ms'?'BERITA':shown===1?'STORY':'STORIES');
  if(empty)empty.hidden=shown!==0;
  if(clear)clear.hidden=!input.value;
 }
 input.addEventListener('input',update);
 clear?.addEventListener('click',()=>{input.value='';update();input.focus()});
 update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
