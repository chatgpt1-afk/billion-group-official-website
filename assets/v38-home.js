(()=>{'use strict';
const content={
 en:[{lines:['Fresh','Everyday',''],desc:'Bringing quality products, great value and happier moments to every Malaysian community.'},{lines:['Save','More',''],desc:'Discover promotions and everyday savings.'},{lines:['Near','You',''],desc:'Find a Billion outlet near your community.'},{lines:['Grow','Together',''],desc:'Discover opportunities to grow with our team.'}],
 ms:[{lines:['Segar','Setiap Hari',''],desc:'Membawa produk berkualiti, harga berbaloi dan kegembiraan kepada setiap komuniti di Malaysia.'},{lines:['Lebih','Jimat',''],desc:'Nikmati promosi dan penjimatan setiap hari.'},{lines:['Dekat','Anda',''],desc:'Cari cawangan Billion berdekatan komuniti anda.'},{lines:['Maju','Bersama',''],desc:'Terokai peluang kerjaya bersama pasukan kami.'}],
 zh:[{lines:['天天','新鲜',''],desc:'为马来西亚每个社区带来优质商品、实惠价格和更多欢乐。'},{lines:['省钱','更多',''],desc:'发现最新优惠，天天享实惠。'},{lines:['就在','身边',''],desc:'寻找你附近的 Billion 门店。'},{lines:['一起','成长',''],desc:'探索机会，和我们的团队一起成长。'}]
};
const intro={en:'Bringing quality products, great value and happier moments to every Malaysian community.',ms:'Membawa produk berkualiti, harga berbaloi dan kegembiraan kepada setiap komuniti di Malaysia.',zh:'为马来西亚每个社区带来优质商品、实惠价格和更多欢乐。'};
const introOriginal='Bringing quality products, great value and happier moments to every Malaysian community.';
let active=0;
function language(){try{return localStorage.getItem('billion-global-language-v36')||'en'}catch(e){return 'en'}}
function render(){const lang=content[language()]?language():'en';const slide=content[lang][active];['hero-line1','hero-line2','hero-line3'].forEach((id,j)=>{const el=document.getElementById(id);if(el)el.textContent=slide.lines[j]});const desc=document.getElementById('hero-description');if(desc)desc.textContent=slide.desc;const introEl=document.querySelector('[data-v38-intro]');if(introEl)introEl.textContent=intro[lang]}
document.addEventListener('billion:hero-slide',e=>{active=e.detail.index;render()});document.addEventListener('billion:v38-language',render);document.addEventListener('DOMContentLoaded',()=>{const introEl=document.querySelector('.community-aside p');if(introEl&&introEl.textContent.trim().replace(/\s+/g,' ')===introOriginal)introEl.setAttribute('data-v38-intro','');render()});
})();