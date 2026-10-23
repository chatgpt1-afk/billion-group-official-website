(()=>{'use strict';
const translations={
 'DISCOVER OUR STORY':{en:'DISCOVER OUR STORY',ms:'KENALI KISAH KAMI',zh:'探索我们的故事'},
 'MORE THAN A SUPERMARKET':{en:'MORE THAN A SUPERMARKET',ms:'LEBIH DARIPADA PASAR RAYA',zh:'不止是超市'},
 'OUR JOURNEY':{en:'OUR JOURNEY',ms:'PERJALANAN KAMI',zh:'我们的历程'},
 'HOME':{en:'HOME',ms:'UTAMA',zh:'首页'},
 'ABOUT':{en:'ABOUT',ms:'TENTANG KAMI',zh:'关于我们'},
 'NEWS & PROMOTIONS':{en:'NEWS & PROMOTIONS',ms:'BERITA & PROMOSI',zh:'新闻与促销'},
 'OUTLETS':{en:'OUTLETS',ms:'CAWANGAN',zh:'门店'},
 'JOIN US':{en:'JOIN US',ms:'SERTAI KAMI',zh:'加入我们'},
 'CONTACT':{en:'CONTACT',ms:'HUBUNGI KAMI',zh:'联系我们'}
};
const selectors={
 'DISCOVER OUR STORY':['#story-label'],
 'MORE THAN A SUPERMARKET':['.community .eyebrow'],
 'OUR JOURNEY':['.journey-link'],
 'HOME':['.main-nav [data-nav="home"]'],
 'ABOUT':['.main-nav [data-nav="about"] .nav-parent'],
 'NEWS & PROMOTIONS':['.main-nav [data-nav="news"] .nav-parent'],
 'OUTLETS':['.main-nav [data-nav="outlets"]'],
 'JOIN US':['.main-nav [data-nav="join"] .nav-parent'],
 'CONTACT':['.main-nav [data-nav="contact"]']
};
const lang=()=>{try{return localStorage.getItem('billion-global-language-v36')||'en'}catch(_){return 'en'}};
function update(){const selected=lang();for(const [key,paths] of Object.entries(selectors))for(const selector of paths)document.querySelectorAll(selector).forEach(el=>{
 const value=(translations[key]||{})[selected]||key;
 // Journey link has a decorative arrow; preserve it rather than overwriting children.
 if(el.classList.contains('journey-link')){
   [...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).forEach(n=>n.textContent=' '+value);
 }else el.textContent=value;
});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',update);else update();
document.addEventListener('billion:language',update);
})();
