# Billion Website V42 — Interactive Outlet Map & Ticker Localization

- Fixed inner-page scrolling marquees to switch between English, Bahasa Melayu and Chinese.
- Added interactive Leaflet / OpenStreetMap map on Outlets page with state selection, state counts based on currently loaded records, Billion logo pins, outlet detail card, and Google Maps search link.
- Scroll wheel zoom activates only while pointer is inside map. Mobile pinch zoom is supported by Leaflet.
- CSV import supports verified outlet data: code,name,state,latitude,longitude,address,hours,image.
- CSV imports are browser-session only; to publish full 56 outlets, the verified dataset must be incorporated into the site's assets/backend.
- Initial four example markers are approximate town centres and explicitly identified as such. No fabricated store addresses/hours.
- Map tiles and Leaflet require internet connectivity.
