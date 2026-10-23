/* V53: published, locally generated translations. No paid API calls. */
(()=>{'use strict';
const langs={en:'en',ms:'ms',zh:'zh'};
let original={}, translated={}, current='en', running=false;
function language(){let v=document.documentElement.lang||localStorage.getItem('billion-global-language-v36')||'en';return v.startsWith('zh')?'zh':v.startsWith('ms')?'ms':'en'}
function apply(){if(running)return;running=true;try{current=language();document.querySelectorAll('[data-v53-id]').forEach(el=>{if(el.closest('[contenteditable="true"]')||el.isContentEditable)return;const key=el.dataset.v53Id;if(!Object.prototype.hasOwnProperty.call(original,key))original[key]=el.textContent;const value=current==='en'?original[key]:translated[key];if(typeof value==='string'&&value.trim()&&el.textContent!==value){el.textContent=value;}})}finally{running=false}}
async function load(lang){if(lang==='en'){translated={};apply();return}try{const res=await fetch('translations/'+lang+'.json',{cache:'no-cache'});if(!res.ok)throw Error('Missing catalog');translated=await res.json();apply()}catch(e){translated={};apply();console.warn('V53 translation catalog unavailable',e)}}
let request=0;function update(){const lang=language();if(lang!==current){const n=++request;load(lang).then(()=>{if(n!==request)return;apply()})}else apply()}
function init(){document.querySelectorAll('[data-v53-id]').forEach(el=>original[el.dataset.v53Id]=el.textContent);current=language();load(current);document.addEventListener('billion:language',()=>setTimeout(update,0));new MutationObserver(()=>{if(!running)queueMicrotask(update)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
