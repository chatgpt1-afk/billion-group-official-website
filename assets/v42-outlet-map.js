(()=>{'use strict';
const I18N={
 en:{eyebrow:'EXPLORE OUR LOCATIONS',title:'Find a Billion outlet',intro:'Choose a state, then select a Billion marker to see the outlet details.',all:'All states',load:'Load outlet CSV',states:'States & mapped outlets',disclaimer:'Starter pins show approximate town centres, not verified store entrances. Exact addresses and opening hours have not been supplied. State totals count loaded records only, not all 56 company outlets.',help:'Scroll over the map to zoom · Pinch to zoom on mobile',import:'How to add the full outlet directory',importdesc:'Import a UTF-8 CSV with columns: code, name, state, latitude, longitude, address, hours, image. This import is local to your browser, not published to visitors. Use verified coordinates and hours before publishing a complete directory.',template:'Download CSV template',unknown:'Not yet verified',approx:'Approximate town-centre pin',maps:'Open in Google Maps',mapped:'mapped',loading:'Loading map…',select:'Select an outlet marker to see details',photo:'Photo not yet provided',unavailable:'Map requires an internet connection to load Leaflet and map tiles.'},
 ms:{eyebrow:'TEROKAI LOKASI KAMI',title:'Cari cawangan Billion',intro:'Pilih negeri, kemudian pilih penanda Billion untuk melihat maklumat cawangan.',all:'Semua negeri',load:'Muat naik CSV cawangan',states:'Negeri & cawangan dipetakan',disclaimer:'Penanda contoh menunjukkan anggaran pusat bandar, bukan pintu masuk kedai yang disahkan. Alamat tepat dan waktu operasi belum dibekalkan. Jumlah mengikut negeri hanya berdasarkan rekod yang dimuatkan, bukan kesemua 56 cawangan.',help:'Tatal pada peta untuk zum · Cubit untuk zum pada telefon',import:'Cara menambah senarai penuh cawangan',importdesc:'Import CSV UTF-8 dengan lajur: code, name, state, latitude, longitude, address, hours, image. Import ini hanya pada pelayar anda dan tidak diterbitkan kepada pelawat. Gunakan koordinat dan waktu operasi yang disahkan.',template:'Muat turun templat CSV',unknown:'Belum disahkan',approx:'Penanda anggaran pusat bandar',maps:'Buka dalam Google Maps',mapped:'dipetakan',loading:'Memuatkan peta…',select:'Pilih penanda cawangan untuk melihat maklumat',photo:'Foto belum disediakan',unavailable:'Peta memerlukan sambungan internet untuk memuatkan Leaflet dan jubin peta.'},
 zh:{eyebrow:'探索门店位置',title:'寻找 Billion 门店',intro:'先选择州属，再点击 Billion 标记查看门店资料。',all:'全部州属',load:'导入门店 CSV',states:'州属及已录入门店',disclaimer:'初始标记仅代表城镇中心的近似位置，并非已核实的门店入口。准确地址与营业时间尚未提供。各州数量仅统计已录入记录，并非全部 56 家门店。',help:'滑鼠停在地图上滚动可缩放 · 手机双指缩放',import:'如何加入完整门店名单',importdesc:'导入 UTF-8 CSV，栏位：code, name, state, latitude, longitude, address, hours, image。导入仅在当前浏览器生效，不会自动发布给访客。正式发布前请核实坐标及营业时间。',template:'下载 CSV 模板',unknown:'尚未核实',approx:'城镇中心近似标记',maps:'在 Google Maps 打开',mapped:'已录入',loading:'正在加载地图…',select:'点击门店标记查看资料',photo:'尚未提供照片',unavailable:'地图需要网络连接以加载 Leaflet 和地图图层。'}
};
const STATES=[
 ['Johor',1.49,103.76],['Kedah',6.12,100.37],['Kelantan',6.12,102.24],['Melaka',2.19,102.25],['Negeri Sembilan',2.72,101.94],['Pahang',3.81,103.33],['Perak',4.6,101.09],['Perlis',6.44,100.2],['Pulau Pinang',5.41,100.33],['Selangor',3.07,101.52],['Terengganu',5.33,103.14],['Sabah',5.98,116.07],['Sarawak',1.55,110.35]
];
// Initial examples are explicitly APPROXIMATE town centres, not confirmed outlet locations.
let outlets=[
 {code:'BLBB',name:'Billion Bangi',state:'Selangor',lat:2.959,lon:101.757,approx:true},
 {code:'BSMY',name:'Billion Semenyih',state:'Selangor',lat:2.951,lon:101.843,approx:true},
 {code:'BLPK',name:'Billion Port Klang',state:'Selangor',lat:3.001,lon:101.392,approx:true},
 {code:'BLPD',name:'Billion Port Dickson',state:'Negeri Sembilan',lat:2.522,lon:101.797,approx:true}
];
const lang=()=>{try{return localStorage.getItem('billion-global-language-v36')||'en'}catch(_){return 'en'}};
const t=k=>(I18N[lang()]||I18N.en)[k]||k;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let map, layer, selectedState=null, selectedOutlet=null;
const markers=[];
const logo='assets/images/billion-official-logo.png';
const iconHtml='<div class="outlet-logo-pin"><img alt="" src="'+logo+'"/></div>';
function count(state){return outlets.filter(o=>o.state===state).length}
function stateList(){const target=document.getElementById('outlet-state-list');target.innerHTML='';STATES.forEach(([state])=>{
 const button=document.createElement('button');button.type='button';button.className='outlet-state-button'+(selectedState===state?' is-active':'');button.innerHTML='<span>'+esc(state)+'</span><b>'+count(state)+'</b>';button.addEventListener('click',()=>selectState(state));target.append(button);
});document.getElementById('mapped-total').textContent=outlets.length+' '+t('mapped')}
function selectState(state){selectedState=state;selectedOutlet=null;stateList();renderMarkers();const points=outlets.filter(o=>o.state===state);
 if(points.length&&map){const bounds=L.latLngBounds(points.map(o=>[o.lat,o.lon]));map.fitBounds(bounds.pad(.65),{maxZoom:12,animate:true})}
 else if(map){const s=STATES.find(s=>s[0]===state);if(s)map.flyTo([s[1],s[2]],9)}
 document.getElementById('outlet-detail').hidden=true;
}
function renderMarkers(){if(!map)return;if(layer)layer.clearLayers();const list=selectedState?outlets.filter(o=>o.state===selectedState):outlets;
 list.forEach(o=>{const icon=L.divIcon({className:'billion-map-marker',html:iconHtml,iconSize:[36,43],iconAnchor:[18,43]});
 const m=L.marker([o.lat,o.lon],{icon,title:o.name}).addTo(layer);m.on('click',()=>showOutlet(o));});
}
function showOutlet(o){selectedOutlet=o;const target=document.getElementById('outlet-detail');target.hidden=false;
 const hasImg=o.image&&/^(https?:\/\/|assets\/)/.test(o.image);
 const address=o.address||t('unknown'),hours=o.hours||t('unknown');
 const mapLink=o.approx?'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(o.name+' '+o.state):
 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(o.address||o.name+' '+o.state);
 target.innerHTML='<div class="outlet-detail-image">'+(hasImg?'<img src="'+esc(o.image)+'" alt="'+esc(o.name)+'"/>':'<div class="outlet-photo-placeholder">'+t('photo')+'</div>')+'</div><div class="outlet-detail-body"><small>'+esc(o.code)+' · '+esc(o.state)+'</small><h3>'+esc(o.name)+'</h3>'+(o.approx?'<p class="outlet-approx">⚠ '+t('approx')+'</p>':'')+'<p><strong>Address:</strong> '+esc(address)+'</p><p><strong>Operating hours:</strong> '+esc(hours)+'</p><a href="'+esc(mapLink)+'" target="_blank" rel="noopener noreferrer">'+t('maps')+' ↗</a></div>';
 target.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function csvParse(text){const rows=[];let row=[],field='',quote=false;for(let i=0;i<text.length;i++){const c=text[i];if(quote){if(c==='"'&&text[i+1]==='"'){field+='"';i++}else if(c==='"')quote=false;else field+=c}else if(c==='"')quote=true;else if(c===','){row.push(field);field=''}else if(c==='\n'){row.push(field.replace(/\r$/,''));rows.push(row);row=[];field=''}else field+=c}if(field||row.length){row.push(field);rows.push(row)}return rows}
function importCSV(text){const rows=csvParse(text.replace(/^\uFEFF/,''));const header=rows.shift().map(s=>s.trim().toLowerCase());const col=n=>header.indexOf(n);
 const required=['code','name','state','latitude','longitude'];if(required.some(n=>col(n)<0))throw Error('CSV columns required: '+required.join(', '));
 const next=rows.filter(r=>r.some(Boolean)).map(r=>{const get=n=>col(n)>=0?(r[col(n)]||'').trim():'';const lat=Number(get('latitude')),lon=Number(get('longitude'));
 if(!Number.isFinite(lat)||!Number.isFinite(lon)||lat<0||lat>8||lon<99||lon>120)throw Error('Invalid coordinates: '+get('code'));
 if(!STATES.some(s=>s[0].toLowerCase()===get('state').toLowerCase()))throw Error('Unknown state: '+get('state'));
 return {code:get('code'),name:get('name'),state:STATES.find(s=>s[0].toLowerCase()===get('state').toLowerCase())[0],lat,lon,address:get('address'),hours:get('hours'),image:get('image'),approx:false};
 });if(!next.length)throw Error('No valid outlet rows');outlets=next;selectedState=null;stateList();renderMarkers();map.fitBounds(L.latLngBounds(outlets.map(o=>[o.lat,o.lon])).pad(.25),{maxZoom:11})}
function translate(){document.querySelectorAll('[data-map-i18n]').forEach(e=>{e.textContent=t(e.dataset.mapI18n)});stateList();if(selectedOutlet)showOutlet(selectedOutlet)}
function init(){if(!document.getElementById('billion-outlet-map'))return;translate();
 document.getElementById('map-reset').addEventListener('click',()=>{selectedState=null;selectedOutlet=null;stateList();renderMarkers();document.getElementById('outlet-detail').hidden=true;if(map)map.setView([4.1,109],6)});
 document.getElementById('outlet-csv').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{importCSV(await f.text())}catch(err){alert(err.message)}e.target.value=''});
 document.getElementById('download-outlet-template').addEventListener('click',()=>{const blob=new Blob(['code,name,state,latitude,longitude,address,hours,image\n'],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='billion-outlet-template.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)});
 document.addEventListener('billion:language',translate);document.addEventListener('billion:v38-language',translate);
 if(typeof L==='undefined'){document.getElementById('outlet-map-message').textContent=t('unavailable');return}
 map=L.map('billion-outlet-map',{scrollWheelZoom:false,tap:false,zoomControl:true}).setView([4.1,109],6);
 // Wheel zoom only while the pointer is actually over the map.
 const el=map.getContainer();el.addEventListener('mouseenter',()=>map.scrollWheelZoom.enable());el.addEventListener('mouseleave',()=>map.scrollWheelZoom.disable());
 // Touch: one-finger gestures pan map; pinch zoom works inside map. Outside, page scrolls normally.
 map.touchZoom.enable();
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors',maxZoom:19}).addTo(map);
 layer=L.layerGroup().addTo(map);renderMarkers();
 // State overview markers, each count is the number of LOADED outlets.
 const stateLayer=L.layerGroup().addTo(map);
 STATES.forEach(([name,lat,lon])=>{const marker=L.marker([lat,lon],{icon:L.divIcon({className:'state-count-marker',html:'<span>'+esc(name)+'</span><b>'+count(name)+'</b>',iconSize:[118,34],iconAnchor:[59,17]})});marker.on('click',()=>selectState(name));stateLayer.addLayer(marker)});
 function updateOverview(){if(map.getZoom()>=9||selectedState){if(map.hasLayer(stateLayer))map.removeLayer(stateLayer)}else{if(!map.hasLayer(stateLayer))map.addLayer(stateLayer)}}
 map.on('zoomend',updateOverview);updateOverview();
 // refresh state counters after CSV import
 document.getElementById('outlet-csv').addEventListener('change',()=>{setTimeout(()=>{stateLayer.eachLayer(m=>stateLayer.removeLayer(m));STATES.forEach(([name,lat,lon])=>{const m=L.marker([lat,lon],{icon:L.divIcon({className:'state-count-marker',html:'<span>'+esc(name)+'</span><b>'+count(name)+'</b>',iconSize:[118,34],iconAnchor:[59,17]})});m.on('click',()=>selectState(name));stateLayer.addLayer(m)});updateOverview()},250)});
 window.addEventListener('resize',()=>map.invalidateSize());
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
